import { useState, useEffect } from 'react'
import CharacterPicker from './CharacterPicker'

const TEXT = 'Fun multis'

export default function Landing({ username, character, onUsernameChange, onCharacterChange, onSelectMode }) {
  const [animate, setAnimate] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    const returning = sessionStorage.getItem('returningFromMode') === 'true'
    if (returning) {
      sessionStorage.removeItem('returningFromMode')
      setAnimate(false)
      setShowContent(true)
    } else {
      const lastDelay = (TEXT.length - 1) * 0.12
      setTimeout(() => setShowContent(true), (lastDelay + 0.7) * 1000 + 200)
    }
  }, [])

  const handleNavigate = (mode) => {
    sessionStorage.setItem('returningFromMode', 'true')
    onSelectMode(mode)
  }

  return (
    <div
      className="h-full flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #1e1b4b 100%)' }}
    >
      <div className="flex flex-wrap justify-center gap-x-1 mb-4 sm:mb-6">
        {TEXT.split('').map((ch, i) => (
          <span
            key={i}
            className={`inline-block text-4xl sm:text-6xl md:text-7xl font-black text-white drop-shadow-lg ${ch === ' ' ? 'w-3 sm:w-4' : ''}`}
            style={animate ? { animation: `letterIn 0.7s ease-out ${i * 0.12}s both` } : {}}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </div>

      {showContent && (
        <div className="w-full flex flex-col items-center gap-4 sm:gap-6" style={{ animation: 'fadeUp 0.8s ease-out both' }}>
          <div className="w-full text-center text-white">
            {!username ? (
              <div>
                <p className="text-indigo-200 text-xs sm:text-sm mb-2">¿Cómo te llamas?</p>
                <div className="flex gap-2 max-w-[260px] mx-auto">
                  <input id="nameInput" type="text" maxLength={20} placeholder="Tu nombre..."
                    onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value.trim()) onUsernameChange(e.target.value.trim()) }}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm placeholder:text-indigo-300/50 outline-none focus:border-indigo-400 transition-colors" />
                  <button onClick={() => { const inp = document.getElementById('nameInput'); if (inp?.value.trim()) onUsernameChange(inp.value.trim()) }}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-xl font-bold text-sm active:bg-indigo-400 transition-colors">OK</button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-indigo-200 text-xs sm:text-sm">Jugando como</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-white font-bold text-base sm:text-xl">{username}</span>
                  <button onClick={() => onUsernameChange('')} className="text-indigo-300 text-xs hover:text-white transition-colors" title="Cambiar nombre">✏️</button>
                  <button onClick={() => setShowPicker(true)} className="text-indigo-300 text-xs hover:text-white transition-colors" title="Cambiar personaje">🎨</button>
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex gap-3 sm:gap-4">
            <button onClick={() => handleNavigate('training')}
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-3 active:scale-95 transition-all hover:bg-white/15">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg">📚</div>
              <div className="text-center">
                <h2 className="text-white font-bold text-sm sm:text-lg">Training</h2>
                <p className="text-indigo-200 text-xs sm:text-sm mt-0.5">Practica tus tablas</p>
              </div>
              <div className="mt-1 bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">Entrar →</div>
            </button>
            <button onClick={() => handleNavigate('game')}
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-3 active:scale-95 transition-all hover:bg-white/15">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg">🎮</div>
              <div className="text-center">
                <h2 className="text-white font-bold text-sm sm:text-lg">Game</h2>
                <p className="text-indigo-200 text-xs sm:text-sm mt-0.5">Campaña de retos</p>
              </div>
              <div className="mt-1 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">Jugar →</div>
            </button>
          </div>
        </div>
      )}

      {showPicker && (
        <CharacterPicker
          current={character}
          onSelect={onCharacterChange}
          onClose={() => setShowPicker(false)}
        />
      )}

      <style>{`
        @keyframes letterIn {
          0% { opacity: 0; transform: translateY(40px) scale(0.6); filter: blur(8px); }
          50% { transform: translateY(-6px) scale(1.08); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
