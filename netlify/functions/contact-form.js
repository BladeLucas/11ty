/*const fetch = require('node-fetch');  // Make sure fetch is correctly imported

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
    const apiKey = '9122419ab5a1774309cdef054f0794c9-us15';
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
};*/
const fetch = require('node-fetch');

exports.handler = async (event) => {
    console.log("Received event:", event);  // Log the event for debugging

    if (event.httpMethod !== 'POST') {
        console.log("Invalid HTTP method:", event.httpMethod);
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    let formData;
    try {
        formData = JSON.parse(event.body);
        console.log("Parsed form data:", formData);  // Log parsed data
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid JSON body" }),
        };
    }

    const { name, phone, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
        console.error("Missing required fields:", formData);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "All fields are required." }),
        };
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = apiKey.split('-')[1]; // Extract the server prefix
    const audienceId = process.env.MAILCHIMP_LIST_ID; // Mailchimp audience ID

    if (!apiKey || !audienceId) {
        console.error("Missing Mailchimp configuration");
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Mailchimp configuration missing." }),
        };
    }

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/`;
    const data = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: name,
            PHONE: phone || "",
            SUBJECT: subject,
            MESSAGE: message,
        },
    };

    console.log("Sending data to Mailchimp:", data);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `apikey ${apiKey}`,
            },
            body: JSON.stringify(data),
        });

        console.log("Mailchimp response status:", response.status);

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
                body: JSON.stringify({ message: errorResponse.detail || "Failed to submit form." }),
            };
        }
    } catch (error) {
        console.error("Error occurred while calling Mailchimp:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An internal server error occurred." }),
        };
    }
};