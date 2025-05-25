import { mysqlConnection } from "$lib/server/db/mysql";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const sessionEmail = data.sessionEmail;

    // get the user_ID from clients

    const selectClientMessages = `SELECT 
            messages.*,
            image_collection.image_URL AS image_attachment_URL,
            image_collection.public_ID AS image_attachment_public_ID,
            documents_collection.document_URL AS document_attachment_URL,
            documents_collection.public_ID AS document_attachment_public_ID
        FROM messages 
            LEFT JOIN clients ON messages.client_sender_ID = clients.user_ID OR messages.client_recipient_ID = clients.user_ID
            LEFT JOIN image_collection ON messages.image_attachment_ID = image_collection.image_ID 
            LEFT JOIN documents_collection ON messages.document_attachment_ID = documents_collection.document_ID
        WHERE clients.email = "${sessionEmail}";
    `;

    /**
     * @type {Message[]}
     */
    let clientMessages = [];

    const res = await mysqlConnection();

    await res.query(selectClientMessages)
    .then(([rows]) => {
        clientMessages = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    const selectAdministratorsContactInfo = `SELECT 
            administrators.ID, administrators.email, 
            administrator_information.name_first, 
            administrator_information.name_last, 
            administrator_information.city,
            administrator_information.state,
            administrator_information.profile_image_ID,
            image_collection.image_URL,
            image_collection.public_ID
        FROM administrator_information
        INNER JOIN administrators
            ON administrator_information.admin_ID = administrators.ID
        INNER JOIN image_collection 
            ON image_collection.admin_ID = administrator_information.admin_ID
        INNER JOIN messages
            ON messages.administrator_sender_ID = administrators.ID OR messages.administrator_recipient_ID = administrators.ID
        INNER JOIN clients 
            ON messages.client_sender_ID = clients.user_ID OR messages.client_recipient_ID = clients.user_ID
        WHERE clients.email = "${sessionEmail}";
    `;

    /**
     * @type {Contact[]}
     */
    let administrators = [];

    await res.query(selectAdministratorsContactInfo)
    .then(([rows]) => {
        administrators = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    const messagesWithContacts = clientMessages.map((message) => {
        let messageWithContact;
        if (administrators.length > 0) {
            administrators.forEach((administrator) => {
                if (administrator.ID === message.administrator_recipient_ID || administrator.ID === message.administrator_sender_ID) {
                    messageWithContact = {...message, contact: {...administrator, role: "administrator"}}
                };
            });
        };
        return messageWithContact;
    });

    res.end();

    return new Response(
        JSON.stringify(messagesWithContacts), {status: 200}
    );
}