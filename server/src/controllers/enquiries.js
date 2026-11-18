import nodemailer from 'nodemailer';
import Enquiry from '../models/Enquiry.js';

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);

async function sendEnquiryEmail(enquiry) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_FROM) {
    throw new Error('Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and EMAIL_FROM.');
  }

  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone || 'Not provided'],
    ['Company / Brand', enquiry.company],
    ['Interested in', enquiry.product],
    ['Requirement', enquiry.message || 'Not provided'],
  ];

  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(value)}</td>
    </tr>
  `).join('');

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: 'info@digilateral.com',
    replyTo: enquiry.email,
    subject: `New DocTalk demo request — ${enquiry.company}`,
    text: [
      'A visitor submitted the DocTalk Request Demo form.',
      ...rows.map(([label, value]) => `${label}: ${value}`),
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;color:#172033;max-width:680px;margin:0 auto;">
        <h2>New DocTalk demo request</h2>
        <p style="color:#64748b;">A visitor submitted the Request Demo form.</p>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">${htmlRows}</table>
      </div>
    `,
  });
}

export async function createEnquiry(req, res, next) {
  try {
    const { website, ...data } = req.validatedEnquiry;
    if (website) {
      return res.status(200).json({ message: 'Thank you. Your enquiry has been received.' });
    }

    const enquiry = await Enquiry.create(data);

    try {
      await sendEnquiryEmail(enquiry);
    } catch (emailError) {
      console.error('Enquiry was saved, but the notification email failed:', emailError);
      return res.status(502).json({
        message: 'Your enquiry was saved, but we could not send the email notification. Please contact us directly.',
      });
    }

    return res.status(201).json({ message: 'Thank you. Your enquiry has been received.' });
  } catch (error) {
    next(error);
  }
}
