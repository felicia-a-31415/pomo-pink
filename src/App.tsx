import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { playClick } from './lib/sounds'
import PomodoroTimer from './components/PomodoroTimer'
import BrainDump from './components/BrainDump'
import AuthModal from './components/AuthModal'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [tosOpen, setTosOpen] = useState(false)
  const [brainDumpOpen, setBrainDumpOpen] = useState(false)

  // Global button click sound
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('button')
      if (btn && !btn.dataset.noSound) playClick()
    }
    document.addEventListener('click', handle, { capture: true })
    return () => document.removeEventListener('click', handle, { capture: true })
  }, [])

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        supabase.auth.signInAnonymously().then(({ data }) => {
          if (data.user) setUser(data.user)
        })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const isAnonymous = !user || user.is_anonymous

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 flex flex-col items-center py-8 px-4 gap-8 overflow-y-auto">

        {/* Header */}
        <header className="w-full max-w-lg flex items-center justify-between">
          <h1 className="font-display text-base font-semibold text-pink-500 tracking-tight flex items-center gap-2">
            <img src="/favicon.svg" alt="" className="w-7 h-7" />
            pomo<span className="text-sky-400">·</span>pink
          </h1>

          <div className="flex items-center gap-2">
            {isAnonymous ? (
              <button
                data-no-sound
                onClick={() => setAuthModalOpen(true)}
                className="text-sm text-pink-400 hover:text-pink-600 px-3 py-1.5 rounded-full border border-pink-200 hover:border-pink-300 bg-white/50 hover:bg-white transition-all"
              >
                ☁ Sync
              </button>
            ) : (
              <div
                className="text-sm text-sky-400 px-3 py-1.5 rounded-full border border-sky-200 bg-white/40"
                title={user?.email ?? 'signed in'}
              >
                ✓ Synced
              </div>
            )}
            <button
              onClick={() => setBrainDumpOpen(true)}
              className="lg:hidden text-sm text-pink-400 hover:text-pink-600 px-3 py-1.5 rounded-full border border-pink-200 hover:border-pink-300 bg-white/50 hover:bg-white transition-all"
            >
              ✎ Notes
            </button>
          </div>
        </header>

        <PomodoroTimer />

        {/* Footer */}
        <footer className="mt-auto pt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-pink-400">© 2026 pomopink</span>
            <span className="text-pink-200">·</span>
            <button
              data-no-sound
              onClick={() => setPrivacyOpen(true)}
              className="text-pink-400 hover:text-pink-600 transition-colors underline underline-offset-2"
            >
              Privacy
            </button>
            <span className="text-pink-200">·</span>
            <button
              data-no-sound
              onClick={() => setTosOpen(true)}
              className="text-pink-400 hover:text-pink-600 transition-colors underline underline-offset-2"
            >
              Terms
            </button>
          </div>
          <p className="text-pink-400 text-sm">made with ♡</p>
        </footer>
      </main>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <BrainDump user={user} />
      </div>

      {/* Mobile brain dump overlay */}
      {brainDumpOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex justify-end">
          <button
            className="flex-1 bg-pink-950/10 backdrop-blur-sm"
            onClick={() => setBrainDumpOpen(false)}
            aria-label="Close"
          />
          <BrainDump user={user} onClose={() => setBrainDumpOpen(false)} />
        </div>
      )}

      {authModalOpen && <AuthModal      onClose={() => setAuthModalOpen(false)} />}
      {privacyOpen   && <PrivacyPolicy  onClose={() => setPrivacyOpen(false)} />}
      {tosOpen       && <TermsOfService onClose={() => setTosOpen(false)} />}
    </div>
  )
}
