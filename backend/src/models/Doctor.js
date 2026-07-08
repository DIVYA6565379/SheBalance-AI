const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hospital: { type: String, required: true },
    specialty: { type: String, default: 'Gynecology' },
    address: { type: String, required: true },
    distance: { type: String, default: '2.4 km' },
    experience: { type: String, default: '10+ years' },
    rating: { type: Number, default: 4.8 },
    fee: { type: String, default: '$40' },
    phone: { type: String, default: '+1-555-0148' },
    timings: { type: String, default: 'Mon-Fri 9AM-6PM' },
    photo: { type: String, default: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80' },
    latitude: { type: Number },
    longitude: { type: Number }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Doctor', doctorSchema)
