import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';
import { DOMAIN } from '$env/static/private';
import { nanoid } from 'nanoid'

export async function POST({request}) {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const email = data.email;

    if (!email) {
        return new Response(JSON.stringify({error: "missing form data!"}), {status: 422});
    } else if (!email.includes('@')) {
        return new Response(JSON.stringify({error: "missing an @ symbol in email address!"}), {status: 422});
    };

    // connect to the database

    let res = await mysqlConnection();

    // get the user from clients table in database

    const checkEmailQuery = `SELECT email FROM clients WHERE email = '${email}';`;
    /**
     * @type {string | any[]}
     */
    let clientAccount = [];

    await res.query(checkEmailQuery)
    .then(([ rows ]) => {
        const rowsJSON = JSON.parse(JSON.stringify(rows));
        clientAccount = rowsJSON;
    })
    .catch(error => {
        throw error;
    });

    // if no user, return error

    if (clientAccount.length === 0) {
        return new Response(JSON.stringify({error: `no client account with ${email} as email exists!`}), {status: 422});
    };

    // begin set token and token expiration date

    let token = nanoid(32);
    let tokenExpDate = Date.now() + 3600000;

    // add the token and token expiration date to the user row in users_campaigns table
    const tokenUpdateStatement = `UPDATE clients
    SET 
        reset_token = "${token}", 
        reset_token_expiration = "${tokenExpDate}" 
    WHERE email = "${email}";`

    await res.query(tokenUpdateStatement)
    .then(() => {
        console.log("token and token expiration date added!");
    })
    .catch(error => {
        throw error;
    });
    
    res.end();
    
    // begin send email verification

    sgMail.setApiKey(SENDGRIDAPIKey);

    const msg = {
        to: email,
        from: 'sdewyer@artintechservices.com',
        subject: 'password reset',
        html: `
            <p>Hi ${email},</p>
            <p>You requested a password reset.</p>
            <p>Click <a href="${DOMAIN}/update-client-password?token=${token}" >this link to set a new password.</a></p>
            <p>Kind regards,</p>
            <p>Art in Tech Services</p>
            <a href="https://artintechservices.com">https://artintechservices.com</a>
        `
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        return new Response(JSON.stringify({error: "email verification not sent due to a problem with the API"}), {status: 422});
    };

    return new Response(JSON.stringify({success: `verification email sent to ${email}`}), {status: 200});

};