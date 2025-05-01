import { mysqlConnection } from "$lib/server/db/mysql";
import { htmlEntities } from "$lib/util/htmlEntities.js";
import { STRIPE_SECRET_KEY } from "$env/static/private";
import Stripe from "stripe";

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const PATCH = async ({request}) => {

    if (request.method !== "PATCH") {
        return new Response(JSON.stringify({error: "method is not PATCH"}), {status: 422});
    };

    const data = await request.json();

    const sessionEmail = data.sessionEmail;

    const newEmail = data.newEmail;

    // check if token matches user's change_email_token in client row
    
        const clientTokenQuery = `SELECT 
                client_information.Stripe_customer_ID
            FROM clients
            INNER JOIN client_information ON clients.user_ID = client_information.client_ID
            WHERE email = "${sessionEmail}"
        `;
    
        const res = await mysqlConnection();

        let stripeCustomerID = "";
    
        await res.query(clientTokenQuery)
        .then(([rows]) => {
            stripeCustomerID = JSON.parse(JSON.stringify(rows))[0].Stripe_customer_ID;
        })
        .catch(error => {
            throw error;
        });
    
        // Update customer email in Stripe.
    
        try {
            await stripe.customers.update(
                stripeCustomerID,
                {
                    email: newEmail
                }
            );
        } catch (error) {
            console.log(error);
        };
    
        // Update client email in MySQL
    
        const updateClientEmailStatement = `UPDATE clients
            SET
            email = "${newEmail}",
            previous_login = now()
            WHERE email = "${sessionEmail}"
        `;
    
        await res.query(updateClientEmailStatement)
        .then(() => {
            console.log("updated client email")
        })
        .catch(error => {
            throw error;
        });
    
        res.end();
    
        // update session email

    return new Response(JSON.stringify({success: "updated client email"}), {status: 200});
}
