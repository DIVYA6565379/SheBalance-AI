import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../lib/api'

export default function Login() {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>()
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true)
    setMsg(null)
    try {
      const payload = {
        email: data.email.trim().toLowerCase(),
        password: data.password
      }

      const res = await api.post('/api/auth/login', payload)
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token)
      }
      setMsg('Login Successful')
      navigate('/welcome')
    } catch (e: any) {
      setMsg(e?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold font-montserrat">Login</h1>
        <p className="text-sm text-slate-600 mt-2">Welcome back to SheBalance.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-purple-100 bg-white/70 outline-none focus:ring-2 focus:ring-purple-200"
              type="email"
              {...register('email', { required: true })}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-purple-100 bg-white/70 outline-none focus:ring-2 focus:ring-purple-200"
              type="password"
              {...register('password', { required: true })}
            />
          </div>

          <button
            disabled={loading}
            className="w-full px-4 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-md disabled:opacity-60"
            type="submit"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {msg && <div className="mt-4 text-sm font-semibold text-purple-700">{msg}</div>}

        <div className="mt-5 text-sm text-slate-600">
          New here?{' '}
          <Link className="font-semibold text-purple-700 hover:underline" to="/register">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}

