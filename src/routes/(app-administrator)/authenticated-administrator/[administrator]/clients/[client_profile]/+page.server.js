import { mysqlConnection } from "$lib/server/db/mysql";
import { redirect } from "@sveltejs/kit";

export const load = async ({params, url}) => {
    // check if valid email
    const clientEmail = params.client_profile.split("=")[1];

    let res = await mysqlConnection();

    const selectClientQuery = `SELECT * FROM clients WHERE email = "${clientEmail}"`;
    /**
     * @type {string[]}
     */
    let clientRow = [];

    await res.query(selectClientQuery)
    .then(([rows]) => {
        clientRow = [...clientRow, ...JSON.parse(JSON.stringify(rows))];
    })
    .catch(error => {
        throw error;
    });

    res.end();

    if (clientRow.length === 0) {
        throw redirect(303, "/authenticated-administrator/administrator/clients");
    } else {
        // get the profile image if any
        return {
            streamed: {
                clientEmail
            }
        };
    };    

}
