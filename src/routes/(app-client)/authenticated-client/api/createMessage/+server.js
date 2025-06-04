import { mysqlConnection } from "$lib/server/db/mysql";
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARYCLOUDNAME } from "$env/static/private";
import { CLOUDINARYSECRETKEY } from "$env/static/private";
import { CLOUDINARYAPIKEY } from "$env/static/private";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';
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
    const messageStatus = data.messageStatus;
    const conversationID = data.conversationID;
    const replyToMessageID = data.replyToMessageID;
    const sessionEmail = data.sessionEmail;
    const contact = data.contact;
    const subjectInputValue = data.subjectInputValue;
    const messageInputValue = data.messageInputValue;
    const imageFileInputValue = data.imageFileInputValue;
    const image = data.image;
    const deleteImage = data.deleteImage;
    let imageID = data.imageID ? data.imageID : null;
    let imagePublicID = data.imagePublicID ? data.imagePublicID : "";
    const document = data.document;
    let documentID = data.documentID ? data.documentID : null;
    const documentFileInputValue = data.documentFileInputValue;
    let documentPublicID = data.documentPublicID ? data.documentPublicID : "";
    const deleteDocument = data.deleteDocument;

    if (!sessionEmail || !contact || !subjectInputValue || !messageInputValue) {
        return new Response(JSON.stringify({error: "missing required form information"}), {status: 422});
    }

    // get client data

    /**
     * @type {string}
     */
    let clientNameFirst = "";
    /**
     * @type {string}
     */
    let clientNameLast = "";
    /**
     * @type {string}
     */
    let senderRole = "client";
    /**
     * @type {number | null}
     */
    let clientID = null;
    /**
     * @type {string}
     */
    let receiverRole = "administrator";
    /**
     * @type {number| null}
     */
    let senderID;

    const selectClientQuery = `SELECT user_ID, name_first, name_last
        FROM clients
        WHERE email = "${sessionEmail}"`;
    
    let res = await mysqlConnection();

    await res.query(selectClientQuery)
    .then(([rows]) => {
        clientID = JSON.parse(JSON.stringify(rows))[0].user_ID;
        senderID = clientID;
        clientNameFirst = JSON.parse(JSON.stringify(rows))[0].name_first;
        clientNameLast = JSON.parse(JSON.stringify(rows))[0].name_last;
    })
    .catch(error => {
        throw error;
    });
    // upload image to Cloudinary
    /**
     * @type {string}
     */
    let uploadedImageURL;
    /**
     * @type {string}
     */
    let uploadedImagePublicID;    

    if (messageStatus === "saved") {
        // handle if sending saved message
        // upload image to Cloudinary if any
        /**
         * @type {string}
         */
        let uploadedImageURL = "";

        let addImageID = false;

        // handle if local image file selected and message image already exists
        if (imageFileInputValue && imageID && imagePublicID) {

            if (image.size >  2000000) {
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
                const uploadImageResponse = await cloudinary.uploader.upload(image, {
                    folder: "messages",
                    resource_type: "image"
                });
                uploadedImageURL = uploadImageResponse.secure_url;
                imagePublicID = uploadImageResponse.public_id;
            } catch (err) {
                console.log(err);
                return new Response(JSON.stringify({error: "problem with the image upload to Cloudinary"}), {status: 500});
            };

            // save the image data in the database

            const updateImageStatement = `UPDATE image_collection
                SET
                    client_ID = ${clientID}, 
                    image_URL = "${uploadedImageURL}",
                    public_ID = "${imagePublicID}"
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

            if (image.size > 2000000) {
                return new Response(JSON.stringify({error: "image file cannot exceed 2MB"}), {status: 422});
            };

            try {
                const uploadImageResponse = await cloudinary.uploader.upload(image, {
                    folder: "messages",
                    resource_type: "image"
                });
                uploadedImageURL = uploadImageResponse.secure_url;
                imagePublicID = uploadImageResponse.public_id;

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
                "${imagePublicID}"
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

            const deleteImageIDFromMessageRow = `UPDATE messages SET image_attachment_ID = NULL WHERE message_ID=${messageID}`;

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

        let addDocumentID = false;

        if (documentID && documentFileInputValue && documentPublicID) {
            // handle adding a document to the message where document is already saved

            if (document.size >  2000000) {
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
                const uploadDocumentResponse = await cloudinary.uploader.upload(document, {
                    folder: "messages",
                    resource_type: "auto"
                });
                uploadedDocumentURL = uploadDocumentResponse.secure_url;
                documentPublicID = uploadDocumentResponse.public_id;
            } catch (err) {
                console.log(err);
                return new Response(JSON.stringify({error: "problem with the document upload to Cloudinary"}), {status: 500});
            };

            const updateDocumentStatement = `UPDATE documents_collection
                SET
                    client_ID = "${clientID}", 
                    document_URL = "${uploadedDocumentURL}",
                    public_ID = "${documentPublicID}"
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

            if (document.size >  2000000) {
                return new Response(JSON.stringify({error: "document file cannot exceed 2MB"}), {status: 422});
            };

            try {
                const uploadDocumentResponse = await cloudinary.uploader.upload(document, {
                    folder: "messages",
                    resource_type: "auto"
                });
                uploadedDocumentURL = uploadDocumentResponse.secure_url;
                documentPublicID = uploadDocumentResponse.public_id;
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
                "${documentPublicID}"
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

            const deleteDocumentIDFromMessagesRow = `UPDATE messages SET document_attachment_ID = NULL WHERE message_ID=${messageID}`;

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
        let updateMessageStatement = "";

        if (addDocumentID && addImageID) {
            updateMessageStatement = `UPDATE messages 
                SET
                    client_sender_ID=${clientID},
                    administrator_recipient_ID=${contact.ID},
                    sender_role="client",
                    receiver_role="${contact.role}",
                    date_sent=NOW(),
                    subject="${htmlEntities(subjectInputValue)}",
                    body="${htmlEntities(messageInputValue)}",
                    document_attachment_ID=${documentID},
                    image_attachment_ID=${imageID},
                    status="sent"
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
                    date_sent=NOW(),
                    subject="${htmlEntities(subjectInputValue)}",
                    body="${htmlEntities(messageInputValue)}",
                    document_attachment_ID=${documentID},
                    status="sent"
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
                    date_sent=NOW(),
                    subject="${htmlEntities(subjectInputValue)}",
                    body="${htmlEntities(messageInputValue)}",
                    image_attachment_ID=${imageID},
                    status="sent"
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
                    date_sent=NOW(),
                    subject="${htmlEntities(subjectInputValue)}",
                    body="${htmlEntities(messageInputValue)}",
                    status="sent"
                WHERE
                    message_ID = ${messageID};
            `;
        };

        await res.query(updateMessageStatement)
        .then(() => {
            console.log(`message sent`)
        })
        .catch(error => {
            console.log(error);
            throw error;
        });

    } else if (messageStatus !== "saved") {
        // handle if sending an unsaved message

        if (image) {

            if (image.size >  2000000) {
                return new Response(JSON.stringify({error: "image file cannot exceed 2MB"}), {status: 422});
            };

            try {
                const uploadImageResponse = await cloudinary.uploader.upload(image, {
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
        };

        // upload PDF to Cloudinary

        let uploadedDocumentURL;

        let uploadedDocumentPublicID;

        let documentID = null;

        if (document) {

            if (document.size >  2000000) {
                return new Response(JSON.stringify({error: "document file cannot exceed 2MB"}), {status: 422});
            };

            try {
                const uploadDocumentResponse = await cloudinary.uploader.upload(document, {
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
        };

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
            NOW(),
            "${htmlEntities(subjectInputValue)}",
            "${htmlEntities(messageInputValue)}",
            ${documentID},
            ${imageID},
            "sent"
        )`;

        await res.query(insertMessageStatement)
        .then(() => {
            console.log(`message saved in the database`)
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
    };

    res.end();

    // begin sending the message

    sgMail.setApiKey(SENDGRIDAPIKey);

    const msg = [
        {
        to: 'sdewyer@artintechservices.com', // verified sender
        from: 'sdewyer@artintechservices.com', // verified sender
        subject: `a ${clientNameFirst} ${clientNameLast} sent a message`,
        text: 'sent via the create message form',
        html: `hi stephen,<br /><br />
            ${clientNameFirst} ${clientNameLast} sent a message.<br /><br />
            Subject: ${subjectInputValue}<br />
            Message: ${messageInputValue}<br />
            Document attached: ${document ? "yes" : "no"}<br />
            Image attached: ${image ? "yes" : "no"}<br/>
            <br />
            Best,<br /><br />
            stephen dewyer<br />
            Founding Director, UX Designer and Full-stack Web Developer<br />
            Art in Tech Services<br />
            www.artintechservices.com</p>`
        },
    ];

    try {
        await sgMail.send(msg);
        return new Response(JSON.stringify({success: `message sent!`}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: "message not sent due to a problem with the API"}), {status: 422});
    };
    
}