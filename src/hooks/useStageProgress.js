import { useState, useCallback } from 'react'
import { getStageProgress, saveStageProgress } from '../utils/storage'
import { stages } from '../stages'

export function useStageProgress() {
  const [progress, setProgress] = useState(() => getStageProgress())

  const persist = useCallback((newProgress) => {
    setProgress(newProgress)
    saveStageProgress(newProgress)
  }, [])

  const getStageState = useCallback((stageId) => {
    return progress[stageId] || { completed: false, attempts: 0, consecutiveWins: 0 }
  }, [progress])

  const completeAttempt = useCallback((stageId, won) => {
    setProgress(prev => {
      const stage = stages.find(s => s.id === stageId)
      const current = prev[stageId] || { completed: false, attempts: 0, consecutiveWins: 0, bestScore: 0 }

      const newState = { ...current, attempts: current.attempts + 1 }

      if (won) {
        newState.consecutiveWins = (current.consecutiveWins || 0) + 1
        if (newState.consecutiveWins >= (stage?.consecutiveWins || 1)) {
          newState.completed = true
        }
      } else {
        newState.consecutiveWins = 0
      }

      const next = { ...prev, [stageId]: newState }
      saveStageProgress(next)
      return next
    })
  }, [])

  const isStageUnlocked = useCallback((stageId) => {
    const idx = stages.findIndex(s => s.id === stageId)
    if (idx === 0) return true
    const prevStage = stages[idx - 1]
    const prevState = progress[prevStage.id]
    return prevState?.completed === true
  }, [progress])

  const currentStageId = useCallback(() => {
    for (const stage of stages) {
      const s = progress[stage.id]
      if (!s?.completed) return stage.id
    }
    return stages[stages.length - 1].id
  }, [progress])

  const allCompleted = useCallback(() => {
    return stages.every(s => progress[s.id]?.completed)
  }, [progress])

  const resetProgress = useCallback(() => {
    saveStageProgress({})
    setProgress({})
  }, [])

  return {
    progress,
    getStageState,
    completeAttempt,
    isStageUnlocked,
    currentStageId: currentStageId(),
    allCompleted: allCompleted(),
    resetProgress,
  }
}
