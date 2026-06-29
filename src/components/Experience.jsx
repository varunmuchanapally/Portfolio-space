import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE        = [0.16, 1, 0.3, 1]
const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'
const BLOB_BG     = 'radial-gradient(circle at center, rgba(7,9,26,0.65) 0%, transparent 80%)'

// const EXPERIENCE = [
//   {
//     index:   '01',
//     role:    'IT Engineer',
//     company: 'Institute of Simulation & Training / UCF',
//     location:'Orlando, FL',
//     period:  '2025.07 — Present',
//     current: true,
//     bullets: [
//       'Achieved 100% Windows 11 security baseline compliance via SCCM (PXE boot), DoD-compliant disk wipes, Qualys vulnerability remediation, group policy, BitLocker, and BIOS firmware updates.',
//       'Building Python automation to sync SCCM inventory with ManageEngine Assets via REST APIs (CRUD) for asset ownership and configuration accuracy.',
//     ],
//     tags: ['SCCM', 'Python', 'REST APIs', 'Qualys', 'Windows 11', 'BitLocker'],
//   },
//   {
//     index:   '02',
//     role:    'Software Engineer (AI)',
//     company: 'One Convergence',
//     location:'San Jose, CA — Remote',
//     period:  '2023.04 — 2023.11',
//     current: false,
//     bullets: [
//       'Built URL validation system in Python/PHP: multithreading, async I/O, cron scheduling, REST integrations — processed 10,000+ URLs.',
//       'Engineered RAG pipeline via LangChain + Weaviate: embeddings, vector indexing, semantic search, LLM inference for 10,000+ product records.',
//       'Developed RESTful microservices with JWT auth, RBAC, rate limiting, structured logging.',
//     ],
//     tags: ['Python', 'LangChain', 'Weaviate', 'RAG', 'Flask', 'Microservices'],
//   },
//   {
//     index:   '03',
//     role:    'Python Developer — Web Scraping & Crawling',
//     company: 'Forage AI',
//     location:'New York, NY — Remote',
//     period:  '2022.03 — 2022.12',
//     current: false,
//     bullets: [
//       'Built scraping pipelines (requests, BS4, regex) scheduled via Airflow DAGs, deployed on Azure (Blob, SQL, Functions).',
//       'Managed Azure SQL with schema migrations, normalization, indexing, query optimization.',
//       'Improved stability: retry/backoff, proxy rotation, rate-limit mitigation, monitoring.',
//     ],
//     tags: ['Python', 'BeautifulSoup', 'Airflow', 'Azure', 'Azure SQL', 'ETL'],
//   },
// ]

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

function ExperienceEntry({ exp, delay }) {
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
        marginBottom:   '72px',
      }}
    >
      {/* Sub-label: index // role — period · location */}
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
        flexWrap:      'wrap',
        textShadow:    '0 1px 3px rgba(0,0,0,0.6)',
      }}>
        <span style={{ color: '#FDE047', textShadow: '0 0 8px rgba(253,224,71,0.6)', flexShrink: 0 }}>▸</span>
        {exp.index} // {exp.role} — {exp.period}
        <span style={{ opacity: 0.55 }}>{exp.location}</span>
        {exp.current && (
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

      {/* Company — main bold display heading */}
      <div style={{
        fontFamily:    '"DM Serif Display", serif',
        fontSize:      'clamp(32px, 5vw, 60px)',
        letterSpacing: '-0.02em',
        color:         '#F8FAFC',
        textShadow:    TEXT_SHADOW,
        lineHeight:    1.05,
        marginBottom:  '24px',
      }}>
        {exp.company}
      </div>

      {/* Bullet descriptions — bold body text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
        {exp.bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{
              color:      '#A6A8CD',
              fontSize:   '14px',
              flexShrink: 0,
              marginTop:  '4px',
              opacity:    0.60,
            }}>▸</span>
            <span style={{
              fontFamily:    '"Sora", sans-serif',
              fontSize:      'clamp(16px, 2.5vw, 20px)',
              fontWeight:    900,
              lineHeight:    1.4,
              color:         '#F8FAFC',
              letterSpacing: '-0.02em',
              textShadow:    TEXT_SHADOW,
            }}>
              {b}
            </span>
          </div>
        ))}
      </div>

      {/* Tech stack — InkTag / separator */}
      <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '8px' }}>
        {exp.tags.map((tag, i) => (
          <StackTag key={tag} name={tag} isLast={i === exp.tags.length - 1} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
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
          ◈ SECTION_03 // MISSION_LOG
        </div>
        <h2 style={{
          fontFamily:    '"DM Serif Display", serif',
          fontSize:      'clamp(48px, 8vw, 84px)',
          color:         '#F8FAFC',
          margin:        0,
          letterSpacing: '-0.02em',
          textShadow:    TEXT_SHADOW,
        }}>
          Experience
        </h2>
      </motion.div>

      {/* VERTICAL DATA LINE */}
      <div style={{ borderLeft: '1px solid rgba(166,168,205,0.2)', paddingLeft: '40px' }}>
        {EXPERIENCE.map((exp, i) => (
          <ExperienceEntry key={exp.company} exp={exp} delay={i * 0.10} />
        ))}
      </div>
    </div>
  )
}
