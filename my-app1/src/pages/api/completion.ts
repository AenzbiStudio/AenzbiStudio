import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export default async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    stream: true,
    temperature: 0.6,
    prompt: `Complete the following code or generate code based on this description:\n\n${prompt}\n\nCode:`,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

