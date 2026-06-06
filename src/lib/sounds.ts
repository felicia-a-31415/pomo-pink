let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Approximates the Minecraft UI button click:
// short noise burst through a low-pass filter with fast percussive decay
export function playClick() {
  try {
    const c = getCtx()
    const t = c.currentTime
    const sampleRate = c.sampleRate

    const bufLen = Math.floor(sampleRate * 0.045)
    const buffer = c.createBuffer(1, bufLen, sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1

    const noise = c.createBufferSource()
    noise.buffer = buffer

    const lp = c.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 1400

    const gain = c.createGain()
    gain.gain.setValueAtTime(0.35, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04)

    noise.connect(lp)
    lp.connect(gain)
    gain.connect(c.destination)
    noise.start(t)
    noise.stop(t + 0.045)
  } catch { /* blocked */ }
}
