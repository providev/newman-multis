import { useState } from 'react'
import { getRankings, saveRankings } from '../../utils/storage'

export default function TrainingRanking({ onBack }) {
  const [rankings, setRankings] = useState(() => getRankings())

  const handleDelete = (id) => {
    const next = rankings.filter(r => r.id !== id)
    setRankings(next)
    saveRankings(next)
  }

  const visible = rankings.slice(0, 15)

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <div className="bg-indigo-600 text-white px-3 py-2.5 sm:p-4 shadow-md rounded-b-2xl sm:rounded-b-3xl flex justify-between items-center z-10 shrink-0">
        <h1 className="text-fluid-xl sm:text-2xl font-bold flex items-center gap-2 text-yellow-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          <span className="text-white">Ranking</span>
        </h1>
        <button onClick={onBack} className="bg-white/20 p-1.5 rounded-full active:bg-white/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div className="px-3 py-2 sm:p-4 flex flex-col gap-1.5 sm:gap-2 overflow-y-auto min-h-0">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
            <div className="opacity-20 scale-150">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </div>
            <p className="text-sm sm:text-lg font-medium">Aún no hay partidas jugadas.</p>
          </div>
        ) : (
          visible.map((r, i) => (
            <div key={r.id} className="bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-sm flex justify-between items-center border border-slate-100 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="text-base sm:text-2xl font-black text-slate-200 w-5 sm:w-8 text-center shrink-0">{i + 1}º</div>
                <div className="min-w-0">
                  <p className="font-bold text-sm sm:text-xl text-indigo-900 truncate">{Math.round(r.percentage)}% <span className="text-xs sm:text-sm font-normal text-slate-500">({r.score}/{r.total})</span></p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                    {r.timeMode === 'stopwatch' ? `⏱️ ${r.time}s` : `⏳ ${r.timeMode}`} · {r.date}
                  </p>
                  <p className="text-[10px] sm:text-xs text-indigo-500 font-bold truncate">Tablas: {r.tables}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(r.id)}
                className="text-red-400 active:text-red-600 p-1.5 sm:p-3 bg-red-50 rounded-lg sm:rounded-xl active:bg-red-100 transition-colors shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
