import { useState, useEffect, useRef } from 'react'
import './Contact.css'

const QUERY = [
  [{ t: '-- Let\'s talk data', c: 'cm' }],
  [{ t: 'SELECT ', c: 'kw' }, { t: 'channel', c: 'col' }, { t: ', ', c: 'tx' }, { t: 'handle', c: 'col' }],
  [{ t: 'FROM ', c: 'kw' }, { t: 'vishakha.contact', c: 'tx' }],
  [{ t: 'WHERE ', c: 'kw' }, { t: 'topic ', c: 'tx' }, { t: 'IN ', c: 'kw' }, { t: '(', c: 'tx' },
   { t: "'BI'", c: 'str' }, { t: ', ', c: 'tx' }, { t: "'analytics'", c: 'str' }, { t: ', ', c: 'tx' },
   { t: "'a good problem'", c: 'str' }, { t: ');', c: 'tx' }],
]

const ROWS = [
  { ico: '✉', label: 'vbhatta1892@gmail.com', href: 'mailto:vbhatta1892@gmail.com', copy: 'vbhatta1892@gmail.com' },
  { ico: 'in', label: 'linkedin.com/in/vishakhabhattacharjee', href: 'https://www.linkedin.com/in/vishakhabhattacharjee', copy: null },
]

const TOTAL_CHARS = QUERY.reduce((sum, line) => sum + line.reduce((s, seg) => s + seg.t.length, 0) + 1, 0)
const SPEED = 26

export default function Contact() {
  const [typed, setTyped] = useState(0)
  const [started, setStarted] = useState(false)
  const [copied, setCopied] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let n = 0
    const id = setInterval(() => {
      n += 1
      setTyped(n)
      if (n >= TOTAL_CHARS) clearInterval(id)
    }, SPEED)
    return () => clearInterval(id)
  }, [started])

  const doneTyping = typed >= TOTAL_CHARS

  const handleCopy = (e, row) => {
    if (!row.copy) return
    e.preventDefault()
    navigator.clipboard?.writeText(row.copy)
    setCopied(row.copy)
    setTimeout(() => setCopied(null), 1500)
  }

  // walk the query, revealing up to `typed` characters (1 char per line counts as the newline)
  let budget = typed
  const renderedLines = QUERY.map((line, li) => {
    const segs = []
    let lineActive = false
    for (const seg of line) {
      if (budget <= 0) break
      const show = seg.t.slice(0, budget)
      segs.push({ ...seg, t: show })
      budget -= seg.t.length
      lineActive = true
    }
    if (lineActive) budget -= 1 // consume the newline
    return { segs, li }
  })

  return (
    <section id="contact" ref={ref}>
      <h2>Let's talk data</h2>

      <div className={`sql-window ${started ? 'live' : ''}`}>
        <div className="sql-bar">
          <span className="sql-dot r" /><span className="sql-dot y" /><span className="sql-dot g" />
          <span className="sql-file">contact.sql</span>
          <span className="sql-run">{doneTyping ? '● ran' : '○ running'}</span>
        </div>

        <div className="sql-body">
          <div className="sql-code">
            {renderedLines.map(({ segs, li }) => (
              <div className="sql-line" key={li}>
                <span className="sql-gutter">{li + 1}</span>
                <span className="sql-text">
                  {segs.map((s, i) => <span key={i} className={s.c}>{s.t}</span>)}
                  {!doneTyping && segs.length > 0 && li === renderedLines.filter(l => l.segs.length > 0).length - 1 && (
                    <span className="sql-cursor" />
                  )}
                </span>
              </div>
            ))}
          </div>

          {doneTyping && (
            <div className="sql-result">
              {ROWS.map((row, i) => (
                <a
                  key={i}
                  href={row.href}
                  target={row.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="sql-row"
                  style={{ animationDelay: `${i * 0.12}s` }}
                  onClick={(e) => handleCopy(e, row)}
                  title={row.copy ? 'Click to copy' : ''}
                >
                  <span className="sql-ico">{row.ico}</span>
                  <span className="sql-val">{row.label}</span>
                  <span className="sql-copy">{copied === row.copy ? '✓ copied' : (row.copy ? '⧉' : '↗')}</span>
                </a>
              ))}
              <div className="sql-meta" style={{ animationDelay: `${ROWS.length * 0.12}s` }}>
                3 rows returned · 0.02s · always up for a good conversation
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
