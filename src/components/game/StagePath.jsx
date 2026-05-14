import { useMemo, useState } from 'react'
import { stages } from '../../stages'
import { getCharacter } from '../../characters'
import StageNode from './StageNode'
import Character from './Character'

const POSITIONS = [
  { x: 60, y: 45 },   { x: 240, y: 45 },  { x: 240, y: 105 },
  { x: 60, y: 105 },  { x: 60, y: 165 },  { x: 240, y: 165 },
  { x: 240, y: 225 }, { x: 60, y: 225 },
]

const FINISH = { x: 150, y: 285 }

function getStatus(stage, progress, isStageUnlocked, currentStageId) {
  if (progress[stage.id]?.completed) return 'completed'
  if (stage.id === currentStageId) return 'current'
  if (isStageUnlocked(stage.id)) return 'available'
  return 'locked'
}

function SvgCharacter({ cx, cy, variant }) {
  const ch = getCharacter(variant)
  const gid = `charBody_${ch.id}`

  return (
    <g>
      <animateTransform attributeName="transform" type="translate" values={`${cx},${cy};${cx},${cy - 6};${cx},${cy}`} dur="3s" repeatCount="indefinite" />
      <defs>
        <radialGradient id={gid} cx="40%" cy="30%">
          <stop offset="0%" stopColor={ch.body1} />
          <stop offset="100%" stopColor={ch.body2} />
        </radialGradient>
      </defs>
      <circle cx={0} cy={0} r={22} fill={ch.shadow} />
      <circle cx={0} cy={0} r={17} fill={`rgba(0,0,0,0.08)`} />
      <circle cx={0} cy={0} r={13} fill={`url(#${gid})`} stroke={ch.stroke} strokeWidth="1.5" />
      <ellipse cx={-4.5} cy={-3} rx={3} ry={4} fill="#0f172a" />
      <ellipse cx={4.5} cy={-3} rx={3} ry={4} fill="#0f172a" />
      <circle cx={-3.5} cy={-3} r={1.3} fill="white" />
      <circle cx={5.5} cy={-3} r={1.3} fill="white" />
      <circle cx={-8} cy={4} r={2.5} fill={ch.cheek} />
      <circle cx={8} cy={4} r={2.5} fill={ch.cheek} />
      <path d="M -3.5 3 Q 0 6 3.5 3" fill="none" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  )
}

export default function StagePath({ progress, isStageUnlocked, currentStageId, allCompleted, onSelectStage, onBack, onReset, character }) {
  const [tooltipStage, setTooltipStage] = useState(null)
  const pathD = useMemo(() => {
    const pts = POSITIONS.map(p => `${p.x} ${p.y}`).join(' L ')
    return `M ${pts} L ${FINISH.x} ${FINISH.y}`
  }, [])

  if (allCompleted) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-6"
        style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1e1b4b 35%, #312e81 65%, #4338ca 100%)' }}>
        <Character mood="celebrate" size="lg" variant={character} />
        <h2 className="text-white text-fluid-2xl sm:text-3xl font-black mt-4">¡Felicidades!</h2>
        <p className="text-indigo-300 text-sm sm:text-base">Has completado todos los retos</p>
        <div className="text-4xl mt-4">🏆🎉🏆</div>
        <button onClick={onBack}
          className="mt-6 bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-white font-bold text-sm active:scale-95 transition-all">
          ← Volver al inicio
        </button>
      </div>
    )
  }

  const currentPos = POSITIONS[stages.findIndex(s => s.id === currentStageId)]

  return (
    <div className="h-full relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1e1b4b 35%, #312e81 65%, #4338ca 100%)' }}>
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-20"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${2 + Math.random() * 4}s` }} />
        ))}
      </div>

      {/* Back button */}
      <button onClick={onBack}
        className="absolute top-3 left-3 z-20 bg-white/10 hover:bg-white/20 p-1.5 rounded-lg active:bg-white/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
      </button>

      {/* Reset button */}
      <button onClick={() => {
        if (window.confirm('¿Reiniciar todo el progreso del modo Game?\n\nLos retos completados se perderán.')) {
          onReset()
        }
      }}
        className="absolute top-3 right-3 z-20 bg-white/10 hover:bg-red-400/20 p-1.5 rounded-lg active:bg-white/20 transition-colors"
        title="Reiniciar progreso">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 hover:text-red-400 transition-colors">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
      </button>

      {/* SVG board */}
      <svg viewBox="0 0 300 350" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
            <stop offset="50%" stopColor="#818cf8" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.5} />
          </linearGradient>
          <radialGradient id="charBody" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
          <filter id="roadGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === ROAD === */}
        {/* Outer glow */}
        <path d={pathD} stroke="rgba(99,102,241,0.3)" strokeWidth="20" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#roadGlow)" />
        {/* Main road */}
        <path d={pathD} stroke="url(#roadGrad)" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Inner dashed line */}
        <path d={pathD} stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6,8" />

        {/* === STAGES === */}
        {stages.map((stage, i) => {
          const pos = POSITIONS[i]
          const status = getStatus(stage, progress, isStageUnlocked, currentStageId)
          const isCurrent = stage.id === currentStageId
          const isUnlocked = status !== 'locked'
          const num = i + 1

          return (
            <StageNode
              key={stage.id}
              cx={pos.x}
              cy={pos.y}
              num={num}
              icon={stage.icon}
              status={status}
              isCurrent={isCurrent}
              isUnlocked={isUnlocked}
              onClick={() => onSelectStage(stage.id)}
              onLockedClick={() => setTooltipStage(stage)}
            />
          )
        })}

        {/* === CHARACTER === */}
        {currentPos && (
          <SvgCharacter cx={currentPos.x + 38} cy={currentPos.y} variant={character} />
        )}

        {/* === FINISH === */}
        <g transform={`translate(${FINISH.x}, ${FINISH.y})`}>
          <line x1={-30} y1={0} x2={30} y2={0} stroke="rgba(234,179,8,0.3)" strokeWidth="2" strokeDasharray="4,4" />
          <rect x={-10} y={-8} width={20} height={14} rx={2} fill="white" stroke="#eab308" strokeWidth="1.5" />
          <rect x={-10} y={-8} width={10} height={7} fill="#eab308" />
          <rect x={0} y={-1} width={10} height={7} fill="#eab308" />
          <rect x={-3} y={6} width={6} height={14} rx={1.5} fill="#eab308" />
          <text x={0} y={28} textAnchor="middle" fill="#eab308" fontSize="9" fontWeight="bold" fontFamily="system-ui" letterSpacing="2">META</text>
        </g>
      </svg>

      {/* Tooltip for locked stage */}
      {tooltipStage && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div className="bg-slate-800 rounded-2xl p-5 w-full max-w-[260px] shadow-2xl border border-slate-600/50 text-white"
            onClick={e => e.stopPropagation()}>
            <div className="text-center mb-3">
              <div className="text-3xl mb-1">🔒</div>
              <div className="text-2xl mb-0.5">{tooltipStage.icon}</div>
              <h3 className="text-lg font-bold">{tooltipStage.name}</h3>
            </div>
            <div className="bg-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-300 mb-3 leading-relaxed">
              {tooltipStage.description}
            </div>
            <div className="space-y-1 text-xs text-slate-400 mb-4">
              <p>🎯 Acertar {tooltipStage.requiredCorrect} de {tooltipStage.numQuestions}</p>
              {tooltipStage.timeConstraint && (
                <p>⏱ {tooltipStage.timeConstraint.type === 'total'
                  ? `Menos de ${tooltipStage.timeConstraint.seconds}s`
                  : `Máx. ${tooltipStage.timeConstraint.seconds}s por pregunta`}
                </p>
              )}
              {tooltipStage.consecutiveWins > 1 && (
                <p>🔥 {tooltipStage.consecutiveWins} veces seguidas</p>
              )}
              <p className="text-indigo-400 font-medium pt-1">
                {tooltipStage.gameMode === 'test' ? '📝 Tipo test' : '⌨️ Teclado numérico'}
              </p>
            </div>
            <button onClick={() => setTooltipStage(null)}
              className="w-full bg-slate-600 hover:bg-slate-500 active:scale-95 transition-all rounded-lg py-2 text-sm font-bold">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Hint text */}
      <div className="absolute bottom-1 left-0 right-0 text-center pointer-events-none">
        <p className="text-indigo-400/30 text-[10px]">Toca una etapa disponible para jugar</p>
      </div>
    </div>
  )
}
