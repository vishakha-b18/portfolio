import { useState, useRef, useEffect } from 'react'
import './Timeline.css'

const START_YEAR = 2010
const END_YEAR = 2026

function mo(year, month) {
  return (year - START_YEAR) * 12 + (month - 1)
}
const TOTAL_MONTHS = mo(END_YEAR, 12) + 1
const NOW_OFFSET = mo(2026, 6)

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const fmtDate = ([y, m]) => `${MONTHS[m]} ${y}`
const fmtRange = (start, end) => `${fmtDate(start)} – ${end ? fmtDate(end) : 'Present'}`

const ROWS = [
  {
    label: 'BIE II · Prime Video',
    sublabel: 'Amazon',
    start: [2025, 7], end: null,
    color: '#818cf8', colorB: '#c7d2fe',
    type: 'work', icon: '🎬',
    highlight: 'Partner analytics platform, agentic triage, Pendo strategy',
    current: true,
  },
  {
    label: 'BIE I & II · Amazon Grocery',
    sublabel: 'Amazon',
    start: [2021, 5], end: [2025, 6],
    color: '#60a5fa', colorB: '#bfdbfe',
    type: 'work', icon: '🛒',
    highlight: 'Instock pipelines, GenAI WBR anomaly detection, demand forecasting',
  },
  {
    label: 'M.S. Business Analytics',
    sublabel: 'Columbia University',
    start: [2019, 8], end: [2020, 12],
    color: '#a78bfa', colorB: '#ddd6fe',
    type: 'education', icon: '🎓',
    highlight: 'Teaching Assistant — Databases & Intro to Python',
  },
  {
    label: 'Senior BI Engineer',
    sublabel: 'Tech Mahindra Ltd.',
    start: [2014, 10], end: [2019, 7],
    color: '#fbbf24', colorB: '#fde68a',
    type: 'work', icon: '📊',
    highlight: 'Built ETL & BI infra for telecom KPI platforms across Kuwait, Qatar and South Africa',
  },
  {
    label: 'B.Tech · Electronics & Instrumentation',
    sublabel: 'Dr. B.C. Roy Engineering College',
    start: [2010, 8], end: [2014, 7],
    color: '#94a3b8', colorB: '#cbd5e1',
    type: 'education', icon: '🎓',
    highlight: 'Foundation in signal processing & embedded systems',
  },
]

const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i)

const LEFT = 0
const ROW_H = 72
const BAR_H = 28
const TOP = 0
const SVG_W = 680

function xOf(offset) {
  return (offset / TOTAL_MONTHS) * SVG_W
}
function barStart(startArr) { return xOf(mo(...startArr)) }
function barWidth(startArr, endArr) {
  return xOf((endArr ? mo(...endArr) : NOW_OFFSET) - mo(...startArr))
}

export default function Timeline() {
  const [hovered, setHovered] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [revealKey, setRevealKey] = useState(0)
  const containerRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealKey(k => k + 1)
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const svgH = TOP + ROWS.length * ROW_H
  const nowX = xOf(NOW_OFFSET)

  function handleMouseMove(e, i) {
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const flipX = x > rect.width * 0.55
    const flipY = y > rect.height - 140
    setTooltipPos({ x, y, flipX, flipY })
    setHovered(i)
  }

  return (
    <section id="timeline" ref={sectionRef}>
      <h2>The journey so far</h2>

      {/* Year label row above chart */}
      <div className="gantt-year-row">
        <div className="gantt-year-spacer" />
        <div className="gantt-year-labels">
          {YEARS.filter(y => y % 2 === 0).map(y => (
            <div key={y} className="gantt-year" style={{ left: `${(mo(y,1)/TOTAL_MONTHS)*100}%` }}>{y}</div>
          ))}
        </div>
      </div>

      <div className="gantt-wrap" ref={containerRef} onMouseLeave={() => setHovered(null)}>
        {/* Row labels */}
        <div className="gantt-labels">
          {ROWS.map((row, i) => (
            <div
              key={i}
              className={`gantt-label-row ${hovered === i ? 'hl' : ''}`}
              style={{ '--rc': row.color, height: ROW_H, boxSizing: 'border-box' }}
            >
              <span className="row-icon">{row.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div className="row-name">{row.label}</div>
                <div className="row-sub">{row.sublabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* SVG chart area */}
        <div className="gantt-chart-scroll">
          <svg key={revealKey} viewBox={`0 0 ${SVG_W} ${svgH}`} className="gantt-svg" preserveAspectRatio="none" style={{ height: svgH }}>
            <defs>
              {ROWS.map((row, i) => (
                <linearGradient key={i} id={`grad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={row.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={row.colorB} stopOpacity="0.95" />
                </linearGradient>
              ))}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Year grid lines only (no text — labels are in HTML above) */}
            {YEARS.filter(y => y % 2 === 0).map(y => {
              const x = xOf(mo(y, 1))
              return <line key={y} x1={x} y1={0} x2={x} y2={svgH} stroke="#243a2e" strokeWidth="1" />
            })}

            {/* Bars */}
            {ROWS.map((row, i) => {
              const bx = barStart(row.start)
              const bw = barWidth(row.start, row.end)
              const by = TOP + i * ROW_H + (ROW_H - BAR_H) / 2
              const isHovered = hovered === i

              return (
                <g
                  key={i}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  style={{ cursor: 'default' }}
                >
                  {/* Glow shadow when hovered */}
                  {isHovered && (
                    <rect
                      x={bx - 2} y={by - 3}
                      width={bw + (row.current ? 10 : 4)} height={BAR_H + 6}
                      rx={8}
                      fill={row.color}
                      opacity="0.25"
                      filter="url(#glow)"
                    />
                  )}

                  {/* Main bar */}
                  <rect
                    x={bx} y={by}
                    width={bw} height={BAR_H}
                    rx={6}
                    fill={`url(#grad${i})`}
                    className={`gantt-bar ${row.type === 'education' ? 'edu-bar' : ''} bar-${i}`}
                    filter={row.current ? 'url(#glow)' : undefined}
                  />

                  {/* Education stripe overlay */}
                  {row.type === 'education' && (
                    <rect x={bx} y={by} width={bw} height={BAR_H} rx={6} fill="url(#stripes)" opacity="0.12" />
                  )}


                  {/* Arrow for current role */}
                  {row.current && (
                    <polygon
                      points={`${bx+bw},${by+BAR_H/2-7} ${bx+bw+10},${by+BAR_H/2} ${bx+bw},${by+BAR_H/2+7}`}
                      fill={row.colorB}
                      filter="url(#glow)"
                      className="current-arrow"
                    />
                  )}

                  {/* Pulsing dot for current */}
                  {row.current && (
                    <circle cx={bx + bw + 14} cy={by + BAR_H / 2} r={4} fill={row.colorB} className="pulse-dot" />
                  )}
                </g>
              )
            })}

            {/* Now line */}
            <line x1={nowX} y1={0} x2={nowX} y2={svgH - 14} stroke="#2dd4bf" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            <defs>
              <pattern id="stripes" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#fff" strokeWidth="3" />
              </pattern>
            </defs>
          </svg>

          {/* Tooltip */}
          {hovered !== null && (
            <div
              className="gantt-tooltip"
              style={{
                left: tooltipPos.flipX ? tooltipPos.x - 226 : tooltipPos.x + 16,
                top: tooltipPos.flipY ? tooltipPos.y - 150 : tooltipPos.y - 10,
                '--tc': ROWS[hovered].color,
              }}
            >
              <div className="tt-icon">{ROWS[hovered].icon}</div>
              <div className="tt-label">{ROWS[hovered].label}</div>
              <div className="tt-sub">{ROWS[hovered].sublabel}</div>
              <div className="tt-hl">{ROWS[hovered].highlight}</div>
            </div>
          )}
        </div>
      </div>

      {/* Narrow screens: the gantt has no room for a meaningful horizontal axis,
          so the same rows render as a list with the dates written out. CSS swaps
          between this and the chart at 700px. */}
      <ol className="gantt-mobile">
        {ROWS.map((row, i) => (
          <li key={i} className={`gm-row ${row.current ? 'current' : ''}`} style={{ '--rc': row.color }}>
            <span className="gm-icon">{row.icon}</span>
            <div className="gm-body">
              <div className="gm-name">{row.label}</div>
              <div className="gm-sub">{row.sublabel}</div>
              <div className="gm-dates">
                {fmtRange(row.start, row.end)}
                {row.current && <span className="gm-now">NOW</span>}
              </div>
              <div className="gm-hl">{row.highlight}</div>
            </div>
          </li>
        ))}
      </ol>

    </section>
  )
}
