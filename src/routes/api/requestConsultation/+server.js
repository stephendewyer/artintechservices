import { mysqlConnection } from "$lib/server/db/mysql";

export async function POST({request}) {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const nameFirst = data.nameFirst;
    const nameLast = data.nameLast;
    const email = data.email;
    const phoneNumber = data.phone;
    const company = data.company;
    const URL = data.URL;
    const consultationDate = data.consultationDate;
    const consultationTime = data.consultationTime;
    const consultationTimeZone = data.consultationTimeZone;
    const consultationReason = data.consultationReason;

    if (
        !nameFirst ||
        !nameLast ||
        !email ||
        !phoneNumber ||
        !phoneNumber ||
        !consultationDate ||
        !consultationTime ||
        !consultationTimeZone ||
        !consultationReason
    ) {
        return new Response(JSON.stringify({error: "missing form data"}), {status: 422});
    };

    if (
        !email.includes('@')
    ) {
        return new Response(JSON.stringify({error: "missing an @ symbol in email address"}), {status: 422});
    };

    let res = await mysqlConnection();

    res.end();


}