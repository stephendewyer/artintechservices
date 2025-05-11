import { mysqlConnection } from "$lib/server/db/mysql";
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARYCLOUDNAME } from "$env/static/private";
import { CLOUDINARYSECRETKEY } from "$env/static/private";
import { CLOUDINARYAPIKEY } from "$env/static/private";
import { htmlEntities } from "$lib/util/htmlEntities.js";

cloudinary.config({ 
  cloud_name: CLOUDINARYCLOUDNAME, 
  api_key: CLOUDINARYAPIKEY, 
  api_secret: CLOUDINARYSECRETKEY
});

export async function POST({request}) {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const messageID = data.messageID;
    const sessionEmail = data.sessionEmail;
    const contact = data.contact;
    const subjectInputValue = data.subjectInputValue;
    const messageInputValue = data.messageInputValue;
    const imageFile = data.image;
    let imageID = data.imageID;
    const imagePublicID = data.imagePublicID;
    const imageFileInputValue = data.imageFileInputValue;
    const deleteImage = data.deleteImage;
    const documentFile = data.document;
    let documentID = data.documentID;
    const documentPublicID = data.documentPublicID;
    const documentFileInputValue = data.documentFileInputValue;
    const deleteDocument = data.deleteDocument;

    if (!sessionEmail || !contact || !subjectInputValue || !messageInputValue) {
        return new Response(JSON.stringify({error: "missing required form information"}), {status: 422});
    };

    let clientID;

    const selectClientQuery = `SELECT user_ID
        FROM clients
        WHERE email = "${sessionEmail}"`;
    
    let res = await mysqlConnection();

    await res.query(selectClientQuery)
    .then(([rows]) => {
        clientID = JSON.parse(JSON.stringify(rows))[0].user_ID;
    })
    .catch(error => {
        throw error;
    });

    // upload image to Cloudinary

    let uploadedImageURL = "";
    let uploadedImagePublicID = "";

    let addImageID = false;

    // handle if local image file selected and message image already exists
    if (imageFileInputValue && imageID && imagePublicID) {

        if (imageFile.size >  2000000) {
            return new Response(JSON.stringify({error: "image file cannot exceed 2MB"}), {status: 422});
        };

        // delete the image associated with the action from Cloudinary 
        try {
            await cloudinary.uploader.destroy(imagePublicID);
        } catch(error) {
            console.log(error);
            return new Response(JSON.stringify({error: "problem with deleting image from Cloudinary"}), {status: 500});
        };

        // upload a new image to cloudinary 
        try {
            const uploadImageResponse = await cloudinary.uploader.upload(imageFile, {
                folder: "messages",
                resource_type: "image"
            });
            uploadedImageURL = uploadImageResponse.secure_url;
            uploadedImagePublicID = uploadImageResponse.public_id;

        } catch (err) {
            console.log(err);
            return new Response(JSON.stringify({error: "problem with the image upload to Cloudinary"}), {status: 500});
        };

        // save the image data in the database

        const updateImageStatement = `UPDATE image_collection
            SET
                client_ID = ${clientID}, 
                image_URL = "${uploadedImageURL}",
                public_ID = "${uploadedImagePublicID}"
            WHERE image_ID = ${imageID}
        `;

        await res.query(updateImageStatement)
        .then(() => {
            console.log("updated image row");
        })
        .catch(error => {
            throw error;
        });

    } else if (imageFileInputValue && !imageID && !imagePublicID) {
        // handle if user is adding image for first time in message

        if (imageFile.size > 2000000) {
            return new Response(JSON.stringify({error: "image file cannot exceed 2MB"}), {status: 422});
        };

        try {
            const uploadImageResponse = await cloudinary.uploader.upload(imageFile, {
                folder: "messages",
                resource_type: "image"
            });
            uploadedImageURL = uploadImageResponse.secure_url;
            uploadedImagePublicID = uploadImageResponse.public_id;

        } catch (err) {
            console.log(err);
            return new Response(JSON.stringify({error: "problem with the image upload to Cloudinary"}), {status: 500});
        };

        const insertImageStatement = `INSERT INTO image_collection (
            client_ID,
            image_URL,
            public_ID
        ) VALUES (
            ${clientID},
            "${uploadedImageURL}",
            "${uploadedImagePublicID}"
        )`;
    
        await res.query(insertImageStatement)
        .then(([ rows ]) => {
            const rowsJSON = JSON.parse(JSON.stringify(rows));
            imageID = rowsJSON.insertId;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
        
        addImageID = true;
    } else if (deleteImage && imageID && imagePublicID && !imageFileInputValue) {
        // handle if user is deleting image they uploaded

        // destroy the image in Cloudinary
        try {
            await cloudinary.uploader.destroy(imagePublicID);
        } catch(error) {
            console.log(error);
            return new Response(JSON.stringify({error: "problem with deleting image from Cloudinary"}), {status: 500});
        };

        // delete the image foreign key from messages row using message_ID

        const deleteImageIDFromMessageRow = `UPDATE messages SET image_ID = NULL WHERE message_ID=${messageID}`;

        await res.query(deleteImageIDFromMessageRow)
        .then(() => {
            console.log("image ID deleted from message row");
        })
        .catch(error => {
            throw error;
        });

        // delete the image row

        const deleteImageRow = `DELETE FROM image_collection WHERE image_ID=${imageID}`;

        await res.query(deleteImageRow)
        .then(() => {
            console.log("deleted image row");
        })
        .catch(error => {
            throw error;
        });
    };

    // upload PDF to Cloudinary if any

    let uploadedDocumentURL = "";

    let uploadedDocumentPublicID = "";

    let addDocumentID = false;

    if (documentID && documentFileInputValue && documentPublicID) {
        // handle adding a document to the message where document is already saved

        if (documentFile.size >  2000000) {
            return new Response(JSON.stringify({error: "document file cannot exceed 2MB"}), {status: 422});
        };

        // delete the document associated with the action from Cloudinary 
        try {
            await cloudinary.uploader.destroy(documentPublicID);
        } catch(error) {
            console.log(error);
            return new Response(JSON.stringify({error: "problem with deleting image from Cloudinary"}), {status: 500});
        };

        // upload a new document to cloudinary 
        try {
            const uploadDocumentResponse = await cloudinary.uploader.upload(documentFile, {
                folder: "messages",
                resource_type: "auto"
            });
            uploadedDocumentURL = uploadDocumentResponse.secure_url;
            uploadedDocumentPublicID = uploadDocumentResponse.public_id;
        } catch (err) {
            console.log(err);
            return new Response(JSON.stringify({error: "problem with the document upload to Cloudinary"}), {status: 500});
        };

        const updateDocumentStatement = `UPDATE documents_collection
            SET
                client_ID = "${clientID}", 
                document_URL = "${uploadedDocumentURL}",
                public_ID = "${uploadedDocumentPublicID}"
            WHERE document_ID = "${documentID}"
        `;

        await res.query(updateDocumentStatement)
        .then(() => {
            console.log("updated document row");
        })
        .catch(error => {
            throw error;
        });

    } else if (!documentID && !documentPublicID && documentFileInputValue) {
        // handle if no document exists for project and user is adding a project

        if (documentFile.size >  2000000) {
            return new Response(JSON.stringify({error: "document file cannot exceed 2MB"}), {status: 422});
        };

        try {
            const uploadDocumentResponse = await cloudinary.uploader.upload(documentFile, {
                folder: "messages",
                resource_type: "auto"
            });
            uploadedDocumentURL = uploadDocumentResponse.secure_url;
            uploadedDocumentPublicID = uploadDocumentResponse.public_id;
        } catch (err) {
            console.log(err);
            return new Response(JSON.stringify({error: "problem with the document upload to Cloudinary"}), {status: 500});
        };

        const insertDocumentStatement = `INSERT INTO documents_collection (
            client_ID,
            document_URL,
            public_ID
        ) VALUES (
            ${clientID},
            "${uploadedDocumentURL}",
            "${uploadedDocumentPublicID}"
        )`;

        await res.query(insertDocumentStatement)
        .then(([ rows ]) => {
            const rowsJSON = JSON.parse(JSON.stringify(rows));
            documentID = rowsJSON.insertId;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });

        addDocumentID = true;

    } else if (documentID && deleteDocument && !documentFileInputValue && documentPublicID) {
        // handle if delete a document that already exists

        // delete the document associated with the action from Cloudinary 
        try {
            await cloudinary.uploader.destroy(documentPublicID);
        } catch(error) {
            console.log(error);
            return new Response(JSON.stringify({error: "problem with deleting document from Cloudinary"}), {status: 500});
        }

        // delete the document foreign key from messages row using message_ID

        const deleteDocumentIDFromMessagesRow = `UPDATE messages SET document_ID = NULL WHERE message_ID=${messageID}`;

        await res.query(deleteDocumentIDFromMessagesRow)
        .then(() => {
            console.log("document ID deleted from messsage row");
        })
        .catch(error => {
            throw error;
        })

        // delete the document row

        const deleteDocumentRow = `DELETE FROM documents_collection WHERE document_ID=${documentID}`;

        await res.query(deleteDocumentRow)
        .then(() => {
            console.log("deleted document row");
        })
        .catch(error => {
            throw error;
        });

    };

    // if no message_ID, insert into messages

    if (!messageID) {

        const insertMessageStatement = `INSERT INTO messages (
            client_sender_ID,
            administrator_recipient_ID,
            sender_role,
            receiver_role,
            date_sent,
            subject,
            body,
            document_attachment_ID,
            image_attachment_ID,
            status
        ) VALUES (
            ${clientID},
            ${contact.ID},
            "client",
            "${contact.role}",
            "${Date.now()}",
            "${htmlEntities(subjectInputValue)}",
            "${htmlEntities(messageInputValue)}",
            ${documentID},
            ${imageID},
            "saved"
        )`;

        await res.query(insertMessageStatement)
        .then(() => {
            console.log(`message saved in the database`)
        })
        .catch(error => {
            console.log(error);
            throw error;
        });

    } else if (messageID) {
        let updateMessageStatement = "";

        if (addDocumentID && addImageID) {
            updateMessageStatement = `UPDATE messages 
                SET
                    client_sender_ID=${clientID},
                    administrator_recipient_ID=${contact.ID},
                    sender_role="client",
                    receiver_role="${contact.role}",
                    date_sent="${Date.now()}",
                    subject="${htmlEntities(subjectInputValue)}",
                    body="${htmlEntities(messageInputValue)}",
                    document_attachment_ID=${documentID},
                    image_attachment_ID=${imageID},
                    status="saved"
                WHERE
                    message_ID = ${messageID};
            `;
        } else if (addDocumentID && !addImageID) {
            updateMessageStatement = `UPDATE messages 
                SET
                    client_sender_ID=${clientID},
                    administrator_recipient_ID=${contact.ID},
                    sender_role="client",
                    receiver_role="${contact.role}",
                    date_sent="${Date.now()}",
                    subject="${htmlEntities(subjectInputValue)}",
                    body="${htmlEntities(messageInputValue)}",
                    document_attachment_ID=${documentID},
                    status="saved"
                WHERE
                    message_ID = ${messageID};
            `;
        } else if (!addDocumentID && addImageID) {
            updateMessageStatement = `UPDATE messages 
                SET
                    client_sender_ID=${clientID},
                    administrator_recipient_ID=${contact.ID},
                    sender_role="client",
                    receiver_role="${contact.role}",
                    date_sent="${Date.now()}",
                    subject="${htmlEntities(subjectInputValue)}",
                    body="${htmlEntities(messageInputValue)}",
                    image_attachment_ID=${imageID},
                    status="saved"
                WHERE
                    message_ID = ${messageID};
            `;
        } else if (!addDocumentID && !addImageID) {
            updateMessageStatement = `UPDATE messages 
                SET
                    client_sender_ID=${clientID},
                    administrator_recipient_ID=${contact.ID},
                    sender_role="client",
                    receiver_role="${contact.role}",
                    date_sent="${Date.now()}",
                    subject="${htmlEntities(subjectInputValue)}",
                    body="${htmlEntities(messageInputValue)}",
                    status="saved"
                WHERE
                    message_ID = ${messageID};
            `;
        };

        await res.query(updateMessageStatement)
        .then(() => {
            console.log(`message saved`)
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
    };

    res.end();

    return new Response(JSON.stringify({success: `message saved!`}), {status: 200});

}