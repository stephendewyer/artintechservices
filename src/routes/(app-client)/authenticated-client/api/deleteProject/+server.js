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

    const projectID = data.project.project_ID;
    const projectImageID = data.project.image_ID;
    const projectDocumentID = data.project.document_ID;
    const projectImagePublicID = data.project.image_public_ID;
    const projectDocumentPublicID = data.project.document_public_ID;

    if (
        !projectID
    ) {
        return new Response(JSON.stringify({error: "missing project ID!"}), {status: 422});
    };

    // connect to the database

    let res = await mysqlConnection();

    // delete the project from start_project_requests_client

    const deleteProjectStatement =  `DELETE FROM start_project_requests_client
        WHERE project_ID = ${projectID}
    `;
    await res.query(deleteProjectStatement)
    .then(() => {
    })
    .catch(error => {
        throw error;
    });

    if (projectImageID) {

        if (projectImagePublicID) {
            try {
                await cloudinary.uploader.destroy(projectImagePublicID, {});
            } catch (err) {
                console.log(err);
                return new Response(JSON.stringify({error: "problem with deleting image from Cloudinary"}), {status: 500});
            };
        };        

        const deleteImageRowStatement = `DELETE FROM image_collection
            WHERE image_ID = ${projectImageID}
        `;

        await res.query(deleteImageRowStatement)
        .then(() => {
        })
        .catch(error => {
            throw error;
        });
    };

    if (projectDocumentID) {

        if (projectDocumentPublicID) {
            try {
                await cloudinary.uploader.destroy(projectDocumentPublicID, {});
            } catch (err) {
                console.log(err);
                return new Response(JSON.stringify({error: "problem with deleting document from Cloudinary"}), {status: 500});
            };
        };        

        const deleteDocumentRowStatement = `DELETE FROM documents_collection
            WHERE document_ID = ${projectDocumentID}
        `;
        await res.query(deleteDocumentRowStatement)
        .then(() => {
        })
        .catch(error => {
            throw error;
        });
    };

    res.end();

    return new Response(JSON.stringify({success: `deleted project ${projectID}!`}), {status: 200});

};