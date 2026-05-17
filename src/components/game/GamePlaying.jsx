import { useState, useEffect, useRef } from 'react'
import { getStageById } from '../../stages'
import Numpad from '../shared/Numpad'
import OptionButtons from '../shared/OptionButtons'
import ProgressBar from '../shared/ProgressBar'

export default function GamePlaying({ stageId, gameState, handleAnswer, onFinish, onBack }) {
  const stage = getStageById(stageId)
  const { phase, questions, currentIndex, score, totalTime, timeLeft, feedbackType, feedbackAnswer } = gameState
  const [currentInput, setCurrentInput] = useState('')
  const finishedCalled = useRef(false)

  useEffect(() => {
    if (phase === 'finished' && !finishedCalled.current) {
      finishedCalled.current = true
      const won = score >= stage.requiredCorrect
      const withinTime = stage.timeConstraint?.type === 'total'
        ? totalTime <= stage.timeConstraint.seconds
        : true
      const timeUsed = stage.timeConstraint?.type === 'perQuestion'
        ? (stage.timeConstraint?.seconds ?? 0)
        : totalTime
      onFinish({ score, total: stage.numQuestions, won: won && withinTime, totalTime, timeUsed })
    }
    if (phase !== 'finished') {
      finishedCalled.current = false
    }
  }, [phase])

  useEffect(() => {
    setCurrentInput('')
  }, [currentIndex])

  const inputHandler = (val) => {
    if (val === 'del') {
      setCurrentInput(prev => prev.slice(0, -1))
    } else if (val === 'ok') {
      if (currentInput !== '') handleAnswer(parseInt(currentInput, 10))
    } else {
      if (currentInput.length < 3) setCurrentInput(prev => prev + val)
    }
  }

  const q = questions[currentIndex]
  const hasPerQuestionTimer = stage.timeConstraint?.type === 'perQuestion'
  const hasTotalTimer = stage.timeConstraint?.type === 'total'
  const timeDisplay = hasPerQuestionTimer ? `${timeLeft}sg` : `${totalTime}s`

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <div className="bg-indigo-600 text-white px-3 py-2 sm:p-4 flex justify-between items-center rounded-b-2xl shadow-md z-10 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={onBack} className="bg-white/20 p-1.5 rounded-lg active:bg-white/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <span className="bg-indigo-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg font-bold text-[14px] sm:text-[18px]">{currentIndex + 1}/{stage.numQuestions}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 font-bold text-[14px] sm:text-[18px]">
          <div className="flex items-center gap-1 text-yellow-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            {score}
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3L2 6"/><path d="M19 3l3 3"/><path d="M12 1v2"/></svg>
            {timeDisplay}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-4 sm:px-6 relative min-h-0 overflow-hidden">
        {phase === 'feedback' && feedbackType && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20 rounded-2xl">
            {feedbackType === 'correct' ? (
              <div className="bg-green-500 text-white rounded-full p-5 sm:p-8 shadow-2xl animate-bounce-short">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-12 h-12 sm:w-16 sm:h-16"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            ) : (
              <div className="bg-red-500 text-white rounded-2xl sm:rounded-3xl py-5 sm:py-8 px-6 sm:px-10 shadow-2xl flex flex-col items-center animate-pulse-short">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10 sm:w-12 sm:h-12"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span className="text-[clamp(14px,4vw,20px)] sm:text-[24px] font-black text-center mt-2">¡Era {feedbackAnswer}!</span>
              </div>
            )}
          </div>
        )}

        {q && (
          <>
            <div className="text-slate-400 font-bold text-[12px] sm:text-[20px] mb-1 sm:mb-4">Tabla del {q.table}</div>
            <div className="text-[clamp(24px,9vw,48px)] sm:text-[72px] font-black text-indigo-700 tracking-wider">{q.table} × {q.multiplier}</div>
          </>
        )}

        {hasPerQuestionTimer && <ProgressBar current={timeLeft} max={stage.timeConstraint.seconds} />}

        {stage.gameMode === 'input' && (
          <div className="mt-1 sm:mt-4 bg-white border-2 sm:border-4 border-indigo-200 rounded-xl sm:rounded-2xl w-28 sm:w-48 h-12 sm:h-20 flex items-center justify-center text-[clamp(18px,6vw,30px)] sm:text-[48px] font-bold text-indigo-900 shadow-inner relative">
            {currentInput}<span className="w-0.5 sm:w-1 h-5 sm:h-8 bg-indigo-400 animate-pulse ml-0.5 sm:ml-1" />
          </div>
        )}
      </div>

      <div className="px-3 py-2 sm:p-4 bg-white rounded-t-2xl sm:rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] shrink-0">
        {stage.gameMode === 'test' && q ? (
          <OptionButtons options={q.options} onSelect={handleAnswer} />
        ) : (
          <Numpad onInput={inputHandler} />
        )}
      </div>
    </div>
  )
}
