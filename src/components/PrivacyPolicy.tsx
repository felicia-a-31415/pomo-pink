interface Props {
  onClose: () => void
}

export default function PrivacyPolicy({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-pink-950/10 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="card rounded-3xl p-8 shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto relative"
        style={{ animation: 'slideUp 0.25s ease-out' }}
      >
        <button
          onClick={onClose}
          data-no-sound
          className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-pink-50 text-pink-300 hover:text-pink-500 flex items-center justify-center text-lg transition-colors"
        >
          ×
        </button>

        <h2 className="font-display text-sm text-pink-600 mb-6">Privacy Policy</h2>

        <div className="space-y-5 text-sm text-pink-800/80 leading-relaxed font-body">
          <div>
            <h3 className="font-semibold text-pink-700 mb-1">What we collect</h3>
            <p>When you use pomopink, we automatically create an anonymous session so your brain dump notes are saved between visits. If you choose to sign in, we store your email address to link your account. We do not collect any other personal information.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">Your brain dump</h3>
            <p>Notes you write in the brain dump panel are stored in Supabase (our database provider) and are tied to your session or account. They are protected by row-level security — only you can read or modify your own notes.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">Local storage</h3>
            <p>Your session count, daily quote, and timer preferences are stored in your browser's local storage and never leave your device.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">No tracking, no ads</h3>
            <p>We do not use advertising, sell your data, or share it with any third parties. We do not use analytics services or tracking pixels.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">Data deletion</h3>
            <p>You can request deletion of your account and all associated data at any time by contacting us. Anonymous session data is automatically cleaned up periodically by Supabase.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">Cookies</h3>
            <p>We use a session cookie (set by Supabase Auth) solely to keep you signed in. No advertising or tracking cookies are used.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          data-no-sound
          className="mt-7 w-full py-3 rounded-full bg-pink-400 hover:bg-pink-500 text-white font-semibold text-sm transition-colors"
        >
          Got it
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
