import { mysqlConnection } from "$lib/server/db/mysql";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { administratorEmail } = data;

    const selectAdministratorContactQuery = `SELECT 
            administrators.ID, 
            administrators.email, 
            administrators.username,
            administrator_information.*
        FROM administrators
        INNER JOIN administrator_information
        ON administrator_information.admin_ID = administrators.ID
        WHERE administrators.email = "${administratorEmail}"
    `;
    
    let res = await mysqlConnection();

    let administratorContactRow;

    await res.query(selectAdministratorContactQuery)
    .then(([rows]) => {
        administratorContactRow = JSON.parse(JSON.stringify(rows))[0];
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(
        JSON.stringify(administratorContactRow), {status: 200}
    );
}