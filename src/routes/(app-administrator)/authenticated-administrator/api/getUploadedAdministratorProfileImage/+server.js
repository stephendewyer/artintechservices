import { mysqlConnection } from "$lib/server/db/mysql";

// @ts-ignore
export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { administratorEmail } = data;

    // get the administrator profile data from administrators and administrator_information tables

    let profileImage;

    const selectAdministratorProfileImageQuery = `SELECT 
            image_collection.image_ID,
            image_collection.image_URL,
            image_collection.public_ID
        FROM image_collection
        INNER JOIN administrator_information ON image_collection.image_ID = administrator_information.profile_image_ID
        INNER JOIN administrators ON administrator_information.admin_ID = administrators.ID
        WHERE administrators.email = "${administratorEmail}"
    `;
    
    let res = await mysqlConnection();

    let administratorProfileImageID;
    let administratorProfileImageURL;
    let administratorProfilePublicID;

    await res.query(selectAdministratorProfileImageQuery)
    .then(([rows]) => {
        profileImage = JSON.parse(JSON.stringify(rows))[0];
        administratorProfileImageID = profileImage.image_ID;
        administratorProfileImageURL = profileImage.image_URL;
        administratorProfilePublicID = profileImage.public_ID;
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(
        // @ts-ignore
        JSON.stringify({
            administrator_profile_image_ID: administratorProfileImageID, 
            administrator_profile_image_URL: administratorProfileImageURL,
            administrator_profile_image_public_ID: administratorProfilePublicID
        }), {status: 200}
    );
}