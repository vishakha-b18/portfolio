import './About.css'

const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '2', label: 'Companies' },
  { value: '30M+', label: 'Customers Served' },
  { value: '~$327M', label: 'Business Impact' },
]

export default function About() {
  return (
    <section id="about">
      <h2>About</h2>
      <div className="about-layout">
        <p className="about-bio">
          I'm a Senior BI & Analytics Engineer with 10+ years of experience building data pipelines,
          BI platforms, and analytics solutions that drive measurable business outcomes across
          e-commerce, supply chain, and media domains.
          <br /><br />
          I combine deep technical expertise with strong business acumen — translating complex data
          into actionable insights at scale. Lately I've been applying GenAI and agentic automation
          to eliminate the manual overhead that slows teams down.
        </p>
        <div className="about-stats">
          {STATS.map(s => (
            <div key={s.label} className="about-stat">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
