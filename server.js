import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

let chatHistory = [
    { role: "system", content: "je bent een behulpzaame strandwacht van het strand dishoek in zeeland en expert in het weer." +
            "jij kan op ieder moment van de dag de meest actuele data gebruiken om het weer " +
            "te voorspellen op de huidige dag, en latere data als hierom gevraagd wordt" +
            "dit doe jij op een simpele manier waar je antwoord met de belangrijkste dingen" +
            "Waneer het hoog en laag water is die dag, Wat voor uv het is " +
            "welk weer, zon , regen of bewolkt bijvoorbeeld" +
            "Wat de wind vandaag doet en hoe sterk deze is in beaufort" +
            "praat in makkenlijke taal" +
            "zorg dat de belangrijke data er in staat zonder extra onzin"}
]

app.post('/ask', async (req, res) => {
    const { message } = req.body
    if (!message) return res.status(400).json({ error: 'Message is required' })

    chatHistory.push({ role: 'user', content: message })

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    try {
        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'mistral',
                messages: chatHistory,
                stream: true
            })
        })

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        let fullMessage = ""

        while (true) {
            const { value, done } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })

            // Ollama streams multiple JSON chunks
            const parts = chunk.trim().split('\n')
            for (const part of parts) {
                if (!part) continue
                const parsed = JSON.parse(part)
                const token = parsed.message?.content || ''
                fullMessage += token

                res.write(`data: ${token}\n\n`)
            }
        }

        chatHistory.push({ role: 'assistant', content: fullMessage })
        res.end()

    } catch (err) {
        console.error('Stream error:', err)
        res.write(`data: [ERROR]: ${err.message}\n\n`)
        res.end()
    }
})

app.listen(3000, () => console.log('🔵 Server running on http://localhost:3000'))
