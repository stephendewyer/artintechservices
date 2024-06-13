import { redirect } from "@sveltejs/kit";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const load = async ({url}) => {

    const invoiceIDSearchValue = url.searchParams.get("invoice-ID");
    
    if (!invoiceIDSearchValue) {
        throw redirect(303, "/authenticated-client/client");
    };

    const clientEmail = url.searchParams.get("client-email");

    if (!clientEmail) {
        throw redirect(303, "/authenticated-client/client");
    };

    const customer = await stripe.customers.search({
        // @ts-ignore
        query: `email: '${clientEmail}'`,
    });

    // get the Stripe invoices to the client
    const customer_invoices = await stripe.invoices.search({
        query: `customer: '${customer.data[0].id}'`,
    });

    console.log(customer_invoices)

    let invoice;

    customer_invoices.data.forEach((invoiceObj) => {
        if (invoiceObj.id === invoiceIDSearchValue) {
            invoice = invoiceObj;
        };
    });

    return {
        customer, 
        invoice
    };
}