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
    
    const conversationID = data.conversationID;
    const replyToMessageID = data.replyToMessageID;
    const sessionEmail = data.sessionEmail;
    const contact = data.contact;
    const subjectInputValue = data.subjectInputValue;
    const messageInputValue = data.messageInputValue;
    const imageFileInputValue = data.imageFileInputValue;
    const image = data.image;
    const document = data.document;
    const documentFileInputValue = data.documentFileInputValue;

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

    let clientID;

    const selectClientQuery = `SELECT user_ID, name_first, name_last
        FROM clients
        WHERE email = "${sessionEmail}"`;
    
    let res = await mysqlConnection();

    await res.query(selectClientQuery)
    .then(([rows]) => {
        clientID = JSON.parse(JSON.stringify(rows))[0].user_ID;
        clientNameFirst = JSON.parse(JSON.stringify(rows))[0].name_first;
        clientNameLast = JSON.parse(JSON.stringify(rows))[0].name_last;
    })
    .catch(error => {
        throw error;
    });

    // upload image to Cloudinary

    let uploadedImageURL;

    let uploadedImagePublicID;

    let imageID = null;

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