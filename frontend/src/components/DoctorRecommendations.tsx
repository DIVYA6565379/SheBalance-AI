import { useEffect, useState } from 'react'
import { FiCalendar, FiHeart, FiActivity } from 'react-icons/fi'
import { api } from '../lib/api'

type Doctor = {
  _id?: string
  name?: string
  specialty?: string
  hospital?: string
  rating?: number
  location?: string
  availability?: string
  experience?: string
  bio?: string
}

const fallbackDoctors: Doctor[] = [
  {
    name: 'Dr. Meera Rao',
    specialty: 'Gynecologist',
    hospital: 'Aster Women Care',
    rating: 4.9,
    location: 'Online & in-clinic',
    availability: 'Today • 5:30 PM',
    experience: '12 years',
    bio: 'Specializes in PCOD, hormonal balance, and long-term wellness planning.'
  },
  {
    name: 'Dr. Nisha Patel',
    specialty: 'Endocrinologist',
    hospital: 'Lakeside Health',
    rating: 4.8,
    location: 'South Wing',
    availability: 'Tomorrow • 10:00 AM',
    experience: '10 years',
    bio: 'Focused on metabolic health, insulin resistance, and fertility-related planning.'
  },
  {
    name: 'Dr. Anika Sethi',
    specialty: 'Nutritionist',
    hospital: 'SheBalance Studio',
    rating: 4.9,
    location: 'Virtual consults',
    availability: 'Friday • 7:00 PM',
    experience: '8 years',
    bio: 'Creates gentle nutrition, hydration, and meal-planning support for hormone health.'
  }
]

export default function DoctorRecommendations() {
  const [doctors, setDoctors] = useState<Doctor[]>(fallbackDoctors)
  const [selected, setSelected] = useState<Doctor | null>(fallbackDoctors[0])
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [mode, setMode] = useState('Video')

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await api.get('/api/health/doctors')
        const data = res.data.doctors || []
        if (data.length) {
          setDoctors(data)
          setSelected(data[0])
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadDoctors()
  }, [])

  const handleBook = async () => {
    if (!selected) return
    setBookingLoading(true)
    try {
      await api.post('/api/health/appointments', {
        doctorName: selected.name,
        hospital: selected.hospital,
        date,
        mode,
        status: 'scheduled'
      })
      setMessage('Your care appointment request was saved successfully.')
    } catch (error) {
      setMessage('We could not confirm your booking yet. Please try again in a moment.')
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <div className="glass rounded-[32px] p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-purple-600">Doctor guidance</p>
          <h3 className="text-xl font-semibold text-slate-800">Recommended specialists</h3>
        </div>
        <div className="rounded-full bg-white/70 p-3 text-pink-500"><FiActivity /></div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {doctors.map((doctor) => (
          <button
            key={doctor.name}
            onClick={() => setSelected(doctor)}
            className={`rounded-2xl border p-4 text-left transition ${selected?.name === doctor.name ? 'border-purple-300 bg-purple-50' : 'border-purple-100 bg-white/70'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">{doctor.name}</div>
                <div className="text-sm text-slate-600">{doctor.specialty}</div>
              </div>
              <div className="rounded-full bg-pink-100 px-2 py-1 text-xs font-semibold text-pink-600">★ {doctor.rating?.toFixed(1)}</div>
            </div>
            <div className="mt-3 text-sm text-slate-600">{doctor.hospital}</div>
            <div className="mt-2 text-xs text-slate-500">{doctor.availability}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-5 rounded-[24px] bg-white/70 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">{selected.name}</div>
              <div className="text-sm text-slate-600">{selected.specialty} • {selected.hospital}</div>
            </div>
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{selected.experience}</div>
          </div>
          <p className="mt-3 text-sm text-slate-600">{selected.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">{selected.location}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Preferred for PCOD support</span>
          </div>

          <div className="mt-5 rounded-2xl border border-purple-100 bg-purple-50/70 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-purple-700"><FiCalendar /> Book a consultation</div>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="rounded-xl border border-purple-100 bg-white px-3 py-2 text-sm" />
              <select value={mode} onChange={(event) => setMode(event.target.value)} className="rounded-xl border border-purple-100 bg-white px-3 py-2 text-sm">
                <option>Video</option>
                <option>In-clinic</option>
                <option>Phone</option>
              </select>
              <button onClick={handleBook} disabled={bookingLoading} className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{bookingLoading ? 'Saving...' : 'Book'}</button>
            </div>
            {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
          </div>
        </div>
      )}

      {loading ? <div className="mt-4 text-sm text-slate-600">Loading care specialists…</div> : null}
    </div>
  )
}
