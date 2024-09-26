const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'royr55601@gmail.com',
    pass: 'iseq vxvn ydog agna', // Make sure to use an app password or enable less secure apps
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

// Route to handle form submissions
app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;
  const currentDate = new Date();

  const mailOptions = {
    from: '"Portfolio Assistant" <royr55601@gmail.com>',
    to: 'royr55601@gmail.com',
    subject: 'New Contact from Your Portfolio Website',
    text: `Dear Rishi Roy,

You've received a new message through your portfolio website. Here are the details:

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Message:
${message}

This inquiry was received on ${currentDate.toLocaleDateString()} at ${currentDate.toLocaleTimeString()}.

Remember to respond promptly to maintain professional communication. If you need to follow up on any details, all the necessary contact information is provided above.

Best regards,
Your Portfolio Assistant`
  };

  const sendmailOptions = {
    from: '"Rishi Roy" <royr55601@gmail.com>',
    to: email,
    subject: 'Thank You for Contacting Rishi Roy',
    text: `Dear ${name},

Thank you for reaching out through my portfolio website. I appreciate your interest and the time you've taken to contact me.

I've received your message and will review it carefully. You can expect a response from me within the next 1-2 business days. If your matter is urgent, please feel free to reach out to me directly at +91-9915862688.

Here's a summary of the information you provided:
- Name: ${name}

If you need to add any information to your initial message, please don't hesitate to reply to this email.

Thank you once again for your interest. I look forward to the opportunity to connect with you soon.

Best regards,
Rishi Roy
[Your Portfolio URL]`
  };

  try {
    // Send notification email
    await transporter.sendMail(mailOptions);
    
    // Send thank you email
    await transporter.sendMail(sendmailOptions);

    res.status(200).send({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email', error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});