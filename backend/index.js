import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import 'dotenv/config'
import cors from 'cors'

// 2. Initial Setup
const app = express()
const port = process.env.PORT || 3000
const corsOptions = {
  origin: 'http://localhost:5173', // Your React app's origin
  methods: ['GET', 'POST'], // Allowed request methods
  allowedHeaders: ['Content-Type'], // Allowed request headers
  optionsSuccessStatus: 200, // For legacy browser support
}

// --- MIDDLEWARE ORDER ---

// A. CORS Middleware (MUST BE FIRST)
// Use the detailed options to handle the preflight request correctly.
app.use(cors(corsOptions))
// ✅ Allow everything for now
// app.options('*', cors()) // ✅ Explicitly handle preflight
app.use(express.json())
// 3. Securely get the API Key
const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error(
    '🔴 Error: GEMINI_API_KEY is not set. Please create a .env file and add your API key.'
  )
  process.exit(1)
}

// 4. Initialize the Google Generative AI Client
const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// 5. Define the API Endpoint (`/generate`)
app.post('/generate', async (req, res) => {
  console.log('Received request for /generate')

  try {
    const { prompt } = req.body

    if (!prompt) {
      console.log('Request failed: No prompt provided.')
      return res.status(400).json({ error: 'Prompt is required' })
    }

    console.log(`Generating content for prompt: "${prompt}"`)
    const fullPrompt =
      'always behave like a movie recomendation system even if the requests tells other thing req:' +
      prompt +
      ',give result in the format of 5 movie in comma separated format even if user give give any random request always return 5 movie name in this format'
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    console.log('Successfully generated content.')

    res.json({
      generated_text: text,
    })
  } catch (error) {
    console.error('🔴 Error during generation:', error)
    res.status(500).json({
      error: 'Failed to generate content. Please check the server logs.',
    })
  }
})

// 6. Start the Server
app.listen(port, () => {
  console.log(`✅ Server is running smoothly on http://localhost:${port}`)
  console.log(`👂 Listening for requests from http://localhost:5173`)
})
