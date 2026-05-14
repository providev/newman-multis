import { useState } from 'react'

const ALL_TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const QUESTION_OPTIONS = [5, 10, 20]

export default function TrainingSetup({ config, setConfig, onStart, onRanking, onBack }) {
  const toggleTable = (num) => {
    setConfig(prev => ({
      ...prev,
      selectedTables: prev.selectedTables.includes(num)
        ? prev.selectedTables.filter(n => n !== num)
        : [...prev.selectedTables, num],
    }))
  }

  const setMode = (mode) => setConfig(prev => ({ ...prev, gameMode: mode }))
  const setTimeMode = (mode) => setConfig(prev => ({ ...prev, timeMode: mode }))
  const setNumQ = (n) => setConfig(prev => ({ ...prev, numQuestions: n }))
  const setCountdown = (s) => setConfig(prev => ({ ...prev, timeMode: 'countdown', countdownSecs: s }))

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <div className="bg-indigo-600 text-white px-3 py-2.5 sm:p-4 shadow-md rounded-b-2xl shrink-0 relative">
        <button onClick={onBack}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 p-1.5 rounded-lg active:bg-white/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <h1 className="text-fluid-xl sm:text-2xl font-bold text-center flex items-center justify-center gap-2">
          📚 Training
        </h1>
      </div>

      <div className="overflow-y-auto px-3 py-2 sm:p-4 flex flex-col gap-3 sm:gap-4 min-h-0">
        <div className="shrink-0">
          <div className="text-xs sm:text-sm font-bold text-indigo-900 mb-1">1. Tablas a repasar:</div>
          <div className={`grid grid-cols-5 gap-1.5 sm:gap-2 ${config.reviewErrors ? 'pointer-events-none opacity-30' : ''}`}>
            {ALL_TABLES.map(num => (
              <button key={num} onClick={() => toggleTable(num)}
                className={`h-8 sm:h-9 rounded-lg font-bold text-sm sm:text-base transition-colors ${config.selectedTables.includes(num) ? 'bg-indigo-500 text-white shadow-sm' : 'bg-white text-slate-500 border border-slate-200'}`}>
                {num}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-indigo-900 font-medium cursor-pointer">
            <input type="checkbox" checked={!!config.reviewErrors}
              onChange={e => setConfig(prev => ({ ...prev, reviewErrors: e.target.checked }))}
              className="w-4 h-4 accent-indigo-500" />
            Repasar últimos errores
          </label>
        </div>

        <div className="shrink-0">
          <div className="text-xs sm:text-sm font-bold text-indigo-900 mb-1">2. Tipo de respuesta:</div>
          <div className="flex gap-1.5">
            <button onClick={() => setMode('test')}
              className={`flex-1 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-colors ${config.gameMode === 'test' ? 'bg-green-500 text-white shadow-sm' : 'bg-white text-slate-500 border border-slate-200'}`}>Test</button>
            <button onClick={() => setMode('input')}
              className={`flex-1 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-colors ${config.gameMode === 'input' ? 'bg-green-500 text-white shadow-sm' : 'bg-white text-slate-500 border border-slate-200'}`}>Teclado</button>
          </div>
        </div>

        <div className="shrink-0">
          <div className="text-xs sm:text-sm font-bold text-indigo-900 mb-1">3. Elige el reto:</div>
          <div className="flex items-center justify-between bg-white h-9 sm:h-10 px-1.5 sm:px-2 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-600 text-xs">Nº Preguntas</span>
            <div className="flex gap-1">
              {QUESTION_OPTIONS.map(n => (
                <button key={n} onClick={() => setNumQ(n)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${config.numQuestions === n ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <div className="text-xs sm:text-sm font-bold text-indigo-900 mb-1">4. Modo:</div>
          <div className="flex flex-col gap-1.5">
            <button onClick={() => setTimeMode('stopwatch')}
              className={`w-full h-9 sm:h-10 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1 transition-colors ${config.timeMode === 'stopwatch' ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-slate-500 border border-slate-200'}`}>
              ⏱️ Cronómetro
            </button>
            <div onClick={() => setTimeMode('countdown')}
              className={`w-full h-9 sm:h-10 px-2 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${config.timeMode === 'countdown' ? 'bg-orange-50 border-orange-500' : 'bg-white border-slate-200'}`}>
              <span className={`font-bold text-xs sm:text-sm ${config.timeMode === 'countdown' ? 'text-orange-700' : 'text-slate-500'}`}>⏳ Cuenta atrás</span>
              <div className="flex gap-1">
                {[5, 10, 15].map(s => (
                  <button key={s} onClick={(e) => { e.stopPropagation(); setCountdown(s) }}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${config.timeMode === 'countdown' && config.countdownSecs === s ? 'bg-orange-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500'}`}>{s}s</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0" />
      </div>

      <div className="px-3 py-2 sm:p-4 flex gap-2 shrink-0">
        <button onClick={onRanking}
          className="w-14 sm:w-16 bg-white border border-indigo-200 text-indigo-600 rounded-xl flex flex-col justify-center items-center gap-0.5 active:bg-indigo-50 transition-colors py-1">
          <div className="text-yellow-500 scale-75 sm:scale-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          </div>
          <span className="text-[10px] sm:text-xs font-bold leading-tight">Top</span>
        </button>
        <button onClick={onStart} disabled={config.reviewErrors ? false : config.selectedTables.length === 0}
          className={`flex-1 text-sm sm:text-lg font-bold py-2.5 sm:py-3.5 rounded-xl shadow-lg flex justify-center items-center gap-2 transition-transform active:scale-95 ${config.reviewErrors ? 'bg-indigo-600 text-white active:bg-indigo-700' : config.selectedTables.length === 0 ? 'bg-slate-300 text-white' : 'bg-indigo-600 text-white active:bg-indigo-700'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          JUGAR
        </button>
      </div>
    </div>
  )
}
