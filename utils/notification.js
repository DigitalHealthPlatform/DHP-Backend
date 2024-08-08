import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,    // Your email address
    pass: process.env.GMAIL_PASS     // Your app password or email password
  }
});

export const sendNotification = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: subject,
    text: text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};
