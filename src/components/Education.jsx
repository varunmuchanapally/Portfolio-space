import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE        = [0.16, 1, 0.3, 1]
const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'
const BLOB_BG     = 'radial-gradient(circle at center, rgba(7,9,26,0.65) 0%, transparent 80%)'

const EDUCATION = [
  {
    index:      '01',
    degree:     'M.S. in Computer Science',
    university: 'University of Central Florida',
    location:   'Orlando, FL',
    gpa:        '3.9 / 4.0',
    period:     'Aug 2024 — May 2026',
    active:     true,
  },
  // {
  //   index:      '02',
  //   degree:     'B.Tech. in Computer Science',
  //   university: 'B V Raju Institute of Technology',
  //   location:   'Hyderabad, India',
  //   gpa:        '8.05 / 10',
  //   period:     'Aug 2020 — Jun 2024',
  //   active:     false,
  // },
]

function EducationEntry({ ed, delay }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{
        background:     BLOB_BG,
        backdropFilter: 'blur(5px)',
        padding:        '20px',
        marginLeft:     '-20px',
        marginBottom:   '64px',
      }}
    >
      {/* Sub-label */}
      <div style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '11px',
        color:         '#A6A8CD',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        marginBottom:  '16px',
        display:       'flex',
        alignItems:    'center',
        gap:           '14px',
        textShadow:    '0 1px 3px rgba(0,0,0,0.6)',
      }}>
        <span style={{ color: '#FDE047', textShadow: '0 0 8px rgba(253,224,71,0.6)', flexShrink: 0 }}>▸</span>
        {ed.index} // {ed.degree}
        {ed.active && (
          <span style={{
            fontFamily:    '"JetBrains Mono", monospace',
            fontSize:      '8px',
            letterSpacing: '0.16em',
            color:         '#4ade80',
            border:        '0.5px solid rgba(74,222,128,0.25)',
            padding:       '2px 8px',
            flexShrink:    0,
          }}>
            ACTIVE
          </span>
        )}
      </div>

      {/* University — main bold heading */}
      <div style={{
        fontFamily:    '"DM Serif Display", serif',
        fontSize:      'clamp(32px, 5vw, 60px)',
        letterSpacing: '-0.02em',
        color:         '#F8FAFC',
        textShadow:    TEXT_SHADOW,
        lineHeight:    1.05,
        marginBottom:  '20px',
      }}>
        {ed.university}
      </div>

      {/* Details — bold body text */}
      <div style={{
        fontFamily:    '"Sora", sans-serif',
        fontSize:      'clamp(16px, 2.5vw, 22px)',
        fontWeight:    900,
        lineHeight:    1.4,
        color:         '#F8FAFC',
        letterSpacing: '-0.02em',
        textShadow:    TEXT_SHADOW,
      }}>
        {ed.period} · {ed.location} · GPA {ed.gpa}
      </div>
    </motion.div>
  )
}

export default function Education() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '160px' }}>

      {/* SECTION HEADER */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ marginBottom: '80px' }}
      >
        <div style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '12px',
          color:         '#A6A8CD',
          letterSpacing: '0.4em',
          marginBottom:  '8px',
          textShadow:    '0 1px 3px rgba(0,0,0,0.6)',
        }}>
          ◈ SECTION_02 // TRAINING_RECORDS
        </div>
        <h2 style={{
          fontFamily:    '"DM Serif Display", serif',
          fontSize:      'clamp(48px, 8vw, 84px)',
          color:         '#F8FAFC',
          margin:        0,
          letterSpacing: '-0.02em',
          textShadow:    TEXT_SHADOW,
        }}>
          Education
        </h2>
      </motion.div>

      {/* VERTICAL DATA LINE */}
      <div style={{ borderLeft: '1px solid rgba(166,168,205,0.2)', paddingLeft: '40px' }}>
        {EDUCATION.map((ed, i) => (
          <EducationEntry key={ed.university} ed={ed} delay={i * 0.12} />
        ))}
      </div>
    </div>
  )
}
