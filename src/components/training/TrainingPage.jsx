import { useState, useEffect } from 'react'
import { useGame } from '../../hooks/useGame'
import { getRankings, saveRankings, getSelectedTables, saveSelectedTables, getErrorFacts } from '../../utils/storage'
import TrainingSetup from './TrainingSetup'
import TrainingPlaying from './TrainingPlaying'
import TrainingResult from './TrainingResult'
import TrainingRanking from './TrainingRanking'

export default function TrainingPage({ onBack }) {
  const [config, setConfig] = useState(() => ({
    selectedTables: getSelectedTables(),
    gameMode: 'test',
    timeMode: 'stopwatch',
    numQuestions: 10,
    countdownSecs: 10,
    reviewErrors: false,
  }))

  useEffect(() => { saveSelectedTables(config.selectedTables) }, [config.selectedTables])

  const gameConfig = {
    gameMode: config.gameMode,
    numQuestions: config.numQuestions,
    countdownSecs: config.timeMode === 'countdown' ? config.countdownSecs : null,
    timeLimit: null,
    selectedTables: config.selectedTables,
  }

  const { state, startGame, handleAnswer } = useGame(gameConfig)

  const [screen, setScreen] = useState('setup')

  const handleStart = () => {
    const errors = config.reviewErrors ? getErrorFacts() : null
    if (errors && errors.length === 0) return
    if (!errors && config.selectedTables.length === 0) return
    startGame({
      selectedTables: config.selectedTables,
      numQuestions: config.numQuestions,
      countdownSecs: config.timeMode === 'countdown' ? config.countdownSecs : null,
      errorFacts: errors,
    })
    setScreen('playing')
  }

  const handleFinish = () => {
    const rankings = getRankings()
    const percentage = (state.score / config.numQuestions) * 100
    rankings.push({
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      score: state.score,
      total: config.numQuestions,
      percentage,
      timeMode: config.timeMode,
      time: state.totalTime,
      tables: [...config.selectedTables].sort((a, b) => a - b).join(', '),
    })
    rankings.sort((a, b) => {
      if (b.percentage !== a.percentage) return b.percentage - a.percentage
      if (a.timeMode === 'stopwatch' && b.timeMode === 'stopwatch') return a.time - b.time
      return 0
    })
    saveRankings(rankings)
    setScreen('result')
  }

  return (
    <div className="h-full bg-slate-50 flex flex-col">
      {screen === 'setup' && (
        <TrainingSetup config={config} setConfig={setConfig} onStart={handleStart} onRanking={() => setScreen('ranking')} onBack={onBack} />
      )}
      {screen === 'playing' && (
        <TrainingPlaying
          state={state}
          config={config}
          handleAnswer={handleAnswer}
          onFinish={handleFinish}
          onBack={() => setScreen('setup')}
        />
      )}
      {screen === 'result' && (
        <TrainingResult
          config={config}
          score={state.score}
          totalTime={state.totalTime}
          onMenu={() => { setScreen('setup') }}
          onRanking={() => setScreen('ranking')}
          onBack={onBack}
        />
      )}
      {screen === 'ranking' && (
        <TrainingRanking onBack={() => setScreen('setup')} />
      )}
    </div>
  )
}
