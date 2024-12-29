import { mysqlConnection } from "$lib/server/db/mysql";

export const GET = async ({request}) => {

    if (request.method !== "GET") {
        return new Response(JSON.stringify({error: "method is not GET"}), {status: 422});
    };

    const selectConsultationsQuery = `SELECT 
            consult_requests_client.*,
            clients.name_first,
            clients.name_last,
            clients.email,
            client_information.phone_number,
            image_collection.alt_text,
            image_collection.image_URL,
            image_collection.public_ID
        FROM clients
        LEFT JOIN consult_requests_client
        ON consult_requests_client.client_ID = clients.user_ID
        LEFT JOIN client_information
        ON client_information.client_ID = clients.user_ID
        LEFT JOIN image_collection
        ON image_collection.image_ID = client_information.profile_image_ID
    `;
    
    let res = await mysqlConnection();

    /**
     * @type {any[]}
     */
    let clientConsultationsRow = [];

    await res.query(selectConsultationsQuery)
    .then(([rows]) => {
        clientConsultationsRow = [...clientConsultationsRow, ...JSON.parse(JSON.stringify(rows))];
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(
        JSON.stringify(clientConsultationsRow), {status: 200}
    );
}
