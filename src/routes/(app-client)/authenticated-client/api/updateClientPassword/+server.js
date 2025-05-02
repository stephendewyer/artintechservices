import { hashPassword } from '$lib/authentication/PasswordAuth';
import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';

export async function PATCH({request}) {
    
    if (request.method !== 'PATCH') {
        return new Response(JSON.stringify({error: "method is not PATCH"}), {status: 422});
    };

    const data = await request.json();

    const {password, passwordReentered, sessionEmail, } = data;

    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (
        !password ||
        !passwordReentered ||
        !sessionEmail
    ) {

        return new Response(JSON.stringify({error: "missing form input data"}), {status: 422});
        
    } else if (password.split("").length < 7 || password.split("").length > 14) {

        return new Response(JSON.stringify({error: "password must have a minimum of 7 characters and maximum of 14 characters"}), {status: 422});

    } else if (!/\d/.test(password)) {

        return new Response(JSON.stringify({error: "password must have at least one number"}), {status: 422});

    } else if (!specialChars.test(password)) {

        return new Response(JSON.stringify({error: "password must have at least one special character"}), {status: 422});

    } else if (!/[A-Z]/.test(password)) {

        return new Response(JSON.stringify({error: "password must have at least one capital letter"}), {status: 422});

    } else if (!/[a-z]/.test(password)) {

        return new Response(JSON.stringify({error: "password must have at least one lower-case letter"}), {status: 422});

    };

    if (
        password !== passwordReentered
    ) {
        return new Response(JSON.stringify({error: "passwords do not match"}), {status: 422});
    };

    // hash the password

    const hashedPassword = await hashPassword(password);

    // connect to the database

    let res = await mysqlConnection();

    // update the password in the database

    const passwordUpdateStatement = `UPDATE clients
    SET 
        password = "${hashedPassword}"
    WHERE email = "${sessionEmail}";`

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
        to: sessionEmail,
        from: 'sdewyer@artintechservices.com',
        subject: 'password update',
        html: `<p>Hi ${sessionEmail},<p>
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