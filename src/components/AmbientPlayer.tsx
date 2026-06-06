import { useState, useRef, useEffect, useLayoutEffect } from 'react'

type Sound = 'silence' | 'rain' | 'cafe' | 'whitenoise'

// ─── Replace these with your own audio file URLs ──────────────────────────────
// Supports direct MP3/OGG links, SoundCloud stream URLs, or any CORS-enabled src.
// YouTube links cannot be used directly — download the audio first or use a proxy.
const AUDIO_SRC: Record<Exclude<Sound, 'silence'>, string> = {
  rain:       '', // e.g. 'https://your-cdn.com/rain-loop.mp3'
  cafe:       '', // e.g. 'https://your-cdn.com/cafe-ambience.mp3'
  whitenoise: '', // e.g. 'https://your-cdn.com/white-noise.mp3'
}
// ─────────────────────────────────────────────────────────────────────────────

const SOUNDS: { id: Sound; label: string; icon: string }[] = [
  { id: 'silence',    label: 'off',     icon: '○'  },
  { id: 'rain',       label: 'rain',    icon: '⌁'  },
  { id: 'cafe',       label: 'café',    icon: '◎'  },
  { id: 'whitenoise', label: 'noise',   icon: '≋'  },
]

export default function AmbientPlayer() {
  const [active, setActive] = useState<Sound>('silence')
  const [volume, setVolume] = useState(0.4)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const volumeRef = useRef(volume)
  useLayoutEffect(() => { volumeRef.current = volume })

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (active === 'silence') return

    const src = AUDIO_SRC[active]
    if (!src) return  // placeholder — no URL configured yet

    const audio = new Audio(src)
    audio.loop = true
    audio.volume = volumeRef.current
    audio.play().catch(() => { /* autoplay blocked */ })
    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [active])  // volume handled separately

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const hasAudio = active !== 'silence' && AUDIO_SRC[active as Exclude<Sound,'silence'>] !== ''
  const isPlaceholder = active !== 'silence' && !hasAudio

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1.5 card rounded-2xl p-1.5">
        {SOUNDS.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            title={s.label}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all ${
              active === s.id
                ? 'bg-pink-200/80 text-pink-700 shadow-sm scale-95'
                : 'text-pink-400 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <span className="text-base leading-none">{s.icon}</span>
            <span className="leading-none text-xs">{s.label}</span>
          </button>
        ))}
      </div>

      {isPlaceholder && (
        <p className="text-pink-300/70 text-xs text-center">
          no audio · add url in<br />AmbientPlayer.tsx
        </p>
      )}

      {hasAudio && (
        <div className="flex items-center gap-2">
          <span className="text-pink-300 text-xs">vol</span>
          <input
            type="range" min={0} max={1} step={0.05}
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="w-28"
          />
        </div>
      )}
    </div>
  )
}
