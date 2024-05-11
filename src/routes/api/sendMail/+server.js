import sgMail from "@sendgrid/mail";
import { SENDGRIDAPIKey } from '$env/static/private';

export async function POST({request}) {

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
  }

  const data = await request.json();

  console.log(data);

  const nameFirst = data.nameFirst;
  const nameLast = data.nameLast;
  const subject = data.subject;
  const email = data.email;
  const message = data.message;
  const phoneNumber = data.phone;

  if (
    !nameFirst ||
    !nameLast ||
    !subject ||
    !email ||
    !message 
  ) {
    return new Response(JSON.stringify({error: "missing form data"}), {status: 422});
  };

  if (
    !email.includes('@')
  ) {
    return new Response(JSON.stringify({error: "missing an @ symbol in email address"}), {status: 422});
  };

  // begin sending the message

  sgMail.setApiKey(SENDGRIDAPIKey);

  const msg = [
    {
      to: 'sdewyer@artintechservices.com', // verified sender
      from: 'sdewyer@artintechservices.com', // verified sender
      subject: `message from ${nameFirst} ${nameLast} at ${email}`,
      text: 'sent via the Art in Tech Services contact form',
      html: `hi stephen,<br /><br />
        A message was sent from ${nameFirst} ${nameLast} using the email ${email} and phone number ${phoneNumber}.  
        The following is the message: <br /><br />${message}`
    },
    {
      to: email,
      from: 'sdewyer@artintechservices.com', // verified sender
      subject: `message from ${nameFirst} ${nameLast} at ${email}`,
      text: 'sent via the Art in Tech Services contact form',
      html: `<p>hi ${nameFirst} ${nameLast},<br /><br />thank you for contacting Art in Tech Services.  Your email has been received.<br /><br />Best,<br /><br />stephen dewyer<br />Founding Director of Art in Tech Services<br />www.artintechservices.com</p>`,
    },
  ];

  try {
    await sgMail.send(msg);
    return new Response(JSON.stringify({success: "data sent"}), {status: 200})
  } catch (error) {
    return new Response(JSON.stringify({error: "message not sent due to a problem with the API"}), {status: 422});
  };

  // end sending the message

};