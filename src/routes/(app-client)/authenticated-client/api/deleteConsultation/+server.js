import { mysqlConnection } from "$lib/server/db/mysql";

export const DELETE = async ({request}) => {

    if (request.method !== 'DELETE') {
        return new Response(JSON.stringify({error: "method is not DELETE"}), {status: 422});
    };

    const data = await request.json();

    const consultationID = data.consultation.request_ID;

    if (
        !consultationID
    ) {
        return new Response(JSON.stringify({error: "missing consultation ID!"}), {status: 422});
    };

    // connect to the database

    let res = await mysqlConnection();

    // delete the project from consult_requests_client

    const deleteConsultationStatement =  `DELETE FROM consult_requests_client
        WHERE request_ID = ${consultationID}
    `;
    await res.query(deleteConsultationStatement)
    .then(() => {
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(JSON.stringify({success: `deleted consultation request ${consultationID}!`}), {status: 200});

};