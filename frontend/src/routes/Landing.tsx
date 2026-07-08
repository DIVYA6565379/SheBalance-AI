import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaHeartbeat, FaShieldAlt, FaChartLine } from 'react-icons/fa'

const symptomCards = [
  'Hair Loss',
  'Acne',
  'Irregular Periods',
  'Weight Gain',
  'Excess Facial Hair',
  'Mood Swings',
  'Fatigue',
  'Dark Skin Patches'
]

const tips = [
  { title: 'Diet', items: ['Foods to Eat', 'Foods to Avoid'] },
  { title: 'Exercise', items: ['Yoga', 'Walking', 'Cardio'] },
  { title: 'Sleep', items: ['Sleep Routine', 'Recovery'] },
  { title: 'Mental Wellness', items: ['Meditation', 'Stress Reduction'] }
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-lavender-50">
      {/* Top nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg" />
              <span className="font-montserrat font-bold text-lg">SheBalance</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
              <a className="hover:text-purple-700" href="#about">
                About
              </a>
              <a className="hover:text-purple-700" href="#features">
                Features
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-purple-700 hover:opacity-80">
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold px-4 py-2 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-md"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700">
              <FaHeartbeat /> <span>AI Powered Early Risk Assessment</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight">
              Welcome to <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">SheBalance</span>
            </h1>
            <p className="text-slate-700 text-lg">
              Empowering Women Through Early PCOD Awareness
            </p>
            <blockquote className="glass rounded-2xl p-5 text-slate-800">
              <span className="font-semibold">“Early awareness creates healthier futures.”</span>
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/register"
                className="px-6 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:opacity-95"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="px-6 py-3 rounded-2xl font-semibold text-purple-700 bg-white/70 border border-purple-200 hover:bg-white"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="glass rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-center">
                <div className="relative h-72 w-72">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/50 to-purple-500/50 blur-xl" />
                  <div className="absolute inset-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-600" />
                  <div className="absolute inset-14 rounded-full bg-white/20 backdrop-blur" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <motion.div
                    key={n}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: n * 0.03 }}
                    className="h-16 rounded-2xl bg-white/60 border border-white/50"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About / What is PCOD */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="glass rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold font-montserrat">What is PCOD?</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4 text-slate-700">
            <ul className="space-y-2">
              <li className="font-semibold">• Hormonal disorder</li>
              <li>• Causes</li>
              <li>• Symptoms</li>
              <li>• Complications</li>
              <li>• Importance of early detection</li>
            </ul>
            <div className="rounded-2xl bg-white/60 p-5 border border-purple-100">
              <p className="font-semibold">Why it matters</p>
              <p className="mt-2 text-sm">
                Early identification can support timely lifestyle changes and medical guidance.
                SheBalance provides an awareness-first risk estimate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Symptoms */}
      <section id="features" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[{ icon: FaShieldAlt, title: 'Secure JWT', desc: 'Protected routes and validation.' },
            { icon: FaChartLine, title: 'Risk Insights', desc: 'Risk level + recommendations.' },
            { icon: FaHeartbeat, title: 'Image Analysis', desc: 'AI-assisted visual guidance.' }].map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -4 }}
              className="glass rounded-3xl p-6 shadow-md"
            >
              <div className="text-purple-700 mb-3">
                <f.icon />
              </div>
              <div className="font-bold font-montserrat">{f.title}</div>
              <div className="text-sm text-slate-700 mt-2">{f.desc}</div>
            </motion.div>
          ))}
        </div>

        <h3 className="text-xl font-bold font-montserrat mb-4">Common Symptoms</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {symptomCards.map((s, idx) => (
            <motion.div
              key={s}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="glass rounded-3xl p-5 shadow-sm border border-white/60"
            >
              <div className="font-semibold text-slate-800">{s}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h3 className="text-xl font-bold font-montserrat mb-4">Healthy Lifestyle Tips</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tips.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-3xl p-6 shadow-sm"
            >
              <div className="font-bold">{t.title}</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {t.items.map((it) => (
                  <li key={it}>• {it}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-purple-100 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} SheBalance. Awareness-first, not a medical diagnosis.
        </div>
      </footer>
    </div>
  )
}

