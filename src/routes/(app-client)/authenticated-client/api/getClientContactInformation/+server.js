import { mysqlConnection } from "$lib/server/db/mysql";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { clientEmail } = data;

    const selectClientContactQuery = `SELECT 
            clients.user_ID, 
            clients.email, 
            clients.name_first, 
            clients.name_last,
            client_information.*
        FROM clients
        INNER JOIN client_information
        ON client_information.client_ID = clients.user_ID
        WHERE clients.email = "${clientEmail}"
    `;
    
    let res = await mysqlConnection();

    let clientContactRow;

    await res.query(selectClientContactQuery)
    .then(([rows]) => {
        clientContactRow = JSON.parse(JSON.stringify(rows))[0];
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(
        JSON.stringify(clientContactRow), {status: 200}
    );
}