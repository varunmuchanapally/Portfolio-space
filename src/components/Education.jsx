import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const EDUCATION = [
  {
    degree:    'M.S. in Computer Science',
    university:'University of Central Florida',
    location:  'Orlando, FL',
    gpa:       '3.9 / 4',
    period:    'Aug 2024 — May 2026',
    highlights:[
      'Specialisation in Artificial Intelligence & Machine Learning',
      'Research focus on Large Language Models and RAG systems',
      'Graduate Teaching Assistant — AI/ML coursework',
    ],
  },
  {
    degree:    'B.Tech. in Computer Science',
    university:'B V Raju Institute of Technology',
    location:  'Hyderabad, India',
    gpa:       '8.05 / 10',
    period:    'Aug 2020 — Jun 2024',
    highlights:[
      'Core coursework in Data Structures, Algorithms, and Systems Design',
      'Final year project on Neural Network Optimisation',
      'Active member of the Computer Science Society',
    ],
  },
]

function EducationCard({ ed, delay }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{
        background:     'rgba(14,13,10,0.75)',
        backdropFilter: 'blur(40px)',
        border:         '1px solid rgba(139,158,183,0.20)',
        borderRadius:   '20px',
        padding:        '44px',
        boxShadow:      '0 8px 40px rgba(0,0,0,0.35)',
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* Corner accent glow */}
      <div style={{
        position:   'absolute',
        top:        0,
        left:       0,
        width:      '120px',
        height:     '120px',
        background: 'radial-gradient(circle at 0% 0%, rgba(139,158,183,0.08), transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Period */}
      <div style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color:         'rgba(139,158,183,0.55)',
        marginBottom:  '18px',
      }}>
        {ed.period}
      </div>

      {/* Degree */}
      <div style={{
        fontFamily:   '"DM Serif Display", serif',
        fontSize:     '24px',
        fontWeight:   400,
        color:        'rgba(232,230,224,0.95)',
        lineHeight:   1.18,
        marginBottom: '8px',
      }}>
        {ed.degree}
      </div>

      {/* University + location */}
      <div style={{
        fontFamily:   '"Sora", sans-serif',
        fontSize:     '14px',
        fontWeight:   400,
        color:        '#8B9EB7',
        marginBottom: '4px',
      }}>
        {ed.university}
      </div>
      <div style={{
        fontFamily:   '"Sora", sans-serif',
        fontSize:     '13px',
        fontWeight:   300,
        color:        'rgba(232,230,224,0.38)',
        marginBottom: '24px',
      }}>
        {ed.location}
      </div>

      {/* GPA badge */}
      <div style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          '8px',
        padding:      '5px 14px 5px 10px',
        borderRadius: '100px',
        background:   'rgba(139,158,183,0.10)',
        border:       '1px solid rgba(139,158,183,0.22)',
        marginBottom: '28px',
      }}>
        <div style={{
          width:        '6px',
          height:       '6px',
          borderRadius: '50%',
          background:   '#8B9EB7',
          flexShrink:   0,
        }} />
        <span style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color:         '#8B9EB7',
        }}>
          GPA {ed.gpa}
        </span>
      </div>

      {/* Divider */}
      {/* <div style={{
        height:       '1px',
        background:   'rgba(232,230,224,0.07)',
        marginBottom: '22px',
      }} /> */}

      {/* Highlights */}
      {/* <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
        {ed.highlights.map(h => (
          <li key={h} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{
              flexShrink:   0,
              marginTop:    '7px',
              width:        '4px',
              height:       '4px',
              borderRadius: '50%',
              background:   'rgba(139,158,183,0.50)',
            }} />
            <span style={{
              fontFamily: '"Sora", sans-serif',
              fontSize:   '13px',
              fontWeight: 300,
              color:      'rgba(232,230,224,0.55)',
              lineHeight: 1.65,
            }}>
              {h}
            </span>
          </li>
        ))}
      </ul> */}
    </motion.div>
  )
}

export default function Education() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div className="container" style={{ paddingTop: '128px', paddingBottom: '128px' }}>

      {/* Heading */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          fontFamily:   '"DM Serif Display", serif',
          fontSize:     '48px',
          fontWeight:   400,
          color:        'rgba(232,230,224,0.92)',
          lineHeight:   1.08,
          marginBottom: '40px',
        }}
      >
        Education
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap:                 '18px',
      }}>
        {EDUCATION.map((ed, i) => (
          <EducationCard key={ed.university} ed={ed} delay={i * 0.12} />
        ))}
      </div>

    </div>
  )
}