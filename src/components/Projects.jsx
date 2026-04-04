import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '../data/projects.js'

const EASE        = [0.16, 1, 0.3, 1]
const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'
const BLOB_BG     = 'radial-gradient(circle at center, rgba(7,9,26,0.65) 0%, transparent 80%)'

function StackTag({ name, isLast }) {
  return (
    <motion.span
      whileHover={{ color: '#FDE047', textShadow: '0 0 8px rgba(253,224,71,0.6)' }}
      transition={{ duration: 0.2 }}
      style={{ display: 'inline-flex', alignItems: 'center', cursor: 'default' }}
    >
      <span style={{
        fontFamily:    '"Sora", sans-serif',
        fontSize:      '16px',
        fontWeight:    800,
        letterSpacing: '-0.02em',
        color:         '#F8FAFC',
        textShadow:    TEXT_SHADOW,
      }}>
        {name}
      </span>
      {!isLast && (
        <span style={{ color: '#A6A8CD', opacity: 0.35, margin: '0 12px', pointerEvents: 'none' }}>/</span>
      )}
    </motion.span>
  )
}

function ProjectEntry({ project, delay, index }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const num      = String(index + 1).padStart(2, '0')

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
        marginBottom:   '72px',
      }}
    >
      {/* Symbol + Sub-label row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '28px', marginBottom: '16px' }}>
        {/* Floating symbol */}
        <div style={{
          fontFamily:  '"DM Serif Display", serif',
          fontSize:    'clamp(56px, 8vw, 96px)',
          lineHeight:  1,
          color:       project.visual.accent,
          textShadow:  `0 0 32px ${project.visual.accent}, 0 2px 8px rgba(0,0,0,0.8)`,
          flexShrink:  0,
          userSelect:  'none',
        }}>
          {project.visual.symbol}
        </div>

        {/* Sub-label stacked beside symbol */}
        <div style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '11px',
          color:         '#A6A8CD',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          display:       'flex',
          alignItems:    'center',
          gap:           '14px',
          flexWrap:      'wrap',
          textShadow:    '0 1px 3px rgba(0,0,0,0.6)',
          paddingTop:    '8px',
        }}>
          <span style={{ color: '#FDE047', textShadow: '0 0 8px rgba(253,224,71,0.6)', flexShrink: 0 }}>▸</span>
          {num} // {project.tagline}
        </div>
      </div>

      {/* Project title — massive display heading, linked */}
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ color: '#FDE047', textShadow: '0 0 24px rgba(253,224,71,0.40), 0 2px 4px rgba(0,0,0,0.8)' }}
        transition={{ duration: 0.25 }}
        style={{
          display:       'block',
          fontFamily:    '"DM Serif Display", serif',
          fontSize:      'clamp(36px, 6vw, 72px)',
          letterSpacing: '-0.02em',
          color:         '#F8FAFC',
          textDecoration:'none',
          textShadow:    TEXT_SHADOW,
          lineHeight:    1.0,
          marginBottom:  '24px',
        }}
      >
        {project.name} ↗
      </motion.a>

      {/* Description — bold body text */}
      <p style={{
        fontFamily:    '"Sora", sans-serif',
        fontSize:      'clamp(16px, 2.5vw, 20px)',
        fontWeight:    900,
        lineHeight:    1.4,
        color:         '#F8FAFC',
        letterSpacing: '-0.02em',
        textShadow:    TEXT_SHADOW,
        margin:        '0 0 28px 0',
        maxWidth:      '720px',
      }}>
        {project.description}
      </p>

      {/* Tech stack — InkTag / separator */}
      <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '8px' }}>
        {project.tags.map((tag, i) => (
          <StackTag key={tag} name={tag} isLast={i === project.tags.length - 1} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
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
          ◈ SECTION_04 // ACTIVE_PROJECTS
        </div>
        <h2 style={{
          fontFamily:    '"DM Serif Display", serif',
          fontSize:      'clamp(48px, 8vw, 84px)',
          color:         '#F8FAFC',
          margin:        0,
          letterSpacing: '-0.02em',
          textShadow:    TEXT_SHADOW,
        }}>
          Projects
        </h2>
      </motion.div>

      {/* VERTICAL DATA LINE */}
      <div style={{ borderLeft: '1px solid rgba(166,168,205,0.2)', paddingLeft: '40px' }}>
        {PROJECTS.map((project, i) => (
          <ProjectEntry key={project.name} project={project} delay={i * 0.10} index={i} />
        ))}
      </div>
    </div>
  )
}
