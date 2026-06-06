import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import BreakSuggestion from './BreakSuggestion'

const RADIUS = 120
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type Mode = 'work' | 'break'
type TimerState = 'idle' | 'running' | 'paused'

function playChime() {
  try {
    const ctx = new AudioContext()
    ;[523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      const t = ctx.currentTime + i * 0.18
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.18, t + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2)
      osc.start(t)
      osc.stop(t + 1.2)
    })
  } catch { /* blocked */ }
}

function loadSessionCount(): number {
  const today = new Date().toDateString()
  if (localStorage.getItem('pomo_date') === today) {
    return parseInt(localStorage.getItem('pomo_count') ?? '0', 10)
  }
  return 0
}

function saveSessionCount(n: number) {
  localStorage.setItem('pomo_date', new Date().toDateString())
  localStorage.setItem('pomo_count', String(n))
}

export default function PomodoroTimer() {
  const [workMin, setWorkMin] = useState(25)
  const [breakMin, setBreakMin] = useState(5)
  const [mode, setMode] = useState<Mode>('work')
  const [timerState, setTimerState] = useState<TimerState>('idle')
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [sessionCount, setSessionCount] = useState(loadSessionCount)
  const [showBreak, setShowBreak] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const modeRef = useRef(mode)
  const workRef = useRef(workMin)
  const breakRef = useRef(breakMin)
  const sessionRef = useRef(sessionCount)
  useLayoutEffect(() => {
    modeRef.current = mode
    workRef.current = workMin
    breakRef.current = breakMin
    sessionRef.current = sessionCount
  })

  const configuredSeconds = mode === 'work' ? workMin * 60 : breakMin * 60
  const displaySeconds = timerState === 'idle' ? configuredSeconds : secondsLeft
  const progress = configuredSeconds > 0 ? displaySeconds / configuredSeconds : 0
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const mm = String(Math.floor(displaySeconds / 60)).padStart(2, '0')
  const ss = String(displaySeconds % 60).padStart(2, '0')
  const timeStr = `${mm}:${ss}`

  useEffect(() => {
    document.title = `${timeStr} | pomopink`
    return () => { document.title = 'pomopink' }
  }, [timeStr])

  const handleComplete = useCallback(() => {
    playChime()
    if (modeRef.current === 'work') {
      const next = sessionRef.current + 1
      setSessionCount(next)
      saveSessionCount(next)
      setMode('break')
      setSecondsLeft(breakRef.current * 60)
      setShowBreak(true)
    } else {
      setMode('work')
      setSecondsLeft(workRef.current * 60)
      setShowBreak(false)
    }
    setTimerState('idle')
  }, [])

  useEffect(() => {
    if (timerState !== 'running') return
    const id = window.setInterval(() => {
      setSecondsLeft(s => (s <= 1 ? 0 : s - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [timerState])

  useEffect(() => {
    if (secondsLeft !== 0 || timerState !== 'running') return
    handleComplete()
  }, [secondsLeft, timerState, handleComplete])

  const handleStart = () => {
    if (timerState === 'idle') setSecondsLeft(configuredSeconds)
    setTimerState('running')
  }
  const handlePause = () => setTimerState('paused')
  const handleReset = () => {
    setTimerState('idle')
    setMode('work')
    setShowBreak(false)
  }
  const handleModeSwitch = (m: Mode) => {
    if (timerState !== 'idle') return
    setMode(m)
  }

  const isWork = mode === 'work'
  const ringColor  = isWork ? '#ec4899' : '#38bdf8'
  const trackColor = isWork ? '#fce7f3' : '#e0f2fe'
  const glowClass  = isWork ? 'ring-glow-pink' : 'ring-glow-blue'
  const cyclePos   = sessionCount % 4

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-lg">

      {/* Mode tabs */}
      <div className="flex gap-1 card rounded-2xl p-1">
        {(['work', 'break'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => handleModeSwitch(m)}
            disabled={timerState !== 'idle'}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              mode === m
                ? isWork
                  ? 'bg-pink-100 text-pink-600 shadow-sm'
                  : 'bg-sky-100 text-sky-600 shadow-sm'
                : 'text-pink-300 hover:text-pink-500 disabled:cursor-not-allowed'
            }`}
          >
            {m === 'work' ? 'Focus' : 'Break'}
          </button>
        ))}
      </div>

      {/* Circular timer */}
      <div className="relative flex items-center justify-center w-72 h-72">
        <svg
          viewBox="0 0 280 280"
          className={`absolute inset-0 w-full h-full -rotate-90 ${glowClass}`}
          aria-hidden
        >
          <circle cx="140" cy="140" r="135" fill="none" stroke={trackColor} strokeWidth="1.5" opacity="0.8" />
          <circle cx="140" cy="140" r={RADIUS} fill="none" stroke={trackColor} strokeWidth="14" />
          <circle
            cx="140" cy="140" r={RADIUS}
            fill="none"
            stroke={ringColor}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{
              transition: timerState === 'running' ? 'stroke-dashoffset 0.95s linear' : 'none',
            }}
          />
        </svg>

        <div className="flex flex-col items-center select-none z-10 gap-2">
          <span className={`font-display tabular-nums leading-none font-medium ${isWork ? 'text-pink-600' : 'text-sky-500'}`}
            style={{ fontSize: 32 }}>
            {timeStr}
          </span>
          <span className={`text-xs uppercase tracking-widest font-medium ${isWork ? 'text-pink-300' : 'text-sky-300'}`}>
            {isWork ? 'focus time' : 'break time'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          title="Reset"
          className="w-11 h-11 rounded-full card text-pink-400 hover:text-pink-600 flex items-center justify-center transition-all hover:scale-105 text-xl"
        >
          ↺
        </button>

        <button
          onClick={timerState === 'running' ? handlePause : handleStart}
          className={`px-10 py-3.5 rounded-full font-semibold text-base text-white shadow-md transition-all hover:scale-105 active:scale-95 ${
            isWork
              ? 'bg-pink-400 hover:bg-pink-500 shadow-pink-200'
              : 'bg-sky-400 hover:bg-sky-500 shadow-sky-200'
          }`}
        >
          {timerState === 'running' ? 'Pause' : timerState === 'paused' ? 'Resume' : 'Start'}
        </button>

        <button
          onClick={() => setSettingsOpen(true)}
          title="Settings"
          className="w-11 h-11 rounded-full card text-pink-400 hover:text-pink-600 flex items-center justify-center transition-all hover:scale-105 text-lg"
        >
          ⚙
        </button>
      </div>

      {/* Session dots */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < cyclePos ? 'bg-pink-400 shadow-sm shadow-pink-200' : 'border-2 border-pink-300 bg-transparent'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-pink-300">
          {sessionCount === 0
            ? 'no pomos yet today'
            : `${sessionCount} pomo${sessionCount !== 1 ? 's' : ''} today`}
        </span>
      </div>

      {showBreak && <BreakSuggestion onDismiss={() => setShowBreak(false)} />}

      {/* Settings modal */}
      {settingsOpen && (
        <div
          className="fixed inset-0 bg-pink-950/10 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={e => e.target === e.currentTarget && setSettingsOpen(false)}
        >
          <div className="card rounded-3xl p-8 shadow-2xl w-full max-w-xs">
            <h2 className="font-display text-sm text-pink-600 mb-7">Settings</h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-medium text-pink-600">Focus duration</label>
                  <span className="text-sm font-semibold text-pink-500">{workMin} min</span>
                </div>
                <input type="range" min={5} max={60} step={5}
                  value={workMin} onChange={e => setWorkMin(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs text-pink-200 mt-1">
                  <span>5m</span><span>60m</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-medium text-pink-600">Break duration</label>
                  <span className="text-sm font-semibold text-pink-500">{breakMin} min</span>
                </div>
                <input type="range" min={1} max={30} step={1}
                  value={breakMin} onChange={e => setBreakMin(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs text-pink-200 mt-1">
                  <span>1m</span><span>30m</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSettingsOpen(false)}
              data-no-sound
              className="mt-8 w-full py-3 rounded-full bg-pink-400 hover:bg-pink-500 text-white font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
