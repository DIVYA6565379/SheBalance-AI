const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./utils/connectDB')

const authRoutes = require('./routes/auth.routes')
const healthRoutes = require('./routes/health.routes')

dotenv.config()

const app = express()
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  credentials: true
}))

app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload' })
  }
  next(err)
})

app.get('/health', (req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)
app.use('/api/health', healthRoutes)

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[backend] listening on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('[backend] failed to start', err)
    process.exit(1)
  })

