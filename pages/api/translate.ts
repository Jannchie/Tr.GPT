// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
export interface ReqBody {
  messages: Message[]
  model?: string
  token?: string
}

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const url = 'https://api.openai.com/v1/chat/completions'
    const data = req.body
    if (!data) { res.status(400).json({ message: 'Bad request' }); return }
    if (!data.model) {
      data.model = 'gpt-3.5-turbo'
    }
    const token = process.env.OPENAI_API_KEY
    if (token) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
      delete data.token
      const options = {
        headers,
        method: 'POST',
        body: JSON.stringify(data),
      }
      const resp = await fetch(url, options)
      res.status(200).json(await resp.json())
    } else {
      res.status(500).json({ message: 'Server error' })
    }
    return
  }
  res.status(404).json({ message: 'Not found' })
}
