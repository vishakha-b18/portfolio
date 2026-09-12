import './Experience.css'

const AMAZON_ROLES = [
  {
    id: 'prime-video',
    role: 'BIE II · Prime Video Partner Experience',
    period: 'Jul 2025 – Present',
    color: '#6ee7b7',
    current: true,
  },
  {
    id: 'grocery',
    role: 'BIE I & II · Global Supply Fulfillment, Grocery',
    period: 'May 2021 – Jun 2025',
    color: '#93c5fd',
  },
]

const OTHER_COMPANIES = [
  {
    id: 'tech-mahindra',
    name: 'Tech Mahindra',
    role: 'Senior Business Intelligence Engineer',
    period: 'Oct 2014 – Jul 2019',
    color: '#fbbf24',
  },
]

export default function Experience({ selected, onSelect }) {
  const amazonActive = selected === 'prime-video' || selected === 'grocery'

  function handleAmazonClick() {
    if (amazonActive) onSelect(null)
    else onSelect('amazon-all')
  }

  function handleRoleClick(e, id) {
    e.stopPropagation()
    onSelect(selected === id ? null : id)
  }

  return (
    <section id="experience">
      <h2>Experience</h2>
      <div className="exp-list">

        <div className={`exp-parent ${amazonActive ? 'active' : ''}`}>
          <div className="exp-parent-header" onClick={handleAmazonClick}>
            <span className="exp-dot" style={{ background: '#ff9900' }} />
            <div>
              <div className="exp-company">Amazon</div>
              <div className="exp-period" style={{ color: '#ff9900' }}>May 2021 – Present</div>
            </div>
          </div>
          <div className="exp-sub-cards">
            {AMAZON_ROLES.map((r) => (
              <button
                key={r.id}
                className={`exp-sub-card ${selected === r.id ? 'active' : ''} ${r.current ? 'current' : ''}`}
                style={{ '--sub-color': r.color }}
                onClick={(e) => handleRoleClick(e, r.id)}
              >
                <span className="sub-dot" />
                <div style={{ flex: 1 }}>
                  <div className="sub-role-row">
                    <span className="sub-role">{r.role}</span>
                    {r.current && <span className="now-badge">● NOW</span>}
                  </div>
                  <div className="sub-period">{r.period}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {OTHER_COMPANIES.map((c) => (
          <button
            key={c.id}
            className={`exp-card ${selected === c.id ? 'active' : ''}`}
            style={{ '--card-color': c.color }}
            onClick={() => onSelect(selected === c.id ? null : c.id)}
          >
            <span className="exp-dot" style={{ background: c.color }} />
            <div>
              <div className="exp-company">{c.name}</div>
              <div className="exp-role">{c.role}</div>
              <div className="exp-period" style={{ color: c.color }}>{c.period}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
