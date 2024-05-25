import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST = async ({request}) => {

    const data = await request.json();

    const { paymentMethodID } = data;

    const paymentMethod = await stripe.paymentMethods.detach(
        paymentMethodID
    );

    if (paymentMethod) {
        return new Response(JSON.stringify({...paymentMethod}), {status: 200});
    } else {
        return new Response(JSON.stringify({message: "failed to detach payment method"}))
    };

}