import { mysqlConnection } from "$lib/server/db/mysql";
import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';

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
    const website = data.URL;
    const consultationDate = data.consultationDate;
    const consultationTime = data.consultationTime;
    const consultationTimeZone = data.consultationTimeZone;
    const consultationReason = data.consultationReason;

    const date = new Date().toUTCString();

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

    const insertConsultationRequestStatement = `INSERT INTO consultation_requests_public (
        name_first,
        name_last,
        email,
        company,
        phone_number,
        URL,
        consultation_date,
        consultation_time,
        consultation_reason,
        time_zone,
        status
    ) VALUES (
        "${nameFirst}",
        "${nameLast}",
        "${email}",
        "${company}",
        "${phoneNumber}",
        "${website}",
        "${consultationDate}",
        "${consultationTime}",
        "${consultationReason}",
        "${consultationTimeZone}",
        "requested"
    )`;

    await res.query(insertConsultationRequestStatement)
    .then(() => {
        console.log(`consultation request added for ${nameFirst} ${nameLast}`)
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
        subject: `a consultation request was created for ${nameFirst} ${nameLast} at ${email}`,
        text: 'sent via the consultation request form',
        html: `hi stephen,<br /><br />
            A consultation request was created on ${date} for ${nameFirst} ${nameLast} at ${email}.<br />
            The following is a copy of the consultation request:<br />
            -  first name: ${nameFirst}<br />
            -  last name: ${nameLast}<br />
            -  email: ${email}<br />
            -  company: ${company}<br />
            -  phone number: ${phoneNumber}<br />
            -  URL: ${website}<br />
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
        to: email,
        from: 'sdewyer@artintechservices.com', // verified sender
        subject: `consultation request created for ${nameFirst} ${nameLast} at ${email}`,
        text: 'sent via the consultation request form',
        html: `<p>hi ${nameFirst} ${nameLast},
        <br /><br />
        thank you for your consultation request, which was created on ${date}.<br />
        A representative from Art in Tech Services will contact you within 48 hours to schedule your consultation.<br />
        The following is a copy of the consultation request:<br />
        -  first name: ${nameFirst}<br />
        -  last name: ${nameLast}<br />
        -  email: ${email}<br />
        -  company: ${company}<br />
        -  phone number: ${phoneNumber}<br />
        -  URL: ${website}<br />
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
        return new Response(JSON.stringify({success: `created consultation request for ${nameFirst} ${nameLast}`}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: "message not sent due to a problem with the API"}), {status: 422});
    };


}