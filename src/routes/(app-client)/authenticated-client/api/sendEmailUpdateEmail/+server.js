import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';
import { DOMAIN } from '$env/static/private';
import { nanoid } from 'nanoid';

export async function POST({request}) {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    console.log(data);

    const sessionEmail = data.sessionEmail;

    const newEmail = data.emailInputValue;

    const userName = data.name;

    if (!newEmail) {
        return new Response(JSON.stringify({error: "missing email!"}), {status: 422});
    } else if (!newEmail.includes('@')) {
        return new Response(JSON.stringify({error: "missing an @ symbol in email address!"}), {status: 422});
    };

    // connect to the database

    let res = await mysqlConnection();

    // begin set token and token expiration date

    let token = nanoid(32);
    let tokenExpDate = Date.now() + 3600000;

    // add the token and token expiration date to the user row in clients table
    const tokenUpdateStatement = `UPDATE clients
    SET 
        change_email_token = "${token}", 
        change_email_token_expiration = "${tokenExpDate}",
        new_email = "${newEmail}"
    WHERE email = "${sessionEmail}";`

    await res.query(tokenUpdateStatement)
    .then(() => {
        console.log("change email token and change email token expiration date added!");
    })
    .catch(error => {
        throw error;
    });
    
    res.end();
    
    // begin send email verification

    sgMail.setApiKey(SENDGRIDAPIKey);

    const msg = [{
        to: newEmail,
        from: 'sdewyer@artintechservices.com',
        subject: 'change email verification link',
        html: `
            <p>Hi ${userName},</p>
            <p>You requested to change your email address on your client account.</p>
            <p>Click <a href="${DOMAIN}/authenticated-client/client/change-email?token=${token}" >this link</a> to verify and change the email address to ${newEmail} on your account.</p>
            <p>Kind regards,</p>
            <p>Art in Tech Services</p>
            <a href="https://artintechservices.com">https://artintechservices.com</a>
        `
    }, {
        to: sessionEmail,
        from: 'sdewyer@artintechservices.com',
        subject: 'someone sent a change email request from your Art in Tech Services account',
        html: `
            <p>Hi ${userName},</p>
            <p>Someone has sent a request to change the email associated with your Art in Tech Services account.</p>
            <p>If you sent the request, please ignore this email.  If you did not request to change your email, please contact Art in Tech Services.</p>
            <p>Kind regards,</p>
            <p>Art in Tech Services</p>
            <a href="https://artintechservices.com">https://artintechservices.com</a>
        `
    }];

    try {
        await sgMail.send(msg);
    } catch (error) {
        return new Response(JSON.stringify({error: "email verification not sent due to a problem with the API"}), {status: 422});
    };

    return new Response(JSON.stringify({success: `verification email sent to ${userName} at ${newEmail}`}), {status: 200});

};