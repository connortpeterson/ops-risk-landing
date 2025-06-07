import type { NextApiRequest, NextApiResponse } from 'next';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const ip = (Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for'])
    || req.socket.remoteAddress
    || 'unknown';

  const { success } = await ratelimit.limit(ip as string);
  if (!success) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const token = req.body?.hcaptchaToken;
  if (!token) {
    return res.status(400).json({ error: 'Missing hCaptcha token' });
  }

  const verify = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.HCAPTCHA_SECRET ?? '',
      response: token,
      remoteip: ip as string,
    }),
  });

  const result = (await verify.json()) as { success: boolean };
  if (!result.success) {
    return res.status(403).json({ error: 'Invalid hCaptcha token' });
  }

  // TODO: handle actual submission

  return res.status(200).json({ success: true });
}
