import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export default function SectionHeader({ eyebrow, title, subtitle, tone = 'dark' }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const textColor    = tone === 'light' ? 'var(--text-dark)'      : 'var(--text-primary)'
  const subColor     = tone === 'light' ? 'var(--text-dark-sec)'  : 'var(--text-secondary)'

  return (
    <div
      ref={ref}
      style={{
        textAlign:    'center',
        marginBottom: '64px',
      }}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '10px',
            marginBottom:   '18px',
          }}
        >
          {/* Left accent line */}
          <div style={{
            width:      '24px',
            height:     '1px',
            background: 'var(--accent)',
            opacity:    0.7,
          }} />

          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--accent)',
          }}>
            {eyebrow}
          </span>

          {/* Right accent line */}
          <div style={{
            width:      '24px',
            height:     '1px',
            background: 'var(--accent)',
            opacity:    0.7,
          }} />
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
        style={{
          fontFamily:  'var(--font-display)',
          fontSize:    'clamp(36px, 5vw, 48px)',
          fontWeight:  400,
          lineHeight:  1.08,
          color:       textColor,
          marginBottom: subtitle ? '16px' : 0,
        }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '15px',
            fontWeight: 300,
            color:      subColor,
            maxWidth:   '520px',
            margin:     '0 auto',
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}