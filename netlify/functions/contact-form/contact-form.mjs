const fetch = require('node-fetch');  // Make sure fetch is correctly imported

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    const { name, phone, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "All fields are required." }),
        };
    }

    // Mailchimp API configuration
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = apiKey.split('-')[1]; // Extract the server prefix from the API key
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
        const response = await fetch(url, {  // Make sure `fetch` is used
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `apikey ${apiKey}`,
            },
            body: JSON.stringify(data),
        });

        if (response.status === 201) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Form submitted successfully." }),
            };
        } else {
            const errorResponse = await response.json();
            console.error("Mailchimp error:", errorResponse);
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    message: errorResponse.detail || "Failed to submit form.",
                    error: errorResponse,
                }),
            };
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An internal server error occurred." }),
        };
    }
};