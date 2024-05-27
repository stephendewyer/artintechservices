import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const userEmail = data.userEmail;

    // get client data

    /**
     * @type {string}
     */
    let clientNameFirst = "";
    /**
     * @type {string}
     */
    let clientNameLast = "";

    let clientID;

    const selectClientQuery = `SELECT user_ID, name_first, name_last
        FROM clients
        WHERE email = "${userEmail}"`;
    
    let res = await mysqlConnection();

    await res.query(selectClientQuery)
    .then(([rows]) => {
        clientID = JSON.parse(JSON.stringify(rows))[0].user_ID;
        clientNameFirst = JSON.parse(JSON.stringify(rows))[0].name_first;
        clientNameLast = JSON.parse(JSON.stringify(rows))[0].name_last;
    })
    .catch(error => {
        throw error;
    });

    const consultationDate = data.consultationDate;
    const consultationTime = data.consultationTime;
    const consultationTimeZone = data.consultationTimeZone;
    const consultationReason = data.consultationReason;

    const date = new Date().toUTCString();

    console.log(data);

    if (
        !consultationDate ||
        !consultationTime ||
        !consultationTimeZone ||
        !consultationReason
    ) {
        return new Response(JSON.stringify({error: "missing form data"}), {status: 422});
    };

    const insertConsultationRequestStatement = `INSERT INTO consult_requests_client (
        client_ID,
        consultation_date,
        consultation_time,
        consultation_reason,
        time_zone,
        status
    ) VALUES (
        ${clientID},
        "${consultationDate}",
        "${consultationTime}",
        "${consultationReason}",
        "${consultationTimeZone}",
        "requested"
    )`;

    await res.query(insertConsultationRequestStatement)
    .then(() => {
        console.log(`consultation request added for ${clientNameFirst} ${clientNameLast}`)
    })
    .catch(error => {
        console.log(error);
        throw error;
    });

    res.end();

    // begin sending the message

    sgMail.setApiKey(SENDGRIDAPIKey);

    const msg = [
        {
        to: 'sdewyer@artintechservices.com', // verified sender
        from: 'sdewyer@artintechservices.com', // verified sender
        subject: `a consultation request was created for ${clientNameFirst} ${clientNameLast} at ${userEmail}`,
        text: 'sent via the consultation request form',
        html: `hi stephen,<br /><br />
            A consultation request was created on ${date} for ${clientNameFirst} ${clientNameLast} at ${userEmail}.<br />
            The following is a copy of the consultation request:<br />
            -  first name: ${clientNameFirst}<br />
            -  last name: ${clientNameLast}<br />
            -  email: ${userEmail}<br />
            -  consultation date: ${consultationDate}<br />
            -  consultation time: ${consultationTime}<br />
            -  consultation time zone: ${consultationTimeZone}<br />
            -  consultation reason: ${consultationReason}<br />
            <br />
            Best,<br /><br />
            stephen dewyer<br />
            Founding Director, UX Designer and Full-stack Web Developer<br />
            Art in Tech Services<br />
            www.artintechservices.com</p>`
        },
        {
        to: userEmail,
        from: 'sdewyer@artintechservices.com', // verified sender
        subject: `consultation request created for ${clientNameFirst} ${clientNameLast} at ${userEmail}`,
        text: 'sent via the consultation request form',
        html: `<p>hi ${clientNameFirst} ${clientNameLast},
        <br /><br />
        thank you for your consultation request, which was created on ${date}.<br />
        A representative from Art in Tech Services will contact you within 48 hours to schedule your consultation.<br />
        The following is a copy of the consultation request:<br />
        -  first name: ${clientNameFirst}<br />
        -  last name: ${clientNameLast}<br />
        -  email: ${userEmail}<br />
        -  consultation date: ${consultationDate}<br />
        -  consultation time: ${consultationTime}<br />
        -  consultation time zone: ${consultationTimeZone}<br />
        -  consultation reason: ${consultationReason}<br />
        <br />
        Best,<br /><br />
        stephen dewyer<br />
        Founding Director, UX Designer and Full-stack Web Developer<br />
        Art in Tech Services<br />
        www.artintechservices.com</p>`
        },
    ];

    try {
        await sgMail.send(msg);
        return new Response(JSON.stringify({success: `created consultation request for ${clientNameFirst} ${clientNameLast}`}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: "message not sent due to a problem with the API"}), {status: 422});
    };


}