import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const obs = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
  { threshold: 0.1 }
)

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section').forEach(s => obs.observe(s))
})

setTimeout(() => {
  document.querySelectorAll('section').forEach(s => obs.observe(s))
}, 100)
