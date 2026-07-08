import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiActivity, FiDroplet, FiHeart, FiMoon, FiSunrise, FiTrendingUp, FiUploadCloud } from 'react-icons/fi'
import { LuSparkles } from 'react-icons/lu'
import { api } from '../lib/api'
import type { AxiosError } from 'axios'
import UltraSoundPanel from '../components/UltraSoundPanel'
import DoctorRecommendations from '../components/DoctorRecommendations'
import HealthAssistant from '../components/HealthAssistant'

type Profile = { name?: string; email?: string }
type Report = { riskScore?: number; riskLevel?: string; summary?: string; recommendations?: string[] }
type HealthLog = { date?: string; weight?: number; waterIntake?: number; sleep?: number; exercise?: number; steps?: number; mood?: number; stress?: number; symptoms?: string[]; notes?: string }
type Appointment = { doctorName?: string; hospital?: string; date?: string; mode?: string; status?: string }

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile>({})
  const [report, setReport] = useState<Report>({})
  const [logs, setLogs] = useState<HealthLog[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login'
      return
    }

    const load = async () => {
      try {
        const [profileRes, reportRes, logsRes, appointmentsRes] = await Promise.all([
          api.get('/api/health/profile', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/api/health/report/latest', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/api/health/health-logs', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/api/health/appointments', { headers: { Authorization: `Bearer ${token}` } })
        ])
        setProfile(profileRes.data.user || {})
        setReport(reportRes.data.report || {})
        setLogs(logsRes.data.logs || [])
        setAppointments(appointmentsRes.data.appointments || [])
      } catch (error) {
        const err = error as AxiosError
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const risk = report.riskScore ?? 42
  const riskLabel = report.riskLevel || (risk >= 75 ? 'High Risk' : risk >= 40 ? 'Moderate Risk' : 'Low Risk')
  const latestLog = logs[0] || {}
  const healthScore = useMemo(() => {
    const sleep = Number(latestLog.sleep || 0)
    const water = Number(latestLog.waterIntake || 0)
    const exercise = Number(latestLog.exercise || 0)
    const mood = Number(latestLog.mood || 0)
    return Math.min(100, Math.round((sleep * 4 + water * 2 + exercise * 3 + mood * 3) / 12))
  }, [latestLog])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.16),_transparent_32%),linear-gradient(135deg,_#fff8fc,_#f7f3ff)] px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[32px] p-6 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-600">SheBalance</p>
              <h1 className="text-3xl font-bold text-slate-800">Welcome back, {profile.name || 'friend'}</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">Your AI-guided wellness dashboard is ready. Track symptoms, review insights, and build healthier routines with calm confidence.</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white">AI-powered insights • daily guidance</div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[32px] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-purple-600">Risk Score</p>
                <h2 className="text-2xl font-bold text-slate-800">{risk}%</h2>
              </div>
              <div className="rounded-full bg-white/70 p-4 text-pink-500"><FiHeart /></div>
            </div>
            <div className="mt-4 h-3 rounded-full bg-white/70">
              <div className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" style={{ width: `${risk}%` }} />
            </div>
            <div className="mt-4 text-sm font-semibold text-slate-700">{riskLabel}</div>
            <p className="mt-2 text-sm text-slate-600">{report.summary || 'This is an AI-generated risk estimate and not a medical diagnosis.'}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[32px] p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/70 p-3 text-purple-600"><LuSparkles /></div>
              <div>
                <p className="text-sm font-semibold text-purple-600">Today’s Health Score</p>
                <h2 className="text-2xl font-bold text-slate-800">{healthScore}/100</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/70 p-4"><div className="text-sm text-slate-500">Water</div><div className="text-lg font-semibold text-slate-800">{latestLog.waterIntake || 2.2} L</div></div>
              <div className="rounded-2xl bg-white/70 p-4"><div className="text-sm text-slate-500">Sleep</div><div className="text-lg font-semibold text-slate-800">{latestLog.sleep || 7} hrs</div></div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[32px] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-purple-600">Health insights</p>
                  <h3 className="text-xl font-semibold text-slate-800">Lifestyle recommendations</h3>
                </div>
                <div className="rounded-full bg-white/70 p-3 text-pink-500"><FiTrendingUp /></div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {['Healthy diet', 'Yoga', 'Exercise', 'Sleep', 'Hydration', 'Stress reduction'].map((tip) => (
                  <div key={tip} className="rounded-2xl border border-purple-100 bg-white/70 p-4 text-sm font-medium text-slate-700">{tip}</div>
                ))}
              </div>
            </motion.div>

            <UltraSoundPanel />
            <DoctorRecommendations />
          </div>

          <div className="grid gap-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[32px] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-purple-600">Upcoming care</p>
                  <h3 className="text-xl font-semibold text-slate-800">Doctor appointments</h3>
                </div>
                <div className="rounded-full bg-white/70 p-3 text-purple-600"><FiActivity /></div>
              </div>
              <div className="mt-5 space-y-3">
                {(appointments.length ? appointments : [{ doctorName: 'Dr. Meera Rao', hospital: 'Aster Women Care', date: '2026-07-12', mode: 'online', status: 'scheduled' }]).map((item, idx) => (
                  <div key={`${item.doctorName}-${idx}`} className="rounded-2xl border border-purple-100 bg-white/70 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">{item.doctorName}</div>
                        <div className="text-sm text-slate-600">{item.hospital} • {item.mode}</div>
                      </div>
                      <div className="text-sm font-semibold text-purple-600">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[32px] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-purple-600">Daily tracker</p>
                  <h3 className="text-xl font-semibold text-slate-800">Wellness snapshot</h3>
                </div>
                <div className="rounded-full bg-white/70 p-3 text-pink-500"><FiMoon /></div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-white/70 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="flex items-center gap-2"><FiDroplet /> Water</span>
                    <span className="font-semibold text-slate-800">{latestLog.waterIntake || '2.2'} L</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/70 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="flex items-center gap-2"><FiSunrise /> Exercise</span>
                    <span className="font-semibold text-slate-800">{latestLog.exercise || '30'} min</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/70 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="flex items-center gap-2"><FiUploadCloud /> Symptoms</span>
                    <span className="font-semibold text-slate-800">{(latestLog.symptoms || ['none']).join(', ')}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <HealthAssistant />
          </div>
        </div>

        {loading ? <div className="text-sm text-slate-600">Loading your care dashboard…</div> : null}
      </div>
    </div>
  )
}

