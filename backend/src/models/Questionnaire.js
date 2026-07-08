const mongoose = require('mongoose')

const questionnaireSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    responses: [
      {
        question: { type: String, required: true },
        answer: { type: mongoose.Schema.Types.Mixed, required: true }
      }
    ],
    riskScore: { type: Number, default: 0 },
    riskLevel: { type: String, default: 'Low Risk' },
    summary: { type: String, default: '' },
    recommendations: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Questionnaire', questionnaireSchema)
