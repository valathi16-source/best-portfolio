import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Simple in-memory rate limiting: max 5 requests per IP every 15 minutes
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 5;

  const clientData = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + windowMs;
  } else {
    clientData.count += 1;
  }

  rateLimitMap.set(ip, clientData);
  return clientData.count <= maxRequests;
}

router.post('/', async (req, res) => {
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';

  // Anti-spam rate limiting
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many transmissions detected from your terminal. Please wait 15 minutes before sending another message.',
    });
  }

  const { name, email, subject, message, website } = req.body;

  // Anti-spam Honeypot field: If a bot fills out the hidden "website" field, silently accept without action
  if (website) {
    return res.status(200).json({
      success: true,
      message: 'Transmission received.',
    });
  }

  // Input Validation
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Please provide a valid name (minimum 2 characters).' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  if (!subject || subject.trim().length < 3) {
    return res.status(400).json({ success: false, message: 'Please provide a message subject (minimum 3 characters).' });
  }

  if (!message || message.trim().length < 10) {
    return res.status(400).json({ success: false, message: 'Please provide a message body (minimum 10 characters).' });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'valathi.developer@example.com';

  const isSmtpConfigured =
    smtpHost &&
    smtpUser &&
    smtpPass &&
    smtpUser !== 'your_email@gmail.com' &&
    smtpPass !== 'your_gmail_app_password';

  if (isSmtpConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} [Portfolio]" <${smtpUser}>`,
        replyTo: email,
        to: receiverEmail,
        subject: `[Portfolio Contact] ${subject}`,
        text: `From: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #050814; color: #f8fafc; padding: 24px; border-radius: 8px;">
            <h2 style="color: #00f5ff; border-bottom: 2px solid #00f5ff; padding-bottom: 8px;">New Portfolio Transmission</h2>
            <p><strong>Sender:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background: #0d1533; padding: 16px; border-left: 4px solid #a855f7; margin-top: 16px; border-radius: 4px;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Received via Valathi Futuristic Portfolio Contact Pipeline</p>
          </div>
        `,
      });

      return res.status(200).json({
        success: true,
        message: 'Your transmission has been encrypted and delivered directly to Valathi\'s inbox!',
        delivered: true,
      });
    } catch (err) {
      console.error('[Contact Form] Nodemailer send error:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to deliver transmission due to mail server communication error. Please try again later.',
      });
    }
  } else {
    // When SMTP credentials are not yet set in .env, record in server logs and inform the sender transparently
    console.log('\n======================================================');
    console.log('[VALATHI PORTFOLIO] CONTACT TRANSMISSION RECEIVED:');
    console.log(`Timestamp : ${new Date().toISOString()}`);
    console.log(`From      : ${name} <${email}>`);
    console.log(`Subject   : ${subject}`);
    console.log(`Message   :\n${message}`);
    console.log('NOTE: Configure SMTP credentials in .env to route to a real inbox.');
    console.log('======================================================\n');

    return res.status(200).json({
      success: true,
      message: 'Transmission successfully received and logged by the server! (Notice: Configure SMTP in .env to dispatch real emails to your personal inbox).',
      delivered: false,
      isLocalLogMode: true,
    });
  }
});

export default router;
