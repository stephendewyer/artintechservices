import { mysqlConnection } from "$lib/server/db/mysql";

export const PATCH = async ({request}) => {

    if (request.method !== "PATCH") {
        return new Response(JSON.stringify({error: "method is not PATCH"}), {status: 422});
    };

    const data = await request.json();

    const { email, userGroup } = data;
    
    if (!email) {
        return new Response(JSON.stringify({error: "missing valid session email"}), {status: 422});
    } else if (!userGroup) {
        return new Response(JSON.stringify({error: "missing valid session user group"}), {status: 422});
    } else if (userGroup !== "administrator") {
        return new Response(JSON.stringify({error: "invalid session user group"}), {status: 422});
    };

    // search administrator for administrator account with email that matches the user

    let res = await mysqlConnection();

    /**
     * @type {string | any[]}
     */
    let administratorRows = [];

    const checkAdministratorEmailQuery = `SELECT * FROM administrators WHERE email = '${email}'`;

    await res.query(checkAdministratorEmailQuery)
    .then(([ rows ]) => {
        administratorRows = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    if (administratorRows?.length > 0) {
        // update login date and time to client last_login
        const updatePreviousLoginTimestamp = `UPDATE administrators 
            SET previous_login = now()
            WHERE email = "${email}"
        `;

        await res.query(updatePreviousLoginTimestamp)
        .then(() => {
            console.log("administrator previous login updated!");
        })
        .catch(error => {
            throw error;
        });
    };

    res.end();

    return new Response(JSON.stringify({success: "administrator previous login updated!"}), {status: 200});

}