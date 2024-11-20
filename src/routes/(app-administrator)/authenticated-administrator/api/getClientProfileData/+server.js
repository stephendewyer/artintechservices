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

    const selectClientsQuery = `SELECT 
            clients.user_ID,
            clients.name_first,
            clients.name_last,
            clients.email,
            clients.date_created,
            clients.last_login,
            clients.previous_login,
            client_information.*,
            image_collection.alt_text,
            image_collection.image_URL,
            image_collection.public_ID
        FROM clients
        LEFT JOIN client_information
        ON client_information.client_ID = clients.user_ID
        LEFT JOIN image_collection
        ON image_collection.image_ID = client_information.profile_image_ID
        WHERE clients.email = "${clientEmail}"
    `;
    
    let res = await mysqlConnection();

    /**
     * @type {any}
     */
    let clientRow;

    /**
     * @type {string}
     */
    let stripeCustomerID = "";

    await res.query(selectClientsQuery)
    .then(([rows]) => {
        clientRow = JSON.parse(JSON.stringify(rows))[0];
        stripeCustomerID = JSON.parse(JSON.stringify(rows))[0].Stripe_customer_ID;
    })
    .catch(error => {
        throw error;
    });

    // get client's consultations
    /**
     * @type {any}
     */
    let clientConsultations;

    const selectClientConsultationsQuery = `SELECT * FROM consult_requests_client WHERE client_ID = ${clientRow.user_ID}`;

    await res.query(selectClientConsultationsQuery)
    .then(([rows]) => {
        clientConsultations = JSON.parse(JSON.stringify(rows))
    });

    /**
     * @type {any}
     */
    const clientProfileWithConsultations = {...clientRow, consultations: [...clientConsultations]}

    // get client's projects
    /**
     * @type {any}
     */
    let clientProjects;

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
        WHERE start_project_requests_client.client_ID = ${clientRow.user_ID};
    `;

    await res.query(selectClientProjectsStatement)
    .then(([rows]) => {
        clientProjects = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });

    res.end();

    const clientProfileWithConsultationsAndProject = {...clientProfileWithConsultations, projects: [...clientProjects]};

    /**
     * @type {any[]}
     */
    let clientProfile = [];

    // get the Stripe client invoices if any
    /**
     * @type {any}
     */
    const customerInvoices = await stripe.invoices.search({
        query: `customer: '${stripeCustomerID}'`,
    });

    // get the total amount due on invoices

    let totalAmountDue = 0;

    if (customerInvoices.data.length > 0) {
        customerInvoices.data.forEach((/** @type {{ amount_due: number; amount_paid: number; }} */ invoice, /** @type {number} */ index) => {
            totalAmountDue = totalAmountDue + (invoice.amount_due - invoice.amount_paid);
        });
    };
    // get the customer payment methods if any
    /**
     * @type {any}
     */
    const paymentMethods = await stripe.customers.listPaymentMethods(
        stripeCustomerID,
        {
            limit: 3,
        }
    );
    
    clientProfile = {...clientProfileWithConsultationsAndProject,
        invoices: [...customerInvoices.data],
        payment_methods: [...paymentMethods.data],
        total_amount_due: totalAmountDue
    };

    return new Response(
        JSON.stringify(clientProfile), {status: 200}
    );
}