/* =========================================================
   CONTACT API
   ---------------------------------------------------------
   Receives contact form data and sends it to
   Rakshit's Gmail using Resend.
========================================================= */

export default async function handler(req, res) {

    /* =========================================================
       ONLY POST REQUEST ALLOWED
    ========================================================= */

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });

    }


    /* =========================================================
       GET FORM DATA
    ========================================================= */

    const {
        name,
        email,
        subject,
        message
    } = req.body || {};


    /* =========================================================
       VALIDATION
    ========================================================= */

    if (
        !name ||
        !email ||
        !subject ||
        !message
    ) {

        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });

    }


    /* =========================================================
       CHECK RESEND API KEY
    ========================================================= */

    if (!process.env.RESEND_API_KEY) {

        return res.status(500).json({
            success: false,
            message: "Email service is not configured."
        });

    }


    /* =========================================================
       SEND EMAIL USING RESEND
    ========================================================= */

    try {

        const response =
            await fetch(
                "https://api.resend.com/emails",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${process.env.RESEND_API_KEY}`
                    },

                    body: JSON.stringify({

                        from:
                            "Portfolio <onboarding@resend.dev>",

                        to: [
                            "rakshitchaturvedi198@gmail.com"
                        ],

                        reply_to:
                            email,

                        subject:
                            `Portfolio Contact: ${subject}`,

                        text:
`Hello Rakshit,

You received a new message from your portfolio website.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

--------------------------------
Sent from Rakshit Portfolio
`
                    })
                }
            );


        /* =========================================================
           RESEND RESPONSE
        ========================================================= */

        const data =
            await response.json();


        /* =========================================================
           ERROR FROM RESEND
        ========================================================= */

        if (!response.ok) {

            console.error(
                "Resend error:",
                data
            );

            return res.status(500).json({
                success: false,
                message:
                    "Failed to send email."
            });

        }


        /* =========================================================
           SUCCESS
        ========================================================= */

        return res.status(200).json({
            success: true,
            message:
                "Message sent successfully!"
        });


    }


    /* =========================================================
       SERVER ERROR
    ========================================================= */

    catch (error) {

        console.error(
            "Contact API error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while sending the message."
        });

    }

}