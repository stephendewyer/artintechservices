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

export const DELETE = async ({request}) => {

    if (request.method !== 'DELETE') {

        return new Response(JSON.stringify({error: "method is not DELETE"}), {status: 422});

    };

    const data = await request.json();

    const messageID = data.message.message_ID;
    const messageImageID = data.message.image_attachment_ID;
    const messageDocumentID = data.message.document_attachment_ID;
    const messageImagePublicID = data.message.image_attachment_public_ID;
    const messageDocumentPublicID = data.message.document_attachment_public_ID;

    if (
        !messageID
    ) {
        return new Response(JSON.stringify({error: "missing message ID!"}), {status: 422});
    };

    // // connect to the database

    let res = await mysqlConnection();

    // delete the message from messages

    const deleteProjectStatement =  `DELETE FROM messages
        WHERE message_ID = ${messageID}
    `;
    await res.query(deleteProjectStatement)
        .then(() => {
    })
    .catch(error => {
        throw error;
    });

    if (messageImageID) {

        if (messageImagePublicID) {
            try {
                await cloudinary.uploader.destroy(messageImagePublicID, {});
            } catch (err) {
                console.log(err);
                return new Response(JSON.stringify({error: "problem with deleting image from Cloudinary"}), {status: 500});
            };
        };        

        const deleteImageRowStatement = `DELETE FROM image_collection
            WHERE image_ID = ${messageImageID}
        `;

        await res.query(deleteImageRowStatement)
        .then(() => {
        })
        .catch(error => {
            throw error;
        });
    };

    if (messageDocumentID) {

        if (messageDocumentPublicID) {
            try {
                await cloudinary.uploader.destroy(messageDocumentPublicID, {});
            } catch (err) {
                console.log(err);
                return new Response(JSON.stringify({error: "problem with deleting document from Cloudinary"}), {status: 500});
            };
        };        

        const deleteDocumentRowStatement = `DELETE FROM documents_collection
            WHERE document_ID = ${messageDocumentID}
        `;
        await res.query(deleteDocumentRowStatement)
        .then(() => {
        })
        .catch(error => {
            throw error;
        });
    };

    res.end();

    return new Response(JSON.stringify({success: `deleted message ${messageID}!`}), {status: 200});

};