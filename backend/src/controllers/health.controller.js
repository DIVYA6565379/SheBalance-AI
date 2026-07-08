const Questionnaire = require('../models/Questionnaire')
const HealthLog = require('../models/HealthLog')
const Appointment = require('../models/Appointment')
const ImageAnalysis = require('../models/ImageAnalysis')
const Doctor = require('../models/Doctor')
const Notification = require('../models/Notification')
const User = require('../models/User')

function scoreRisk(responses) {
  let score = 0
  const reasons = []

  const answerMap = {
    age: (value) => {
      if (value >= 35) return 22
      if (value >= 25) return 12
      return 4
    },
    bmi: (value) => {
      if (value >= 30) return 20
      if (value >= 25) return 14
      return 3
    },
    periodRegularity: (value) => {
      if (value === 'No') return 18
      if (value === 'Sometimes') return 10
      return 0
    },
    cycleLength: (value) => {
      if (value === '33+ days') return 12
      if (value === '26-32 days') return 8
      return 0
    },
    weightGain: (value) => {
      if (value === 'Yes') return 12
      if (value === 'Sometimes') return 7
      return 0
    },
    facialHair: (value) => {
      if (value === 'Yes') return 12
      if (value === 'Sometimes') return 7
      return 0
    },
    acne: (value) => {
      if (value === 'Severe') return 10
      if (value === 'Mild') return 5
      return 0
    },
    familyHistory: (value) => {
      if (value === 'Yes') return 12
      if (value === 'Unsure') return 6
      return 0
    },
    exercise: (value) => {
      if (value === 'Rarely') return 10
      if (value === '3-4 times/week') return 5
      return 0
    },
    stress: (value) => {
      if (value === 'High') return 12
      if (value === 'Moderate') return 7
      return 0
    }
  }

  responses.forEach((entry) => {
    const key = entry.question
    const value = entry.answer
    const scoreValue = answerMap[key] ? answerMap[key](value) : 0
    score += scoreValue
    if (scoreValue >= 10) {
      const reasonText = {
        periodRegularity: 'Irregular menstrual cycles',
        cycleLength: 'Long or irregular cycle length',
        weightGain: 'Sudden weight gain',
        facialHair: 'Excess facial or body hair',
        acne: 'Severe acne',
        familyHistory: 'Family history of PCOD',
        exercise: 'Low physical activity',
        stress: 'High stress',
        bmi: 'Elevated BMI',
        age: 'Age-related risk pattern'
      }[key]
      if (reasonText) reasons.push(reasonText)
    }
  })

  const normalized = Math.min(100, Math.round(score))
  return { normalized, reasons }
}

function getRiskLabel(score) {
  if (score >= 75) return 'High Risk'
  if (score >= 40) return 'Moderate Risk'
  return 'Low Risk'
}

function buildRecommendations(score, reasons) {
  const recommendations = [
    'Walk 30 minutes daily',
    'Reduce processed food and sugary drinks',
    'Sleep 7-8 hours each night',
    'Drink 2.5-3L of water daily',
    'Consider a gynecologist consultation if symptoms continue'
  ]

  if (reasons.includes('Elevated BMI')) recommendations.unshift('Aim for a balanced meal plan and light activity')
  if (reasons.includes('High stress')) recommendations.unshift('Practice gentle yoga or breathing exercises')
  if (reasons.includes('Irregular menstrual cycles')) recommendations.unshift('Track your cycle consistently and discuss symptoms with a clinician')
  return recommendations
}

exports.submitQuestionnaire = async (req, res) => {
  try {
    const userId = req.user?.id
    const responses = req.body.responses || []
    const { normalized, reasons } = scoreRisk(responses)
    const riskLevel = getRiskLabel(normalized)
    const recommendations = buildRecommendations(normalized, reasons)

    const entry = await Questionnaire.create({
      userId,
      responses,
      riskScore: normalized,
      riskLevel,
      summary: `${riskLevel} based on your current responses.`,
      recommendations
    })

    res.json({ ok: true, report: entry })
  } catch (error) {
    res.status(500).json({ message: 'Failed to save questionnaire', error: error.message })
  }
}

exports.getLatestReport = async (req, res) => {
  try {
    const report = await Questionnaire.findOne({ userId: req.user?.id }).sort({ createdAt: -1 })
    res.json({ ok: true, report })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load report', error: error.message })
  }
}

exports.saveHealthLog = async (req, res) => {
  try {
    const item = await HealthLog.create({ userId: req.user?.id, ...req.body })
    res.json({ ok: true, item })
  } catch (error) {
    res.status(500).json({ message: 'Failed to save health log', error: error.message })
  }
}

exports.getHealthLogs = async (req, res) => {
  try {
    const logs = await HealthLog.find({ userId: req.user?.id }).sort({ date: -1 })
    res.json({ ok: true, logs })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load health logs', error: error.message })
  }
}

exports.createAppointment = async (req, res) => {
  try {
    const item = await Appointment.create({ userId: req.user?.id, ...req.body })
    res.json({ ok: true, item })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create appointment', error: error.message })
  }
}

exports.getAppointments = async (req, res) => {
  try {
    const items = await Appointment.find({ userId: req.user?.id }).sort({ date: 1 })
    res.json({ ok: true, appointments: items })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load appointments', error: error.message })
  }
}

exports.createImageAnalysis = async (req, res) => {
  try {
    const payload = {
      userId: req.user?.id,
      filename: req.body.filename,
      scanType: req.body.scanType || 'pelvic',
      confidence: req.body.confidence || 77,
      riskLevel: req.body.riskLevel || 'Moderate Risk',
      summary: req.body.summary || 'Image review completed.',
      features: req.body.features || ['Follicular cyst-like region', 'Moderate tissue density'],
      heatmap: req.body.heatmap || { type: 'gradcam', grid: [] }
    }
    const item = await ImageAnalysis.create(payload)
    res.json({ ok: true, item })
  } catch (error) {
    res.status(500).json({ message: 'Failed to save image analysis', error: error.message })
  }
}

exports.getImageAnalyses = async (req, res) => {
  try {
    const items = await ImageAnalysis.find({ userId: req.user?.id }).sort({ createdAt: -1 })
    res.json({ ok: true, analyses: items })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load analyses', error: error.message })
  }
}

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select('-passwordHash')
    res.json({ ok: true, user })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load profile', error: error.message })
  }
}

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).sort({ rating: -1 })
    res.json({ ok: true, doctors })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load doctors', error: error.message })
  }
}

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user?.id }).sort({ createdAt: -1 })
    res.json({ ok: true, notifications })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load notifications', error: error.message })
  }
}

exports.createNotification = async (req, res) => {
  try {
    const item = await Notification.create({ userId: req.user?.id, ...req.body })
    res.json({ ok: true, item })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notification', error: error.message })
  }
}
