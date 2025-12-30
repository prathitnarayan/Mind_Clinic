// backend/services/notificationService.js
import axios from 'axios';
import nodemailer from 'nodemailer';

// Email Configuration
// export const emailTransporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_APP_PASSWORD
//   }
// });

// Send Email Notification
// export const sendEmailNotification = async (appointment) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: appointment.email,
//     subject: 'Appointment Confirmation - Ritesh Mind Clinic',
//     html: `
//       <h2>Appointment Confirmed</h2>
//       <p>Dear ${appointment.name},</p>
//       <p>Your appointment has been confirmed with the following details:</p>
//       <ul>
//         <li><strong>Service:</strong> ${appointment.service}</li>
//         <li><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString('en-IN')}</li>
//         <li><strong>Time:</strong> ${appointment.time}</li>
//         <li><strong>Location:</strong> ${appointment.location || 'To be confirmed'}</li>
//       </ul>
//       <p>Thank you for choosing Ritesh Mind Clinic.</p>
//     `
//   };

//   return emailTransporter.sendMail(mailOptions);
// };

// Send SMS via Twilio
export const sendSMS = async (phone, appointment) => {
  try {
    const formattedDate = new Date(appointment.date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const message = `Hi ${appointment.name},

Your appointment at Ritesh Mind Clinic is confirmed!

📅 Date: ${formattedDate}
🕐 Time: ${appointment.time}
📍 Location: ${appointment.location || 'TBD'}
💼 Service: ${appointment.service}

For any changes, please call us.
Thank you!`;

    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      new URLSearchParams({
        From: process.env.TWILIO_PHONE_NUMBER,
        To: phone,
        Body: message
      }),
      {
        auth: {
          username: process.env.TWILIO_ACCOUNT_SID,
          password: process.env.TWILIO_AUTH_TOKEN
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('SMS error:', error.response?.data || error.message);
    throw error;
  }
};

// Send WhatsApp via Twilio
// export const sendWhatsAppViaTwilio = async (phone, appointment) => {
//   try {
//     const formattedDate = new Date(appointment.date).toLocaleDateString('en-IN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });

//     const message = `Hi ${appointment.name},

// Your appointment at Ritesh Mind Clinic is confirmed!

// 📅 Date: ${formattedDate}
// 🕐 Time: ${appointment.time}
// 📍 Location: ${appointment.location || 'TBD'}
// 💼 Service: ${appointment.service}

// For any changes, please call us.
// Thank you!`;

//     const response = await axios.post(
//       `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
//       new URLSearchParams({
//         From: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
//         To: `whatsapp:${phone}`,
//         Body: message
//       }),
//       {
//         auth: {
//           username: process.env.TWILIO_ACCOUNT_SID,
//           password: process.env.TWILIO_AUTH_TOKEN
//         }
//       }
//     );
    
//     return response.data;
//   } catch (error) {
//     console.error('WhatsApp error:', error.response?.data || error.message);
//     throw error;
//   }
// };