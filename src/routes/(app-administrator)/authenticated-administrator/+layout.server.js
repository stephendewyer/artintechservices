import { mysqlConnection } from "$lib/server/db/mysql";

export const load = async (event) => {

  const session = await event.locals.auth();

  const administratorEmail = session?.user?.email;

  const selectAdministratorProfileImageQuery = `SELECT 
            image_collection.image_URL,
            image_collection.image_ID
        FROM image_collection
        INNER JOIN administrator_information ON administrator_information.profile_image_ID = image_collection.image_ID
        INNER JOIN administrators ON administrators.ID = administrator_information.admin_ID
        WHERE administrators.email = "${administratorEmail}"
    `;
    
    let res = await mysqlConnection();

    let administratorProfileImageID;
    let administratorProfileImageURL;

    await res.query(selectAdministratorProfileImageQuery)
    .then(([rows]) => {
      if (JSON.parse(JSON.stringify(rows)).length > 0) {
        administratorProfileImageID = JSON.parse(JSON.stringify(rows))[0].image_ID ? JSON.parse(JSON.stringify(rows))[0].image_ID : null;
        administratorProfileImageURL = JSON.parse(JSON.stringify(rows))[0].image_URL ? JSON.parse(JSON.stringify(rows))[0].image_URL : "";
      };
        
    })
    .catch(error => {
        throw error;
    });

  // get the profile image if any
  return {
    streamed: {
      user: session?.user,
      administrator_profile_image_ID: administratorProfileImageID,
      administrator_profile_image_URL: administratorProfileImageURL
    }
  };
};