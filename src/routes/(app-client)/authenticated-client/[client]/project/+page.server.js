import { mysqlConnection } from "$lib/server/db/mysql";
import { redirect } from "@sveltejs/kit";

export const load = async ({url}) => {

    const projectIDSearchValue = url.searchParams.get("id");

    if (!projectIDSearchValue) {
        throw redirect(303, "/authenticated-client/client");
    };

    let res = await mysqlConnection();

    // get the consultation data

    const selectClientProjectsStatement = `SELECT 
            start_project_requests_client.*,
            image_collection.image_ID,
            image_collection.image_URL,
            image_collection.alt_text AS image_alt_text,
            image_collection.timestamp AS image_timestamp,
            image_collection.public_ID AS image_public_ID,
            documents_collection.document_ID,
            documents_collection.timestamp AS document_timestamp,
            documents_collection.public_ID AS document_public_ID
        FROM start_project_requests_client
            LEFT JOIN image_collection ON start_project_requests_client.image_ID = image_collection.image_ID
            LEFT JOIN documents_collection ON start_project_requests_client.document_ID = documents_collection.document_ID
        WHERE start_project_requests_client.project_ID = ${projectIDSearchValue};
    `;
    /**
     * @type {Project | undefined}
     */
    let projectRow;

    await res.query(selectClientProjectsStatement)
    .then(([rows]) => {
        projectRow = JSON.parse(JSON.stringify(rows))[0];
    })
    .catch(error => {
        throw error;
    });

    if (!projectRow) {
        return new Response(JSON.stringify({error: `no project with ID of ${projectIDSearchValue} in database`}), {status: 422})
    };
    res.end();

    return {
        projectRow
    };
}