import express from 'express';
import Appointment from '../models/Appointment.js';
import { sendEmailNotification, sendWhatsAppViaTwilio } from '../services/notificationService.js';

const router = express.Router();

router.post('/appointments', async (req, res) => {
  try {
    const { name, email, phone, service, date, time, notes } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Save appointment to database
    const appointment = new Appointment({
      name,
      email,
      phone,
      service,
      date,
      time,
      notes: notes || '',
      status: 'confirmed',
      createdAt: new Date()
    });

    await appointment.save();

    // Send notifications (don't let failures stop the booking)
    const notifications = [];
    
    // Send Email
    try {
      await sendEmailNotification(appointment);
      notifications.push({ type: 'email', status: 'sent' });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      notifications.push({ type: 'email', status: 'failed' });
    }

    // Send WhatsApp
    try {
      await sendWhatsAppViaTwilio(phone, appointment);
      notifications.push({ type: 'whatsapp', status: 'sent' });
    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', whatsappError);
      notifications.push({ type: 'whatsapp', status: 'failed' });
    }

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment,
      notifications
    });

  } catch (error) {
    console.error('Appointment creation error:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

export default router;