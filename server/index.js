import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'


const app = express()
const RECEIVER = process.env.RECEIVER_EMAIL || 'sourabh876007@gmail.com'
app.use(express.json({ limit: '20kb' }))
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',') }))
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, max: 5, message: { error: 'Too many messages. Try again later.' } }))

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
})
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

app.get('/api/health', (_, res) => res.json({ ok: true }))

app.post('/api/contact', async (req, res) => {
  const { name = '', email = '', message = '', website = '' } = req.body || {}
  if (website) return res.json({ ok: true }) // honeypot: bots fill this
  if (name.trim().length < 2 || message.trim().length < 5 || !/^\S+@\S+\.\S+$/.test(email))
    return res.status(400).json({ error: 'Please fill in a valid name, email and message.' })
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: RECEIVER,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New portfolio message from ${name.slice(0, 60)}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<h3>New message from your portfolio</h3><p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err.message)
    res.status(500).json({ error: 'Could not send the message right now. Please email me directly.' })
  }
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Mail server running on http://localhost:${port}`))
