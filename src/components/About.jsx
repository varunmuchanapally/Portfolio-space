import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1]

const SKILL_GROUPS = [
  {
    label: 'Languages',
    skills: ['Python', 'Java', 'TypeScript', 'SQL', 'C', 'C++', 'JavaScript', 'R', 'HTML/CSS'],
  },
  {
    label: 'AI & LLM Systems',
    skills: ['LLMs', 'RAG', 'AI Agents', 'LangChain', 'LangGraph', 'LlamaIndex', 'Hugging Face', 'Transformers', 'PyTorch', 'Prompt Engineering', 'LoRA', 'QLoRA (PEFT)', 'bitsandbytes', 'Accelerate', 'HF Datasets'],
  },
  {
    label: 'Vector Databases & Retrieval',
    skills: ['FAISS', 'Pinecone', 'Weaviate', 'ChromaDB'],
  },
  {
    label: 'Backend & APIs',
    skills: ['FastAPI', 'Flask', 'Node.js', 'Express.js', 'REST APIs', 'Microservices', 'Postman'],
  },
  {
    label: 'Frontend & Apps',
    skills: ['React', 'Tailwind CSS', 'Bootstrap', 'Streamlit'],
  },
  {
    label: 'Cloud & AI Platforms',
    skills: ['AWS SageMaker', 'AWS Bedrock', 'Azure ML', 'Azure OpenAI', 'Azure SQL'],
  },
  {
    label: 'Data & Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ETL Pipelines', 'Power BI'],
  },
  {
    label: 'DevOps & Systems',
    skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Distributed Systems'],
  },
  {
    label: 'Methodologies',
    skills: ['Agile', 'Scrum'],
  },
]

// Skill icons — using simple SVG paths for recognizable logos
const SKILL_ICONS = {
  'Python':       'devicon-python-plain',
  'Java':         'devicon-java-plain',
  'TypeScript':   'devicon-typescript-plain',
  'SQL':          'devicon-azuresqldatabase-plain',
  'C':            'devicon-c-plain',
  'C++':          'devicon-cplusplus-plain',
  'JavaScript':   'devicon-javascript-plain',
  'R':            'devicon-r-plain',
  'HTML/CSS':     'devicon-html5-plain',
  'LangChain':    'devicon-langchain-plain',
  'LangGraph':    'devicon-langchain-plain',
  'LlamaIndex':   'devicon-python-plain',
  'Hugging Face': 'devicon-huggingface-plain',
  'Transformers': 'devicon-pytorch-plain',
  'PyTorch':      'devicon-pytorch-plain',
  'FAISS':        'devicon-python-plain',
  'Pinecone':     'devicon-python-plain',
  'Weaviate':     'devicon-python-plain',
  'ChromaDB':     'devicon-python-plain',
  'FastAPI':      'devicon-fastapi-plain',
  'Flask':        'devicon-flask-original',
  'Node.js':      'devicon-nodejs-plain',
  'Express.js':   'devicon-express-original',
  'React':        'devicon-react-original',
  'Tailwind CSS': 'devicon-tailwindcss-plain',
  'Bootstrap':    'devicon-bootstrap-plain',
  'Streamlit':    'devicon-streamlit-plain',
  'PostgreSQL':   'devicon-postgresql-plain',
  'MySQL':        'devicon-mysql-plain',
  'MongoDB':      'devicon-mongodb-plain',
  'Redis':        'devicon-redis-plain',
  'Docker':       'devicon-docker-plain',
  'Kubernetes':   'devicon-kubernetes-plain',
  'GitHub Actions':'devicon-github-original',
  'AWS SageMaker':'devicon-amazonwebservices-plain-wordmark',
  'AWS Bedrock':  'devicon-amazonwebservices-plain-wordmark',
  'Azure ML':     'devicon-azure-plain',
  'Azure OpenAI': 'devicon-azure-plain',
  'Azure SQL':    'devicon-azure-plain',
  'Power BI':     'devicon-python-plain',
}

function SkillTag({ name }) {
  const [hovered, setHovered] = useState(false)
  const icon = SKILL_ICONS[name] || '◆'

  return (

    
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        background: hovered ? 'rgba(139,158,183,0.14)' : 'rgba(139,158,183,0.05)',
        borderColor: hovered ? 'rgba(139,158,183,0.35)' : 'rgba(139,158,183,0.15)',
        y: hovered ? -2 : 0,
      }}
      transition={{ duration: 0.18, ease: EASE }}
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           '6px',
        padding:       '6px 12px',
        borderRadius:  '8px',
        border:        '1px solid rgba(139,158,183,0.15)',
        background:    'rgba(139,158,183,0.05)',
        cursor:        'default',
        whiteSpace:    'nowrap',
      }}
    >
      <i
  className={`${SKILL_ICONS[name] || 'devicon-devicon-plain'} colored`}
  style={{ fontSize: '14px', lineHeight: 1 }}
/>
      <span style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '11px',
        fontWeight:    400,
        letterSpacing: '0.04em',
        color:         hovered ? 'rgba(232,230,224,0.90)' : 'rgba(232,230,224,0.60)',
        transition:    'color 0.18s ease',
      }}>
        {name}
      </span>
    </motion.div>
  )
}

function SkillGroup({ group, delay }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {/* Group label */}
      <div style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '9px',
        fontWeight:    400,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color:         'rgba(139,158,183,0.55)',
        marginBottom:  '10px',
        paddingLeft:   '2px',
      }}>
        {group.label}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {group.skills.map(skill => (
          <SkillTag key={skill} name={skill} />
        ))}
      </div>
    </motion.div>
  )
}

export default function About() {
  const bioRef      = useRef(null)
  const bioInView   = useInView(bioRef, { once: true, margin: '-40px' })

  return (
    <div
      className="container"
      style={{ paddingTop: '128px', paddingBottom: '128px' }}
    >
      <div style={{
  fontFamily:    '"DM Serif Display", serif',
  fontSize:      '48px',
  fontWeight:    400,
  color:         'rgba(232,230,224,0.92)',
  lineHeight:    1.08,
  marginBottom:  '40px',
}}>
  About Me
</div>
      {/* ── Bio card — glass dark, transparent ── */}
      <motion.div
        ref={bioRef}
        initial={{ opacity: 0, y: 32 }}
        animate={bioInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
        style={{
          background: 'rgba(14,13,10,0.82)',
          backdropFilter: 'blur(24px)',
          border:         '1px solid rgba(139,158,183,0.12)',
          borderRadius:   '20px',
          padding:        '44px 48px',
          marginBottom:   '18px',
          boxShadow:      '0 8px 40px rgba(0,0,0,0.30)',
        }}
      >
        <p style={{
          fontFamily:  '"Sora", sans-serif',
          fontSize:    '17px',
          fontWeight:  300,
          lineHeight:  1.80,
          color:       'rgba(232,230,224,0.82)',
          maxWidth:    '720px',
          margin:      0,
        }}>
          I'm Varun, an AI Engineer and Software Engineer passionate about building systems
          that are both technically powerful and thoughtfully designed. I specialise in machine
          learning, large language models, and full-stack development — bridging the gap between
          cutting-edge AI research and real-world products.
        </p>
      </motion.div>

      {/* ── Skills glass card ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={bioInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
        style={{
          background: 'rgba(14,13,10,0.78)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(139,158,183,0.20)',
          borderRadius:   '20px',
          padding:        '40px 48px',
          boxShadow:      '0 8px 40px rgba(0,0,0,0.25)',
        }}
      >
        {/* Card header */}
        <div style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '9px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         'rgba(139,158,183,0.50)',
          marginBottom:  '32px',
        }}>
          Technical Skills
        </div>

        {/* Skill groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroup key={group.label} group={group} delay={i * 0.05} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}