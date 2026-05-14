export default function TrainingResult({ config, score, totalTime, onMenu, onRanking, onBack }) {
  let msg = '¡Sigue practicando!'
  if (score === config.numQuestions) msg = '¡Perfecto! Eres un genio.'
  else if ((score / config.numQuestions) >= 0.7) msg = '¡Muy buen trabajo!'

  const timeTitle = config.timeMode === 'countdown' ? 'Tiempo límite' : 'Tiempo total'
  const timeVal = config.timeMode === 'stopwatch' ? `${totalTime}s` : `${config.countdownSecs}sg`

  return (
    <div className="h-full grid grid-rows-[1fr_auto] bg-indigo-600 text-white">
      <div className="flex flex-col items-center justify-center px-4 sm:px-8 text-center min-h-0 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className="text-yellow-300 w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xl mb-4">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
        </svg>
        <h1 className="text-fluid-3xl sm:text-4xl font-black mt-2 mb-1">¡Terminado!</h1>
        <p className="text-indigo-200 text-sm sm:text-xl mb-4 sm:mb-8">{msg}</p>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm border border-white/20">
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <span className="text-indigo-200 text-sm sm:text-lg">Aciertos</span>
            <span className="text-fluid-2xl sm:text-3xl font-bold text-green-400">{score}/{config.numQuestions}</span>
          </div>
          <div className="w-full bg-white/20 h-px sm:h-0.5 rounded-full mb-2 sm:mb-4" />
          <div className="flex justify-between items-center">
            <span className="text-indigo-200 text-sm sm:text-lg">{timeTitle}</span>
            <span className="text-fluid-2xl sm:text-3xl font-bold text-yellow-400">{timeVal}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 sm:p-6 bg-indigo-800/30 flex flex-col gap-2 sm:gap-3 shrink-0">
        <button onClick={onMenu}
          className="w-full bg-white text-indigo-700 text-sm sm:text-xl font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl flex justify-center items-center gap-2 transition-transform active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          VOLVER AL MENÚ
        </button>
        <button onClick={onRanking}
          className="w-full bg-indigo-800 text-white text-xs sm:text-lg font-bold py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-md flex justify-center items-center gap-2 transition-transform active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
          VER RANKING
        </button>
        <button onClick={onBack}
          className="w-full bg-transparent text-indigo-300 text-xs sm:text-sm font-bold py-1.5 sm:py-2 rounded-xl flex justify-center items-center gap-2 transition-transform active:scale-95 underline">
          ← Volver al inicio
        </button>
      </div>
    </div>
  )
}
