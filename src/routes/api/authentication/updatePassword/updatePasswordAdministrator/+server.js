import { hashPassword } from '$lib/authentication/PasswordAuth';
import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';

export async function PATCH({request}) {
    
    if (request.method !== 'PATCH') {
        return new Response(JSON.stringify({error: "method is not PATCH"}), {status: 422});
    };

    const data = await request.json();

    const {password, passwordReentered, email, } = data;

    if (
        !password ||
        !passwordReentered ||
        !email
    ) {
        return new Response(JSON.stringify({error: "missing form input data"}), {status: 422});
    };

    if (
        password !== passwordReentered
    ) {
        return new Response(JSON.stringify({error: "passwords do not match"}), {status: 422});
    };

    // connect to the database

    let res = await mysqlConnection();

    const searchEmailQuery = `SELECT * FROM administrators WHERE email = '${email}';`;

    /**
     * @type {string | any[]}
     */
    let administratorWithEmailID = [];

    await res.query(searchEmailQuery)
    .then(([ rows ]) => {
        administratorWithEmailID = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    if (administratorWithEmailID.length === 0) {
        return new Response(JSON.stringify({error: "no administrator found with email"}), {status: 422});
    };

    if (
        !password || 
        password.trim().length < 7
    ) {
        return new Response(JSON.stringify({error: "invalid input - password should be at least 7 characters long"}), {status: 422});
    };

    // hash the password

    const hashedPassword = await hashPassword(password);

    // update the password in the database

    const passwordUpdateStatement = `UPDATE administrators
    SET 
        password = "${hashedPassword}"
    WHERE email = "${email}";`

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
        to: email,
        from: 'sdewyer@artintechservices.com',
        subject: 'password update',
        html: `<p>Hi ${email},<p>
        <p>Your Art in Tech Services administrator password has been updated.</p>
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