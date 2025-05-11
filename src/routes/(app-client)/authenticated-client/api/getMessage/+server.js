import { mysqlConnection } from "$lib/server/db/mysql";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const sessionEmail = data.sessionEmail;

    const messageID = data.messageID;

    const selectClientID = `SELECT 
            messages.*,
            image_collection.image_URL AS image_attachment_URL,
            image_collection.public_ID AS image_attachment_public_ID,
            documents_collection.document_URL AS document_attachment_URL,
            documents_collection.public_ID AS document_attachment_public_ID
        FROM messages 
            LEFT JOIN image_collection ON messages.image_attachment_ID = image_collection.image_ID
            LEFT JOIN documents_collection ON messages.document_attachment_ID = documents_collection.document_ID
        WHERE messages.message_ID = ${messageID};
    `;

    let savedMessage;

    const res = await mysqlConnection();

    await res.query(selectClientID)
    .then(([rows]) => {
        savedMessage = JSON.parse(JSON.stringify(rows))[0];
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(
        JSON.stringify(savedMessage), {status: 200}
    );
}