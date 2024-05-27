import { mysqlConnection } from "$lib/server/db/mysql";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { clientEmail } = data;

    let clientID;

    let client;

    const selectClientQuery = `SELECT user_ID, email, name_first, name_last, date_created
        FROM clients
        WHERE email = "${clientEmail}"`;
    
    let res = await mysqlConnection();

    await res.query(selectClientQuery)
    .then(([rows]) => {
        client = JSON.parse(JSON.stringify(rows))[0];
        clientID = JSON.parse(JSON.stringify(rows))[0].user_ID;
    })
    .catch(error => {
        throw error;
    });

    // get the client_information row

    const selectClientInformationRowStatement = `SELECT * 
        FROM client_information
        WHERE client_ID = ${clientID};
    `;

    let clientInformationRow;

    let Stripe_customer_ID;

    await res.query(selectClientInformationRowStatement)
    .then(([rows]) => {
        clientInformationRow = JSON.parse(JSON.stringify(rows))[0];
        Stripe_customer_ID = clientInformationRow.Stripe_customer_ID;
    })
    .catch(error => {
        throw error;
    });

    // get the consult_requests_client row

    const selectClientConsultationsStatement = `SELECT *
        FROM consult_requests_client
        WHERE client_ID = ${clientID};
    `;

    let consultations;

    await res.query(selectClientConsultationsStatement)
    .then(([rows]) => {
        consultations = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    // get the start_project_requests_client row and corresponding images and documents

    let projects;

    const selectClientProjectsStatement = `SELECT 
            start_project_requests_client.*,
            image_collection.image_ID,
            image_collection.image_URL,
            image_collection.alt_text as image_alt_text,
            image_collection.timestamp as image_timestamp,
            image_collection.public_ID as image_public_ID,
            documents_collection.document_ID,
            documents_collection.timestamp as document_timestamp,
            documents_collection.public_ID as document_public_ID
        FROM start_project_requests_client
            INNER JOIN image_collection ON image_collection.client_ID = ${clientID}
            INNER JOIN documents_collection ON documents_collection.client_ID = ${clientID}
        WHERE start_project_requests_client.client_ID = ${clientID};
    `;

    await res.query(selectClientProjectsStatement)
    .then(([rows]) => {
        projects = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    // get the Stripe balance and invoices

    const searched_stripe_customer = await stripe.customers.search({
        // @ts-ignore
        query: `email: '${clientEmail}'`,
    });

    // @ts-ignore
    const clientDetails = {
        client: client,
        contact_information: clientInformationRow,
        consultations: consultations,
        projects: projects,
        billing: searched_stripe_customer
    };

    return new Response(
        JSON.stringify({...clientDetails}), {status: 200}
    );
}