import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiHeart, FiMoon } from 'react-icons/fi'
import { LuSparkles } from 'react-icons/lu'

type WizardProps = {
  userName: string
  onComplete: (responses: Array<{ question: string; answer: string | number }>) => Promise<void>
}

const questions = [
  { key: 'age', label: 'Age', type: 'number', hint: 'How old are you?' },
  { key: 'bmi', label: 'Height & Weight', type: 'bmi', hint: 'We will calculate your BMI automatically.' },
  { key: 'periodRegularity', label: 'Are your periods regular?', type: 'select', options: ['Yes', 'Sometimes', 'No'] },
  { key: 'cycleLength', label: 'Average menstrual cycle length', type: 'select', options: ['21-25 days', '26-32 days', '33+ days'] },
  { key: 'weightGain', label: 'Have you noticed sudden weight gain?', type: 'select', options: ['No', 'Sometimes', 'Yes'] },
  { key: 'facialHair', label: 'Do you have excessive facial/body hair?', type: 'select', options: ['No', 'Sometimes', 'Yes'] },
  { key: 'acne', label: 'Do you experience severe acne?', type: 'select', options: ['No', 'Mild', 'Severe'] },
  { key: 'familyHistory', label: 'Does anyone in your family have PCOD?', type: 'select', options: ['No', 'Unsure', 'Yes'] },
  { key: 'exercise', label: 'How often do you exercise?', type: 'select', options: ['Daily', '3-4 times/week', 'Rarely'] },
  { key: 'stress', label: 'How would you rate your stress level?', type: 'select', options: ['Low', 'Moderate', 'High'] }
]

export default function Wizard({ userName, onComplete }: WizardProps) {
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState<Array<{ question: string; answer: string | number }>>([])
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const current = questions[step]
  const progress = useMemo(() => ((step + 1) / questions.length) * 100, [step])

  const handleNext = async () => {
    let answer: string | number = value
    if (current.type === 'number') {
      answer = Number(value)
    }
    if (current.type === 'bmi') {
      if (!height || !weight) return
      const bmi = Number(weight) / Math.pow(Number(height) / 100, 2)
      answer = Number(bmi.toFixed(1))
    }

    const nextResponses = [...responses, { question: current.key, answer }]
    setResponses(nextResponses)

    if (step === questions.length - 1) {
      setLoading(true)
      await onComplete(nextResponses)
      setLoading(false)
      return
    }

    setStep(step + 1)
    setValue('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[32px] p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between text-sm font-semibold text-purple-700">
            <span>Welcome Wizard</span>
            <span>{step + 1}/{questions.length}</span>
          </div>
          <div className="h-2 rounded-full bg-white/70">
            <div className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass rounded-[32px] p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-3 text-pink-600">
              <div className="rounded-2xl bg-white/70 p-3"><LuSparkles /></div>
              <div>
                <p className="text-sm font-semibold">Step {step + 1}</p>
                <h2 className="text-2xl font-bold text-slate-800">Welcome back, {userName}</h2>
              </div>
            </div>

            {step === 0 ? (
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h3 className="text-3xl font-semibold text-slate-800">We’re here to support your reproductive wellness journey.</h3>
                  <p className="mt-4 text-base text-slate-600">This guided experience helps you understand your symptoms, track your patterns, and receive supportive, evidence-based insights.</p>
                  <button onClick={() => setStep(1)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white">Continue <FiArrowRight /></button>
                </div>
                <div className="rounded-[28px] bg-gradient-to-br from-pink-100 via-white to-purple-100 p-6">
                  <div className="flex h-44 items-center justify-center rounded-[24px] bg-white/70">
                    <div className="flex flex-col items-center gap-3 text-center text-slate-700">
                      <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white"><FiHeart /></div>
                      <div><p className="font-semibold">Gentle guidance</p><p className="text-sm">Personalized and compassionate</p></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">PCOD risk questionnaire</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-800">{current.label}</h3>
                  <p className="mt-2 text-sm text-slate-600">{current.hint || 'Choose the option that best reflects your experience.'}</p>
                </div>

                {current.type === 'bmi' ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-2xl border border-purple-100 bg-white/70 px-4 py-3 outline-none ring-0" placeholder="Height in cm" />
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-2xl border border-purple-100 bg-white/70 px-4 py-3 outline-none ring-0" placeholder="Weight in kg" />
                  </div>
                ) : current.type === 'number' ? (
                  <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full rounded-2xl border border-purple-100 bg-white/70 px-4 py-3 outline-none ring-0" placeholder="Type your answer" />
                ) : (
                  <div className="grid gap-3 md:grid-cols-2">
                    {current.options?.map((option) => (
                      <button key={option} onClick={() => setValue(option)} className={`rounded-2xl border px-4 py-3 text-left font-medium ${value === option ? 'border-purple-500 bg-purple-600 text-white' : 'border-purple-100 bg-white/70 text-slate-700'}`}>
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => { if (step > 1) { setStep(step - 1); setValue(''); setHeight(''); setWeight(''); } else if (step === 1) { setStep(0); setValue(''); setHeight(''); setWeight(''); } }} className="text-sm font-semibold text-slate-600">Back</button>
                  <button disabled={(current.type === 'bmi' ? (!height || !weight) : !value) || loading} onClick={handleNext} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white disabled:opacity-60">
                    {step === questions.length - 1 ? 'Finish' : 'Next'} <FiArrowRight />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
