import { mysqlConnection } from "$lib/server/db/mysql";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { clientEmail } = data;    

    const selectClientID = `SELECT user_ID 
        FROM clients 
        WHERE email = "${clientEmail}"
    `;

    let clientID = "";

    const res = await mysqlConnection();

    await res.query(selectClientID)
    .then(([rows]) => {
        clientID = JSON.parse(JSON.stringify(rows))[0].user_ID;
    })
    .catch(error => {
        throw error;
    });

    // get the start_project_requests_client row and corresponding images and documents

    let projects;

    const selectClientProjectsStatement = `SELECT 
            start_project_requests_client.*,
            image_collection.image_ID,
            image_collection.image_URL,
            image_collection.alt_text AS image_alt_text,
            image_collection.timestamp AS image_timestamp,
            image_collection.public_ID AS image_public_ID,
            documents_collection.document_ID,
            documents_collection.timestamp AS document_timestamp,
            documents_collection.public_ID AS document_public_ID
        FROM start_project_requests_client
            LEFT JOIN image_collection ON start_project_requests_client.image_ID = image_collection.image_ID
            LEFT JOIN documents_collection ON start_project_requests_client.document_ID = documents_collection.document_ID
        WHERE start_project_requests_client.client_ID = ${clientID};
    `;

    await res.query(selectClientProjectsStatement)
    .then(([rows]) => {
        projects = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(
        JSON.stringify(projects), {status: 200}
    );
}