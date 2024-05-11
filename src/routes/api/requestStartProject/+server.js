import { mysqlConnection } from "$lib/server/db/mysql";
import { ImageFileExtensionTest } from "$lib/util/ImageFileExtensionTest.js";
import { DocumentFileExtensionTest } from "$lib/util/DocumentFileExtensionTest";
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

    const artificialIntelligence = data.artificialIntelligence ? 1 : 0;
    const brandIdentityDesign = data.brandIdentityDesign ? 1 : 0;
    const dataVisualization = data.dataVisualization ? 1 : 0;
    const photography = data.photography ? 1 : 0;
    const softwareDevelopment = data.softwareDevelopment ? 1 : 0;
    const userExperienceDesign = data.userExperienceDesign ? 1 : 0;
    const videography = data.videography ? 1 : 0;
    const visualDesign = data.visual_design ? 1 : 0;
    const nameFirst = data.nameFirst;
    const nameLast = data.nameLast;
    const email = data.email;
    const company = data.company;
    const phoneNumber = data.phone;
    const website = data.URL;
    const aboutProject = data.aboutProject;
    const projectStartDate = data.projectStartDate;
    const projectEndDate = data.projectEndDate;
    const projectBudget = data.projectBudget;
    const imageFile = data.image;
    const imageFileInputValue = data.imageFileInputValue;
    const imageFileName = data.imageFileName;
    const documentFile = data.document;
    const documentFileInputValue = data.documentFileInputValue;
    const documentFileName = data.documentFileName;

    // if (
    //     !nameFirst ||
    //     !nameLast ||
    //     !email ||
    //     !phoneNumber ||
    //     !aboutProject ||
    //     !projectStartDate ||
    //     !projectEndDate ||
    //     !projectBudget
    // ) {
    //     return new Response(JSON.stringify({error: "missing form data"}), {status: 422});
    // };

    // if (
    //     !email.includes('@')
    // ) {
    //     return new Response(JSON.stringify({error: "missing an @ symbol in email address"}), {status: 422});
    // };

    // upload image to Cloudinary

    let uploadedImageURL;

    let uploadedImagePublicID;

    let res = await mysqlConnection();

    let imageID = null;

    if (imageFile) {

        if (imageFile.size >  2000000) {
            return new Response(JSON.stringify({error: "image file cannot exceed 2MB"}), {status: 422});
        } else if ((imageFile) && (ImageFileExtensionTest(imageFile) === "false")) {
            return new Response(JSON.stringify({error: "incorrect image file type"}), {status: 422});
        };

        try {
            const uploadImageResponse = await cloudinary.uploader.upload(imageFile, {});
            uploadedImageURL = uploadImageResponse.secure_url;
            uploadedImagePublicID = uploadImageResponse.public_id;

        } catch (err) {
            console.log(err);
            return new Response(JSON.stringify({error: "problem with the image upload to Cloudinary"}), {status: 500});
        };

        const insertImageStatement = `INSERT INTO image_collection (
            image_URL,
            public_ID
        ) VALUES (
            ${uploadedImageURL},
            ${uploadedImagePublicID}
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

    if (documentFile) {

        if (documentFile.size >  2000000) {
            return new Response(JSON.stringify({error: "document file cannot exceed 2MB"}), {status: 422});
        } else if ((documentFile) && (DocumentFileExtensionTest(documentFile) === "false")) {
            return new Response(JSON.stringify({error: "incorrect document file type"}), {status: 422});
        };

        try {
            const uploadDocumentResponse = await cloudinary.uploader.upload(documentFile, {});
            uploadedDocumentURL = uploadDocumentResponse.secure_url;
            uploadedDocumentPublicID = uploadDocumentResponse.public_id;
        } catch (err) {
            console.log(err);
            return new Response(JSON.stringify({error: "problem with the document upload to Cloudinary"}), {status: 500});
        };

        const insertDocumentStatement = `INSERT INTO documents_collection (
            document_URL,
            public_ID
        ) VALUES (
            ${uploadedDocumentURL},
            ${uploadedDocumentPublicID}
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

    const insertProjectStatement = `INSERT INTO start_project_requests_public (
        image_ID,
        document_ID,
        name_first,
        name_last,
        email,
        company,
        phone_number,
        URL,
        project_info,
        project_start_date,
        project_end_date,
        project_budget,
        artificial_intelligence,
        brand_identity_design,
        data_visualization,
        photography,
        software_development,
        user_experience_design,
        videography,
        visual_design
    ) VALUES (
        ${imageID},
        ${documentID},
        "${nameFirst}",
        "${nameLast}",
        "${email}",
        "${company}",
        "${phoneNumber}",
        "${website}",
        "${aboutProject}",
        "${projectStartDate}",
        "${projectEndDate}",
        "${projectBudget}",
        "${artificialIntelligence}",
        "${brandIdentityDesign}",
        "${dataVisualization}",
        "${photography}",
        "${softwareDevelopment}",
        "${userExperienceDesign}",
        "${videography}",
        "${visualDesign}"
    )`;

    await res.query(insertProjectStatement)
    .then(() => {
        console.log(`project start request added for ${nameFirst} ${nameLast}`)
    })
    .catch(error => {
        console.log(error);
        throw error;
    });

    res.end();

    // begin sending the message

    // sgMail.setApiKey(SENDGRIDAPIKey);

    // const msg = [
    //     {
    //     to: 'sdewyer@artintechservices.com', // verified sender
    //     from: 'sdewyer@artintechservices.com', // verified sender
    //     subject: `a start project request was created for ${nameFirst} ${nameLast} at ${email}`,
    //     text: 'sent via the start project request form',
    //     html: `hi stephen,<br /><br />
    //         A start project request was created on ${date} for ${nameFirst} ${nameLast} at ${email}.<br />
    //         The following is a copy of the start projeect request:<br />
    //         -  ${nameFirst},<br />
    //         -  ${nameLast},<br />
    //         -  ${email},<br />
    //         -  ${company},<br />
    //         -  ${phoneNumber},<br />
    //         -  ${URL},<br />
    //         -  ${aboutProject},<br />
    //         -  ${projectStartDate},<br />
    //         -  ${projectEndDate},<br />
    //         -  ${projectBudget},<br />
    //         -  ${artificialIntelligence},<br />
    //         -  ${brandIdentityDesign},<br />
    //         -  ${dataVisualization},<br />
    //         -  ${photography},<br />
    //         -  ${softwareDevelopment},<br />
    //         -  ${userExperienceDesign},<br />
    //         -  ${videography},<br />
    //         -  ${visualDesign}<br />
    //         <br />
    //         Best,<br /><br />
    //         stephen dewyer<br />
    //         Founding Director, UX Designer and Full-stack Web Developer<br />
    //         Art in Tech Services<br />
    //         www.artintechservices.com</p>`
    //     },
    //     {
    //     to: email,
    //     from: 'sdewyer@artintechservices.com', // verified sender
    //     subject: `start project request created for ${nameFirst} ${nameLast} at ${email}`,
    //     text: 'sent via the start project request form',
    //     html: `<p>hi ${nameFirst} ${nameLast},
    //     <br /><br />
    //     thank you for your start project request, which was created on ${date}.<br />
    //     A representative from Art in Tech Services will contact you within 48 hours to discuss your start project request.<br />
    //     The following is a copy of the start projeect request:<br />
    //     -  ${nameFirst},<br />
    //     -  ${nameLast},<br />
    //     -  ${email},<br />
    //     -  ${company},<br />
    //     -  ${phoneNumber},<br />
    //     -  ${URL},<br />
    //     -  ${aboutProject},<br />
    //     -  ${projectStartDate},<br />
    //     -  ${projectEndDate},<br />
    //     -  ${projectBudget},<br />
    //     -  ${artificialIntelligence},<br />
    //     -  ${brandIdentityDesign},<br />
    //     -  ${dataVisualization},<br />
    //     -  ${photography},<br />
    //     -  ${softwareDevelopment},<br />
    //     -  ${userExperienceDesign},<br />
    //     -  ${videography},<br />
    //     -  ${visualDesign}<br />
    //     <br />
    //     Best,<br /><br />
    //     stephen dewyer<br />
    //     Founding Director, UX Designer and Full-stack Web Developer<br />
    //     Art in Tech Services<br />
    //     www.artintechservices.com</p>`
    //     },
    // ];

    // try {
    //     await sgMail.send(msg);
    //     return new Response(JSON.stringify({success: `created project request for ${nameFirst} ${nameLast}`}), {status: 200});
    // } catch (error) {
    //     return new Response(JSON.stringify({error: "message not sent due to a problem with the API"}), {status: 422});
    // };

    return new Response(JSON.stringify({success: "success!"}), {status: 200});
    
}