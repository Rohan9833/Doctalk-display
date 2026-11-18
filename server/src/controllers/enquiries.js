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
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !EMAIL_FROM) {
    throw new Error('Email is not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS and EMAIL_FROM.');
  }

  const port = Number(EMAIL_PORT);
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port,
    secure: EMAIL_SECURE === 'true' || port === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
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
