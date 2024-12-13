const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

exports.handler = async (event) => {
  try {
    const { name, phone, email, subject, message } = JSON.parse(event.body);

    const emailData = {
      to: ['bladelucas032@gmail.com'],
      //to: ['bladelucas032@gmail.com', 'adam.kunz+inft@durhamcollege.ca'],
      from: 'blade.lucas@dcmail.ca',
      subject: `[Auto Contact] ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await sgMail.send(emailData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};