import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About',          href: '#about'          },
  { label: 'Education',      href: '#education'      },
  { label: 'Experience',     href: '#experience'     },
  { label: 'Projects',       href: '#projects'       },
  // { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact'        },
]

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1))

export default function Navbar() {
  const [active,   setActive]   = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)

      let current = null
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 120) current = id
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        bottom:         0,
        zIndex:         100,
        width:          '200px',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        '0 0 0 40px',
        gap:            '2px',
        background:     scrolled
          ? 'linear-gradient(to right, rgba(9,9,12,0.85), transparent)'
          : 'transparent',
        transition:     'background 0.4s ease',
        pointerEvents:  'none',
      }}
    >
      {/* Vertical accent line */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="nav-line"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{   opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position:        'absolute',
              top:             '20%',
              bottom:          '20%',
              left:            '36px',
              width:           '1px',
              transformOrigin: 'top',
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(139,158,183,0.30) 30%, rgba(139,158,183,0.30) 70%, transparent 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Name / identity mark at top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{
          position:      'absolute',
          top:           '40px',
          left:          '40px',
          pointerEvents: 'auto',
        }}
      >
        {/* <div style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color:         'rgba(139,158,183,0.50)',
          lineHeight:    1.6,
        }}>
          Varun
        </div> */}
        {/* <div style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '9px',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color:         'rgba(232,230,224,0.18)',
        }}>
          AI · Software Eng.
        </div> */}
      </motion.div>

      {/* Nav links */}
      <div style={{
        display:        'flex',
        flexDirection:  'column',
        gap:            '2px',
        pointerEvents:  'auto',
      }}>
        {NAV_LINKS.map(({ label, href }, i) => {
          const id       = href.slice(1)
          const isActive = active === id

          return (
            <motion.a
              key={id}
              href={href}
              onClick={e => handleClick(e, href)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position:       'relative',
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '10px',
                padding:        '7px 14px',
                borderRadius:   '8px',
                fontFamily:     '"Sora", sans-serif',
                fontSize:       '13px',
                fontWeight:     isActive ? 400 : 300,
                letterSpacing:  '0.02em',
                textDecoration: 'none',
                color:          isActive
                  ? 'rgba(232,230,224,0.92)'
                  : 'rgba(232,230,224,0.28)',
                transition:     'color 0.22s ease',
                whiteSpace:     'nowrap',
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.color = 'rgba(232,230,224,0.65)'
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.color = 'rgba(232,230,224,0.28)'
              }}
            >
              {/* Active dot indicator */}
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale:   isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.25 }}
                style={{
                  width:        '3px',
                  height:       '3px',
                  borderRadius: '50%',
                  background:   '#8B9EB7',
                  flexShrink:   0,
                  boxShadow:    isActive ? '0 0 6px rgba(139,158,183,0.6)' : 'none',
                }}
              />

              {/* Active pill background */}
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  style={{
                    position:     'absolute',
                    inset:        0,
                    borderRadius: '8px',
                    background:   'rgba(139,158,183,0.07)',
                    border:       '1px solid rgba(139,158,183,0.14)',
                    zIndex:       -1,
                  }}
                  transition={{
                    type:      'spring',
                    stiffness: 380,
                    damping:   36,
                    mass:      0.8,
                  }}
                />
              )}

              {label}
            </motion.a>
          )
        })}
      </div>

      {/* Year mark at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        style={{
          position:      'absolute',
          bottom:        '40px',
          left:          '40px',
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '9px',
          letterSpacing: '0.12em',
          color:         'rgba(232,230,224,0.12)',
          pointerEvents: 'none',
        }}
      >
        © {new Date().getFullYear()}
      </motion.div>
    </motion.nav>
  )
}