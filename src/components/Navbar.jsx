import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">VB</span>
      <ul>
        <li><a href="#work">Work</a></li>
        <li><a href="#skills">Stack</a></li>
        <li><a href="#timeline">Journey</a></li>
        <li><a href="#contact">Let's Talk</a></li>
      </ul>
    </nav>
  )
}
