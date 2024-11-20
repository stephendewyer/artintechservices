import { mysqlConnection } from "$lib/server/db/mysql";

// @ts-ignore
export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { administratorEmail } = data;

    // get the administrator profile data from administrators and administrator_information tables

    /**
     * @type {AdministratorProfile}
     */
    let administratorProfile;

    const selectAdministratorProfileQuery = `SELECT 
            administrators.ID, 
            administrators.username, 
            administrators.email, 
            administrators.date_created, 
            administrators.last_login,
            administrator_information.name_first,
            administrator_information.name_last,
            administrator_information.administrator_info_ID, 
            administrator_information.phone_number,  
            administrator_information.street_address, 
            administrator_information.street_address_02, 
            administrator_information.city, 
            administrator_information.state, 
            administrator_information.zip_code, 
            administrator_information.profile_image_ID,
            administrator_information.country
        FROM administrators
            INNER JOIN administrator_information ON administrators.ID = administrator_information.admin_ID
        WHERE administrators.email = "${administratorEmail}"
    `;
    
    let res = await mysqlConnection();

    let administratorProfileImageID;

    await res.query(selectAdministratorProfileQuery)
    .then(([rows]) => {
        administratorProfile = JSON.parse(JSON.stringify(rows))[0];
        administratorProfileImageID = JSON.parse(JSON.stringify(rows))[0].profile_image_ID;
    })
    .catch(error => {
        throw error;
    });


    // get the administrator profile image from the image_collection if any

    const selectAdministratorProfileImageData = `SELECT image_ID, admin_ID, image_URL, alt_text, public_ID
        FROM image_collection
        WHERE image_ID = ${administratorProfileImageID}
    `;

    await res.query(selectAdministratorProfileImageData)
    .then(([rows]) => {
        const response = JSON.parse(JSON.stringify(rows))[0];
        // const profile_image_ID = JSON.parse(JSON.stringify(rows))[0].image_ID;
        // const profile_image_public_ID = JSON.parse(JSON.stringify(rows))[0].public_ID;
        // const profile_image_URL = JSON.parse(JSON.stringify(rows))[0].image_URL;
        // const profile_image_alt_text = JSON.parse(JSON.stringify(rows))[0].alt_text;
        administratorProfile = {...administratorProfile, ...response};
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(
        // @ts-ignore
        JSON.stringify(administratorProfile), {status: 200}
    );
}