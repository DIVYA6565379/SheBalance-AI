const express = require('express')
const router = express.Router()
const { verifyToken } = require('../utils/auth')
const {
  submitQuestionnaire,
  getLatestReport,
  saveHealthLog,
  getHealthLogs,
  createAppointment,
  getAppointments,
  createImageAnalysis,
  getImageAnalyses,
  getProfile,
  getDoctors,
  getNotifications,
  createNotification
} = require('../controllers/health.controller')

router.use(verifyToken)
router.post('/questionnaire', submitQuestionnaire)
router.get('/report/latest', getLatestReport)
router.post('/health-logs', saveHealthLog)
router.get('/health-logs', getHealthLogs)
router.post('/appointments', createAppointment)
router.get('/appointments', getAppointments)
router.post('/images', createImageAnalysis)
router.get('/images', getImageAnalyses)
router.get('/profile', getProfile)
router.get('/doctors', getDoctors)
router.get('/notifications', getNotifications)
router.post('/notifications', createNotification)

module.exports = router
