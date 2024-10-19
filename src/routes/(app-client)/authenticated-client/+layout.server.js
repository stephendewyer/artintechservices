import { mysqlConnection } from "$lib/server/db/mysql";

export const load = async (event) => {

  const session = await event.locals.auth();

  const clientEmail = session?.user?.email;

  const selectClientProfileImageQuery = `SELECT 
            image_collection.image_URL,
            image_collection.image_ID
        FROM image_collection
        INNER JOIN client_information ON client_information.profile_image_ID = image_collection.image_ID
        INNER JOIN clients ON clients.user_ID = client_information.client_ID
        WHERE clients.email = "${clientEmail}"
    `;
    
    let res = await mysqlConnection();

    let clientProfileImageID;
    let clientProfileImageURL;

    await res.query(selectClientProfileImageQuery)
    .then(([rows]) => {
      if (JSON.parse(JSON.stringify(rows)).length > 0) {
        clientProfileImageID = JSON.parse(JSON.stringify(rows))[0].image_ID ? JSON.parse(JSON.stringify(rows))[0].image_ID : null;
        clientProfileImageURL = JSON.parse(JSON.stringify(rows))[0].image_URL ? JSON.parse(JSON.stringify(rows))[0].image_URL : "";
      };
        
    })
    .catch(error => {
        throw error;
    });

    console.log(clientProfileImageURL);

  // get the profile image if any
  return {
    streamed: {
      user: session?.user,
      client_profile_image_ID: clientProfileImageID,
      client_profile_image_URL: clientProfileImageURL
    }
  };
};