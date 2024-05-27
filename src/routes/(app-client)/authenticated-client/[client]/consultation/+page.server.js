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
    .then(([rows]) => {
        consultationRow = JSON.parse(JSON.stringify(rows))[0];
    })
    .catch(error => {
        throw error;
    });

    if (!consultationRow) {
        return new Response(JSON.stringify({error: `no consultation with ID of ${consultationIDSearchValue} in database`}), {status: 422})
    };
    res.end();

    return {
        consultationRow
    };
}