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

    // Mailchimp API configuration
    const apiKey = '9122419ab5a1774309cdef054f0794c9-us15';
    const serverPrefix = apiKey.split('-')[1]; // Extract server prefix from API key
    const audienceId = '16ec49a15f'; // Mailchimp audience ID

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/`;

    const data = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: name,
            PHONE: phone || "",  // Default empty string if phone is not provided
            SUBJECT: subject,
            MESSAGE: message,
        },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `apikey ${apiKey}`,
            },
            body: JSON.stringify(data),
        });

        if (response.status === 201) {
            console.log('Form submitted successfully.');
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Form submitted successfully." }),
            };
        } else {
            const errorResponse = await response.json();
            console.error('Mailchimp API error:', errorResponse);
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    message: errorResponse.detail || "Failed to submit form.",
                    error: errorResponse,
                }),
            };
        }
    } catch (error) {
        console.error('Error making request to Mailchimp:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An internal server error occurred." }),
        };
    }
};