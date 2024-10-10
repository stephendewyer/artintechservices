import { verifyPassword } from '$lib/authentication/PasswordAuth';
import { mysqlConnection } from "$lib/server/db/mysql";

export async function POST({request}) {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const email = data.email;
    const password = data.password;

    if (!email && !password) {
        return new Response(JSON.stringify({error: "missing email address and password"}), {status: 422});
    } else if (!email && password) {
        return new Response(JSON.stringify({error: "missing email"}), {status: 422});
    } else if (email && !password) {
        return new Response(JSON.stringify({error: "missing password"}), {status: 422});
    };

    // search clients for client account with email that matches the user

    let res = await mysqlConnection();

    /**
     * @type {string | any[]}
     */
    let clientRows = [];

    const checkClientEmailQuery = `SELECT * FROM clients WHERE email = '${email}'`;

    await res.query(checkClientEmailQuery)
    .then(([ rows ]) => {
        clientRows = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    res.end();

    if (clientRows?.length === 0) {
        return new Response(JSON.stringify({error: "invalid email and/or password"}), {status: 422});
    };

    const clientExistsEmail = clientRows[0].email;

    const clientExistsPassword = clientRows[0].password;

    const isValidPassword = await verifyPassword(password, clientExistsPassword);
        
    if (!isValidPassword) {
        return new Response(JSON.stringify({error: "invalid email and/or password"}), {status: 422});
    } else if (isValidPassword) {
        return new Response(JSON.stringify({success: `valid credentials.  Logging into client account.`}), {status: 200});
    };

    

}