import { mysqlConnection } from "$lib/server/db/mysql";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const GET = async ({request}) => {

    if (request.method !== "GET") {
        return new Response(JSON.stringify({error: "method is not GET"}), {status: 422});
    };

    // get the Stripe invoices information for clients

    const customers_invoices = await stripe.invoices.list({
        limit: 1000,
    });

    return new Response(
        JSON.stringify(customers_invoices.data), {status: 200}
    );
}
