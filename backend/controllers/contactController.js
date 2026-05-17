const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const Contact    = require('../models/Contact')

const makeTransport = () =>
  nodemailer.createTransport({
    host:   process.env.EMAIL_HOST || 'smtp.gmail.com',
    port:   Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  })

exports.submitContact = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() })

  const { name, email, subject, message } = req.body
  try {
    const record = await Contact.create({ name, email, subject, message, ipAddress: req.ip })

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await makeTransport().sendMail({
          from:    `"Britney's Portfolio" <${process.env.EMAIL_USER}>`,
          to:      process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `[Portfolio] ${subject}`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:24px;
                        background:#0f172a;color:#e2e8f0;border-radius:12px">
              <h2 style="color:#00f5d4;margin-bottom:16px">
                New message on Britney's Portfolio
              </h2>
              <p><b>From:</b> ${name} &lt;${email}&gt;</p>
              <p><b>Subject:</b> ${subject}</p>
              <hr style="border-color:#334155;margin:16px 0"/>
              <p style="white-space:pre-wrap">${message}</p>
            </div>`,
        })
      } catch (e) { console.warn('Email failed:', e.message) }
    }

    res.status(201).json({ success: true, message: 'Message sent!', id: record.id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getContacts = async (_req, res) => {
  const rows = await Contact.findAll({ order: [['createdAt', 'DESC']], limit: 100 })
  res.json({ success: true, data: rows })
}
