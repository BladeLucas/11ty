const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');  // Replace with your SendGrid API key

exports.handler = async (event) => {
  try {
    // Parse incoming JSON request body
    const { name, phone, email, subject, message } = JSON.parse(event.body);

    // Construct the email
    const emailData = {
      to: ['blade.lucas@cdmail.ca'],
      //to: ['your-email@domain.com', 'adam.kunz+inft@durhamcollege.ca'],  // Add recipients
      from: 'blade.lucas@dcmail.ca',  // Replace with your email
      subject: `[Auto Contact] ${subject}`,  // Add a prefix to the subject line
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send the email via SendGrid
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