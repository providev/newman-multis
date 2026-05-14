import Character from './Character'
import Fireworks from './Fireworks'

export default function GameResult({ stage, result, onRetry, onContinue, character }) {
  const { won, score, total, totalTime, timeUsed } = result
  const passed = won

  return (
    <div className="h-full grid grid-rows-[1fr_auto] relative" style={{ background: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)' }}>
      {passed && <Fireworks />}
      <div className="flex flex-col items-center justify-center px-4 sm:px-8 text-center min-h-0 overflow-hidden relative z-10">
        {passed ? (
          <>
            <Character mood="happy" size="lg" variant={character} />
            <h1 className="text-white text-fluid-3xl sm:text-4xl font-black mt-4 mb-2">¡Reto superado! 🎉</h1>
            <p className="text-indigo-200 text-sm sm:text-lg mb-6">{stage.name} completado</p>
          </>
        ) : (
          <>
            <Character mood="idle" size="lg" variant={character} />
            <h1 className="text-white text-fluid-3xl sm:text-4xl font-black mt-4 mb-2">¡Inténtalo de nuevo!</h1>
            <p className="text-indigo-200 text-sm sm:text-lg mb-6">No te rindas, tú puedes 💪</p>
          </>
        )}

        <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm border border-white/20 text-white">
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <span className="text-indigo-200 text-sm sm:text-lg">Aciertos</span>
            <span className={`text-fluid-2xl sm:text-3xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {score}/{total}
            </span>
          </div>
          <div className="w-full bg-white/20 h-px sm:h-0.5 rounded-full mb-2 sm:mb-4" />
          <div className="flex justify-between items-center">
            <span className="text-indigo-200 text-sm sm:text-lg">Tiempo</span>
            <span className="text-fluid-2xl sm:text-3xl font-bold text-yellow-400">{totalTime}s</span>
          </div>
          <div className="mt-2 sm:mt-3 flex justify-center gap-1.5">
            {stage.requiredCorrect && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${score >= stage.requiredCorrect ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'}`}>
                Objetivo: {stage.requiredCorrect}/{total}
              </span>
            )}
          </div>
        </div>

        {stage.consecutiveWins > 1 && passed && (
          <p className="text-yellow-300 text-xs sm:text-sm font-bold mt-3">
            {result.consecutiveWins}/{stage.consecutiveWins} victorias consecutivas
          </p>
        )}
      </div>

      <div className="px-4 py-3 sm:p-6 flex flex-col gap-2 sm:gap-3 shrink-0 relative z-10">
        {passed ? (
          <button onClick={onContinue}
            className="w-full bg-green-500 text-white text-sm sm:text-xl font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95">
            {stage.consecutiveWins > 1 && result.consecutiveWins < stage.consecutiveWins
              ? '¡Siguiente ronda! →'
              : 'Siguiente reto →'}
          </button>
        ) : (
          <button onClick={onRetry}
            className="w-full bg-orange-500 text-white text-sm sm:text-xl font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95">
            🔄 Reintentar
          </button>
        )}
        <button onClick={onContinue}
          className="w-full bg-transparent text-indigo-300 text-xs sm:text-sm font-bold py-2 rounded-xl underline">
          Volver al mapa
        </button>
      </div>
    </div>
  )
}
