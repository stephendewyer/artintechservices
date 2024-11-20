import { mysqlConnection } from "$lib/server/db/mysql";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const GET = async ({request}) => {

    if (request.method !== "GET") {
        return new Response(JSON.stringify({error: "method is not GET"}), {status: 422});
    };

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
    `;
    
    let res = await mysqlConnection();

    /**
     * @type {ClientProfile[]}
     */
    let clientsRow = [];

    await res.query(selectClientsQuery)
    .then(([rows]) => {
        clientsRow = [...clientsRow, ...JSON.parse(JSON.stringify(rows))];
    })
    .catch(error => {
        throw error;
    });

    res.end();

    // get the Stripe invoices information for clients

    const customers_invoices = await stripe.invoices.list({
        limit: 1000,
    });

    // for each client, get the invoices

    /**
     * @type {any[]}
     */
    let clientsRowWithInvoices = [];

    if (clientsRow.length > 0) {
         clientsRow.forEach((client, index) => {
            /**
              * @type {any[]}
              */
            let clientInvoices = [];
            
            let totalAmountDue = 0;
            // @ts-ignore
            customers_invoices.data.forEach((invoice, index) => {
                if (invoice.customer === client.Stripe_customer_ID) {
                    clientInvoices = [...clientInvoices, invoice];
                    totalAmountDue = totalAmountDue + (invoice.amount_due - invoice.amount_paid);
                };
            });

            clientsRowWithInvoices = [...clientsRowWithInvoices, {
                ...client,
                invoices: clientInvoices,
                total_amount_due: totalAmountDue
            }];
        });
    };

    return new Response(
        JSON.stringify(clientsRowWithInvoices), {status: 200}
    );
}