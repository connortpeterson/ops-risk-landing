import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'submissions.json')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, answers } = req.body as {
    email?: string
    answers?: { question: string; answer: string }[]
  }

  if (!email || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Invalid request body' })
  }

  const submission = { email, answers, timestamp: new Date().toISOString() }

  fs.mkdirSync(path.dirname(dataFile), { recursive: true })
  let data: unknown[] = []
  if (fs.existsSync(dataFile)) {
    try {
      data = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
      if (!Array.isArray(data)) data = []
    } catch {
      data = []
    }
  }
  data.push(submission)
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2))

  return res.status(200).json({ message: 'Saved' })
}
