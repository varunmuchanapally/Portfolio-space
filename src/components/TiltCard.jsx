import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const TONE = {
  light: {
    background:   '#F2F1ED',
    border:       '1px solid rgba(15,15,18,0.07)',
    borderHover:  '1px solid rgba(15,15,18,0.12)',
    shadow:       '0 2px 16px rgba(9,9,12,0.06)',
    shadowHover:  '0 16px 48px rgba(9,9,12,0.10)',
    color:        '#0F0F12',
    spotR:        '180px',
    spotColor:    'rgba(15,15,18,0.04)',
    glowColor:    'rgba(15,15,18,0.06)',
  },
  dark: {
    background:   '#14141A',
    border:       '1px solid rgba(232,230,224,0.06)',
    borderHover:  '1px solid rgba(139,158,183,0.22)',
    shadow:       '0 2px 20px rgba(0,0,0,0.35)',
    shadowHover:  '0 16px 48px rgba(0,0,0,0.55)',
    color:        '#E8E6E0',
    spotR:        '200px',
    spotColor:    'rgba(139,158,183,0.06)',
    glowColor:    'rgba(139,158,183,0.10)',
  },
}

export default function TiltCard({
  tone     = 'dark',
  children,
  delay    = 0,
  style    = {},
  className = '',
  padding  = '44px 48px',
  radius   = '20px',
}) {
  const ref       = useRef(null)
  const inViewRef = useRef(null)
  const isInView  = useInView(inViewRef, { once: true, margin: '-60px' })

  const [tilt,     setTilt]     = useState({ x: 0, y: 0 })
  const [spot,     setSpot]     = useState({ x: 50, y: 50 })
  const [hovered,  setHovered]  = useState(false)

  const t = TONE[tone] ?? TONE.dark

  // ── Mouse tracking ─────────────────────────────────────────────────────────
  const handleMouseMove = e => {
    const rect   = ref.current.getBoundingClientRect()
    const cx     = rect.left + rect.width  / 2
    const cy     = rect.top  + rect.height / 2
    const dx     = (e.clientX - cx) / (rect.width  / 2)   // -1 → 1
    const dy     = (e.clientY - cy) / (rect.height / 2)   // -1 → 1

    setTilt({ x: -dy * 7, y: dx * 7 })
    setSpot({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    })
  }

  const handleMouseEnter = () => setHovered(true)

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
    setSpot({ x: 50, y: 50 })
  }

  return (
    // Scroll reveal wrapper
    <div ref={inViewRef} style={{ width: '100%', height: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay, ease: EASE }}
        style={{ width: '100%', height: '100%' }}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX:   tilt.x,
            rotateY:   tilt.y,
            boxShadow: hovered ? t.shadowHover : t.shadow,
            border:    hovered ? t.borderHover : t.border,
          }}
          transition={{
            rotateX:   { duration: hovered ? 0.08 : 0.55, ease: hovered ? 'linear' : EASE },
            rotateY:   { duration: hovered ? 0.08 : 0.55, ease: hovered ? 'linear' : EASE },
            boxShadow: { duration: 0.35, ease: EASE },
            border:    { duration: 0.35, ease: EASE },
          }}
          className={className}
          style={{
            position:        'relative',
            width:           '100%',
            height:          '100%',
            borderRadius:    radius,
            background:      t.background,
            border:          t.border,
            boxShadow:       t.shadow,
            color:           t.color,
            padding,
            overflow:        'hidden',
            transformStyle:  'preserve-3d',
            perspective:     '1000px',
            willChange:      'transform',
            cursor:          'default',
            ...style,
          }}
        >
          {/* Mouse-tracking spotlight */}
          <div
            style={{
              position:     'absolute',
              inset:        0,
              borderRadius: radius,
              pointerEvents:'none',
              opacity:      hovered ? 1 : 0,
              transition:   'opacity 0.35s ease',
              background:   `radial-gradient(${t.spotR} circle at ${spot.x}% ${spot.y}%, ${t.spotColor}, transparent 70%)`,
              zIndex:       0,
            }}
          />

          {/* Corner accent glows */}
          <div style={{
            position:     'absolute',
            top:          '-1px',
            left:         '-1px',
            width:        '80px',
            height:       '80px',
            borderRadius: `${radius} 0 0 0`,
            background:   `radial-gradient(circle at 0% 0%, ${t.glowColor}, transparent 70%)`,
            opacity:      hovered ? 1 : 0,
            transition:   'opacity 0.4s ease',
            pointerEvents:'none',
            zIndex:       0,
          }} />
          <div style={{
            position:     'absolute',
            bottom:       '-1px',
            right:        '-1px',
            width:        '80px',
            height:       '80px',
            borderRadius: `0 0 ${radius} 0`,
            background:   `radial-gradient(circle at 100% 100%, ${t.glowColor}, transparent 70%)`,
            opacity:      hovered ? 1 : 0,
            transition:   'opacity 0.4s ease',
            pointerEvents:'none',
            zIndex:       0,
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}