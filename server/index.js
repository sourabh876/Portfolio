import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import rateLimit from 'express-rate-limit'

const app = express()
<<<<<<< HEAD

// Render proxy
app.set('trust proxy', 1)

const RECEIVER =
  process.env.RECEIVER_EMAIL || 'sourabh876007@gmail.com'

const resend = new Resend(process.env.RESEND_API_KEY)

=======
app.set("trust proxy", 1);

const RECEIVER = process.env.RECEIVER_EMAIL || 'sourabh876007@gmail.com'
>>>>>>> 384de233a247dbef7dda18b7583a0e337876987d
app.use(express.json({ limit: '20kb' }))

<<<<<<< HEAD
app.use(cors({
  origin: (
    process.env.CLIENT_ORIGIN || 'http://localhost:5173'
  ).split(',')
}))

app.use(
  '/api/contact',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
      error: 'Too many messages. Try again later.'
    }
  })
)

const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    }[c])
  )

app.get('/api/health', (_, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const {
    name = '',
    email = '',
    message = '',
    website = ''
  } = req.body || {}

  // Honeypot
  if (website) {
    return res.json({ ok: true })
  }

  // Validation
  if (
    name.trim().length < 2 ||
    message.trim().length < 5 ||
    !/^\S+@\S+\.\S+$/.test(email)
  ) {
    return res.status(400).json({
      error: 'Please fill in a valid name, email and message.'
=======

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready");
  }
});

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

app.get('/api/health', (_, res) => res.json({ ok: true }))

app.post('/api/contact', async (req, res) => {
  const { name = '', email = '', message = '', website = '' } = req.body || {}
  if (website) return res.json({ ok: true }) // honeypot: bots fill this
  if (name.trim().length < 2 || message.trim().length < 5 || !/^\S+@\S+\.\S+$/.test(email))
    return res.status(400).json({ error: 'Please fill in a valid name, email and message.' })
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: RECEIVER,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New portfolio message from ${name.slice(0, 60)}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<h3>New message from your portfolio</h3><p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
>>>>>>> 384de233a247dbef7dda18b7583a0e337876987d
    })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [RECEIVER],

      replyTo: email,

      subject: `New portfolio message from ${name.slice(0, 60)}`,

      text: `Name: ${name}
Email: ${email}

${message}`,

      html: `
        <h3>New message from your portfolio</h3>

        <p>
          <b>Name:</b> ${esc(name)}<br>
          <b>Email:</b> ${esc(email)}
        </p>

        <p style="white-space: pre-wrap">
          ${esc(message)}
        </p>
      `
    })

    if (error) {
      console.error('Resend error:', error)

      return res.status(500).json({
        error: 'Could not send the message right now. Please email me directly.'
      })
    }

    console.log('Email sent:', data?.id)

    return res.json({
      ok: true
    })

  } catch (err) {
    console.error('Mail error:', err)

    return res.status(500).json({
      error: 'Could not send the message right now. Please email me directly.'
    })
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Mail server running on port ${port}`)
})