import { useMemo, useState } from 'react'
import { api } from '../lib/api'
import { FiUploadCloud } from 'react-icons/fi'

export default function UltraSoundPanel() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('http://localhost:8000/analyze-ultrasound', {
        method: 'POST',
        body: form
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const confidence = result?.confidence || 0
  const riskLabel = result?.estimatedRisk || 'Moderate Risk'

  return (
    <div className="glass rounded-[32px] p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-purple-600">Ultrasound Analysis</p>
          <h3 className="text-xl font-semibold text-slate-800">Upload your scan</h3>
        </div>
        <div className="rounded-full bg-white/70 p-3 text-pink-500"><FiUploadCloud /></div>
      </div>

      <div className="mt-5 rounded-[24px] border border-dashed border-purple-200 bg-white/70 p-5">
        <input type="file" accept="image/png,image/jpeg,image/jpg" onChange={(event) => setFile(event.target.files?.[0] || null)} className="w-full text-sm text-slate-700" />
        <button onClick={handleUpload} disabled={!file || loading} className="mt-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Analyzing...' : 'Analyze Scan'}</button>
      </div>

      {result && (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl bg-white/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Image quality</span>
              <span className="text-sm font-semibold text-purple-700">{result.imageQuality}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <div className="text-sm font-semibold text-slate-700">Detected features</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
              {(result.features || []).map((feature: string) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Estimated risk</span>
              <span className="text-sm font-semibold text-pink-600">{riskLabel}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" style={{ width: `${confidence}%` }} />
            </div>
            <div className="mt-2 text-sm text-slate-600">Confidence: {confidence}%</div>
          </div>
          <div className="rounded-2xl bg-white/70 p-4 text-sm text-slate-600">{result.summary}</div>
        </div>
      )}
    </div>
  )
}
