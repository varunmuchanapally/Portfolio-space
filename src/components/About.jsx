import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'
const BLOB_BG     = 'radial-gradient(circle at center, rgba(7,9,26,0.65) 0%, transparent 80%)'

const SKILL_GROUPS = [
  { label: 'Languages',              skills: ['Python', 'Java', 'TypeScript', 'SQL', 'C++', 'JavaScript', 'R'] },
  { label: 'AI & LLM Systems',       skills: ['LLMs', 'RAG', 'AI Agents', 'LangChain', 'LlamaIndex', 'Hugging Face', 'PyTorch'] },
  { label: 'Vector DB & Retrieval',  skills: ['FAISS', 'Pinecone', 'Weaviate', 'ChromaDB'] },
  { label: 'Backend & APIs',         skills: ['FastAPI', 'Flask', 'Node.js', 'Express.js', 'REST APIs'] },
  { label: 'Frontend & Apps',        skills: ['React', 'Tailwind CSS', 'Streamlit'] },
  { label: 'Cloud & AI Platforms',   skills: ['AWS SageMaker', 'Azure OpenAI', 'Azure SQL'] },
  { label: 'Data & Databases',       skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ETL'] },
]

// ── The "White Ink" Tag ──────────────────────────────────────────────────────
function InkTag({ name }) {
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, x: -5 },
        visible: { opacity: 1, x: 0 }
      }}
      whileHover={{
        color:      '#FDE047',
        textShadow: '0 0 8px rgba(253,224,71,0.6)',
        x:          4,
        transition: { duration: 0.2 }
      }}
      style={{
        cursor:     'pointer',
        color:      '#F8FAFC',
        textShadow: TEXT_SHADOW,
        padding:    '2px 0',
      }}
    >
      <span style={{
        fontFamily:  '"Sora", sans-serif',
        fontSize:    '16px',
        fontWeight:  800,
        letterSpacing: '-0.02em',
        display:     'inline-block',
      }}>
        {name}
      </span>
      <span style={{ color: '#A6A8CD', opacity: 0.35, margin: '0 12px' }}>/</span>
    </motion.div>
  )
}

// ── The Technical Manifest Group ─────────────────────────────────────────────
function ManifestGroup({ group, delay }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <div ref={ref} style={{ marginBottom: '40px' }}>
      <div style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '11px',
        color:         '#A6A8CD',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        marginBottom:  '16px',
        display:       'flex',
        alignItems:    'center',
        gap:           '15px',
        textShadow:    '0 1px 3px rgba(0,0,0,0.6)',
      }}>
        <span style={{ color: '#FDE047', textShadow: '0 0 8px rgba(253,224,71,0.6)' }}>▸</span>
        {group.label}
        <div style={{ flex: 1, height: '1px', background: 'rgba(166,168,205,0.12)' }} />
      </div>

      <motion.div
        style={{ display: 'flex', flexWrap: 'wrap' }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: delay } } }}
      >
        {group.skills.map((skill) => (
          <InkTag key={skill} name={skill} />
        ))}
      </motion.div>
    </div>
  )
}

export default function About() {
  const containerRef = useRef(null)
  const isInView     = useInView(containerRef, { once: true })

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '160px' }}>

      {/* SECTION HEADER */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '12px',
          color:         '#A6A8CD',
          letterSpacing: '0.4em',
          marginBottom:  '8px',
          textShadow:    '0 1px 3px rgba(0,0,0,0.6)',
        }}>
          ◈ SECTION_01 // PILOT_DOSSIER
        </div>
        <h2 style={{
          fontFamily:    '"DM Serif Display", serif',
          fontSize:      'clamp(48px, 8vw, 84px)',
          color:         '#F8FAFC',
          margin:        0,
          letterSpacing: '-0.02em',
          textShadow:    TEXT_SHADOW,
        }}>
          About Me
        </h2>
      </div>

      {/* MANIFEST CONTENT (No Cards) */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap:                 '60px',
        borderLeft:          '1px solid rgba(166,168,205,0.15)',
        paddingLeft:         '40px',
      }}>

        {/* Bio Column — soft shadow anchor */}
        <div style={{
          background:     BLOB_BG,
          backdropFilter: 'blur(5px)',
          padding:        '20px',
          marginLeft:     '-20px',
        }}>
          <div style={{
            fontFamily:    '"JetBrains Mono", monospace',
            fontSize:      '11px',
            color:         '#A6A8CD',
            letterSpacing: '0.3em',
            marginBottom:  '24px',
            textShadow:    '0 1px 3px rgba(0,0,0,0.6)',
          }}>
            01 // BIOGRAPHY
          </div>
          <p style={{
            fontFamily:  '"Sora", sans-serif',
            fontSize:    '20px',
            fontWeight:  900,
            lineHeight:  1.6,
            color:       '#F8FAFC',
            letterSpacing: '-0.03em',
            textShadow:  TEXT_SHADOW,
            margin:      0,
          }}>
            I'm Varun, an AI Engineer bridging the gap between deep research and
            functional products. I optimize the invisible systems that power the
            next generation of intelligent software.
          </p>
        </div>

        {/* Arsenal Column — soft shadow anchor */}
        <div
          ref={containerRef}
          style={{
            background:     BLOB_BG,
            backdropFilter: 'blur(5px)',
            padding:        '20px',
            marginLeft:     '-20px',
          }}
        >
          <div style={{
            fontFamily:    '"JetBrains Mono", monospace',
            fontSize:      '11px',
            color:         '#A6A8CD',
            letterSpacing: '0.3em',
            marginBottom:  '24px',
            textShadow:    '0 1px 3px rgba(0,0,0,0.6)',
          }}>
            02 // TECHNICAL_ARSENAL
          </div>
          {SKILL_GROUPS.map((group, i) => (
            <ManifestGroup key={group.label} group={group} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </div>
  )
}
