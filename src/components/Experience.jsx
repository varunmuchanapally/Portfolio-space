import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const EXPERIENCE = [
  {
    role:     'IT Engineer',
    company:  'Institute of Simulation and Training — UCF',
    location: 'Orlando, FL',
    period:   'July 2025 — Present',
    current:  true,
    bullets: [
      'Achieved 100% Windows 11 security baseline compliance by imaging and provisioning endpoints via SCCM (PXE boot), executing DoD-compliant disk wipes, applying patch management, remediating vulnerabilities identified through Qualys Security scans, and handling group policy enforcement, BitLocker enablement, and BIOS firmware updates.',
      'Building Python automation to sync SCCM inventory data with ManageEngine Assets via REST APIs (CRUD) to maintain asset ownership and configuration accuracy.',
    ],
    tags: ['SCCM', 'Python', 'REST APIs', 'Qualys', 'Windows 11', 'BitLocker'],
  },
  {
    role:     'Software Engineer (AI)',
    company:  'One Convergence',
    location: 'San Jose, CA — Remote',
    period:   'Apr 2023 — Nov 2023',
    current:  false,
    bullets: [
      'Built a URL validation and link integrity system using Python and PHP, implementing HTTP validation, multithreading, async I/O, cron scheduling, logging, exception handling, and REST integrations to process 10,000+ URLs.',
      'Engineered a RAG pipeline using LangChain and Weaviate, implementing embeddings generation, vector indexing, semantic search, similarity scoring, LLM inference, prompt templating, and retrieval for 10,000+ product records.',
      'Developed RESTful microservices using Python and Flask with async I/O, task queues, concurrency control, JWT authentication, RBAC, rate limiting, input validation, and structured logging.',
    ],
    tags: ['Python', 'LangChain', 'Weaviate', 'RAG', 'Flask', 'Microservices'],
  },
  {
    role:     'Python Developer — Web Scraping & Crawling',
    company:  'Forage AI',
    location: 'New York, NY — Remote',
    period:   'Mar 2022 — Dec 2022',
    current:  false,
    bullets: [
      'Built Python web scraping pipelines using requests, BeautifulSoup, regex, and HTTP sessions; scheduled with Airflow (DAGs) and deployed on Azure (Blob Storage, Azure SQL, Azure Functions) for automated ingestion and storage.',
      'Managed structured datasets in Azure SQL with schema migrations, normalization, indexing, and query optimization.',
      'Improved pipeline stability with structured logging, exception handling, retry/backoff logic, rate-limit mitigation, proxy rotation, and monitoring.',
    ],
    tags: ['Python', 'BeautifulSoup', 'Airflow', 'Azure', 'Azure SQL', 'ETL'],
  },
]

function ExperienceCard({ exp, delay, index }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [expanded, setExpanded] = useState(true)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{ position: 'relative', display: 'flex', gap: '0' }}
    >
      {/* Timeline spine */}
      <div style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        marginRight:    '24px',
        flexShrink:     0,
      }}>
        {/* Dot */}
        <div style={{
          width:        '12px',
          height:       '12px',
          borderRadius: '50%',
          background:   exp.current ? '#8B9EB7' : 'rgba(139,158,183,0.35)',
          border:       exp.current ? '2px solid rgba(139,158,183,0.60)' : '2px solid rgba(139,158,183,0.20)',
          boxShadow:    exp.current ? '0 0 12px rgba(139,158,183,0.50)' : 'none',
          marginTop:    '6px',
          flexShrink:   0,
          zIndex:       1,
        }} />
        {/* Line down — skip for last */}
        {index < EXPERIENCE.length - 1 && (
          <div style={{
            width:      '1px',
            flex:       1,
            marginTop:  '8px',
            background: 'linear-gradient(to bottom, rgba(139,158,183,0.25), rgba(139,158,183,0.05))',
          }} />
        )}
      </div>

      {/* Card */}
      <div style={{
        flex:           1,
        background:     'rgba(14,13,10,0.75)',
        backdropFilter: 'blur(40px)',
        border:         `1px solid ${exp.current ? 'rgba(139,158,183,0.28)' : 'rgba(139,158,183,0.13)'}`,
        borderRadius:   '20px',
        padding:        '36px 40px',
        boxShadow:      exp.current
          ? '0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(139,158,183,0.08)'
          : '0 4px 24px rgba(0,0,0,0.25)',
        marginBottom:   index < EXPERIENCE.length - 1 ? '16px' : 0,
        position:       'relative',
        overflow:       'hidden',
      }}>
        {/* Corner glow for current role */}
        {exp.current && (
          <div style={{
            position:   'absolute', top: 0, right: 0,
            width:      '160px', height: '160px',
            background: 'radial-gradient(circle at 100% 0%, rgba(139,158,183,0.08), transparent 70%)',
            pointerEvents: 'none',
          }} />
        )}

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            {/* Current badge */}
            {exp.current && (
              <div style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          '6px',
                padding:      '3px 10px',
                borderRadius: '100px',
                background:   'rgba(139,158,183,0.10)',
                border:       '1px solid rgba(139,158,183,0.25)',
                marginBottom: '10px',
              }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }}
                />
                <span style={{
                  fontFamily:    '"JetBrains Mono", monospace',
                  fontSize:      '9px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         '#8B9EB7',
                }}>Current</span>
              </div>
            )}

            {/* Role */}
            <div style={{
              fontFamily:   '"DM Serif Display", serif',
              fontSize:     '22px',
              fontWeight:   400,
              color:        'rgba(232,230,224,0.95)',
              lineHeight:   1.2,
              marginBottom: '4px',
            }}>
              {exp.role}
            </div>

            {/* Company */}
            <div style={{
              fontFamily: '"Sora", sans-serif',
              fontSize:   '14px',
              fontWeight: 400,
              color:      '#8B9EB7',
            }}>
              {exp.company}
            </div>
          </div>

          {/* Period + location */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily:    '"JetBrains Mono", monospace',
              fontSize:      '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         'rgba(139,158,183,0.55)',
              marginBottom:  '4px',
            }}>
              {exp.period}
            </div>
            <div style={{
              fontFamily:    '"JetBrains Mono", monospace',
              fontSize:      '9px',
              letterSpacing: '0.10em',
              color:         'rgba(232,230,224,0.25)',
            }}>
              {exp.location}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(232,230,224,0.06)', marginBottom: '20px' }} />

        {/* Bullets */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {exp.bullets.map((b, bi) => (
            <li key={bi} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <span style={{
                flexShrink:   0,
                marginTop:    '8px',
                width:        '4px',
                height:       '4px',
                borderRadius: '50%',
                background:   'rgba(139,158,183,0.45)',
              }} />
              <span style={{
                fontFamily: '"Sora", sans-serif',
                fontSize:   '13px',
                fontWeight: 300,
                color:      'rgba(232,230,224,0.60)',
                lineHeight: 1.75,
              }}>
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {exp.tags.map(tag => (
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
      </div>
    </motion.div>
  )
}

export default function Experience() {
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
          marginBottom: '48px',
        }}
      >
        Experience
      </motion.div>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {EXPERIENCE.map((exp, i) => (
          <ExperienceCard key={exp.company} exp={exp} delay={i * 0.12} index={i} />
        ))}
      </div>

    </div>
  )
}