import { mysqlConnection } from "$lib/server/db/mysql";
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARYCLOUDNAME } from "$env/static/private";
import { CLOUDINARYSECRETKEY } from "$env/static/private";
import { CLOUDINARYAPIKEY } from "$env/static/private";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';

cloudinary.config({ 
  cloud_name: CLOUDINARYCLOUDNAME, 
  api_key: CLOUDINARYAPIKEY, 
  api_secret: CLOUDINARYSECRETKEY
});

export async function POST({request}) {

    const date = new Date().toUTCString();

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const userEmail = data.userEmail;

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
        WHERE email = "${userEmail}"`;
    
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
    const projectID = data.projectID;
    const artificialIntelligence = data.artificialIntelligence ? 1 : 0;
    const brandIdentityDesign = data.brandIdentityDesign ? 1 : 0;
    const dataVisualization = data.dataVisualization ? 1 : 0;
    const photography = data.photography ? 1 : 0;
    const softwareDevelopment = data.softwareDevelopment ? 1 : 0;
    const userExperienceDesign = data.userExperienceDesign ? 1 : 0;
    const videography = data.videography ? 1 : 0;
    const visualDesign = data.visual_design ? 1 : 0;
    const aboutProject = data.aboutProject;
    const projectStartDate = data.projectStartDate;
    const projectEndDate = data.projectEndDate;
    const projectBudget = data.projectBudget;
    const imageFile = data.image;
    let imageID = data.imageID;
    const imagePublicID = data.imagePublicID;
    const imageFileInputValue = data.imageFileInputValue;
    const imageFileName = data.imageFileName;
    const deleteImage = data.deleteImage;
    const documentFile = data.document;
    let documentID = data.documentID;
    const documentPublicID = data.documentPublicID;
    const documentFileInputValue = data.documentFileInputValue;
    const documentFileName = data.documentFileName;
    const deleteDocument = data.deleteDocument;

    if (
        !aboutProject ||
        !projectStartDate ||
        !projectEndDate ||
        !projectBudget
    ) {
        return new Response(JSON.stringify({error: "missing form data"}), {status: 422});
    };

    // upload image to Cloudinary

    let uploadedImageURL = "";
    let uploadedImagePublicID = "";

    let addImageID = false;

    // handle if local image file selected and project image already exists
    if (imageFileInputValue && imageID) {

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
                folder: "projects",
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
                client_ID = "${clientID}", 
                image_URL = "${uploadedImageURL}",
                public_ID = "${uploadedImagePublicID}"
            WHERE image_ID = "${imageID}"
        `;

        await res.query(updateImageStatement)
        .then(() => {
            console.log("updated image row");
        })
        .catch(error => {
            throw error;
        });

    } else if (imageFileInputValue && !imageID) {

        if (imageFile.size >  2000000) {
            return new Response(JSON.stringify({error: "image file cannot exceed 2MB"}), {status: 422});
        };

        try {
            const uploadImageResponse = await cloudinary.uploader.upload(imageFile, {
                folder: "projects",
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
    } else if (deleteImage && imageID) {
        // delete the image associated with the action from Cloudinary 
        try {
            await cloudinary.uploader.destroy(imagePublicID);
        } catch(error) {
            console.log(error);
            return new Response(JSON.stringify({error: "problem with deleting image from Cloudinary"}), {status: 500});
        };

        const updateImageStatement = `UPDATE image_collection
            SET
                client_ID = ${clientID}, 
                image_URL = NULL,
                public_ID = NULL
            WHERE image_ID = "${imageID}"
        `;

        await res.query(updateImageStatement)
        .then(() => {
            console.log("updated image row");
        })
        .catch(error => {
            throw error;
        });
    };

    // upload PDF to Cloudinary

    let uploadedDocumentURL = "";

    let uploadedDocumentPublicID = "";

    let addDocumentID = false;

    if (documentID && documentFileInputValue) {

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
                folder: "projects",
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
                image_URL = "${uploadedDocumentURL}",
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

    } else if (!documentID && documentFileInputValue) {
        if (documentFile.size >  2000000) {
            return new Response(JSON.stringify({error: "document file cannot exceed 2MB"}), {status: 422});
        };
        try {
            const uploadDocumentResponse = await cloudinary.uploader.upload(documentFile, {
                folder: "projects",
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
    } else if (documentID && deleteDocument) {

        // delete the document associated with the action from Cloudinary 
        try {
            await cloudinary.uploader.destroy(documentPublicID);
        } catch(error) {
            console.log(error);
            return new Response(JSON.stringify({error: "problem with deleting image from Cloudinary"}), {status: 500});
        };

        const updateDocumentStatement = `UPDATE documents_collection
            SET
                client_ID = "${clientID}", 
                document_URL = NULL,
                public_ID = NULL
            WHERE document_ID = "${documentID}"
        `;

        await res.query(updateDocumentStatement)
        .then(() => {
            console.log("updated document row");
        })
        .catch(error => {
            throw error;
        });
    };

    let updateProjectStatement = "";

    if (addDocumentID && addImageID) {
        updateProjectStatement = `UPDATE start_project_requests_client 
            SET
                image_ID = ${imageID},
                document_ID = ${documentID},
                project_info = "${aboutProject}",
                project_start_date = "${projectStartDate}",
                project_end_date = "${projectEndDate}",
                project_budget = "${projectBudget}",
                artificial_intelligence = "${artificialIntelligence}",
                brand_identity_design = "${brandIdentityDesign}",
                data_visualization = "${dataVisualization}",
                photography = "${photography}",
                software_development = "${softwareDevelopment}",
                user_experience_design = "${userExperienceDesign}",
                videography = "${videography}",
                visual_design = "${visualDesign}"
            WHERE
                project_ID = ${projectID}
        `;
    } else if (addDocumentID && !addImageID) {
        updateProjectStatement = `UPDATE start_project_requests_client 
            SET
                document_ID = ${documentID},
                project_info = "${aboutProject}",
                project_start_date = "${projectStartDate}",
                project_end_date = "${projectEndDate}",
                project_budget = "${projectBudget}",
                artificial_intelligence = "${artificialIntelligence}",
                brand_identity_design = "${brandIdentityDesign}",
                data_visualization = "${dataVisualization}",
                photography = "${photography}",
                software_development = "${softwareDevelopment}",
                user_experience_design = "${userExperienceDesign}",
                videography = "${videography}",
                visual_design = "${visualDesign}"
            WHERE
                project_ID = ${projectID}
        `;
    } else if (!addDocumentID && addImageID) {
        updateProjectStatement = `UPDATE start_project_requests_client 
            SET
                image_ID = ${imageID},
                project_info = "${aboutProject}",
                project_start_date = "${projectStartDate}",
                project_end_date = "${projectEndDate}",
                project_budget = "${projectBudget}",
                artificial_intelligence = "${artificialIntelligence}",
                brand_identity_design = "${brandIdentityDesign}",
                data_visualization = "${dataVisualization}",
                photography = "${photography}",
                software_development = "${softwareDevelopment}",
                user_experience_design = "${userExperienceDesign}",
                videography = "${videography}",
                visual_design = "${visualDesign}"
            WHERE
                project_ID = ${projectID}
        `;
    } else if (!addDocumentID && !addImageID) {
        updateProjectStatement = `UPDATE start_project_requests_client 
            SET
                project_info = "${aboutProject}",
                project_start_date = "${projectStartDate}",
                project_end_date = "${projectEndDate}",
                project_budget = "${projectBudget}",
                artificial_intelligence = "${artificialIntelligence}",
                brand_identity_design = "${brandIdentityDesign}",
                data_visualization = "${dataVisualization}",
                photography = "${photography}",
                software_development = "${softwareDevelopment}",
                user_experience_design = "${userExperienceDesign}",
                videography = "${videography}",
                visual_design = "${visualDesign}"
            WHERE
                project_ID = ${projectID}
        `;
    };    

    await res.query(updateProjectStatement)
    .then(() => {
        console.log(`project start request updated for ${clientNameFirst} ${clientNameLast}`)
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
        subject: `a start project request was updated for ${clientNameFirst} ${clientNameLast} at ${userEmail}`,
        text: 'sent via the start project request form',
        html: `hi stephen,<br /><br />
            A start project request was updated on ${date} for ${clientNameFirst} ${clientNameLast} at ${userEmail}.<br />
            The following is a copy of the updated start project request:<br />
            -  first name: ${clientNameFirst}<br />
            -  last name: ${clientNameLast}<br />
            -  email: ${userEmail}<br />
            -  about project: ${aboutProject}<br />
            -  project start date: ${projectStartDate}<br />
            -  project end date: ${projectEndDate}<br />
            -  project budget: ${projectBudget}<br />
            -  artificial intelligence: ${artificialIntelligence ? "yes" : "no"}<br />
            -  brand identity design: ${brandIdentityDesign ? "yes" : "no"}<br />
            -  data visualization: ${dataVisualization ? "yes" : "no"}<br />
            -  photography: ${photography ? "yes" : "no"}<br />
            -  software development: ${softwareDevelopment ? "yes" : "no"}<br />
            -  user experience design: ${userExperienceDesign ? "yes" : "no"}<br />
            -  videography: ${videography ? "yes" : "no"}<br />
            -  visual design: ${visualDesign ? "yes" : "no"}<br />
            <br />
            Best,<br /><br />
            stephen dewyer<br />
            Founding Director, UX Designer and Full-stack Web Developer<br />
            Art in Tech Services<br />
            www.artintechservices.com</p>`
        },
        {
        to: userEmail,
        from: 'sdewyer@artintechservices.com', // verified sender
        subject: `start project request updated for ${clientNameFirst} ${clientNameLast} at ${userEmail}`,
        text: 'updated via edit start project request',
        html: `<p>hi ${clientNameFirst} ${clientNameLast},
        <br /><br />
        your start project request was updated on ${date}.<br />
        The following is a copy of the start project request:<br />
        -  first name: ${clientNameFirst}<br />
        -  last name: ${clientNameLast}<br />
        -  email: ${userEmail}<br />
        -  about project: ${aboutProject}<br />
        -  project start date: ${projectStartDate}<br />
        -  project end date: ${projectEndDate}<br />
        -  project budget: ${projectBudget}<br />
        -  artificial intelligence: ${artificialIntelligence ? "yes" : "no"}<br />
        -  brand identity design: ${brandIdentityDesign ? "yes" : "no"}<br />
        -  data visualization: ${dataVisualization ? "yes" : "no"}<br />
        -  photography: ${photography ? "yes" : "no"}<br />
        -  software development: ${softwareDevelopment ? "yes" : "no"}<br />
        -  user experience design: ${userExperienceDesign ? "yes" : "no"}<br />
        -  videography: ${videography ? "yes" : "no"}<br />
        -  visual design: ${visualDesign ? "yes" : "no"}<br />
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
        return new Response(JSON.stringify({success: `created project request for ${clientNameFirst} ${clientNameLast}`}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: "message not sent due to a problem with the API"}), {status: 422});
    };
    
}