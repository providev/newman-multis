import { useState } from 'react'

const ALL_TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function RepasoPage({ onBack }) {
  const [selectedTable, setSelectedTable] = useState(null)
  const [inverted, setInverted] = useState(false)

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <div className="bg-indigo-600 text-white px-3 py-2.5 sm:p-4 shadow-md rounded-b-2xl shrink-0 relative">
        <button onClick={onBack}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 p-1.5 rounded-lg active:bg-white/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <h1 className="text-fluid-xl sm:text-2xl font-bold text-center">📖 Repaso</h1>
      </div>

      <div className="overflow-y-auto px-3 py-2 sm:p-4 flex flex-col gap-3 sm:gap-4 min-h-0">
        <div className="shrink-0">
          <div className="text-xs sm:text-sm font-bold text-indigo-900 mb-1">Selecciona tablas:</div>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {ALL_TABLES.map(num => (
              <button key={num} onClick={() => setSelectedTable(selectedTable === num ? null : num)}
                className={`h-8 sm:h-9 rounded-lg font-bold text-sm sm:text-base transition-colors ${selectedTable === num ? 'bg-indigo-500 text-white shadow-sm' : 'bg-white text-slate-500 border border-slate-200'}`}>
                {num}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-indigo-900 font-medium cursor-pointer">
            <input type="checkbox" checked={inverted}
              onChange={e => setInverted(e.target.checked)}
              className="w-4 h-4 accent-indigo-500" />
            Formato invertido
          </label>
        </div>

        {selectedTable && (
          <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-bold text-indigo-700 mb-2">
              Tabla del {selectedTable}
            </h3>
            <div className="flex flex-col items-center gap-1 text-base sm:text-lg">
              {Array.from({ length: 10 }, (_, i) => i + 1).map(mult => {
                const a = inverted ? mult : selectedTable
                const b = inverted ? selectedTable : mult
                const result = a * b
                return (
                  <div key={mult} className="grid grid-cols-[auto_auto_auto_auto_auto] gap-x-1 font-mono text-slate-700 py-0.5">
                    <span className="text-right w-6">{a}</span>
                    <span className="w-4 text-center text-slate-400">×</span>
                    <span className="text-left w-6">{b}</span>
                    <span className="w-4 text-center text-slate-400">=</span>
                    <span className="font-bold text-indigo-600 text-left w-8">{result}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {!selectedTable && (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm sm:text-base">
            Selecciona una tabla para empezar
          </div>
        )}
      </div>
    </div>
  )
}
