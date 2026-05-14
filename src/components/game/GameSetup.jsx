import { getStageById } from '../../stages'

const ALL_TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function GameSetup({ stageId, selectedTables, onTableChange, onStart, onBack }) {
  const stage = getStageById(stageId)

  const toggleTable = (num) => {
    const next = selectedTables.includes(num)
      ? selectedTables.filter(n => n !== num)
      : [...selectedTables, num]
    onTableChange(next)
  }

  if (!stage) return null

  const timeLabel = stage.timeConstraint
    ? stage.timeConstraint.type === 'total'
      ? `en menos de ${stage.timeConstraint.seconds}s`
      : `máx. ${stage.timeConstraint.seconds}s por pregunta`
    : 'sin límite de tiempo'

  const modeLabel = stage.gameMode === 'test' ? 'Tipo test' : 'Teclado numérico'

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]" style={{ background: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)' }}>
      <div className="text-white px-3 py-2.5 sm:p-4 shrink-0 relative">
        <button onClick={onBack}
          className="bg-white/20 p-1.5 rounded-lg active:bg-white/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
      </div>

      <div className="overflow-y-auto px-4 sm:px-6 py-4 flex flex-col gap-4 min-h-0">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 text-white text-center">
          <div className="text-4xl sm:text-5xl mb-3">{stage.icon}</div>
          <h2 className="text-fluid-2xl sm:text-3xl font-black">{stage.name}</h2>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <span className="bg-white/10 text-xs px-3 py-1 rounded-full border border-white/10">{modeLabel}</span>
            <span className="bg-white/10 text-xs px-3 py-1 rounded-full border border-white/10">Necesitas {stage.requiredCorrect}/{stage.numQuestions}</span>
            <span className="bg-white/10 text-xs px-3 py-1 rounded-full border border-white/10">{timeLabel}</span>
          </div>
          {stage.consecutiveWins > 1 && (
            <p className="text-yellow-300 text-xs sm:text-sm font-bold mt-3">
              ⚠️ {stage.consecutiveWins} veces seguidas
            </p>
          )}
        </div>

        <div>
          <div className="text-white text-xs sm:text-sm font-bold mb-2 opacity-80">Elige las tablas:</div>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {ALL_TABLES.map(num => (
              <button key={num} onClick={() => toggleTable(num)}
                className={`h-8 sm:h-9 rounded-lg font-bold text-sm sm:text-base transition-colors ${selectedTables.includes(num) ? 'bg-indigo-500 text-white shadow-sm' : 'bg-white/10 text-white/70 border border-white/20'}`}>
                {num}
              </button>
            ))}
          </div>
          {selectedTables.length === 0 && (
            <p className="text-orange-300 text-xs mt-1.5 text-center">Selecciona al menos una tabla</p>
          )}
        </div>
      </div>

      <div className="px-4 py-3 sm:p-4 shrink-0">
        <button onClick={() => onStart(stageId, selectedTables)}
          disabled={selectedTables.length === 0}
          className={`w-full text-sm sm:text-lg font-bold py-3 sm:py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 ${selectedTables.length === 0 ? 'bg-slate-500 text-slate-400' : 'bg-orange-500 text-white'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          ¡Empezar reto!
        </button>
      </div>
    </div>
  )
}
