import { mysqlConnection } from "$lib/server/db/mysql";
import { redirect } from "@sveltejs/kit";

// @ts-ignore
export const load = async (/** @type {{ locals: { auth: () => any; }; }} */ event) => {

    const session = await event.locals.auth();
    
    const clientEmail = session?.user?.email;
    
    const tokenSearchValue = event.url.searchParams.get("token");

    let savedEmailTokenExpiration = 0;
    let savedEmailToken = "";
    let newEmail = "";

    // check if token matches user's change_email_token in client row

    const clientTokenQuery = `SELECT 
            clients.change_email_token, 
            clients.change_email_token_expiration, 
            client_information.Stripe_customer_ID,
            clients.new_email
        FROM clients
        INNER JOIN client_information ON clients.user_ID = client_information.client_ID
        WHERE email = "${clientEmail}"
    `;

    const res = await mysqlConnection();

    await res.query(clientTokenQuery)
    .then(([rows]) => {
        savedEmailTokenExpiration = JSON.parse(JSON.stringify(rows))[0].change_email_token_expiration;
        savedEmailToken = JSON.parse(JSON.stringify(rows))[0].change_email_token;
        newEmail = JSON.parse(JSON.stringify(rows))[0].new_email;
    })
    .catch(error => {
        throw error;
    });

    if (savedEmailToken !== tokenSearchValue) {
        console.log("failed to find matching client email using email in session ")
        throw redirect(303, "/authenticated-client/client/change-email/token-does-not-match");
    };

    if (savedEmailTokenExpiration <= Date.now()) {
        console.log("email change token expired");
        throw redirect(303, "/authenticated-client/client/change-email/token-expired");
    };

    // Token is valid.  

    res.end();

    return {
        newEmail: newEmail
    };

    
}