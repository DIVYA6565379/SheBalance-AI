import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import Wizard from './Wizard'

type Props = {
  userName?: string
}

export default function WelcomeShell({ userName }: Props) {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleComplete = async (responses: Array<{ question: string; answer: string | number }>) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await api.post('/api/health/questionnaire', { responses }, { headers: { Authorization: `Bearer ${token}` } })
      setDone(true)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (done || loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-600">Preparing your insights…</div>
  }

  return <Wizard userName={userName || 'there'} onComplete={handleComplete} />
}
