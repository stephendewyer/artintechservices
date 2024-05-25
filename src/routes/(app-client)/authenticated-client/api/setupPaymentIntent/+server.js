import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST = async ({request}) => {

    const data = await request.json();

    const { clientEmail, stripeCustomerID } = data;

    const setupIntent = await stripe.setupIntents.create({
        customer: stripeCustomerID,
        automatic_payment_methods: {
            enabled: true
        },
    });

    let clientSecretKey;

    if (setupIntent) {
        console.log("setup customer payment intent created");
        clientSecretKey = setupIntent.client_secret;
        return new Response(
            JSON.stringify({clientSecretKey}), {status: 200}
        );
    } else {
        return new Response(JSON.stringify({error: `failed to setup payment intent`}), {status: 422});
    };

}