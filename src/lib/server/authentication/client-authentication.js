import { verifyPassword } from '$lib/authentication/PasswordAuth';
import { mysqlConnection } from "$lib/server/db/mysql";

export const clientAuthentication = async (/** @type {Credentials} */ credentials) => {
    
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

    const checkClientEmailQuery = `SELECT * FROM clients WHERE email = '${credentials.email}'`;

    await res.query(checkClientEmailQuery)
    .then(([ rows ]) => {
        clientRows = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

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
