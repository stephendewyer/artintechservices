import { mysqlConnection } from "$lib/server/db/mysql";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { clientEmail } = data;

    const selectClientConsultationsStatement = `SELECT consult_requests_client.* 
        FROM consult_requests_client
        INNER JOIN clients
        ON consult_requests_client.client_ID = clients.user_ID
        WHERE clients.email = "${clientEmail}"
    `;

    let consultations;

    let res = await mysqlConnection();

    await res.query(selectClientConsultationsStatement)
    .then(([rows]) => {
        consultations = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(
        JSON.stringify(consultations), {status: 200}
    );
}