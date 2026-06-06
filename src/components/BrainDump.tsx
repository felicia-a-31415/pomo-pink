import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'
import QuoteDisplay from './QuoteDisplay'
import TaskList from './TaskList'

interface Props {
  user: User | null
  onClose?: () => void
}

type SaveState = 'idle' | 'saving' | 'saved'

export default function BrainDump({ user, onClose }: Props) {
  const [content, setContent] = useState('')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [collapsed, setCollapsed] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!user) return
    supabase
      .from('brain_dump')
      .select('content')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.content) setContent(data.content)
      })
  }, [user])

  const persist = async (val: string) => {
    if (!user) return
    setSaveState('saving')
    await supabase.from('brain_dump').upsert(
      { user_id: user.id, content: val, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )
    setSaveState('saved')
    setTimeout(() => setSaveState('idle'), 2000)
  }

  const handleChange = (val: string) => {
    setContent(val)
    setSaveState('idle')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => persist(val), 900)
  }

  if (collapsed) {
    return (
      <aside className="hidden lg:flex flex-col items-center border-l border-pink-100 bg-white/30 backdrop-blur-sm w-12 min-h-screen py-4">
        <button
          onClick={() => setCollapsed(false)}
          className="w-8 h-8 rounded-full hover:bg-pink-100 text-pink-400 flex items-center justify-center transition-colors text-sm"
          title="Expand"
        >
          ←
        </button>
        <div className="flex-1 flex items-center justify-center">
          <span
            className="text-pink-200 text-xs tracking-widest select-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            brain dump
          </span>
        </div>
      </aside>
    )
  }

  return (
    <aside className="flex flex-col w-80 border-l border-pink-100 bg-white/40 backdrop-blur-sm min-h-screen">
      <div className="flex items-center justify-between px-5 py-4 border-b border-pink-100/60">
        <h2 className="font-display text-pink-600 text-xs font-medium">brain dump</h2>
        <div className="flex items-center gap-1">
          {onClose && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full hover:bg-pink-100 text-pink-400 flex items-center justify-center transition-colors text-lg lg:hidden"
              title="Close"
            >
              ×
            </button>
          )}
          <button
            onClick={() => setCollapsed(true)}
            className="hidden lg:flex w-7 h-7 rounded-full hover:bg-pink-100 text-pink-400 items-center justify-center transition-colors text-sm"
            title="Collapse"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5 gap-3">
        <textarea
          value={content}
          onChange={e => handleChange(e.target.value)}
          placeholder="What's on your mind? Tasks, ideas, feelings, anything…"
          className="flex-1 w-full resize-none bg-transparent text-pink-800 placeholder-pink-200 text-sm leading-relaxed focus:outline-none min-h-[400px]"
          spellCheck={false}
        />
        <div className="text-xs text-right h-4">
          {saveState === 'saving' && <span className="text-pink-300">saving…</span>}
          {saveState === 'saved'  && <span className="text-sky-400">✓ saved</span>}
          {!user && content       && <span className="text-pink-200">sign in to sync</span>}
        </div>
      </div>

      <TaskList />
      <QuoteDisplay />
    </aside>
  )
}
