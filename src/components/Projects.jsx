import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const PROJECTS = [
  {
    name:        'MERN Stack Blog Website',
    tagline:     'Full-stack developer journal — varun.log',
    description: 'A personal blog built from scratch with a black and white editorial aesthetic. Features shape-morphing landing animation, markdown rendering with syntax highlighting, light/dark theme, tag filtering, and a password-protected admin system for creating and managing posts.',
    tags:        ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
    stat:        { value: 'MERN', label: 'Full Stack' },
    href:        'https://blog-website-frontend-ecru.vercel.app/',
    visual: {
      bg:     'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
      lines:  true,
      symbol: '∂',
      color:  'rgba(232,230,224,0.08)',
      accent: 'rgba(232,230,224,0.55)',
    },
  },
  {
    name:        'AlgoVis',
    tagline:     'Sorting & pathfinding algorithm visualiser',
    description: 'Interactive visualiser for sorting algorithms — Bubble, Merge, Quick, Heap — and pathfinding algorithms including Dijkstra, A*, BFS and DFS. Watch every step execute in real time with adjustable speed and grid size. Built entirely in React with no external animation libraries.',
    tags:        ['React', 'Algorithms', 'Data Structures', 'Vite'],
    stat:        { value: 'Visualizer', label: 'Algorithms' },
    href:        'https://algorithm-visualizer-eta-ten.vercel.app/',
    visual: {
      bg:     'linear-gradient(135deg, #080e14 0%, #0d1a26 100%)',
      grid:   true,
      symbol: '⬡',
      color:  'rgba(139,158,183,0.07)',
      accent: '#8B9EB7',
    },
  },
  {
    name:        'RAG Quiz',
    tagline:     'AI-powered quiz generation from your documents',
    description: 'Upload any document and the app generates contextual quiz questions using a retrieval-augmented generation pipeline. Chunks and embeds content, retrieves relevant passages, and uses an LLM to produce accurate, document-grounded questions and answers.',
    tags:        ['Python', 'LangChain', 'FastAPI', 'React', 'Pinecone'],
    stat:        { value: 'RAG', label: 'Powered' },
    href:        'https://quiz-v-v1.vercel.app/',
    visual: {
      bg:     'linear-gradient(135deg, #0a0d0f 0%, #0f1a14 100%)',
      dots:   true,
      symbol: '◈',
      color:  'rgba(74,222,128,0.06)',
      accent: 'rgba(74,222,128,0.55)',
    },
  },
]

// ── Abstract visual panel ──────────────────────────────────────────────────
function ProjectVisual({ visual, name }) {
  return (
    <div style={{
      width:          '220px',
      flexShrink:     0,
      borderRadius:   '14px',
      background:     visual.bg,
      position:       'relative',
      overflow:       'hidden',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      minHeight:      '160px',
    }}>

      {/* Grid lines */}
      {visual.grid && (
        <div style={{
          position:   'absolute',
          inset:      0,
          backgroundImage: `
            linear-gradient(${visual.color} 1px, transparent 1px),
            linear-gradient(90deg, ${visual.color} 1px, transparent 1px)
          `,
          backgroundSize: '22px 22px',
        }} />
      )}

      {/* Horizontal document lines */}
      {visual.lines && (
        <div style={{ position: 'absolute', inset: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
          {[1, 0.6, 0.8, 0.4, 0.7, 0.3].map((op, i) => (
            <div key={i} style={{
              height:     '1px',
              background: `rgba(232,230,224,${op * 0.18})`,
              width:      `${60 + Math.sin(i * 1.5) * 30}%`,
            }} />
          ))}
        </div>
      )}

      {/* Dot field */}
      {visual.dots && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{
              position:     'absolute',
              width:        '3px',
              height:       '3px',
              borderRadius: '50%',
              background:   visual.color.replace('0.06', '0.35'),
              left:         `${(i % 6) * 18 + 10}%`,
              top:          `${Math.floor(i / 6) * 24 + 8}%`,
            }} />
          ))}
        </div>
      )}

      {/* Concentric rings */}
      {visual.rings && (
        <>
          {[80, 55, 30].map((size, i) => (
            <div key={i} style={{
              position:     'absolute',
              width:        `${size}px`,
              height:       `${size}px`,
              borderRadius: '50%',
              border:       `1px solid ${visual.color.replace('0.06', String(0.15 - i * 0.04))}`,
              left:         '50%',
              top:          '50%',
              transform:    'translate(-50%, -50%)',
            }} />
          ))}
        </>
      )}

      {/* Centre symbol */}
      <div style={{
        position:   'relative',
        zIndex:     1,
        fontFamily: '"DM Serif Display", serif',
        fontSize:   '42px',
        color:      visual.accent,
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {visual.symbol}
      </div>

      {/* Bottom fade */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        height:     '40px',
        background: 'linear-gradient(to bottom, transparent, rgba(9,9,12,0.4))',
      }} />
    </div>
  )
}

// ── Single project row ─────────────────────────────────────────────────────
function ProjectCard({ project, delay, index }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{
        display:        'flex',
        gap:            '32px',
        alignItems:     'stretch',
        background:     'rgba(14,13,10,0.75)',
        backdropFilter: 'blur(40px)',
        border:         '1px solid rgba(139,158,183,0.13)',
        borderRadius:   '20px',
        padding:        '28px',
        boxShadow:      '0 4px 24px rgba(0,0,0,0.25)',
        marginBottom:   index < PROJECTS.length - 1 ? '16px' : 0,
        overflow:       'hidden',
        position:       'relative',
        transition:     'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor:         'default',
      }}
      whileHover={{
        borderColor: 'rgba(139,158,183,0.28)',
        boxShadow:   '0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(139,158,183,0.08)',
      }}
    >
      {/* Corner glow */}
      <div style={{
        position:      'absolute',
        top:           0,
        left:          0,
        width:         '200px',
        height:        '200px',
        background:    'radial-gradient(circle at 0% 0%, rgba(139,158,183,0.05), transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Visual panel */}
      <ProjectVisual visual={project.visual} name={project.name} />

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>

        {/* Top */}
        <div>
          {/* Name + stat row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize:   '24px',
              fontWeight: 400,
              color:      'rgba(232,230,224,0.95)',
              lineHeight: 1.15,
            }}>
              {project.name}
            </div>

            {/* Stat */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', flexShrink: 0, marginLeft: '16px' }}>
              <span style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize:   '18px',
                color:      '#8B9EB7',
                lineHeight: 1,
              }}>
                {project.stat.value}
              </span>
              <span style={{
                fontFamily:    '"JetBrains Mono", monospace',
                fontSize:      '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'rgba(232,230,224,0.22)',
              }}>
                {project.stat.label}
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div style={{
            fontFamily:    '"Sora", sans-serif',
            fontSize:      '12px',
            fontWeight:    400,
            color:         'rgba(139,158,183,0.65)',
            letterSpacing: '0.02em',
            marginBottom:  '14px',
          }}>
            {project.tagline}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(232,230,224,0.06)', marginBottom: '14px' }} />

          {/* Description */}
          <p style={{
            fontFamily: '"Sora", sans-serif',
            fontSize:   '13px',
            fontWeight: 300,
            color:      'rgba(232,230,224,0.55)',
            lineHeight: 1.75,
            margin:     0,
          }}>
            {project.description}
          </p>
        </div>

        {/* Bottom — tags + link */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily:    '"JetBrains Mono", monospace',
                fontSize:      '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding:       '4px 10px',
                borderRadius:  '6px',
                background:    'rgba(139,158,183,0.07)',
                border:        '1px solid rgba(139,158,183,0.16)',
                color:         'rgba(139,158,183,0.70)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow link */}
          <motion.a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                x: 3,
                backgroundColor: 'rgba(139,158,183,0.12)',
                borderColor: 'rgba(139,158,183,0.70)',
              }}
              transition={{ duration: 0.2 }}
              style={{
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  width:          '32px',
  height:         '32px',
  borderRadius:   '50%',
  border:         '1px solid rgba(139,158,183,0.45)',
  color:          '#8B9EB7',
  textDecoration: 'none',
  fontSize:       '14px',
  flexShrink:     0,
  transition:     'all 0.2s ease',
}}
          >
            ↗
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Projects() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div className="container" style={{ paddingTop: '128px', paddingBottom: '128px' }}>

      {/* Heading — matches Experience exactly */}
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
          marginBottom: '48px',
        }}
      >
        Projects
      </motion.div>

      {/* Cards stacked */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} delay={i * 0.10} index={i} />
        ))}
      </div>
    </div>
  )
}