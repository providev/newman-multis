import { useEffect, useRef } from 'react'
import Character from './Character'

export default function ChampionScreen({ character, onFinish }) {
  const finished = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (!finished.current) {
        finished.current = true
        onFinish()
      }
    }, 4500)
    return () => clearTimeout(t)
  }, [onFinish])

  const handleClick = () => {
    if (finished.current) return
    finished.current = true
    onFinish()
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-6 relative overflow-hidden cursor-pointer"
      onClick={handleClick}
      style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1e1b4b 35%, #312e81 65%, #4338ca 100%)' }}
    >
      <style>{`
        @keyframes champion-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(234,179,8,0.3), 0 0 60px rgba(234,179,8,0.1); transform: scale(1); }
          50% { text-shadow: 0 0 40px rgba(234,179,8,0.8), 0 0 80px rgba(234,179,8,0.3); transform: scale(1.05); }
        }
        @keyframes champion-stars {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--sx), var(--sy)) scale(1.5) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="absolute text-yellow-400 text-sm"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `champion-stars 2s ease-out ${Math.random() * 3}s infinite`,
              '--sx': `${-60 + Math.random() * 120}px`,
              '--sy': `${-60 + Math.random() * 120}px`,
            }}
          >★</div>
        ))}
      </div>

      <Character mood="celebrate" size="lg" variant={character} />
      <h1 className="text-4xl sm:text-5xl font-black text-yellow-400 animate-pulse"
        style={{ animation: 'champion-glow 2s ease-in-out infinite' }}>
        🏆 CAMPEÓN DE MULTIS 🏆
      </h1>
      <p className="text-indigo-200 text-sm">Has completado todos los retos</p>
      <p className="text-indigo-400/50 text-xs mt-2">Toca para continuar</p>
    </div>
  )
}
