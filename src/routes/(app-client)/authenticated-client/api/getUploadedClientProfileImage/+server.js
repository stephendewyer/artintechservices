import { mysqlConnection } from "$lib/server/db/mysql";

// @ts-ignore
export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { clientEmail } = data;

    // get the client profile data from clients and client_information tables

    let profileImage;

    const selectClientProfileImageQuery = `SELECT 
            image_collection.image_ID,
            image_collection.image_URL,
            image_collection.public_ID
        FROM image_collection
        INNER JOIN client_information ON image_collection.image_ID = client_information.profile_image_ID
        INNER JOIN clients ON client_information.client_ID = clients.user_ID
        WHERE clients.email = "${clientEmail}"
    `;
    
    let res = await mysqlConnection();

    let clientProfileImageID;
    let clientProfileImageURL;
    let clientProfilePublicID;

    await res.query(selectClientProfileImageQuery)
    .then(([rows]) => {
        profileImage = JSON.parse(JSON.stringify(rows))[0];
        clientProfileImageID = profileImage.image_ID;
        clientProfileImageURL = profileImage.image_URL;
        clientProfilePublicID = profileImage.public_ID;
    })
    .catch(error => {
        throw error;
    });

    res.end();

    return new Response(
        // @ts-ignore
        JSON.stringify({
            client_profile_image_ID: clientProfileImageID, 
            client_profile_image_URL: clientProfileImageURL,
            client_profile_image_public_ID: clientProfilePublicID
        }), {status: 200}
    );
}