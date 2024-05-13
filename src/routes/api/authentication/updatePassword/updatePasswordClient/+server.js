import { hashPassword } from '$lib/authentication/PasswordAuth';
import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';

export async function PATCH({request}) {
    
    if (request.method !== 'PATCH') {

        return new Response(JSON.stringify({error: "method is not PATCH"}), {status: 422});

    };

    const data = await request.json();

    const {password, reenteredPassword, paramsTokenID, } = data;

    // connect to the database

    let res = await mysqlConnection();

    const searchTokenQuery = `SELECT * FROM clients WHERE reset_token = '${paramsTokenID}';`;

    /**
     * @type {string | any[]}
     */
    let clientWithTokenID = [];

    await res.query(searchTokenQuery)
    .then(([ rows ]) => {
        clientWithTokenID = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    if (clientWithTokenID.length === 0) {
        return new Response(JSON.stringify({error: "no client found with token ID"}), {status: 422});
    };

    if (
        !password || 
        password.trim().length < 7
    ) {
        return new Response(JSON.stringify({error: "invalid input - password should be at least 7 characters long"}), {status: 422});
    };

    const clientEmail = clientWithTokenID[0].email;

    // hash the password

    const hashedPassword = await hashPassword(password);

    // update the password in the database

    const passwordUpdateStatement = `UPDATE users_voters
    SET 
        password = "${hashedPassword}"
    WHERE email = "${clientEmail}";`

    await res.query(passwordUpdateStatement)
    .then(() => {
        console.log("password has been updated!");
    })
    .catch(error => {
        throw error;
    });

    res.end();

    // begin send email verification

    sgMail.setApiKey(SENDGRIDAPIKey)
    const msg = {
        to: clientEmail,
        from: 'sdewyer@artintechservices.com',
        subject: 'password update',
        html: `<p>Hi ${clientEmail},<p>
        <p>Your Art in Tech Services client password has been updated.</p>
        <p>Kind regards,</p>
        <p>Art in Tech Services</p>
        <a href="https://artintechservices.com">https://artintechservices.com</a>`
    };
    try {

        await sgMail.send(msg);

    } catch (error) {

        console.error(error);

        return new Response(JSON.stringify({error: "message not sent due to a problem with the API"}), {status: 422});
    
    };

    return new Response(JSON.stringify({success: "your password has been updated"}), {status: 200});

}