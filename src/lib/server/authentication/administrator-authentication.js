import { verifyPassword } from '$lib/authentication/PasswordAuth';
import { mysqlConnection } from "$lib/server/db/mysql";

export const administratorAuthentication = async (/** @type {Credentials} */ credentials) => {
    
    if (credentials.email === "") {
        return null;
    } else if (credentials.password === "") {
        return null;
    };

    // search administrator for administrator account with email that matches the user

    let res = await mysqlConnection();

    /**
     * @type {string | any[]}
     */
    let administratorRows = [];

    const checkAdministratorEmailQuery = `SELECT * FROM administrators WHERE email = '${credentials.email}'`;

    await res.query(checkAdministratorEmailQuery)
    .then(([ rows ]) => {
        administratorRows = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    res.end();

    if (administratorRows?.length <= 0) {
        return null;
    };

    const administratorExistsEmail = administratorRows[0].email;

    const administratorExistsPassword = administratorRows[0].password;

    const isValidPassword = await verifyPassword(credentials.password, administratorExistsPassword);
        
    if (!isValidPassword) {
        return null;
    } else if (isValidPassword) {
        const result = JSON.parse(JSON.stringify({email: administratorExistsEmail, name: "administrator"}));
        return result;
    };
}
