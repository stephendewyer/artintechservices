import { mysqlConnection } from "$lib/server/db/mysql";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { clientEmail } = data;

    let clientID;

    let client;

    const selectClientQuery = `SELECT user_ID, email, name_first, name_last, date_created
        FROM clients
        WHERE email = "${clientEmail}"`;
    
    let res = await mysqlConnection();

    await res.query(selectClientQuery)
    .then(([rows]) => {
        client = JSON.parse(JSON.stringify(rows))[0];
        clientID = JSON.parse(JSON.stringify(rows))[0].user_ID;
    })
    .catch(error => {
        throw error;
    });

    // get the client_information row

    const selectClientInformationRowStatement = `SELECT * 
        FROM client_information
        WHERE client_ID = ${clientID};
    `;

    let clientInformationRow;

    await res.query(selectClientInformationRowStatement)
    .then(([rows]) => {
        clientInformationRow = JSON.parse(JSON.stringify(rows))[0];
    })
    .catch(error => {
        throw error;
    });
    
    // @ts-ignore
    const clientDetails = {
        client: client,
        contact_information: clientInformationRow
    };

    return new Response(
        JSON.stringify({...clientDetails}), {status: 200}
    );
}