const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    doctorName: { type: String, required: true },
    hospital: { type: String, required: true },
    specialty: { type: String, default: 'Gynecology' },
    date: { type: Date, required: true },
    mode: { type: String, enum: ['online', 'offline', 'call'], default: 'offline' },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    notes: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Appointment', appointmentSchema)
