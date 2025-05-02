import { mysqlConnection } from "$lib/server/db/mysql";
import { redirect } from "@sveltejs/kit";

// @ts-ignore
export const load = async (/** @type {{ locals: { auth: () => any; }; }} */ event) => {

    const session = await event.locals.auth();
    
    const clientEmail = session?.user?.email;
    
    const tokenSearchValue = event.url.searchParams.get("token");

    let resetTokenExpiration = 0;
    let resetToken = "";

    // check if token matches user's reset_token in client row

    const clientTokenQuery = `SELECT 
            clients.reset_token, 
            clients.reset_token_expiration
        FROM clients
        WHERE email = "${clientEmail}"
    `;

    const res = await mysqlConnection();

    await res.query(clientTokenQuery)
    .then(([rows]) => {
        resetTokenExpiration = JSON.parse(JSON.stringify(rows))[0].reset_token_expiration;
        resetToken = JSON.parse(JSON.stringify(rows))[0].reset_token;
    })
    .catch(error => {
        throw error;
    });

    if (resetToken !== tokenSearchValue) {
        console.log("reset password token in params does match reset password token in database ")
        throw redirect(303, "/authenticated-client/client/update-password/incorrect-reset-password-token");
    };

    // if (resetTokenExpiration <= Date.now()) {
    //     console.log("reset password token expired");
    //     throw redirect(303, "/authenticated-client/client/update-password/reset-password-token-expired");
    // };

    // Token is valid.  

    res.end();

    return {

    };
    
}