export default function OptionButtons({ options, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 h-full content-center">
      {options.map((opt, i) => (
        <button key={i} onClick={() => onSelect(opt)}
          className="bg-slate-100 border-2 border-slate-200 text-indigo-900 text-[clamp(18px,6vw,30px)] sm:text-[36px] font-bold py-3 sm:py-8 rounded-2xl shadow-sm active:bg-indigo-200 transition-colors">
          {opt}
        </button>
      ))}
    </div>
  )
}
