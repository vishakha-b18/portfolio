import { useState, useRef, useEffect } from 'react'
import './Work.css'


const TABS = [
  {
    id: 'featured',
    label: 'Featured',
  },
  {
    id: 'prime-video',
    label: 'Prime Video',
    company: 'Amazon',
    role: 'Business Intelligence Engineer II',
    period: 'Jul 2025 – Present',
    color: '#0369a1',
    current: true,
  },
  {
    id: 'grocery',
    label: 'Amazon Grocery',
    company: 'Amazon',
    role: 'Business Intelligence Engineer I & II',
    period: 'May 2021 – Jun 2025',
    color: '#047857',
  },
  {
    id: 'tech-mahindra',
    label: 'Tech Mahindra',
    company: 'Tech Mahindra',
    role: 'Senior Business Intelligence Engineer',
    period: 'Oct 2014 – Jul 2019',
    color: '#92400e',
  },
]

// Small flow graphic for the Next-Best-Action card: several customer signals
// resolve to one action, delivered at the right moment. Content mirrors the
// card description only; nothing about how the engine decides.
function NbaFlow() {
  return (
    <div
      className="nba-flow"
      role="img"
      aria-label="Customer signals such as a trial about to expire, a finale just ending or a lapsed viewer returning feed into one best action per customer, sent as an offer at the right moment"
    >
      <ul className="nba-signals">
        <li>Trial about to expire</li>
        <li>Finale just ended</li>
        <li>Lapsed viewer returns</li>
      </ul>
      <span className="nba-arrow" aria-hidden="true" />
      <div className="nba-node">One best action per customer</div>
      <span className="nba-arrow" aria-hidden="true" />
      <div className="nba-node nba-out">Offer sent at the right moment</div>
    </div>
  )
}

// Stable DOM id for a card, so a Featured card can find its full version.
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const PROJECTS = [
  // Prime Video
  {
    company: 'prime-video',
    area: 'Partner & Product Analytics',
    featured: true,
    title: 'Partner Performance Metrics',
    short: 'Partners',
    metric: '300+',
    metricSub: 'partners use these metrics',
    description: 'Defined partner metrics with Product and built the data layer behind them. Partners use them to see what drives engagement, where viewers drop off and which campaigns lift streaming.',
    tags: ['Athena', 'Cube.js', 'AWS', 'QuickSight'],
  },
  {
    company: 'prime-video',
    area: 'Partner & Product Analytics',
    title: 'Short-Form Video Analytics',
    short: 'Engagement',
    metric: '+10%',
    metricSub: 'engagement, early personalization results',
    description: 'Set up the measurement for a short-form video product. It gives a first set of partners and internal teams visibility into performance, and powers other use cases like personalization.',
    tags: ['SQL', 'Statistical Analysis', 'Data Pipelines', 'QuickSight'],
  },
  {
    company: 'prime-video',
    area: 'Partner & Product Analytics',
    featured: true,
    title: 'Merchandising Experiments',
    short: 'CTR lift',
    metric: '+4.5%',
    metricSub: 'click-through lift from title ranking, statistically significant',
    description: 'Set up the metrics and measurement pipelines for multiple merchandising experiments, covering carousel and title ranking and hero banner behavior. Translated the results into readouts partners can act on.',
    tags: ['A/B Testing', 'Statistical Significance', 'Redshift', 'QuickSight'],
  },
  {
    company: 'prime-video',
    area: 'AI & Automation',
    title: 'Next-Best-Action Engine',
    diagram: 'nba',
    description: 'Built a prototype at a Vibeathon that sends each customer one well-timed offer when a moment matters, like a trial about to expire.',
    tags: ['GenAI', 'Agentic AI', 'Personalization'],
  },
  {
    company: 'prime-video',
    area: 'AI & Automation',
    title: 'Agentic On-Call Triage',
    short: 'On-call',
    metric: '10 hrs',
    metricSub: 'of weekly on-call investigation handled by agents',
    description: "Agents take the first pass on on-call tickets and weekly metric swings, flagging what's broken versus what's a real change.",
    tags: ['Agentic AI', 'Automation', 'Python'],
  },

  // Amazon Grocery
  {
    company: 'grocery',
    area: 'Orders & Inventory',
    featured: true,
    title: 'Order Cancellations',
    short: 'Saved',
    metric: '$2MM',
    metricSub: 'saved · cancellations cut from 9% to 3%',
    description: 'Broke cancellations down by cause so operations could fix problems before they reached customers, across Europe and North America.',
    tags: ['SQL', 'Python', 'Data Pipelines', 'AWS'],
  },
  {
    company: 'grocery',
    area: 'Orders & Inventory',
    featured: true,
    title: 'Instock & Waste',
    short: 'Instock rate',
    metric: '+2%',
    metricSub: 'instock rate · waste down 4%',
    description: 'Mapped how grocery buying decisions get made and surfaced avoidable mistakes, like manual overbuying, and why warehouses ran out of stock. Fixes went to the biggest causes first.',
    tags: ['SQL', 'Forecasting', 'Python', 'QuickSight'],
  },
  {
    company: 'grocery',
    area: 'Warehouse Operations',
    title: 'Warehouse Pick Speed',
    short: 'Pick time',
    metric: '\u221218%',
    metricSub: 'time to pick each order',
    description: 'Found what really slows pickers down, then rearranged product placement and shift rotations so stores and fulfillment centers got stock on time.',
    tags: ['SQL', 'Statistical Regression', 'Python'],
  },
  {
    company: 'grocery',
    area: 'Warehouse Operations',
    title: 'Early Defect Detection',
    short: 'Defect rate',
    metric: '\u221225%',
    metricSub: 'warehouse defect rate',
    description: 'A rule-based model flags spoiled inventory and misplaced items before weekly audits, so they get fixed before wrong items ship.',
    tags: ['SQL', 'Rule-Based Model', 'Defect Detection'],
  },

  // Tech Mahindra
  {
    company: 'tech-mahindra',
    title: 'Telecom KPI Reporting',
    short: 'Customers',
    metric: '34M+',
    metricSub: 'customers across Kuwait, Qatar and South Africa',
    description: 'Led a team of 4 building the reporting that telecom executives at MTN, VIVA and Vodafone used to decide on plans, promotions and customer segments.',
    tags: ['ODI', 'OBIEE', 'SQL', 'PL/SQL', 'Power BI', 'ETL'],
  },
]

export default function Work() {
  const [active, setActive] = useState('featured')
  const [focusTitle, setFocusTitle] = useState(null)

  // Featured cards are teasers. Clicking one opens its company tab; once that
  // tab has rendered, bring the full card into view and flash it briefly.
  const openFromFeatured = p => {
    setActive(p.company)
    setFocusTitle(p.title)
  }

  useEffect(() => {
    if (!focusTitle) return
    const frame = requestAnimationFrame(() => {
      document.getElementById(`card-${slug(focusTitle)}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    const clear = setTimeout(() => setFocusTitle(null), 1600)
    return () => { cancelAnimationFrame(frame); clearTimeout(clear) }
  }, [focusTitle])
  const tabsRef = useRef(null)
  const tab = TABS.find(t => t.id === active)

  // On narrow screens the tab strip scrolls, so the selected tab can sit off
  // screen. Nudge it into view horizontally without moving the page.
  useEffect(() => {
    const bar = tabsRef.current
    const el = bar?.querySelector('.work-tab.active')
    if (!bar || !el) return
    const barBox = bar.getBoundingClientRect()
    const elBox = el.getBoundingClientRect()
    if (elBox.left < barBox.left) {
      bar.scrollLeft += elBox.left - barBox.left - 12
    } else if (elBox.right > barBox.right) {
      bar.scrollLeft += elBox.right - barBox.right + 12
    }
  }, [active])
  const filtered = active === 'featured' ? PROJECTS.filter(p => p.featured) : PROJECTS.filter(p => p.company === active)

  // Group a company's projects by business area (Featured stays a single flat group).
  const groups = []
  if (active === 'featured') {
    groups.push({ area: null, items: filtered })
  } else {
    const byArea = new Map()
    filtered.forEach(p => {
      const key = p.area || '__none'
      if (!byArea.has(key)) byArea.set(key, [])
      byArea.get(key).push(p)
    })
    byArea.forEach((items, key) => groups.push({ area: key === '__none' ? null : key, items }))
  }

  const cardColor = (tab && tab.color) ? tab.color : 'var(--accent)'

  const renderCard = p => {
    return (
      <div
        key={p.title}
        id={`card-${slug(p.title)}`}
        className={`work-card ${p.featured ? 'featured' : ''} ${p.metric && p.metric.length > 7 ? 'long-metric' : ''} ${focusTitle === p.title ? 'flash' : ''}`}
        style={{ '--tc': cardColor }}
        {...(active === 'featured' && {
          role: 'button',
          tabIndex: 0,
          'aria-label': `${p.title}, view full project`,
          onClick: () => openFromFeatured(p),
          onKeyDown: e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFromFeatured(p) }
          },
        })}
      >
        {p.featured && <span className="featured-badge">Featured</span>}
        {active === 'featured' && p.area && <div className="work-eyebrow">{p.area}</div>}
        {/* Cards lead with a number only when there is a real result; otherwise
            the title leads, with an optional status tag above it. */}
        {p.metric ? (
          <>
            <div className="work-metric">
              <span className="work-metric-num">{p.metric}</span>
              {p.metricSub && <span className="work-metric-sub">{p.metricSub}</span>}
            </div>
            <h3>{p.title}</h3>
          </>
        ) : (
          <>
            {p.tag && <span className="work-status-tag">{p.tag}</span>}
            <h3 className="work-title-lead">{p.title}</h3>
            {p.diagram === 'nba' && <NbaFlow />}
          </>
        )}
        <p>{p.description}</p>
        <div className="work-tags">
          {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        {/* Featured tab only: the cue that the card opens the full project. */}
        <span className="work-see-full">
          View in {TABS.find(t => t.id === p.company)?.label} →
        </span>
      </div>
    )
  }

  return (
    <section id="work" data-view={active === 'featured' ? 'featured' : 'company'}>
      <h2>Built. Shipped. Measured.</h2>

      {/* Tab bar */}
      <div className="work-tabs" ref={tabsRef}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`work-tab ${active === t.id ? 'active' : ''}`}
            style={{ '--tc': t.color || 'var(--accent)' }}
            onClick={() => setActive(t.id)}
          >
            {t.id !== 'featured' && <span className="tab-dot" />}
            {t.label}
            {t.current && <span className="tab-now">NOW</span>}
          </button>
        ))}
      </div>

      {/* Company info bar (hidden on Featured) */}
      {tab && tab.id !== 'featured' && (
        <div className="work-company-bar" style={{ '--tc': tab.color }}>
          <div className="wcb-left">
            <span className="wcb-company">{tab.company}</span>
            <span className="wcb-role">{tab.role}</span>
          </div>
          <span className="wcb-period">{tab.period}</span>
        </div>
      )}

      {/* Phone only: every number for this company on one screen, so the
          impact lands before any scrolling. Hidden on desktop, where the
          cards already sit side by side. */}
      {tab && tab.id !== 'featured' && (
        <div className="work-metric-grid" style={{ '--tc': cardColor }}>
          {filtered.filter(p => p.metric).map(p => (
            <div className="wmg-cell" key={p.title}>
              <span className="wmg-num">{p.metric}</span>
              <span className="wmg-label">{p.short}</span>
            </div>
          ))}
        </div>
      )}

      {/* Projects, grouped by business area */}
      {groups.map(g => (
        <div className="work-area" key={g.area || 'all'} style={{ '--tc': cardColor }}>
          {g.area && (
            <div className="work-area-head">
              <span className="work-area-title">{g.area}</span>
              <span className="work-area-line" />
            </div>
          )}
          <div className="work-grid">
            {g.items.map(renderCard)}
          </div>
        </div>
      ))}

    </section>
  )
}
