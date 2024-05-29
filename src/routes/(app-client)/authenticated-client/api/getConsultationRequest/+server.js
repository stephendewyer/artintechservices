import { mysqlConnection } from "$lib/server/db/mysql";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { consultationRequestID } = data;

    if (!consultationRequestID) {
        return new Response(JSON.stringify({error: "missing consultation request ID"}), {status: 422});
    };

    let res = await mysqlConnection();

    // get the consultation data

    const consultationQuery = `SELECT * FROM consult_requests_client WHERE request_ID = ${consultationRequestID}`;
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
    res.end();

    return new Response(
        JSON.stringify({...consultationRow}), {status: 200}
    );
}