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

    const selectClientInvoicesQuery = `SELECT 
            clients.user_ID,
            client_information.Stripe_customer_ID
        FROM clients
        INNER JOIN client_information
        ON clients.user_ID = client_information.client_ID
        WHERE clients.email = "${clientEmail}"
    `;
    
    let res = await mysqlConnection();

    let Stripe_customer_ID;

    await res.query(selectClientInvoicesQuery)
    .then(([rows]) => {
        Stripe_customer_ID = JSON.parse(JSON.stringify(rows))[0].Stripe_customer_ID;
    })
    .catch(error => {
        throw error;
    });

    res.end();

    if (!Stripe_customer_ID) {
        return new Response(JSON.stringify({error: "client is missing Stripe customer ID"}), {status: 422});
    };

    // get the Stripe customer balance

    const searched_stripe_customer = await stripe.customers.search({
        // @ts-ignore
        query: `email: '${clientEmail}'`,
    });

    // get the Stripe invoices to the client if any

    const customer_invoices = await stripe.invoices.search({
        query: `customer: '${Stripe_customer_ID}'`,
    });

    // get the total amount due on invoices

    let totalAmountDue = 0;

    if (customer_invoices.data.length > 0) {
        customer_invoices.data.forEach((invoice, index) => {
            if (invoice.status === "open") {
                totalAmountDue = totalAmountDue + (invoice.amount_due - invoice.amount_paid);
            };
        });
    };
    // get the customer payment methods if any

    const paymentMethods = await stripe.customers.listPaymentMethods(
        Stripe_customer_ID,
        {
            limit: 3,
        }
    );

    // @ts-ignore
    const clientDetails = {
        billing: searched_stripe_customer,
        invoices: customer_invoices,
        payment_methods: paymentMethods,
        totalAmountDue: totalAmountDue
    };

    return new Response(
        JSON.stringify({...clientDetails}), {status: 200}
    );
}