import { mysqlConnection } from "$lib/server/db/mysql";

// @ts-ignore
export const load = async (/** @type {{ locals: { auth: () => any; }; }} */ event, {url}) => {
    
    const session = await event.locals.auth();

    const clientEmail = session?.user?.email;
    
    const tokenSearchValue = url.searchParams.get("token");

    // check if token matches user's change_email_token in client row

    const tokenUpdateStatement = `UPDATE clients
    SET 
        change_email_token = "${token}", 
        change_email_token_expiration = "${tokenExpDate}" 
    WHERE email = "${email}";`
    
}