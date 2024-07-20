import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';
import { htmlEntities } from "$lib/util/htmlEntities.js";

export const PATCH = async ({request}) => {

    if (request.method !== "PATCH") {
        return new Response(JSON.stringify({error: "method is not PATCH"}), {status: 422});
    };

    const data = await request.json();

    const {
        consultationRequestID,
        userEmail, 
        consultationDate, 
        consultationTime, 
        consultationTimeZone, 
        consultationReason
    } = data;

    console.log(data);

    const updateConsultationRequestStatement = `UPDATE consult_requests_client
        SET
            consultation_date = "${consultationDate}",
            consultation_time = "${consultationTime}",
            consultation_reason = "${htmlEntities(consultationReason)}",
            time_zone = "${consultationTimeZone}"
        WHERE 
            request_ID = ${consultationRequestID}
    ;`;

    let res = await mysqlConnection();

    await res.query(updateConsultationRequestStatement)
    .then(() => {
        console.log("updated consultation request")
    }) 
    .catch(error => {
        throw error;
    });

    const selectClientQuery = `SELECT name_first, name_last
        FROM clients
        WHERE email = "${userEmail}"
    ;`;

    let clientNameFirst;

    let clientNameLast

    await res.query(selectClientQuery)
    .then(([rows]) => {
        clientNameFirst = JSON.parse(JSON.stringify(rows))[0].name_first;
        clientNameLast = JSON.parse(JSON.stringify(rows))[0].name_last;
    })
    .catch(error => {
        throw error;
    });

    res.end();

    // // begin sending the message

    sgMail.setApiKey(SENDGRIDAPIKey);

    const msg = [
        {
        to: 'sdewyer@artintechservices.com', // verified sender
        from: 'sdewyer@artintechservices.com', // verified sender
        subject: `a consultation request was updated for ${clientNameFirst} ${clientNameLast} at ${userEmail}`,
        text: 'sent via the client update consultation request form',
        html: `hi stephen,<br /><br />
            A consultation request was updated on ${new Date().toUTCString()} for ${clientNameFirst} ${clientNameLast} at ${userEmail}.<br />
            The following is a copy of the updated consultation request:<br />
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
        subject: `consultation request updated for ${clientNameFirst} ${clientNameLast} at ${userEmail}`,
        text: 'sent via the client update consultation request form',
        html: `<p>hi ${clientNameFirst} ${clientNameLast},
        <br /><br />
        your consultation request has been updated.<br />
        A representative from Art in Tech Services will contact you within 48 hours to confirm your consultation.<br />
        The following is a copy of your updated consultation request:<br />
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
        return new Response(JSON.stringify({success: `updated consultation request for ${clientNameFirst} ${clientNameLast}`}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: "message not sent due to a problem with the API"}), {status: 422});
    };

}