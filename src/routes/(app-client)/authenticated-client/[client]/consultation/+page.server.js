import { mysqlConnection } from "$lib/server/db/mysql";
import { redirect } from "@sveltejs/kit";

export const load = async ({url}) => {

    const consultationIDSearchValue = url.searchParams.get("id");

    if (!consultationIDSearchValue) {
        throw redirect(303, "/authenticated-client/client");
    };

    let res = await mysqlConnection();

    // get the consultation data

    const consultationQuery = `SELECT * FROM consult_requests_client WHERE request_ID = ${consultationIDSearchValue}`;
    /**
     * @type {Consultation | undefined}
     */
    let consultationRow;

    await res.query(consultationQuery)
    .then((/** @type {any} */[rows]) => {
        consultationRow = JSON.parse(JSON.stringify(rows))[0];
    })
    .catch((/** @type {any} */ error) => {
        throw error;
    });

    if (!consultationRow) {
        throw redirect(303, "/authenticated-client/client");
    };
    res.end();

    return {
        consultationRow
    };
}