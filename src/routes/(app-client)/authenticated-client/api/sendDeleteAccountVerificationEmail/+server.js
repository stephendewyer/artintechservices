import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';
import { DOMAIN } from '$env/static/private';
import { nanoid } from 'nanoid';
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST({request}) {

    if (request.method !== 'DELETE') {
        return new Response(JSON.stringify({error: "method is not DELETE"}), {status: 422});
    };

    const data = await request.json();

    const sessionEmail = data.sessionEmail;

    const userName = data.name;

    if (!sessionEmail) {
        return new Response(JSON.stringify({error: "missing email!"}), {status: 422});
    };

    // connect to the database

    let res = await mysqlConnection();

    // check to see if all invoices have been paid in full

    const selectClientInvoicesQuery = `SELECT 
            clients.user_ID,
            client_information.Stripe_customer_ID
        FROM clients
        INNER JOIN client_information
        ON clients.user_ID = client_information.client_ID
        WHERE clients.email = "${sessionEmail}"
    `;

    let Stripe_customer_ID = "";

    let clientID = "";

    await res.query(selectClientInvoicesQuery)
    .then(([rows]) => {
        Stripe_customer_ID = JSON.parse(JSON.stringify(rows))[0].Stripe_customer_ID;
        clientID = JSON.parse(JSON.stringify(rows))[0].user_ID;
    })
    .catch(error => {
        throw error;
    });

    if (!Stripe_customer_ID) {
        return new Response(JSON.stringify({error: "client is missing Stripe customer ID"}), {status: 422});
    };

    // get the Stripe invoices to the client if any

    const customer_invoices = await stripe.invoices.search({
        query: `customer: '${Stripe_customer_ID}'`,
    });

    // get the total amount due on invoices

    let totalAmountDue = 0;

    if (customer_invoices.data.length > 0) {
        customer_invoices.data.forEach((invoice, index) => {
            if (invoice.status === "open") {
                totalAmountDue = totalAmountDue + (invoice.amount_due - invoice.amount_paid);
            };
        });
    };

    if (totalAmountDue > 0) {
        return new Response(JSON.stringify({error: "Your account has an unpaid invoice.  Unable to delete account."}), {status: 422});
    };

    // check to see if any open projects

    /**
     * @type {Project[]}
     */
    let projects = [];

    const selectClientProjectsStatement = `SELECT 
            start_project_requests_client.*
        FROM start_project_requests_client
        WHERE start_project_requests_client.client_ID = ${clientID};
    `;

    await res.query(selectClientProjectsStatement)
    .then(([rows]) => {
        projects = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    /**
     * @type {Project[]}
     */
    let openProjects = [];

    projects.forEach((project) => {
        if (project.status !== "completed") {
            openProjects = [...openProjects, project];
        };
    });

    if (openProjects.length > 0) {
        return new Response(JSON.stringify({error: "Your account has a started and/or requested project.  Unable to delete account."}), {status: 422});
    };

    // check to see if no consultation requests remain

    const selectClientConsultationsStatement = `SELECT consult_requests_client.* 
        FROM consult_requests_client
        WHERE consult_requests_client.client_ID = ${clientID};
    `;

    /**
     * @type {Consultation[]}
     */
    let consultations = [];

    await res.query(selectClientConsultationsStatement)
    .then(([rows]) => {
        consultations = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    /**
     * @type {Consultation[]}
     */
    let openConsultations = [];

    consultations.forEach(consultation => {
        if (consultation.status !== "past") {
            openConsultations = [...openConsultations, consultation];
        };
    });

    if (openConsultations.length > 0) {
        return new Response(JSON.stringify({error: "Your account has a reqiested and/or upcoming consultation.  Unable to delete account."}), {status: 422});
    };

    // begin set token and token expiration date

    let token = nanoid(32);
    let tokenExpDate = Date.now() + 3600000;

    // add the token and token expiration date to the user row in clients table
    const tokenUpdateStatement = `UPDATE clients
    SET 
        delete_account_token = "${token}", 
        delete_account_token_expiration = "${tokenExpDate}"
    WHERE email = "${sessionEmail}";`

    await res.query(tokenUpdateStatement)
    .then(() => {
        console.log("delete account token and delete account token expiration added!");
    })
    .catch(error => {
        throw error;
    });
    
    res.end();
    
    // begin send email verification

    sgMail.setApiKey(SENDGRIDAPIKey);

    const msg = {
        to: sessionEmail,
        from: 'sdewyer@artintechservices.com',
        subject: 'delete account verification link',
        html: `
            <p>Hi ${userName},</p>
            <p>You requested to delete your client account.</p>
            <p>Click <a href="${DOMAIN}/authenticated-client/client/delete-account?token=${token}" >this link</a> to verify and delete your account.</p>
            <p>Kind regards,</p>
            <p>Art in Tech Services</p>
            <a href="https://artintechservices.com">https://artintechservices.com</a>
        `
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        return new Response(JSON.stringify({error: "delete account verification link not sent due to a problem with the API"}), {status: 422});
    };

    return new Response(JSON.stringify({success: `delete account verification email sent to ${userName} at ${sessionEmail}`}), {status: 200});

};