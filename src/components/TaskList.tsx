import { useState } from 'react'

interface Task {
  id: string
  text: string
  done: boolean
}

function load(): Task[] {
  try { return JSON.parse(localStorage.getItem('pomo_tasks') ?? '[]') } catch { return [] }
}

function save(tasks: Task[]) {
  localStorage.setItem('pomo_tasks', JSON.stringify(tasks))
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(load)
  const [input, setInput] = useState('')

  const update = (next: Task[]) => { setTasks(next); save(next) }

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    update([...tasks, { id: crypto.randomUUID(), text, done: false }])
    setInput('')
  }

  const toggle = (id: string) =>
    update(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const remove = (id: string) =>
    update(tasks.filter(t => t.id !== id))

  const pending = tasks.filter(t => !t.done)
  const done    = tasks.filter(t => t.done)

  return (
    <div className="border-t border-pink-100/60 px-5 py-4">
      <h3 className="font-display text-pink-600 text-xs font-medium mb-3">tasks</h3>

      <form onSubmit={add} className="flex items-center gap-2 mb-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="add a task…"
          className="flex-1 text-xs bg-transparent text-pink-800 placeholder-pink-200 border-b border-pink-100 focus:border-pink-300 focus:outline-none py-1 transition-colors"
        />
        <button
          type="submit"
          className="text-pink-400 hover:text-pink-600 text-base leading-none transition-colors"
          title="Add task"
        >
          +
        </button>
      </form>

      {tasks.length === 0 && (
        <p className="text-pink-200 text-xs">nothing here yet</p>
      )}

      <ul className="space-y-2">
        {pending.map(task => (
          <li key={task.id} className="flex items-start gap-2 group">
            <button
              onClick={() => toggle(task.id)}
              className="mt-0.5 w-3.5 h-3.5 rounded-sm border-2 border-pink-300 flex-shrink-0 flex items-center justify-center transition-colors hover:border-pink-400"
            />
            <span className="text-xs flex-1 leading-relaxed text-pink-700 break-words">
              {task.text}
            </span>
            <button
              onClick={() => remove(task.id)}
              data-no-sound
              className="opacity-0 group-hover:opacity-100 text-pink-200 hover:text-pink-400 text-sm leading-none flex-shrink-0 transition-all"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {done.length > 0 && (
        <ul className="space-y-2 mt-3">
          {done.map(task => (
            <li key={task.id} className="flex items-start gap-2 group">
              <button
                onClick={() => toggle(task.id)}
                className="mt-0.5 w-3.5 h-3.5 rounded-sm border-2 border-pink-300 bg-pink-300 flex-shrink-0 flex items-center justify-center transition-colors"
              >
                <span className="text-white leading-none" style={{ fontSize: 8 }}>✓</span>
              </button>
              <span className="text-xs flex-1 leading-relaxed text-pink-200 line-through break-words">
                {task.text}
              </span>
              <button
                onClick={() => remove(task.id)}
                data-no-sound
                className="opacity-0 group-hover:opacity-100 text-pink-200 hover:text-pink-400 text-sm leading-none flex-shrink-0 transition-all"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
