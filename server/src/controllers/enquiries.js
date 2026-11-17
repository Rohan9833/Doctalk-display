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
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error('Email is not configured. Set RESEND_API_KEY and EMAIL_FROM.');
  }

  const rows = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone || 'Not provided'],
    ['Company / Brand', enquiry.company],
    ['Interested in', enquiry.product],
    ['Requirement', enquiry.message || 'Not provided'],
  ];

  const html = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(value)}</td>
    </tr>
  `).join('');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: ['info@digilateral.com'],
      reply_to: enquiry.email,
      subject: `New DocTalk demo request — ${enquiry.company}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#172033;max-width:680px;margin:0 auto;">
          <h2 style="margin-bottom:8px;">New DocTalk demo request</h2>
          <p style="color:#64748b;margin-top:0;">A visitor submitted the Request Demo form.</p>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
            ${html}
          </table>
        </div>
      `,
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || result.error || `Email provider returned HTTP ${response.status}`);
  }
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
