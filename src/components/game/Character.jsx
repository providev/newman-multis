import { getCharacter } from '../../characters'

export default function Character({ mood = 'idle', size = 'md', variant }) {
  const ch = getCharacter(variant)
  const sizeMap = { sm: 'w-10 h-10', md: 'w-14 h-14', lg: 'w-20 h-20' }
  const eyeSize = { sm: 'w-2 h-2.5', md: 'w-3 h-4', lg: 'w-4 h-5' }
  const pupilSize = { sm: 'w-1 h-1.5', md: 'w-1.5 h-2', lg: 'w-2 h-2.5' }
  const animClass = mood === 'happy' ? 'animate-bounce-short' : mood === 'celebrate' ? 'animate-wiggle' : 'animate-float'

  return (
    <div className={`relative ${sizeMap[size]} ${animClass} flex-shrink-0`}>
      <div
        className="absolute inset-0 rounded-full shadow-lg overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${ch.body1}, ${ch.body2})` }}
      >
        <div className="absolute top-1 left-2 w-2 h-1.5 bg-white/40 rounded-full" />
        <div className="absolute top-1.5 left-3 w-1 h-1 bg-white/30 rounded-full" />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5">
        <div className={`${eyeSize[size]} rounded-full flex items-center justify-center`} style={{ backgroundColor: '#0f172a' }}>
          <div className={`${pupilSize[size]} bg-white rounded-full`} />
        </div>
        <div className={`${eyeSize[size]} rounded-full flex items-center justify-center`} style={{ backgroundColor: '#0f172a' }}>
          <div className={`${pupilSize[size]} bg-white rounded-full`} />
        </div>
      </div>
      {mood === 'happy' && (
        <>
          <div className="absolute bottom-2.5 left-1 w-2 h-1.5 rounded-full" style={{ backgroundColor: ch.cheek }} />
          <div className="absolute bottom-2.5 right-1 w-2 h-1.5 rounded-full" style={{ backgroundColor: ch.cheek }} />
        </>
      )}
      {mood === 'happy' ? (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3 h-1.5 border-b-2 border-slate-800 rounded-full" />
      ) : (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-1 rounded-full" style={{ backgroundColor: '#0f172a' }} />
      )}
    </div>
  )
}
