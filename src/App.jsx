import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Certifications from './components/Certifications.jsx'
import Contact from './components/Contact.jsx'
import GalaxyBackground from './components/GalaxyBackground.jsx'
import UFO from './components/UFO'

export default function App() {
  return (
    <>
      {/* Fixed galaxy canvas behind everything */}
      <GalaxyBackground />

      {/* Navigation */}
      {/* <Navbar /> */}

      {/* Page content */}
      <main>
        <section id="hero"           style={{ padding: 0, minHeight: '100vh' }}>
          <Hero />
        </section>
        <section id="about"          style={{ background: 'transparent' }}>
          <About />
        </section>
        <section id="education"      style={{ background: 'transparent' }}>
          <Education />
        </section>
        <section id="experience"     style={{ background: 'transparent' }}>
          <Experience />
        </section>
        <section id="projects"       style={{ background: 'transparent' }}>
          <Projects />
        </section>
        {/* <section id="certifications" style={{ background: 'transparent' }}>
          <Certifications />
        </section> */}
        <section id="contact"        style={{ background: 'transparent' }}>
          <Contact />
        </section>
      </main>
      <UFO />

    </>
  )
}