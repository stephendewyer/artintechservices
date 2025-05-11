import { mysqlConnection } from "$lib/server/db/mysql";

export async function PATCH({request}) {
    
    if (request.method !== 'PATCH') {
        return new Response(JSON.stringify({error: "method is not PATCH"}), {status: 422});
    };

    const data = await request.json();

    const messageID = data.messageID;

    const sessionEmail = data.sessionEmail;
    if (
        !messageID ||
        !sessionEmail
    ) {

        return new Response(JSON.stringify({error: "missing message_ID or sessionEMail"}), {status: 422});
        
    };

    let res = await mysqlConnection();

    // update the message to opened in the database

    const messageOpenedStatement = `UPDATE messages
    SET 
        opened = 1
    WHERE message_ID = ${messageID};`

    await res.query(messageOpenedStatement)
    .then(() => {
        console.log("message updated to opened!");
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(JSON.stringify({success: "message updated to opened!"}), {status: 200});

}