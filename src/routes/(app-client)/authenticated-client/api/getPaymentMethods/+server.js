import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    console.log(data)

    const { clientEmail, stripeCustomerID } = data;

    const paymentMethods = await stripe.customers.listPaymentMethods(
        stripeCustomerID,
        {
            limit: 3,
        }
    );

    console.log(paymentMethods);

    if (paymentMethods) {
        return new Response(JSON.stringify({...paymentMethods}), {status: 200});
    } else {
        return new Response(JSON.stringify({message: "no payment methods on file"}))
    };

}