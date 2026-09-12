import { useState, useEffect } from 'react'
import HeroWave from './HeroWave'
import './Hero.css'

const GROUPS = [
  {
    icon: '🏢',
    label: 'Where I\'ve Built',
    chips: ['Amazon Prime Video', 'Amazon Grocery', 'Tech Mahindra'],
    accent: '#34d399',
  },
  {
    icon: '📊',
    label: 'What I Do',
    chips: ['BI Engineering', 'Product Analytics', 'Data Pipelines', 'GenAI Automation', 'Agentic Workflows'],
    accent: '#60a5fa',
  },
  {
    icon: '📈',
    label: 'Business Domains',
    chips: ['Supply Chain', 'E-commerce', 'Media & Streaming', 'Retail', 'Telecom'],
    accent: '#fbbf24',
  },
  {
    icon: '🛠️',
    label: 'How I Build',
    chips: ['SQL · Python · Spark', 'AWS Athena', 'QuickSight', 'Redshift', 'LLMs & Agents'],
    accent: '#a78bfa',
  },
]

const INTERVAL = 5000

export default function Hero() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const start = Date.now()
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start
      setProgress(Math.min(elapsed / INTERVAL, 1))
      if (elapsed < INTERVAL) requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [active])

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActive(prev => (prev + 1) % GROUPS.length)
        setFading(false)
      }, 350)
    }, INTERVAL)
    return () => clearInterval(t)
  }, [])

  const goTo = (i) => {
    if (i === active) return
    setFading(true)
    setTimeout(() => { setActive(i); setFading(false) }, 350)
  }

  const group = GROUPS[active]

  return (
    <>
      <section id="hero" className="hero-section">
        <HeroWave />
        <div className="hero-left">
          <p className="hero-greeting">Hi, I'm</p>
          <p className="hero-name">Vishakha Bhattacharjee</p>
          <h1 className="hero-role">Senior BI & <em>Analytics Engineer</em></h1>
          <p className="hero-subtitle"><span className="hero-company">Amazon</span> · 10+ yrs experience</p>
          <p className="hero-tagline">I make data impossible to ignore.</p>
          <p className="hero-location">📍 Los Angeles, CA · Open to Remote</p>
          <div className="hero-cta">
            <a href="#contact" className="btn-primary">Get in Touch</a>
            <a href="#work" className="btn-secondary">View Work</a>
            <a href="/VishakhaBhattacharjee_Resume_0315.pdf" target="_blank" rel="noreferrer" className="btn-resume">↗ Resume</a>
          </div>
        </div>

        <div className="hero-right">
          <div
            className={`trait-card ${fading ? 'trait-fade-out' : 'trait-fade-in'}`}
            style={{ '--card-accent': group.accent }}
          >
            <div className="trait-card-icon">{group.icon}</div>
            <p className="trait-card-label">{group.label}</p>
            <div className="trait-chips">
              {group.chips.map((chip, i) => (
                <span key={chip} className="trait-chip" style={{ animationDelay: `${i * 0.07}s` }}>
                  {chip}
                </span>
              ))}
            </div>
            <div className="trait-segments">
            {GROUPS.map((g, i) => (
              <button
                key={i}
                className={`trait-segment ${i === active ? 'active' : ''} ${i < active ? 'done' : ''}`}
                style={{
                  '--seg-color': g.accent,
                  '--seg-progress': i === active ? progress : i < active ? 1 : 0,
                }}
                onClick={() => goTo(i)}
                aria-label={`Show ${g.label}`}
              />
            ))}
          </div>
          </div>
        </div>
      </section>

      <section id="about">
        <h2>What drives me</h2>
        <p className="about-bio">
          I love building systems that make the answer obvious before anyone has to ask. Ten years in, I still get
          excited when a well-designed pipeline catches something a human would've missed. Lately I've been pushing
          that further with GenAI and agentic automation. If a human is doing a repetitive data task, that's a
          problem I want to solve.
        </p>

        <p className="about-bio">
          Along the way I learned and grew, and found opportunities to mentor junior engineers and new hires.
        </p>
      </section>
    </>
  )
}
