// backend/config/notifications.js
import nodemailer from 'nodemailer';
import axios from 'axios';

// Email Configuration (using Gmail)
export const emailTransporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your-email@gmail.com
    pass: process.env.EMAIL_APP_PASSWORD // App password from Gmail
  }
});

// WhatsApp Configuration (using Twilio)
export const sendWhatsAppMessage = async (to, message) => {
  try {
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      new URLSearchParams({
        From: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        To: `whatsapp:${to}`,
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
    console.error('WhatsApp error:', error);
    throw error;
  }
};

// Alternative: WhatsApp using Meta (WhatsApp Business API)
// export const sendWhatsAppViaM eta = async (to, message) => {
//   try {
//     const response = await axios.post(
//       `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
//       {
//         messaging_product: 'whatsapp',
//         to: to,
//         type: 'text',
//         text: { body: message }
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('WhatsApp Meta error:', error);
//     throw error;
//   }
// };