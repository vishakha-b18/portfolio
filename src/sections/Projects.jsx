import './Projects.css'

const projects = [
  {
    company: 'prime-video',
    featured: true,
    title: 'Agentic On-Call Triage System',
    description: 'Built agentic workflows to autonomously triage on-call job failures, query system status, and execute corrective actions — eliminating ~10 hrs/week of manual effort at Amazon Prime Video.',
    tags: ['Agentic AI', 'Automation', 'Python'],
  },
  {
    company: 'prime-video',
    title: 'Partner Analytics Platform',
    description: 'Architecting an end-to-end partner analytics platform at Prime Video with minute-by-minute viewership queries in Athena, semantic layer via Cube.yml, and co-designed metric frameworks for ad placement and content quality decisions.',
    tags: ['Athena', 'Cube.js', 'AWS', 'QuickSight'],
  },
  {
    company: 'prime-video',
    title: 'Pendo Guide Engagement Analytics',
    description: 'Spearheaded end-to-end Pendo analytics strategy across engineering and product teams, defining feature tracking taxonomy and leading dashboard development — resulting in 30% feature adoption increase and a 10-point NPS improvement.',
    tags: ['Pendo', 'Product Analytics', 'Dashboard'],
  },
  {
    company: 'grocery',
    title: 'GenAI Anomaly Detection for WBR',
    description: 'Self-initiated a GenAI-powered anomaly detection solution for Weekly Business Reviews, engineering training datasets and prompt frameworks that automatically surface instock metric issues, saving 2+ hrs/week.',
    tags: ['GenAI', 'LLM Prompt Engineering', 'Python'],
  },
  {
    company: 'grocery',
    featured: true,
    title: 'Supply Chain Instock Analytics',
    description: 'Led cross-functional initiative to diagnose DC out-of-stock failures and built the data pipeline, reducing DC-driven instock misses by ~1.5% within 2 months across a fulfillment network handling 40–50% of total downstream stock.',
    tags: ['SQL', 'ETL', 'Supply Chain', 'QuickSight'],
  },
  {
    company: 'grocery',
    title: 'Demand Analytics & Forecasting',
    description: 'Owned end-to-end development of a rule-based demand analytics solution delivering dynamic forecasting capabilities — driving a 2% improvement in instock rate and a 4% reduction in wastage across grocery operations.',
    tags: ['SQL', 'Forecasting', 'Python'],
  },
  {
    company: 'grocery',
    featured: true,
    title: 'Inventory Cancellation Reduction',
    description: 'Built end-to-end data pipelines and dashboards to reduce inventory-driven order cancellations across Europe and North America — driving rates from ~9% to ~3% and enabling ~$2MM in savings.',
    tags: ['SQL', 'Python', 'Data Pipelines', 'AWS'],
  },
  {
    company: 'tech-mahindra',
    title: 'Telecom BI Platform',
    description: 'Led a team of 4 to architect ETL processes and a reporting framework for an OLTP telecom system supporting KPIs for 30M+ customers across South Africa. Consolidated reporting from Hyperion to OBIEE, cutting report catalog from 1,200 to 400.',
    tags: ['ODI', 'SQL', 'Power BI', 'OBIEE'],
  },
]

export default function Projects({ filter, onClearFilter }) {
  const filtered = filter
    ? projects.filter((p) => filter.includes(p.company))
    : projects

  return (
    <section id="projects">
      <div className="projects-header">
        <h2>Projects</h2>
        {filter && (
          <button className="clear-btn" onClick={onClearFilter}>Show all ✕</button>
        )}
      </div>
      <div className="projects-grid">
        {filtered.map((p) => (
          <div key={p.title} className={`project-card ${p.featured ? 'featured' : ''}`}>
            {p.featured && <span className="featured-badge">Featured</span>}
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="project-tags">
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
