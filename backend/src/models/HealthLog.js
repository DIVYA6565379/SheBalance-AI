const mongoose = require('mongoose')

const healthLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: Date, required: true, default: Date.now },
    weight: { type: Number },
    waterIntake: { type: Number },
    sleep: { type: Number },
    exercise: { type: Number },
    steps: { type: Number },
    mood: { type: Number },
    stress: { type: Number },
    symptoms: [{ type: String }],
    periodDate: { type: Date },
    notes: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('HealthLog', healthLogSchema)
