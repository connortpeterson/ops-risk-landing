import type { NextApiRequest, NextApiResponse } from 'next'
import { scoreCompany } from '../../lib/scoreCompany'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const { ticker } = body ?? {}

  if (!ticker || typeof ticker !== 'string') {
    res.status(400).json({ error: 'Invalid ticker' })
    return
  }

  const result = await scoreCompany(ticker)
  res.status(200).json(result)
}
