import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../lib/api'

type RegisterForm = {
  name: string
  age: number
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const { register, handleSubmit, watch } = useForm<RegisterForm>()
  const confirmPassword = watch('confirmPassword')
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)
    setMsg(null)
    try {
      if (data.password !== data.confirmPassword) {
        setMsg('Passwords do not match')
        return
      }
      const payload = {
        name: data.name,
        age: data.age,
        email: data.email.trim().toLowerCase(),
        phone: data.phone,
        password: data.password
      }
      await api.post('/api/auth/register', payload)
      setMsg('Registration successful. Please login.')
      navigate('/login')
    } catch (e: any) {
      setMsg(e?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold font-montserrat">Register</h1>
        <p className="text-sm text-slate-600 mt-2">Create your SheBalance account.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-purple-100 bg-white/70 outline-none focus:ring-2 focus:ring-purple-200"
              {...register('name', { required: true })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Age</label>
              <input
                className="w-full mt-2 px-4 py-3 rounded-2xl border border-purple-100 bg-white/70 outline-none focus:ring-2 focus:ring-purple-200"
                type="number"
                {...register('age', { required: true, valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Phone</label>
              <input
                className="w-full mt-2 px-4 py-3 rounded-2xl border border-purple-100 bg-white/70 outline-none focus:ring-2 focus:ring-purple-200"
                {...register('phone', { required: true })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-purple-100 bg-white/70 outline-none focus:ring-2 focus:ring-purple-200"
              type="email"
              {...register('email', { required: true })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                className="w-full mt-2 px-4 py-3 rounded-2xl border border-purple-100 bg-white/70 outline-none focus:ring-2 focus:ring-purple-200"
                type="password"
                {...register('password', { required: true, minLength: 6 })}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Confirm</label>
              <input
                className="w-full mt-2 px-4 py-3 rounded-2xl border border-purple-100 bg-white/70 outline-none focus:ring-2 focus:ring-purple-200"
                type="password"
                {...register('confirmPassword', { required: true })}
              />
            </div>
          </div>

          {confirmPassword && confirmPassword.length > 0 && confirmPassword !== watch('password') && (
            <div className="text-sm font-semibold text-red-600">Passwords must match</div>
          )}

          <button
            disabled={loading}
            className="w-full px-4 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-md disabled:opacity-60"
            type="submit"
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        {msg && <div className="mt-4 text-sm font-semibold text-purple-700">{msg}</div>}

        <div className="mt-5 text-sm text-slate-600">
          Already have an account?{' '}
          <Link className="font-semibold text-purple-700 hover:underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

