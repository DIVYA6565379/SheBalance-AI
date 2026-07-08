import { useState } from 'react'
import { FiMessageCircle, FiSend, FiShield } from 'react-icons/fi'

type ChatMessage = {
  role: 'assistant' | 'user'
  content: string
}

export default function HealthAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'I can help you understand your wellness plan, hydration goals, and care reminders. Ask me anything about your day-to-day support.'
    }
  ])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!draft.trim()) return
    const nextMessage = draft.trim()
    const next = [...messages, { role: 'user' as const, content: nextMessage }]
    setMessages(next)
    setDraft('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8000/health-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: nextMessage })
      })
      const data = await res.json()
      setMessages([...next, { role: 'assistant', content: data.response || 'Please consult a gynecologist for medical concerns.' }])
    } catch (error) {
      setMessages([...next, { role: 'assistant', content: 'I am temporarily unavailable, but your care team is here for you.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass rounded-[32px] p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-purple-600">AI assistant</p>
          <h3 className="text-xl font-semibold text-slate-800">Support that feels human</h3>
        </div>
        <div className="rounded-full bg-white/70 p-3 text-purple-600"><FiMessageCircle /></div>
      </div>

      <div className="mt-5 space-y-3 rounded-[24px] bg-white/70 p-4">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`rounded-2xl px-3 py-2 text-sm ${message.role === 'assistant' ? 'bg-purple-50 text-slate-700' : 'bg-pink-50 text-slate-700'}`}>
            {message.content}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[24px] border border-purple-100 bg-white/70 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><FiShield /> Private, non-diagnostic support</div>
        <div className="mt-3 flex gap-2">
          <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && sendMessage()} placeholder="Ask about hydration, stress, or your care plan" className="flex-1 rounded-full border border-purple-100 px-4 py-2 text-sm outline-none" />
          <button onClick={sendMessage} disabled={loading} className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-3 text-white disabled:opacity-60"><FiSend /></button>
        </div>
      </div>
    </div>
  )
}
