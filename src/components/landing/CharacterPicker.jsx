import { CHARACTERS, getCharacter } from '../../characters'

function MiniChar({ colors, size = 'md' }) {
  const sz = size === 'lg' ? 64 : 48
  const eyeR = size === 'lg' ? 13 : 10
  const pupilR = size === 'lg' ? 4 : 3
  const cx = sz / 2
  const cy = sz / 2

  return (
    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`}>
      <defs>
        <radialGradient id={`mc_${colors.id}`} cx="40%" cy="30%">
          <stop offset="0%" stopColor={colors.body1} />
          <stop offset="100%" stopColor={colors.body2} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={sz * 0.42} fill={`url(#mc_${colors.id})`} stroke={colors.stroke} strokeWidth="2" />
      <ellipse cx={cx - eyeR * 0.35} cy={cy - eyeR * 0.35} rx={eyeR * 0.28} ry={eyeR * 0.38} fill="#0f172a" />
      <ellipse cx={cx + eyeR * 0.35} cy={cy - eyeR * 0.35} rx={eyeR * 0.28} ry={eyeR * 0.38} fill="#0f172a" />
      <circle cx={cx - eyeR * 0.25} cy={cy - eyeR * 0.35} r={pupilR * 0.3} fill="white" />
      <circle cx={cx + eyeR * 0.45} cy={cy - eyeR * 0.35} r={pupilR * 0.3} fill="white" />
      <path d={`M ${cx - eyeR * 0.3} ${cy + eyeR * 0.3} Q ${cx} ${cy + eyeR * 0.6} ${cx + eyeR * 0.3} ${cy + eyeR * 0.3}`} fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function CharacterPicker({ current, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6" onClick={onClose}>
      <div className="bg-slate-800 rounded-3xl p-5 sm:p-6 w-full max-w-xs border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-white text-center font-bold text-sm sm:text-base mb-4">Elige tu personaje</h3>

        <div className="grid grid-cols-2 gap-3">
          {CHARACTERS.map(ch => {
            const selected = ch.id === current
            return (
              <button key={ch.id} onClick={() => { onSelect(ch.id); onClose() }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all active:scale-95 ${selected ? 'border-indigo-400 bg-indigo-900/30' : 'border-transparent bg-white/5 hover:bg-white/10'}`}>
                <MiniChar colors={ch} size="md" />
                <span className={`text-xs font-bold ${selected ? 'text-white' : 'text-slate-400'}`}>{ch.name}</span>
              </button>
            )
          })}
        </div>

        <button onClick={onClose}
          className="w-full mt-4 text-slate-500 text-xs font-medium hover:text-slate-300 transition-colors">
          Cerrar
        </button>
      </div>
    </div>
  )
}
