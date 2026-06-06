import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props {
  onClose: () => void
}

type Step = 'form' | 'sent'

export default function AuthModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>('form')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: window.location.origin,
      },
    })
    setLoading(false)
    if (error) setError(error.message)
    else setStep('sent')
  }

  return (
    <div className="fixed inset-0 bg-pink-950/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="card rounded-3xl p-8 shadow-2xl max-w-sm w-full relative"
        style={{ animation: 'slideUp 0.25s ease-out' }}
      >
        <button
          onClick={onClose}
          data-no-sound
          className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-pink-50 text-pink-300 hover:text-pink-500 flex items-center justify-center text-lg transition-colors"
        >
          ×
        </button>

        {step === 'sent' ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-5 text-3xl">✉</div>
            <h2 className="font-display text-sm text-pink-600 mb-2">Check your email!</h2>
            <p className="text-pink-400 text-sm leading-relaxed">
              Magic link sent to <strong className="text-pink-600">{email}</strong>.<br />
              Click it to sync your brain dump.
            </p>
            <button
              onClick={() => { setStep('form'); setEmail('') }}
              className="mt-6 text-sm text-pink-300 hover:text-pink-500 transition-colors"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-display text-sm text-pink-600 mb-1">Sync your data</h2>
            <p className="text-pink-400 text-sm mb-7 leading-relaxed">
              Sign in to keep your brain dump across devices.
            </p>

            <form onSubmit={handleEmail} className="space-y-3">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required autoFocus
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 focus:ring-2 focus:ring-pink-200 text-pink-800 placeholder-pink-200 text-sm bg-white transition-shadow"
              />
              <button
                type="submit" disabled={loading || !email} data-no-sound
                className="w-full py-3 rounded-full bg-pink-400 hover:bg-pink-500 text-white font-semibold text-sm transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending…' : 'Send magic link'}
              </button>
            </form>

            {error && <p className="text-red-400 text-xs text-center mt-4">{error}</p>}
          </>
        )}
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}
