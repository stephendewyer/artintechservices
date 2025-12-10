import { verifyPassword } from '$lib/authentication/PasswordAuth';
import { mysqlConnection } from "$lib/server/db/mysql";

export const clientAuthentication = async (/** @type {LoginCredentials} */ credentials) => {
    
    if (credentials.email === "") {
        return null;
    } else if (credentials.password === "") {
        return null;
    };

    // search clients for client account with email that matches the user

    let res = await mysqlConnection();

    /**
     * @type {string | any[]}
     */
    let clientRows = [];

    const checkClientEmailQuery = `SELECT * FROM clients WHERE email = "${credentials.email}"`;

    await res.query(checkClientEmailQuery)
    .then(([ rows ]) => {
        clientRows = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    if (clientRows?.length > 0) {
        // update login date and time to client last_login
        const updateLastLoginTimestamp = `UPDATE clients 
            SET last_login = now()
            WHERE email = "${credentials.email}"`;

        await res.query(updateLastLoginTimestamp)
        .then(() => {
            console.log("client last login updated!");
        })
        .catch(error => {
            throw error;
        });
    };

    res.end();

    if (clientRows?.length <= 0) {
        return null;
    };

    const clientExistsEmail = clientRows[0].email;

    const clientExistsPassword = clientRows[0].password;

    const isValidPassword = await verifyPassword(credentials.password, clientExistsPassword);
        
    if (!isValidPassword) {
        return null;
    } else if (isValidPassword) {
        const result = JSON.parse(JSON.stringify({email: clientExistsEmail, name: "client"}));
        return result;
    };
}
