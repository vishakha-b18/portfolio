import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Skills from './sections/Skills'
import Timeline from './sections/Timeline'
import Contact from './sections/Contact'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Timeline />
        <Contact />
      </main>
    </>
  )
}
