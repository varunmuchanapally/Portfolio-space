import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTypewriter from '../hooks/useTypewriter.js'

const EASE = [0.16, 1, 0.3, 1]
const WINE_RED = '#360000'
const LAVENDER = '#A6A8CD'
const OFF_WHITE = '#F8FAFC'

const HERO_STRINGS = [
  'VARUN MUCHANAPALLY',
  'AI Systems & Backend Architecture',
  'Designing intelligent infrastructure for the next generation of software.',
]

// ── Twinkling Warp Canvas ──────────────────────────────────────────────────
function WarpCanvas({ onComplete }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    
    // Increased star density for "Premium" feel
    const stars = Array.from({ length: 800 }, () => ({
      x: (Math.random() - 0.5) * W * 2,
      y: (Math.random() - 0.5) * H * 2,
      z: Math.random() * W,
      pz: 0,
      opacity: Math.random(),
      twinkle: Math.random() * 0.05
    }))

    let frame = 0
    let speed = 0.2 // Start very slow
    let rafId

    const draw = () => {
      // Pure Black Background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, W, H)

      // Slow build up (Longer timespan)
      if (frame < 100) speed += 0.05
      else if (frame > 250) speed *= 0.98 // Slow deceleration

      stars.forEach(s => {
        s.pz = s.z
        s.z -= speed
        
        // Twinkle Logic
        s.opacity += s.twinkle
        if (s.opacity > 1 || s.opacity < 0.3) s.twinkle *= -1

        if (s.z <= 0) s.z = W

        const sx = (s.x / s.z) * (W / 2) + W / 2
        const sy = (s.y / s.z) * (H / 2) + H / 2
        const px = (s.x / s.pz) * (W / 2) + W / 2
        const py = (s.y / s.pz) * (H / 2) + H / 2

        ctx.beginPath()
        ctx.strokeStyle = `rgba(166, 168, 205, ${s.opacity})` // Lavender Stars
        ctx.lineWidth = Math.max(0.5, (1 - s.z / W) * 2)
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      })

      frame++
      if (frame > 350) { // Extended duration (~6 seconds)
        onComplete()
        return
      }
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [onComplete])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0 }} />
}

// ── Floating Ink Content (No Cards) ─────────────────────────────────────────
function HeroContent() {
  const { displayedTexts, done, currentlyTyping } = useTypewriter(HERO_STRINGS, { startDelay: 500, speed: 40 })

  const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'

  return (
    <div style={{
      textAlign:      'left',
      maxWidth:       '800px',
      zIndex:         10,
      background:     'radial-gradient(circle at 40% 50%, rgba(7,9,26,0.65) 0%, transparent 75%)',
      backdropFilter: 'blur(5px)',
      padding:        '40px',
      marginLeft:     '-40px',
    }}>
      {/* SECTION LABEL */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{
          fontFamily:  '"JetBrains Mono", monospace',
          fontSize:    '12px',
          color:       LAVENDER,
          letterSpacing: '0.4em',
          marginBottom:'24px',
          textShadow:  '0 1px 3px rgba(0,0,0,0.6)',
        }}
      >
        ◈ IDENTITY_MANIFEST // V2.026
      </motion.div>

      {/* NAME - THICK WHITE INK */}
      <h1 style={{
        fontFamily:   '"DM Serif Display", serif',
        fontSize:     'clamp(40px, 8vw, 90px)',
        color:        OFF_WHITE,
        lineHeight:   0.9,
        margin:       '0 0 20px 0',
        letterSpacing:'-0.02em',
        textShadow:   TEXT_SHADOW,
      }}>
        {displayedTexts[0]}
      </h1>

      {/* ROLE - BOLD & CLEAN */}
      <h2 style={{
        fontFamily:   '"Sora", sans-serif',
        fontSize:     'clamp(18px, 2vw, 24px)',
        fontWeight:   800,
        color:        LAVENDER,
        margin:       '0 0 30px 0',
        textTransform:'uppercase',
        letterSpacing:'0.1em',
        textShadow:   '0 2px 4px rgba(0,0,0,0.8)',
      }}>
        {displayedTexts[1]}
      </h2>

      {/* BIO - FLOATING INK */}
      <p style={{
        fontFamily:  '"Sora", sans-serif',
        fontSize:    '18px',
        fontWeight:  300,
        lineHeight:  1.6,
        color:       'rgba(248,250,252,0.85)',
        maxWidth:    '600px',
        borderLeft:  `2px solid ${WINE_RED}`,
        paddingLeft: '30px',
        textShadow:  TEXT_SHADOW,
      }}>
        {displayedTexts[2]}
      </p>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '50px', display: 'flex', gap: '30px' }}
          >
            <button
              className="nav-link-ink"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              VIEW_PROJECTS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  const [phase, setPhase] = useState('WARP') // Start directly with Warp for impact

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
      {phase === 'WARP' && <WarpCanvas onComplete={() => setPhase('ACTIVE')} />}
      
      {phase === 'ACTIVE' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <HeroContent />
        </motion.div>
      )}
    </div>
  )
}