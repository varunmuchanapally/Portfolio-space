import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTypewriter from '../hooks/useTypewriter.js'

const EASE = [0.16, 1, 0.3, 1]

const STRINGS = [
  "Hi, I'm Varun",
  "AI Engineer & Software Engineer",
  "Building intelligent systems and elegant software — where machine learning meets great engineering.",
]

function PulsingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
          style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: i === 1 ? 'var(--accent)' : 'var(--accent-dim)',
          }}
        />
      ))}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 1 }}
      style={{
        position: 'absolute', bottom: '44px', left: '50%',
        transform: 'translateX(-50%)', display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: '10px',
        pointerEvents: 'none',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '9px',
        letterSpacing: '0.20em', textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>Scroll</span>
      <div style={{ position: 'relative', width: '1px', height: '48px', overflow: 'hidden' }}>
        <motion.div
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          style={{
            position: 'absolute', top: 0, left: 0, width: '1px', height: '100%',
            background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
          }}
        />
      </div>
    </motion.div>
  )
}

// Mounts only at stage 2 — hook fires fresh every time this component mounts
function CardContent() {
  const { displayedTexts, done, currentlyTyping } = useTypewriter(STRINGS, {
    startDelay: 600,
    speed: 48,
  })

  const lineStyles = [
    { fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 6vw, 62px)', lineHeight: 1.08, color: '#E8E6E0', fontWeight: 400, marginBottom: '14px', display: 'block' },
    { fontFamily: 'var(--font-body)', fontSize: '19px', fontWeight: 300, color: '#8B9EB7', lineHeight: 1.5, marginBottom: '18px', display: 'block' },
    { fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'rgba(232,230,224,0.42)', lineHeight: 1.7, marginBottom: '36px', display: 'block' },
  ]

  return (
    <div style={{ padding: '52px 52px 48px' }}>
      {STRINGS.map((_, i) => (
        <div key={i} style={lineStyles[i]}>
          {displayedTexts[i]}
          {currentlyTyping === i && (
            <span style={{
              display: 'inline-block', width: '2px', height: '0.85em',
              background: '#8B9EB7', marginLeft: '2px',
              verticalAlign: 'text-bottom', animation: 'blink 1s step-end infinite',
            }} />
          )}
        </div>
      ))}

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            <a href="#projects" className="btn btn-primary"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Explore My Work
            </a>
            <a href="#contact" className="btn btn-secondary"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1400)
    const t2 = setTimeout(() => setStage(2), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1, padding: '0 24px',
    }}>
      <AnimatePresence mode="wait">

        {stage === 0 && (
          <motion.div
            key="circle"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(139,158,183,0.08)',
              border: '1px solid rgba(139,158,183,0.30)',
              boxShadow: '0 0 32px rgba(139,158,183,0.20), 0 0 64px rgba(139,158,183,0.10)',
              position: 'relative', flexShrink: 0,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: '-12px', borderRadius: '50%',
                background: 'rgba(139,158,183,0.12)', pointerEvents: 'none',
              }}
            />
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'rgba(14,13,10,0.75)',
              border: '1px solid rgba(139,158,183,0.28)',
              boxShadow: '0 0 48px rgba(139,158,183,0.12), 0 8px 32px rgba(0,0,0,0.45)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '10px',
              flexShrink: 0,
            }}
          >
            <PulsingDots />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 400,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(232,230,224,0.48)',
            }}>Welcome</span>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              position: 'relative', width: '100%', maxWidth: '640px',
              borderRadius: '26px',
              background: 'rgba(14,13,10,0.82)',
              backdropFilter: 'blur(32px)',
              boxShadow: '0 0 0 1px rgba(139,158,183,0.18), 0 0 80px rgba(139,158,183,0.07), 0 24px 64px rgba(0,0,0,0.55)',
            }}
          >
            {/* Gradient border */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '26px', padding: '1px',
              background: 'linear-gradient(135deg, rgba(139,158,183,0.45) 0%, rgba(139,158,183,0.08) 40%, rgba(139,158,183,0.08) 60%, rgba(139,158,183,0.35) 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor', maskComposite: 'exclude',
              pointerEvents: 'none', zIndex: 1,
            }} />
            <CardContent />
          </motion.div>
        )}

      </AnimatePresence>

      {stage === 2 && <ScrollIndicator />}
    </div>
  )
}