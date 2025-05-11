import { mysqlConnection } from "$lib/server/db/mysql";

export const GET = async ({request}) => {

    if (request.method !== "GET") {
        return new Response(JSON.stringify({error: "method is not GET"}), {status: 422});
    };

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
        INNER JOIN image_collection ON image_collection.admin_ID = administrator_information.admin_ID;
    `;

    /**
     * @type {Contact[]}
     */
    let administrators = [];

    let res = await mysqlConnection();

    await res.query(selectAdministratorsContactInfo)
    .then(([rows]) => {
        administrators = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    res.end();
    /**
     * @type {Contact[]}
     */
    let administratorsContactInfo = [];

    administrators.forEach(admin => {
        administratorsContactInfo = [...administratorsContactInfo, {...admin, role: "administrator"}]
    });

    return new Response(
        JSON.stringify(administratorsContactInfo), {status: 200}
    );
}