import { useState } from 'react'
import { getUsername, setUsername, clearUsername, getSelectedCharacter, saveSelectedCharacter } from './utils/storage'
import Landing from './components/landing/Landing'
import TrainingPage from './components/training/TrainingPage'
import GamePage from './components/game/GamePage'
import RepasoPage from './components/repaso/RepasoPage'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [username, setUser] = useState(() => getUsername())
  const [character, setCharacter] = useState(() => getSelectedCharacter())

  const handleUsernameChange = (name) => {
    if (!name) {
      clearUsername()
      setUser('')
    } else {
      setUsername(name)
      setUser(name)
    }
  }

  const handleCharacterChange = (charId) => {
    saveSelectedCharacter(charId)
    setCharacter(charId)
  }

  return (
    <div className="h-[100dvh] w-full max-w-md mx-auto relative overflow-hidden shadow-2xl bg-slate-50">
      {screen === 'landing' && (
        <Landing
          username={username}
          character={character}
          onUsernameChange={handleUsernameChange}
          onCharacterChange={handleCharacterChange}
          onSelectMode={(mode) => setScreen(mode)}
        />
      )}
      {screen === 'training' && (
        <TrainingPage onBack={() => setScreen('landing')} />
      )}
      {screen === 'repaso' && (
        <RepasoPage onBack={() => setScreen('landing')} />
      )}
      {screen === 'game' && (
        <GamePage onBack={() => setScreen('landing')} character={character} />
      )}
    </div>
  )
}
