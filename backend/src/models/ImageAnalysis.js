const mongoose = require('mongoose')

const imageAnalysisSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    filename: { type: String, required: true },
    scanType: { type: String, default: 'pelvic' },
    confidence: { type: Number, default: 0 },
    riskLevel: { type: String, default: 'Moderate Risk' },
    summary: { type: String, default: '' },
    features: [{ type: String }],
    heatmap: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

module.exports = mongoose.model('ImageAnalysis', imageAnalysisSchema)
