import { mysqlConnection } from "$lib/server/db/mysql";
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARYCLOUDNAME } from "$env/static/private";
import { CLOUDINARYSECRETKEY } from "$env/static/private";
import { CLOUDINARYAPIKEY } from "$env/static/private";

cloudinary.config({ 
  cloud_name: CLOUDINARYCLOUDNAME, 
  api_key: CLOUDINARYAPIKEY, 
  api_secret: CLOUDINARYSECRETKEY
});

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    let {clientEmail, imageFileInputValue, image, public_ID, image_ID, clientID} = data;

    if (!clientEmail || !imageFileInputValue || !image || !clientID) {
        return new Response(JSON.stringify({error: "missing image upload information"}), {status: 422});
    };

    // upload image to Cloudinary

    let uploadedImageURL = "";
    let uploadedImagePublicID = "";

    let addImageID = false;

    // handle if local image file selected and profile image already exists

    if (imageFileInputValue && image_ID && public_ID) {

        if (image.size >  2000000) {
            return new Response(JSON.stringify({error: "image file cannot exceed 2MB"}), {status: 422});
        };

        // delete the image associated with the action from Cloudinary 
        try {
            await cloudinary.uploader.destroy(public_ID);
        } catch(error) {
            console.log(error);
            return new Response(JSON.stringify({error: "problem with deleting image from Cloudinary"}), {status: 500});
        };

        // upload a new image to cloudinary 
        try {
            const uploadImageResponse = await cloudinary.uploader.upload(image, {
                folder: "profile_images_clients",
                resource_type: "image"
            });
            uploadedImageURL = uploadImageResponse.secure_url;
            uploadedImagePublicID = uploadImageResponse.public_id;
        } catch (err) {
            console.log(err);
            return new Response(JSON.stringify({error: "problem with the image upload to Cloudinary"}), {status: 500});
        };

        // save the image data in the image_collection table

        const updateImageStatement = `UPDATE image_collection
            SET
                client_ID = "${clientID}", 
                image_URL = "${uploadedImageURL}",
                public_ID = "${uploadedImagePublicID}"
            WHERE image_ID = "${image_ID}"
        `;

        let res = await mysqlConnection()

        await res.query(updateImageStatement)
        .then(() => {
            console.log("updated image row");
        })
        .catch(error => {
            throw error;
        })

        res.end();

        return new Response(JSON.stringify({success: "succssfully uploaded profile image replacement"}), {status: 200});

    } else if (imageFileInputValue && !image_ID && !public_ID) {
        // handle if user is adding image to replace default project image

        if (image.size > 2000000) {
            return new Response(JSON.stringify({error: "image file cannot exceed 2MB"}), {status: 422});
        };

        try {
            const uploadImageResponse = await cloudinary.uploader.upload(image, {
                folder: "profile_images_clients",
                resource_type: "image"
            });
            uploadedImageURL = uploadImageResponse.secure_url;
            uploadedImagePublicID = uploadImageResponse.public_id;

        } catch (err) {
            console.log(err);
            return new Response(JSON.stringify({error: "problem with the image upload to Cloudinary"}), {status: 500});
        }

        const insertImageStatement = `INSERT INTO image_collection (
            client_ID,
            image_URL,
            public_ID
        ) VALUES (
            ${clientID},
            "${uploadedImageURL}",
            "${uploadedImagePublicID}"
        )`;

        let res = await mysqlConnection();
    
        await res.query(insertImageStatement)
        .then(([ rows ]) => {
            const rowsJSON = JSON.parse(JSON.stringify(rows));
            image_ID = rowsJSON.insertId;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });

        // save the image_ID as profile_image_ID in client_information

        const updateClientInformationWithImageIDStatement = `UPDATE client_information 
            SET profile_image_ID = ${image_ID}
            WHERE client_ID = ${clientID}
        `;

        await res.query(updateClientInformationWithImageIDStatement)
        .then(() => {
            console.log("image ID added to client profile");
        })
        .catch(error => {
            console.log(error);
            throw error;
        });

        res.end();
        
        addImageID = true;

        return new Response(JSON.stringify({success: "successfully uploaded profile image"}), {status: 200});

    };
}
