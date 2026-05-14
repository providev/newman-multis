import { useMemo } from 'react'

const COLORS = ['#ff0', '#f0f', '#0ff', '#f44', '#4f4', '#ff8800', '#fff']

export default function Fireworks() {
  const bursts = useMemo(() => {
    const result = []
    for (let b = 0; b < 8; b++) {
      const cx = 10 + Math.random() * 80
      const cy = 10 + Math.random() * 70
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const delay = Math.random() * 3
      const particles = []
      for (let p = 0; p < 8; p++) {
        const angle = (p / 8) * 360
        const dist = 30 + Math.random() * 60
        particles.push({
          tx: Math.cos((angle * Math.PI) / 180) * dist,
          ty: Math.sin((angle * Math.PI) / 180) * dist,
        })
      }
      result.push({ cx, cy, color, delay, particles })
    }
    return result
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes firework-burst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
      `}</style>
      {bursts.map((burst, bi) =>
        burst.particles.map((p, pi) => (
          <div key={`${bi}-${pi}`} className="absolute rounded-full"
            style={{
              left: `${burst.cx}%`,
              top: `${burst.cy}%`,
              width: 6,
              height: 6,
              backgroundColor: burst.color,
              animation: `firework-burst 1.2s ease-out ${burst.delay}s infinite`,
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
            }}
          />
        ))
      )}
    </div>
  )
}
