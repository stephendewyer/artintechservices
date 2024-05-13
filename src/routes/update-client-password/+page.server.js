import { mysqlConnection } from "$lib/server/db/mysql";
import { redirect } from "@sveltejs/kit";

export const load = async ({url}) => {

    const tokenSearchValue = url.searchParams.get("token");
    const emailSearchValue = url.searchParams.get("email");

    // get the token in row with email in clients if any
    let res = await mysqlConnection();

    const checkEmailQuery = `SELECT reset_token FROM clients WHERE email = '${emailSearchValue}'`;

    /**
     * @type {string | any[]}
     */
    let clientsWithEmail = [];

    await res.query(checkEmailQuery)
    .then(([ rows ]) => {
        clientsWithEmail = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    if (clientsWithEmail.length > 0) {
        if (clientsWithEmail[0].reset_token !== tokenSearchValue) {
            throw redirect(303, "/");
        };
    } else if (clientsWithEmail.length === 0) {
        throw redirect(303, "/");
    };

    res.end();

    return {
        email: emailSearchValue
    };
}