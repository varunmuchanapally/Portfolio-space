import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Education',  href: '#education'  },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Contact',    href: '#contact'    },
]

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1))

export default function Navbar() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      let current = null
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        bottom:         0,
        zIndex:         100,
        width:          '220px',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        paddingLeft:    '40px',
        pointerEvents:  'none',
      }}
    >
      {/* Vertical spine — matches section data lines */}
      <div style={{
        position:   'absolute',
        left:       '28px',
        top:        '15%',
        bottom:     '15%',
        width:      '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(166,168,205,0.20), transparent)',
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', pointerEvents: 'auto' }}>
        {NAV_LINKS.map(({ label, href }) => {
          const id       = href.slice(1)
          const isActive = active === id

          return (
            <motion.a
              key={id}
              href={href}
              onClick={e => handleClick(e, href)}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              style={{
                display:        'flex',
                alignItems:     'center',
                gap:            '12px',
                textDecoration: 'none',
                cursor:         'pointer',
              }}
            >
              {/* Yellow glow dash — active only */}
              <motion.div
                animate={{
                  width:      isActive ? '18px' : '6px',
                  opacity:    isActive ? 1 : 0.25,
                  background: isActive ? '#FDE047' : '#A6A8CD',
                  boxShadow:  isActive ? '0 0 8px rgba(253,224,71,0.7)' : 'none',
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '1.5px', flexShrink: 0 }}
              />

              {/* Label */}
              <motion.span
                animate={{
                  color:      isActive ? '#F8FAFC' : 'rgba(166,168,205,0.50)',
                  fontWeight: isActive ? 900 : 400,
                  textShadow: isActive
                    ? '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'
                    : 'none',
                }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily:    isActive ? '"Sora", sans-serif' : '"JetBrains Mono", monospace',
                  fontSize:      isActive ? '15px' : '11px',
                  letterSpacing: isActive ? '-0.01em' : '0.18em',
                  textTransform: isActive ? 'none' : 'uppercase',
                  lineHeight:    1,
                }}
              >
                {label}
              </motion.span>
            </motion.a>
          )
        })}
      </div>

      {/* Bottom meta */}
      <div style={{
        position:      'absolute',
        bottom:        '36px',
        left:          '40px',
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '9px',
        color:         'rgba(166,168,205,0.18)',
        display:       'flex',
        flexDirection: 'column',
        gap:           '3px',
        lineHeight:    1.6,
      }}>
        <span>28.5383° N · 81.3792° W</span>
        <span style={{ opacity: 0.6 }}>© 2026 // VARUN_POV</span>
      </div>
    </motion.nav>
  )
}
