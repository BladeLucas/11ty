const fetch = require('node-fetch');  // Ensure that fetch is properly imported

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        console.error('Invalid HTTP method: ', event.httpMethod);
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    let requestBody;
    try {
        requestBody = JSON.parse(event.body);
    } catch (error) {
        console.error('Error parsing request body:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid request body format" }),
        };
    }

    const { name, phone, email, subject, message } = requestBody;

    if (!name || !email || !subject || !message) {
        console.error('Missing required fields:', { name, email, subject, message });
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "All fields are required." }),
        };
    }

    // Use your alias to filter emails (replace with your actual alias)
    const yourEmailAlias = 'blade.lucas@dcmail.ca';  
    //const targetEmail = 'adam.kunz+inft@durhamcollege.ca'; // Replace with recipient email

    const subjectPrefix = "[Automated Message] ";
    const emailSubject = subjectPrefix + subject;

    // Send email to both recipients
    const sendEmail = async (to, subject, text) => {
        const emailData = {
            to: to,
            subject: subject,
            text: `From: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n\n${message}`,
        };

        try {
            const response = await fetch('https://your-email-service-api-endpoint.com/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer your-email-api-key`,  // Use appropriate authorization header for your service
                },
                body: JSON.stringify(emailData),
            });

            if (!response.ok) {
                throw new Error('Email sending failed');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    };

    try {
        // Send the email to both recipients
        await sendEmail(yourEmailAlias, emailSubject, message);
        //await sendEmail(targetEmail, emailSubject, message);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Form submitted successfully." }),
        };
    } catch (error) {
        console.error('Error during form submission:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An internal server error occurred." }),
        };
    }
};