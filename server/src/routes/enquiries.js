import express from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { createEnquiry } from '../controllers/enquiries.js';

const router = express.Router();

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many requests. Please try again later.' },
});

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().default(''),
  company: z.string().trim().min(2).max(120),
  product: z.enum(['All three formats', 'DocTalk', 'DocTalk Quiz', 'DocTalk Show']).default('All three formats'),
  message: z.string().trim().max(2000).optional().default(''),
  website: z.string().max(200).optional().default(''),
}).strict();

router.post('/', limit, (req, res, next) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: 'Please check the form fields.',
      issues: parsed.error.flatten().fieldErrors,
    });
  }

  req.validatedEnquiry = parsed.data;
  return createEnquiry(req, res, next);
});

export default router;
