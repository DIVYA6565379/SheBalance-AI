const mongoose = require('mongoose')

db = null

module.exports = async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('Missing MONGODB_URI')

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log('[backend] MongoDB connected')
}

