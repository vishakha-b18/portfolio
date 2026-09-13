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
    color: '#818cf8',
    current: true,
  },
  {
    id: 'grocery',
    label: 'Amazon Grocery',
    company: 'Amazon',
    role: 'Business Intelligence Engineer I & II',
    period: 'May 2021 – Jun 2025',
    color: '#60a5fa',
  },
  {
    id: 'tech-mahindra',
    label: 'Tech Mahindra',
    company: 'Tech Mahindra',
    role: 'Senior Business Intelligence Engineer',
    period: 'Oct 2014 – Jul 2019',
    color: '#fbbf24',
  },
]

const PROJECTS = [
  {
    company: 'prime-video',
    featured: true,
    title: 'Agentic On-Call Triage System',
    short: 'On-call triage',
    metric: '10 hrs',
    metricSub: 'of weekly on-call toil, gone',
    description: 'Agentic workflows that autonomously triage job failures, query system health, and run corrective actions — no human in the loop.',
    tags: ['Agentic AI', 'Automation', 'Python'],
  },
  {
    company: 'prime-video',
    title: 'Partner Analytics Platform',
    short: 'Partner platform',
    metric: 'In build',
    metricSub: 'launching soon',
    wip: true,
    description: 'Minute-by-minute viewership in Athena, a Cube.js semantic layer, and metric frameworks for ad placement and content quality — end to end.',
    tags: ['Athena', 'Cube.js', 'AWS', 'QuickSight'],
  },
  {
    company: 'prime-video',
    title: 'Pendo Guide Engagement Analytics',
    short: 'Feature adoption',
    metric: '+30%',
    metricSub: 'feature adoption · NPS +10 pts',
    description: 'Owned Pendo analytics strategy end to end — feature-tracking taxonomy and dashboards shipped across engineering and product.',
    tags: ['Pendo', 'Product Analytics', 'Dashboard'],
  },
  {
    company: 'grocery',
    area: 'Supply Chain Operations',
    featured: true,
    title: 'DC Cancellations Reduction',
    short: 'Cancellations',
    metric: '$2MM',
    metricSub: 'saved · cancellations cut 9% → 3%',
    description: 'Built a bridge analysis that broke the cancellation rate down by driver. Gave operations visibility into the issues to proactively fix them, which in turn improved cancellations across Europe and North America.',
    tags: ['SQL', 'Python', 'Data Pipelines', 'AWS'],
  },
  {
    company: 'grocery',
    area: 'Supply Chain Operations',
    title: 'ASIN Placement & Pick Optimization',
    short: 'Pick time',
    metric: '−18%',
    metricSub: 'avg pick time per picker',
    description: 'Improved pick rate by optimizing ASIN placement and picker rotations, guided by a regression that ranked its true drivers. Faster picks kept DC outbound commitments intact, supplying the FCs and stores downstream on schedule.',
    tags: ['SQL', 'Statistical Regression', 'Python'],
  },
  {
    company: 'grocery',
    area: 'Supply Chain Operations',
    title: 'Defect Visibility Model',
    short: 'Defects',
    metric: '−25%',
    metricSub: 'defects per million opportunities (DPMO)',
    description: 'Surfaced likely defects for DC operations teams ahead of their weekly audits, scored by a rule-based model. Catching shrunk ASINs, spoiled inventory and bin mismatches early stopped them degrading picks or sending wrong ASINs to FCs and stores.',
    tags: ['SQL', 'Rule-Based Model', 'Defect Detection'],
  },
  {
    company: 'grocery',
    area: 'Instock & Demand',
    title: 'Root-Causing DC Out-of-Stocks',
    short: 'Instock misses',
    metric: '−1.5%',
    metricSub: 'DC-driven instock misses, in 2 months',
    description: 'Partnered with buying, instock, and supply chain managers to identify the failure buckets driving DC out-of-stocks. Quantified how much each one contributed, so the team could target the biggest fixes. This spanned all grocery DCs, which supply 50% of stock to FCs and stores, a share set to grow to 65%.',
    tags: ['SQL', 'ETL', 'Supply Chain', 'QuickSight'],
  },
  {
    company: 'grocery',
    area: 'Instock & Demand',
    title: 'Buying Workflow Optimization',
    short: 'Instock & wastage',
    metric: '+2% / −4%',
    metricSub: 'instock rate up, wastage down',
    description: 'Partnered with Product to map the buying system workflow, identify gaps and recommend solutions to close them. Buying above demand drives shrinkage and below it leaves shelves empty. Surfacing the controllable deviations, like an unplanned manual overbuy against an already scheduled delivery, let the next buying cycle correct for them.',
    tags: ['SQL', 'Forecasting', 'Python'],
  },
  {
    company: 'grocery',
    area: 'Instock & Demand',
    featured: true,
    title: 'GenAI Anomaly Detection for WBR',
    short: 'WBR analysis',
    metric: '2+ hrs',
    metricSub: 'of weekly WBR analysis, automated',
    description: 'Partnered with a data engineer on one of the team\'s first GenAI use cases, an anomaly detector for Weekly Business Reviews. It flags instock issues automatically.',
    tags: ['GenAI', 'LLM Prompt Engineering', 'Python'],
  },
  {
    company: 'tech-mahindra',
    title: 'Telecom KPI Platform',
    short: 'Customers served',
    metric: '34M+',
    metricSub: 'customers across Kuwait, Qatar and South Africa',
    description: 'Led a team of 4 that pulled data from separate source systems into reporting layers for MTN, VIVA and Vodafone. CXOs used them to track KPIs like customer base and revenue, and to make calls on plans, promotions and segments.',
    tags: ['ODI', 'OBIEE', 'SQL', 'PL/SQL', 'Power BI', 'ETL'],
  },
  {
    company: 'tech-mahindra',
    title: 'Reporting Architecture Consolidation',
    short: 'Reports cut',
    metric: '1,200 → 400',
    metricSub: 'reports consolidated',
    description: 'Migrated the data model from Hyperion to OBIEE, unifying reporting while lifting performance and data quality.',
    tags: ['OBIEE', 'Hyperion', 'SQL', 'Data Modeling'],
  },
]

export default function Work() {
  const [active, setActive] = useState('featured')
  const [expanded, setExpanded] = useState(() => new Set())
  const tabsRef = useRef(null)
  const tab = TABS.find(t => t.id === active)

  const toggle = title => setExpanded(prev => {
    const next = new Set(prev)
    next.has(title) ? next.delete(title) : next.add(title)
    return next
  })

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
    const open = expanded.has(p.title)
    return (
      <div
        key={p.title}
        className={`work-card ${p.featured ? 'featured' : ''} ${p.wip ? 'wip' : ''} ${open ? 'open' : ''}`}
        style={{ '--tc': cardColor }}
      >
        {p.featured && <span className="featured-badge">Featured</span>}
        {active === 'featured' && p.area && <div className="work-eyebrow">{p.area}</div>}
        <div className="work-metric">
          <span className="work-metric-num">{p.metric}</span>
          {p.metricSub && <span className="work-metric-sub">{p.metricSub}</span>}
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        {/* Phone only: the description is collapsed until tapped, so a tab's
            worth of cards fits in a reasonable scroll. Hidden on desktop. */}
        <button className="work-more" onClick={() => toggle(p.title)} aria-expanded={open}>
          {open ? 'Show less' : 'Read more'}
          <span className="work-more-sign">{open ? '−' : '+'}</span>
        </button>
        <div className="work-tags">
          {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    )
  }

  return (
    <section id="work">
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
          {filtered.map(p => (
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
