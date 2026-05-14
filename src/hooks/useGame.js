import { useState, useEffect, useRef, useCallback } from 'react'
import { generateQuestions, generateErrorQuestions } from '../utils/gameLogic'
import { addErrorFact } from '../utils/storage'

export function useGame(config) {
  const {
    gameMode,
    numQuestions,
    countdownSecs,
    timeLimit,
    selectedTables,
  } = config

  const [state, setState] = useState({
    phase: 'idle',
    questions: [],
    currentIndex: 0,
    score: 0,
    totalTime: 0,
    timeLeft: countdownSecs ?? null,
    feedbackType: null,
    feedbackAnswer: null,
  })

  const timerRef = useRef(null)
  const feedbackRef = useRef(null)
  const prevFeedbackRef = useRef(null)

  // Register error facts when an answer is marked incorrect
  useEffect(() => {
    if (state.feedbackType === 'incorrect' && prevFeedbackRef.current !== 'incorrect') {
      const q = state.questions[state.currentIndex]
      if (q) addErrorFact(q.table, q.multiplier)
    }
    prevFeedbackRef.current = state.feedbackType
  }, [state.feedbackType, state.questions, state.currentIndex])

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (feedbackRef.current) clearTimeout(feedbackRef.current)
  }, [])

  const startGame = useCallback((overrides) => {
    clearAllTimers()
    const tables = overrides?.selectedTables ?? selectedTables
    const n = overrides?.numQuestions ?? numQuestions
    const cs = overrides?.countdownSecs ?? countdownSecs
    const errors = overrides?.errorFacts ?? null
    const questions = errors?.length
      ? generateErrorQuestions(errors, n)
      : generateQuestions(tables, n)
    setState({
      phase: 'playing',
      questions,
      currentIndex: 0,
      score: 0,
      totalTime: 0,
      timeLeft: cs ?? null,
      feedbackType: null,
      feedbackAnswer: null,
    })
  }, [selectedTables, numQuestions, countdownSecs, clearAllTimers])

  const finish = useCallback(() => {
    clearAllTimers()
    setState(prev => ({ ...prev, phase: 'finished', feedbackType: null, feedbackAnswer: null }))
  }, [clearAllTimers])

  const handleAnswer = useCallback((answer) => {
    setState(prev => {
      if (prev.phase !== 'playing' || prev.feedbackType) return prev
      const q = prev.questions[prev.currentIndex]
      if (!q) return prev
      const isCorrect = answer === q.answer
      const newScore = isCorrect ? prev.score + 1 : prev.score
      const delay = isCorrect ? 1000 : 2500
      const totalQ = prev.questions.length

      if (timerRef.current) clearInterval(timerRef.current)

      feedbackRef.current = setTimeout(() => {
        setState(p => {
          const n = p.currentIndex + 1
          if (n >= totalQ) {
            return { ...p, phase: 'finished', feedbackType: null, feedbackAnswer: null }
          }
          return {
            ...p,
            phase: 'playing',
            currentIndex: n,
            feedbackType: null,
            feedbackAnswer: null,
            timeLeft: countdownSecs ?? null,
          }
        })
      }, delay)

      return {
        ...prev,
        phase: 'feedback',
        feedbackType: isCorrect ? 'correct' : 'incorrect',
        feedbackAnswer: q.answer,
        score: newScore,
      }
    })
  }, [countdownSecs])

  useEffect(() => {
    if (state.phase !== 'playing') return
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.phase !== 'playing') return prev

        if (countdownSecs) {
          const t = prev.timeLeft - 1
          if (t <= 0) {
            const q = prev.questions[prev.currentIndex]
            const totalQ = prev.questions.length
            if (timerRef.current) clearInterval(timerRef.current)

            feedbackRef.current = setTimeout(() => {
              setState(p => {
                const n = p.currentIndex + 1
                if (n >= totalQ) {
                  return { ...p, phase: 'finished', feedbackType: null, feedbackAnswer: null }
                }
                return {
                  ...p,
                  phase: 'playing',
                  currentIndex: n,
                  feedbackType: null,
                  feedbackAnswer: null,
                  timeLeft: countdownSecs ?? null,
                }
              })
            }, 1500)

            return {
              ...prev,
              phase: 'feedback',
              feedbackType: 'incorrect',
              feedbackAnswer: q?.answer ?? -1,
              timeLeft: 0,
            }
          }
          return { ...prev, timeLeft: t }
        }

        if (timeLimit) {
          return { ...prev, totalTime: prev.totalTime + 1 }
        }

        return prev
      })
    }, 1000)

    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [state.phase, countdownSecs, timeLimit, clearAllTimers])

  useEffect(() => {
    return () => clearAllTimers()
  }, [clearAllTimers])

  return {
    state,
    startGame,
    handleAnswer,
    advance: finish,
    finish,
  }
}
