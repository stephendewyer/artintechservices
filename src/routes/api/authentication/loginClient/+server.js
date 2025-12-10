import { verifyPassword } from '$lib/authentication/PasswordAuth';
import { mysqlConnection } from "$lib/server/db/mysql";
import { signAccessToken } from '$lib/server/authentication/auth';

export async function POST({request, cookies}) {

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

    const user = {
        id: clientRows[0].user_ID,
        email: clientRows[0].email,
        role: "client"
    };

    const clientPassword = clientRows[0].password;

    const isValidPassword = await verifyPassword(password, clientPassword);
        
    if (!isValidPassword) {
        return new Response(JSON.stringify({error: "invalid email and/or password"}), {status: 422});
    };

    // credentials are valid.  Create session cookie.
    const token = signAccessToken(user);

    cookies.set("session", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60*60*24*7
    });

    return new Response(JSON.stringify({ loggedIn: true, success: `Valid credentials.  Logging into client account.`}), {status: 200});

};