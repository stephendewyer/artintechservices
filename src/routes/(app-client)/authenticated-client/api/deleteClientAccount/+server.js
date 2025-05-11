import { mysqlConnection } from "$lib/server/db/mysql";
import { SENDGRIDAPIKey } from '$env/static/private';
import sgMail from "@sendgrid/mail";

export const DELETE = async ({request}) => {

    if (request.method !== 'DELETE') {

        return new Response(JSON.stringify({error: "method is not DELETE"}), {status: 422});

    };

    const data = await request.json();

    const sessionEmail = data.sessionEmail;

    if (
        !sessionEmail
    ) {
        return new Response(JSON.stringify({error: "missing client email!"}), {status: 422});
    };

    // connect to the database

    let res = await mysqlConnection();

    // delete the project from start_project_requests_client

    const deleteProjectStatement =  `DELETE FROM clients
        WHERE email = "${sessionEmail}";
    `;
    await res.query(deleteProjectStatement)
    .then(() => {
    })
    .catch(error => {
        throw error;
    });

    res.end();

    sgMail.setApiKey(SENDGRIDAPIKey);
    
    const msg = [
        {
            to: sessionEmail,
            from: 'sdewyer@artintechservices.com',
            subject: 'your client account has been deleted',
            html: `
                <p>Hi ${sessionEmail},</p>
                <p>Your client account has been deleted.  You can create a new account using your email address.</p>
                <p>Thank you for doing business with us.</p>
                <p>Kind regards,</p>
                <p>Art in Tech Services</p>
                <a href="https://artintechservices.com">https://artintechservices.com</a>
            `
        }, {
            to: "sdewyer@artintechservices.com",
            from: 'sdewyer@artintechservices.com',
            subject: `${sessionEmail} deleted their client account`,
            html: `
                <p>Hi Art in Tech Services,</p>
                <p>${sessionEmail} deleted their client account.</p>
                <p>Kind regards,</p>
                <p>Art in Tech Services</p>
                <a href="https://artintechservices.com">https://artintechservices.com</a>
            `
        }
    ];
    
        try {
            await sgMail.send(msg);
        } catch (error) {
            return new Response(JSON.stringify({error: "delete account confirmations not sent due to a problem with the API"}), {status: 422});
        };

    return new Response(JSON.stringify({success: `deleted account for ${sessionEmail}!`}), {status: 200});

};