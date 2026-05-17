export default function Numpad({ onInput }) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 h-full content-center">
      {nums.map(n => (
        <button key={n} onClick={() => onInput(String(n))}
          className="bg-slate-100 text-indigo-900 text-[clamp(16px,5vw,24px)] sm:text-[30px] font-bold py-1.5 sm:py-4 rounded-xl active:bg-slate-300">
          {n}
        </button>
      ))}
      <button onClick={() => onInput('del')}
        className="bg-red-100 text-red-600 py-1.5 sm:py-4 rounded-xl flex items-center justify-center active:bg-red-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>
      </button>
      <button onClick={() => onInput('0')}
        className="bg-slate-100 text-indigo-900 text-[clamp(16px,5vw,24px)] sm:text-[30px] font-bold py-1.5 sm:py-4 rounded-xl active:bg-slate-300">0</button>
      <button onClick={() => onInput('ok')}
        className="bg-green-500 text-white text-[14px] sm:text-[20px] font-bold py-1.5 sm:py-4 rounded-xl active:bg-green-700 shadow-sm">OK</button>
    </div>
  )
}
