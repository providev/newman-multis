import { useState, useEffect } from 'react'
import { getStageById } from '../../stages'
import { useGame } from '../../hooks/useGame'
import { useStageProgress } from '../../hooks/useStageProgress'
import { getSelectedTables, saveSelectedTables } from '../../utils/storage'
import StagePath from './StagePath'
import GameSetup from './GameSetup'
import GamePlaying from './GamePlaying'
import GameResult from './GameResult'
import ChampionScreen from './ChampionScreen'

export default function GamePage({ onBack, character }) {
  const { progress, completeAttempt, isStageUnlocked, currentStageId, allCompleted, resetProgress } = useStageProgress()
  const [screen, setScreen] = useState('map')
  const [activeStageId, setActiveStageId] = useState(null)
  const [selectedTables, setSelectedTables] = useState(() => getSelectedTables())

  useEffect(() => { saveSelectedTables(selectedTables) }, [selectedTables])
  const [lastResult, setLastResult] = useState(null)
  const [consecutiveWins, setConsecutiveWins] = useState(0)

  const stage = activeStageId ? getStageById(activeStageId) : null
  const gameConfig = stage ? {
    gameMode: stage.gameMode,
    numQuestions: stage.numQuestions,
    countdownSecs: stage.timeConstraint?.type === 'perQuestion' ? stage.timeConstraint.seconds : null,
    timeLimit: stage.timeConstraint?.type === 'total' ? stage.timeConstraint.seconds : null,
    selectedTables,
  } : { gameMode: 'test', numQuestions: 10, countdownSecs: null, timeLimit: null, selectedTables: [] }

  const { state: gameState, startGame, handleAnswer } = useGame(gameConfig)

  const handleSelectStage = (stageId) => {
    setActiveStageId(stageId)
    setConsecutiveWins(0)
    setScreen('setup')
  }

  const handleStart = (stageId, tables) => {
    const s = getStageById(stageId)
    const cs = s.timeConstraint?.type === 'perQuestion' ? s.timeConstraint.seconds : null
    startGame({ selectedTables: tables, numQuestions: s.numQuestions, countdownSecs: cs })
    setActiveStageId(stageId)
    setSelectedTables(tables)
    setScreen('playing')
  }

  const handleFinish = (result) => {
    const s = getStageById(activeStageId)

    if (result.won) {
      const newConsecutive = consecutiveWins + 1
      setConsecutiveWins(newConsecutive)
      const actuallyWon = newConsecutive >= (s.consecutiveWins || 1)
      completeAttempt(activeStageId, actuallyWon)
      setLastResult({ ...result, consecutiveWins: newConsecutive })
    } else {
      setConsecutiveWins(0)
      completeAttempt(activeStageId, false)
      setLastResult(result)
    }

    setScreen('result')
  }

  const handleRetry = () => {
    setLastResult(null)
    setScreen('setup')
  }

  const handleContinue = () => {
    setLastResult(null)
    setActiveStageId(null)
    setConsecutiveWins(0)
    if (allCompleted) {
      setScreen('champion')
    } else {
      setScreen('map')
    }
  }

  return (
    <div className="h-full">
      {screen === 'map' && (
        <StagePath
          progress={progress}
          isStageUnlocked={isStageUnlocked}
          currentStageId={currentStageId}
          allCompleted={allCompleted}
          onSelectStage={handleSelectStage}
          onBack={onBack}
          onReset={resetProgress}
          character={character}
        />
      )}
      {screen === 'setup' && activeStageId && (
        <GameSetup
          stageId={activeStageId}
          selectedTables={selectedTables}
          onTableChange={setSelectedTables}
          onStart={handleStart}
          onBack={handleContinue}
        />
      )}
      {screen === 'playing' && activeStageId && selectedTables.length > 0 && (
        <GamePlaying
          stageId={activeStageId}
          gameState={gameState}
          handleAnswer={handleAnswer}
          onFinish={handleFinish}
          onBack={handleContinue}
        />
      )}
      {screen === 'result' && activeStageId && lastResult && (
        <GameResult
          stage={getStageById(activeStageId)}
          result={lastResult}
          onRetry={handleRetry}
          onContinue={handleContinue}
          character={character}
        />
      )}
      {screen === 'champion' && (
        <ChampionScreen character={character} onFinish={() => setScreen('map')} />
      )}
    </div>
  )
}
