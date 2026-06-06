interface Props {
  onClose: () => void
}

export default function TermsOfService({ onClose }: Props) {
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

        <h2 className="font-display text-sm text-pink-600 mb-1">Terms of Service</h2>
        <p className="text-pink-300 text-xs mb-6">Last updated: June 2025</p>

        <div className="space-y-5 text-sm text-pink-800/80 leading-relaxed">
          <div>
            <h3 className="font-semibold text-pink-700 mb-1">1. Acceptance</h3>
            <p>By using pomopink, you agree to these Terms. If you don't agree, please don't use the app. We may update these Terms at any time — continued use means you accept any changes.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">2. What pomopink is</h3>
            <p>pomopink is a free Pomodoro productivity timer with a brain dump notepad. It's designed to help you stay focused and organized. We make no guarantees about uptime or availability.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">3. Your account</h3>
            <p>You get an anonymous session automatically. You can optionally create an account to sync your notes across devices. You're responsible for keeping your login credentials safe. We may delete inactive anonymous sessions periodically.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">4. Acceptable use</h3>
            <p>Use pomopink only for lawful purposes. Don't attempt to scrape, reverse-engineer, or abuse the service. Don't use it to store illegal content or violate others' rights.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">5. Your content</h3>
            <p>Your brain dump notes are yours. We don't claim ownership of anything you write. By saving content, you grant us the minimal rights needed to store and display it back to you.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">6. Intellectual property</h3>
            <p>The pomopink name, design, and code are owned by us. Don't copy or redistribute the app without permission. Quotes displayed are attributed to their original authors.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">7. Disclaimer</h3>
            <p>pomopink is provided "as is" without warranties of any kind. We're not responsible for lost data, downtime, or any damages arising from your use of the app.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">8. Termination</h3>
            <p>We may suspend or terminate access at any time if these Terms are violated. You can stop using pomopink whenever you like.</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-700 mb-1">9. Contact</h3>
            <p>Questions? Reach out via the newsletter or through our social channels. We're a small team and will do our best to respond.</p>
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
