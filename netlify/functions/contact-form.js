import fetch from 'node-fetch';  // Make sure fetch is correctly imported

let fetch;
exports.handler = async (event) => {
    try {
        fetch = await import('node-fetch'); // Dynamically import node-fetch
    } catch (error) {
        console.error('Error importing fetch:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error loading fetch" }),
        };
    }

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