const COLORS = {
  completed: { fill: '#22c55e', stroke: '#4ade80', text: '#fff', ring: 'rgba(34,197,94,0.4)' },
  current: { fill: '#6366f1', stroke: '#a5b4fc', text: '#fff', ring: 'rgba(99,102,241,0.5)' },
  available: { fill: '#4f46e5', stroke: '#818cf8', text: '#fff', ring: 'rgba(79,70,229,0.3)' },
  locked: { fill: '#334155', stroke: '#475569', text: '#64748b', ring: 'transparent' },
}

export default function StageNode({ cx, cy, num, icon, status, isCurrent, isUnlocked, onClick, onLockedClick }) {
  const c = COLORS[status]
  const r = 18

  return (
    <g
      onClick={isUnlocked ? onClick : onLockedClick}
      className={isUnlocked ? 'cursor-pointer' : 'cursor-default'}
      style={{ transition: 'transform 0.15s' }}
    >
      {/* Ping glow for current stage — SVG native animation */}
      {isCurrent && (
        <circle cx={cx} cy={cy} r={r + 12} fill="none" stroke={c.ring} strokeWidth="3" opacity="0.6">
          <animate attributeName="r" values={`${r + 8};${r + 18};${r + 8}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke={c.stroke} strokeWidth="1.5" opacity={isCurrent ? 0.8 : 0.4} />

      {/* Main circle */}
      <circle cx={cx} cy={cy} r={r} fill={c.fill} stroke={c.stroke} strokeWidth="2.5" />

      {/* Inner content */}
      {status === 'completed' ? (
        <text x={cx} y={cy + 5} textAnchor="middle" fill={c.text} fontSize="16" fontWeight="bold">✓</text>
      ) : status === 'locked' ? (
        <text x={cx} y={cy + 5} textAnchor="middle" fill={c.text} fontSize="14">🔒</text>
      ) : (
        <>
          <text x={cx} y={cy - 3} textAnchor="middle" fill={c.text} fontSize="13" fontWeight="bold" fontFamily="system-ui">{num}</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill={c.text} fontSize="8">{icon}</text>
        </>
      )}
    </g>
  )
}
