import { useState } from 'react'
import { quotes, type Quote } from '../lib/quotes'

function getTodaysQuote(): Quote {
  const today = new Date().toDateString()
  if (localStorage.getItem('pomo_quote_date') === today) {
    const idx = parseInt(localStorage.getItem('pomo_quote_idx') ?? '0', 10)
    return quotes[idx] ?? quotes[0]
  }
  const idx = Math.floor(Math.random() * quotes.length)
  localStorage.setItem('pomo_quote_date', today)
  localStorage.setItem('pomo_quote_idx', String(idx))
  return quotes[idx]
}

export default function QuoteDisplay() {
  const [quote] = useState(getTodaysQuote)

  return (
    <div className="px-5 py-4 border-t border-pink-100/60">
      <p className="text-pink-400 text-xs italic leading-relaxed">
        &ldquo;{quote.text}&rdquo;
      </p>
      <p className="text-pink-300 mt-1.5 tracking-wide text-xs">
        — {quote.author}
      </p>
    </div>
  )
}
