import { mysqlConnection } from "$lib/server/db/mysql";
import { redirect } from "@sveltejs/kit";

// @ts-ignore
export const load = async (/** @type {{ locals: { auth: () => any; }; }} */ event) => {

    const session = await event.locals.auth();
    
    const clientEmail = session?.user?.email;
    
    const tokenSearchValue = event.url.searchParams.get("token");

    let deleteAccountTokenExpiration = 0;
    let deleteAccountToken = "";

    // check if token matches user's reset_token in client row

    const clientTokenQuery = `SELECT 
            clients.delete_account_token, 
            clients.delete_account_token_expiration
        FROM clients
        WHERE email = "${clientEmail}"
    `;

    const res = await mysqlConnection();

    await res.query(clientTokenQuery)
    .then(([rows]) => {
        deleteAccountToken = JSON.parse(JSON.stringify(rows))[0].delete_account_token;
        deleteAccountTokenExpiration = JSON.parse(JSON.stringify(rows))[0].delete_account_token_expiration;
    })
    .catch(error => {
        throw error;
    });

    if (deleteAccountToken !== tokenSearchValue) {
        console.log("delete account token in params does match delete account token in database ")
        throw redirect(303, "/authenticated-client/client/delete-account/invalid-delete-account-token");
    };

    if (deleteAccountTokenExpiration <= Date.now()) {
        console.log("delete account token expired");
        throw redirect(303, "/authenticated-client/client/delete-account/delete-account-token-expired");
    };

    // Token is valid.  

    res.end();

    return {

    };
    
}