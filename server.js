// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (optional if you want to host the frontend with the backend)
app.use(express.static('frontend'));

// POST route for sending email
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required!');
    }

    try {
        // Set up the Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Use your email provider
            auth: {
                user: 'srinivasnaren007@gmail.com', // Your Gmail address
                pass: 'fert jowd ztli lymv',   // App password generated in your Google account
            },
        });

        // Email options
        const mailOptions = {
            from: email,
            to: 'srinivasnaren007@gmail.com', // Replace with your email
            subject: `Contact Form Submission from ${name}`,
            text: `You have a new message from ${name} (${email}):\n\n${message}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email. Please try again later.');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

