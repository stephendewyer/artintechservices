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

    if (!Stripe_customer_ID) {
        return new Response(JSON.stringify({error: "client is missing Stripe customer ID"}), {status: 422});
    };

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
            image_collection.alt_text AS image_alt_text,
            image_collection.timestamp AS image_timestamp,
            image_collection.public_ID AS image_public_ID,
            documents_collection.document_ID,
            documents_collection.timestamp AS document_timestamp,
            documents_collection.public_ID AS document_public_ID
        FROM start_project_requests_client
            LEFT JOIN image_collection ON start_project_requests_client.image_ID = image_collection.image_ID
            LEFT JOIN documents_collection ON start_project_requests_client.document_ID = documents_collection.document_ID
        WHERE start_project_requests_client.client_ID = ${clientID};
    `;

    await res.query(selectClientProjectsStatement)
    .then(([rows]) => {
        projects = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    // get the Stripe customer balance

    const searched_stripe_customer = await stripe.customers.search({
        // @ts-ignore
        query: `email: '${clientEmail}'`,
    });

    // get the Stripe invoices to the client if any

    const customer_invoices = await stripe.invoices.search({
        query: `customer: '${Stripe_customer_ID}'`,
    });

    // get the customer payment methods if any

    const paymentMethods = await stripe.customers.listPaymentMethods(
        Stripe_customer_ID,
        {
            limit: 3,
        }
    );

    // @ts-ignore
    const clientDetails = {
        client: client,
        contact_information: clientInformationRow,
        consultations: consultations,
        projects: projects,
        billing: searched_stripe_customer,
        invoices: customer_invoices,
        payment_methods: paymentMethods
    };

    return new Response(
        JSON.stringify({...clientDetails}), {status: 200}
    );
}