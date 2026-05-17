require('dotenv').config()
const express   = require('express')
const cors      = require('cors')
const helmet    = require('helmet')
const rateLimit = require('express-rate-limit')
const { connectDB } = require('./config/database')

const app  = express()
const PORT = process.env.PORT || 5000

// ======================
// SECURITY & MIDDLEWARE
// ======================
app.use(helmet())

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}))

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300
}))

app.set('trust proxy', 1)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ======================
// ROUTES
// ======================
app.use('/api/contact', require('./routes/contact'))
app.use('/api/projects', require('./routes/projects'))

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    owner: 'Britney',
    time: new Date().toISOString()
  })
})

// ======================
// 404 HANDLER
// ======================
app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// ======================
// ERROR HANDLER
// ======================
app.use((err, _req, res, _next) => {
  console.error('❌ Server Error:', err)
  res.status(500).json({ message: 'Internal server error' })
})

// ======================
// START SERVER (FIXED)
// ======================
;(async () => {
  try {
    await connectDB()
    console.log('✅ Database connected')
  } catch (err) {
    console.log('❌ DB error:', err.message)
    console.log('⚠️ Server will continue WITHOUT database')
  }

  app.listen(PORT, () => {
    console.log(`🚀 API running → https://your-domain.com/api`)
  })
})()