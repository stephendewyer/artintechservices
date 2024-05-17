import { mysqlConnection } from "$lib/server/db/mysql";
import { redirect } from "@sveltejs/kit";

export const load = async ({url}) => {

    const tokenSearchValue = url.searchParams.get("token");
    const emailSearchValue = url.searchParams.get("email");

    // get the token in row with email in administrators if any
    let res = await mysqlConnection();

    const checkEmailQuery = `SELECT reset_token FROM administrators WHERE email = '${emailSearchValue}'`;

    /**
     * @type {string | any[]}
     */
    let administratorsWithEmail = [];

    await res.query(checkEmailQuery)
    .then(([ rows ]) => {
        administratorsWithEmail = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    if (administratorsWithEmail.length > 0) {
        if (administratorsWithEmail[0].reset_token !== tokenSearchValue) {
            throw redirect(303, "/");
        };
    } else if (administratorsWithEmail.length === 0) {
        throw redirect(303, "/");
    };

    res.end();

    return {
        email: emailSearchValue
    };
}