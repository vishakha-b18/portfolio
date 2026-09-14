import React, { useState } from 'react'
import './Skills.css'

const PIPELINE = [
  {
    stage: '01',
    label: 'Ingest',
    icon: '⬇',
    description: 'Pull from any source',
    color: '#92400e',
    skills: ['AWS S3', 'Glue', 'Athena', 'Redshift', 'ClickHouse', 'Hive'],
  },
  {
    stage: '02',
    label: 'Transform',
    icon: '⚙',
    description: 'Shape & model the data',
    color: '#1d4ed8',
    skills: ['SQL', 'Python', 'Spark', 'ETL', 'Cube.js', 'Cube.yml'],
  },
  {
    stage: '03',
    label: 'Analyze',
    icon: '🔬',
    description: 'Surface what matters',
    color: '#7c3aed',
    skills: ['Statistical Modeling', 'A/B Testing', 'Product Analytics', 'Anomaly Detection', 'Forecasting'],
  },
  {
    stage: '04',
    label: 'Visualize',
    icon: '📊',
    description: 'Make it undeniable',
    color: '#047857',
    skills: ['Amazon QuickSight', 'Tableau', 'Power BI', 'Pendo', 'OBIEE', 'MS Excel'],
  },
  {
    stage: '05',
    label: 'Automate',
    icon: '⚡',
    description: 'Let it run itself',
    color: '#9a3412',
    skills: ['LLM Prompt Engineering', 'Agentic Workflows', 'Kiro', 'QuickSight Workflows', 'GenAI'],
  },
]

export default function Skills() {
  const [active, setActive] = useState(null)

  return (
    <section id="skills">
      <h2>My stack, end to end</h2>

      <p className="skills-subtitle">
        Here's how I move from raw data to a decision in the boardroom.
      </p>

      <div className="pipeline">
        {PIPELINE.map((s, i) => (
          <React.Fragment key={s.stage}>
            <div className="pipeline-item">
              <div
                className={`pipeline-card ${active === i ? 'active' : ''}`}
                style={{ '--sc': s.color }}
                onClick={() => setActive(active === i ? null : i)}
              >
                <div className="stage-num">{s.stage}</div>
                <div className="stage-icon">{s.icon}</div>
                <div className="stage-label">{s.label}</div>
                <div className="stage-desc">{s.description}</div>
                <div className="stage-skills">
                  {s.skills.map(sk => (
                    <span key={sk} className="stage-tag">{sk}</span>
                  ))}
                </div>
              </div>
            </div>
            {i < PIPELINE.length - 1 && (
              <div className="pipeline-arrow" style={{ '--sc': s.color }}>
                <div className="arrow-track">
                  <div className="arrow-dot" />
                </div>
                <span className="arrow-head">›</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="pipeline-output">
        <span className="output-badge">→ Business Decision</span>
      </div>
    </section>
  )
}
