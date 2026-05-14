export default function ProgressBar({ current, max }) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100))
  const isLow = current <= 3
  return (
    <div className="w-full max-w-[200px] sm:max-w-xs bg-slate-200 h-2 sm:h-3 rounded-full mt-2 sm:mt-4 overflow-hidden">
      <div
        className={`h-full transition-all duration-1000 ease-linear rounded-full ${isLow ? 'bg-red-500' : 'bg-orange-400'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
