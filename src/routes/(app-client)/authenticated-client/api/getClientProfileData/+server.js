import { mysqlConnection } from "$lib/server/db/mysql";

// @ts-ignore
export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { clientEmail } = data;

    // get the client profile data from clients and client_information tables

    /**
     * @type {ClientProfile}
     */
    let clientProfile;

    const selectClientProfileQuery = `SELECT 
            clients.user_ID, 
            clients.name_first, 
            clients.name_last, 
            clients.email, 
            clients.date_created, 
            clients.last_login,
            client_information.client_information_ID, 
            client_information.company, 
            client_information.phone_number, 
            client_information.URL, 
            client_information.street_address, 
            client_information.street_address_02, 
            client_information.city, 
            client_information.state, 
            client_information.zip_code, 
            client_information.Stripe_customer_ID, 
            client_information.profile_image_ID,
            client_information.country
        FROM clients
            INNER JOIN client_information ON clients.user_ID = client_information.client_ID
        WHERE clients.email = "${clientEmail}"
    `;
    
    let res = await mysqlConnection();

    let clientProfileImageID;

    await res.query(selectClientProfileQuery)
    .then(([rows]) => {
        clientProfile = JSON.parse(JSON.stringify(rows))[0];
        clientProfileImageID = JSON.parse(JSON.stringify(rows))[0].profile_image_ID;
    })
    .catch(error => {
        throw error;
    });


    // get the client profile image from the image_collection if any

    const selectClientProfileImageData = `SELECT image_ID, client_ID, image_URL, alt_text, public_ID
        FROM image_collection
        WHERE image_ID = ${clientProfileImageID}
    `;

    let Stripe_customer_ID;

    await res.query(selectClientProfileImageData)
    .then(([rows]) => {
        const response = JSON.parse(JSON.stringify(rows))[0];
        clientProfile = {...clientProfile, ...response};
        Stripe_customer_ID = clientProfile.Stripe_customer_ID;
    })
    .catch(error => {
        throw error;
    });

    if (!Stripe_customer_ID) {
        return new Response(JSON.stringify({error: "client is missing Stripe customer ID"}), {status: 422});
    };

    return new Response(
        // @ts-ignore
        JSON.stringify(clientProfile), {status: 200}
    );
}