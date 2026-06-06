import { useState } from 'react'
import { breakSuggestions } from '../lib/breakSuggestions'

interface Props {
  onDismiss: () => void
}

const CATEGORY_STYLES = {
  Move: {
    icon: 'bg-pink-100',
    badge: 'bg-pink-100 text-pink-600',
    title: 'text-pink-700',
    body: 'text-pink-500',
    btn: 'bg-pink-400 hover:bg-pink-500',
    refreshBtn: 'text-pink-400 hover:text-pink-600 border-pink-200 hover:border-pink-300',
    emoji: '🚶‍♀️',
  },
  Rest: {
    icon: 'bg-sky-100',
    badge: 'bg-sky-100 text-sky-600',
    title: 'text-sky-700',
    body: 'text-sky-500',
    btn: 'bg-sky-400 hover:bg-sky-500',
    refreshBtn: 'text-sky-400 hover:text-sky-600 border-sky-200 hover:border-sky-300',
    emoji: '😌',
  },
  Reset: {
    icon: 'bg-indigo-100',
    badge: 'bg-indigo-100 text-indigo-500',
    title: 'text-indigo-600',
    body: 'text-indigo-400',
    btn: 'bg-indigo-400 hover:bg-indigo-500',
    refreshBtn: 'text-indigo-400 hover:text-indigo-600 border-indigo-200 hover:border-indigo-300',
    emoji: '✨',
  },
}

export default function BreakSuggestion({ onDismiss }: Props) {
  const [idx, setIdx] = useState(
    () => Math.floor(Math.random() * breakSuggestions.length)
  )

  const suggestion = breakSuggestions[idx]
  const styles = CATEGORY_STYLES[suggestion.category]

  const refresh = () => {
    setIdx(cur => {
      let next = cur
      while (next === cur) next = Math.floor(Math.random() * breakSuggestions.length)
      return next
    })
  }

  return (
    <div className="fixed inset-0 bg-sky-950/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="card-blue rounded-3xl p-8 shadow-2xl max-w-sm w-full text-center"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        <div className={`w-16 h-16 rounded-full ${styles.icon} flex items-center justify-center mx-auto mb-4 text-3xl`}>
          {styles.emoji}
        </div>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${styles.badge} mb-3`}>
          {suggestion.category}
        </span>
        <h3 className={`font-display text-sm font-semibold ${styles.title} mb-2`}>
          {suggestion.title}
        </h3>
        <p className={`${styles.body} text-sm leading-relaxed mb-7`}>
          {suggestion.description}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            className={`flex-1 py-3 rounded-full border bg-transparent font-semibold text-sm transition-colors ${styles.refreshBtn}`}
          >
            ↺ another
          </button>
          <button
            onClick={onDismiss}
            data-no-sound
            className={`flex-1 py-3 rounded-full ${styles.btn} text-white font-semibold text-sm transition-colors`}
          >
            Got it
          </button>
        </div>
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}
