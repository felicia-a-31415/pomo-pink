# 🍅 pomopink

A pink, aesthetic Pomodoro timer built for deep focus. Press Start 2P font, a circular countdown ring, break suggestions, a synced brain dump notepad, and a daily motivational quote — all wrapped in a soft pink and sky blue palette.

---

## Features

- **Circular timer** — animated SVG ring in pink (focus) and sky blue (break), with a chime on completion
- **Session counter** — tracks how many pomos you've done today, resets at midnight
- **Break suggestions** — 31 curated suggestions across three categories (Move, Rest, Reset) with a refresh button; pops up automatically when a work session ends
- **Brain dump** — distraction-free notepad in the sidebar, auto-saved to Supabase with a 900ms debounce; collapses on desktop, slides in as an overlay on mobile
- **Daily quote** — one motivational quote per day pulled from a pool of 50, stored in localStorage so it stays consistent all day
- **Magic link auth** — sign in with your email to sync your brain dump across devices; anonymous session created automatically on first visit
- **Click sounds** — Minecraft-style noise burst on button clicks (excluded from dismiss/close/nav buttons)
- **Tab title** — updates live as the timer counts down (`25:00 | pomopink`)

---

## Stack

| Layer | Tech |
|---|---|
| UI | React 19 + TypeScript |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 |
| Backend | Supabase (auth + database) |
| Font | Press Start 2P (headings/timer) · DM Sans (body) |
