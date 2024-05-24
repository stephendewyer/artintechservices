import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';
import { hashPassword } from "$lib/authentication/PasswordAuth.js";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST({request}) {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const nameFirst = data.nameFirstInputValue;
    const nameLast = data.nameLastInputValue;
    const email = data.emailInputValue;
    const password = data.passwordInputValue;
    const passwordReentered = data.passwordReenteredInputValue;

    if (
        !nameFirst ||
        !nameLast ||
        !email ||
        !password ||
        !passwordReentered
    ) {
        return new Response(JSON.stringify({error: "missing form data!"}), {status: 422});
    } else if (!email.includes('@')) {
        return new Response(JSON.stringify({error: "missing an @ symbol in email address!"}), {status: 422});
    } else if (password !== passwordReentered) {
        return new Response(JSON.stringify({error: "passwords do not match!"}), {status: 422});
    };

    const hashedPassword = await hashPassword(password);

    // check to see if email and campaign name already exist
    let res = await mysqlConnection();

    const checkEmailQuery = `SELECT email FROM clients WHERE email = '${email}'`;

    /**
     * @type {string[]}
     */
    let clientsWithEmail = [];

    await res.query(checkEmailQuery)
    .then(([ rows ]) => {
        clientsWithEmail = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    if (clientsWithEmail.length > 0) {
        return new Response(JSON.stringify({error: "a client account with the same email already exists!"}), {status: 422});
    };

    const checkNameFirstAndLastQuery = `SELECT * FROM clients WHERE name_first = '${nameFirst}' AND name_last = '${nameLast}'`;
    
    /**
     * @type {string[]}
     */
    let clientsWithFirstAndLastName = [];

    await res.query(checkNameFirstAndLastQuery)
    .then(([ rows ]) => {
        clientsWithFirstAndLastName = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    if (clientsWithFirstAndLastName.length > 0) {
        return new Response(JSON.stringify({error: "a client account with the same first and last name already exists!"}), {status: 422});
    };

    
    // check if stripe customer already exists with email

    const searched_stripe_customer = await stripe.customers.search({
        query: `email: '${email}'`,
    });

    // if no Stripe customer exists, create a new Stripe customer

    let stripe_customerID;

    if (searched_stripe_customer.data.length === 0) {

        // create a new Stripe customer

        const stripe_customer = await stripe.customers.create({
            email: email,
        });

        // log the new Stripe customer with customer ID in the console
  
        if (stripe_customer) {
            console.log(`Stripe customer created: ${stripe_customer.id}`);
        };

        // return the new Stripe customer object in a variable

        stripe_customerID = stripe_customer.id;

    } else if (searched_stripe_customer.data.length > 0) {
        return new Response(JSON.stringify({error: `a Stipe account already exists for a customer with ${email}`}), {status: 422});
    };

    const insertClientStatement = `INSERT INTO clients 
    (
        name_first,
        name_last,
        email,
        password
    ) VALUES (
        "${nameFirst}",
        "${nameLast}",
        "${email}",
        "${hashedPassword}"
    )`;
    
    let clientID;

    await res.query(insertClientStatement)
    .then(([ rows ]) => {
        const rowsJSON = JSON.parse(JSON.stringify(rows));
        clientID = rowsJSON.insertId;
    })
    .catch(error => {
        throw error;
    });
    
    const insertClientInformationStatement = `INSERT INTO client_information (
        client_ID,
        Stripe_customer_ID
    ) VALUES (
        "${clientID}",
        "${stripe_customerID}"
    )`;
    
    await res.query(insertClientInformationStatement)
    .then(() => {
        console.log("client information added!")
    })
    .catch(error => {
        throw error;
    });

    res.end();

    sgMail.setApiKey(SENDGRIDAPIKey);

    const msg = [
        {
            to: 'sdewyer@artintechservices.com',
            from: 'sdewyer@artintechservices.com',
            subject: `new client account created`,
            text: `new client account created.`,
            html: `<p>Hi stephen,<br /><br />A new client account has been created for ${nameFirst} ${nameLast}.<br /><br />
            Kind regards,<br /><br />Art in Tech Services<br />https://artintechservices.com</p>`
        },
        {
            to: email,
            from: 'sdewyer@artintechservices.com',
            subject: `client account created for ${nameFirst} ${nameLast}`,
            text: 'client account created via Art in Tech Services',
            html: `<p>Hi ${nameFirst},<br /><br />
            Thank you for creating a client account at Art in Tech Services.<br /><br />
            You can now manage your account via the client portal.<br /><br />
            Kind regards,<br /><br />Art in Tech Services<br />https://artintechservices.com</p>`
        },
    ];

    try {

        await sgMail.send(msg);
        
    } catch (error) {

        return new Response(JSON.stringify({error: "new client account message not sent due to a problem with the API"}), {status: 422});

    };

    return new Response(JSON.stringify({success: `client account successfully created for ${nameFirst} ${nameLast}`}), {status: 200});
}