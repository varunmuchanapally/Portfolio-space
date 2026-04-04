import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const EASE        = [0.16, 1, 0.3, 1]
const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'
const BLOB_BG     = 'radial-gradient(circle at center, rgba(7,9,26,0.65) 0%, transparent 80%)'

const SOCIALS = [
  {
    index:   '01',
    label:   'GitHub',
    handle:  'varunmuchanapally',
    href:    'https://github.com/varunmuchanapally',
    desc:    'Open-source projects & code',
    Icon:    FiGithub,
  },
  {
    index:   '02',
    label:   'LinkedIn',
    handle:  'varun-pm',
    href:    'https://www.linkedin.com/in/varun-pm/',
    desc:    'Professional network',
    Icon:    FiLinkedin,
  },
  {
    index:   '03',
    label:   'Email',
    handle:  'varunmuchanapally@gmail.com',
    href:    'mailto:varunmuchanapally@gmail.com',
    desc:    'Fastest way to reach me',
    Icon:    FiMail,
  },
]

function SocialEntry({ social, delay }) {
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
        marginBottom:   '56px',
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
        {social.index} // {social.desc}
      </div>

      {/* Platform name — massive display heading, linked */}
      <motion.a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ color: '#FDE047', textShadow: '0 0 24px rgba(253,224,71,0.40), 0 2px 4px rgba(0,0,0,0.8)' }}
        transition={{ duration: 0.25 }}
        style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '20px',
          fontFamily:    '"DM Serif Display", serif',
          fontSize:      'clamp(36px, 6vw, 72px)',
          letterSpacing: '-0.02em',
          color:         '#F8FAFC',
          textDecoration:'none',
          textShadow:    TEXT_SHADOW,
          lineHeight:    1.0,
          marginBottom:  '16px',
        }}
      >
        <social.Icon size={Math.min(48, 36)} style={{ flexShrink: 0, opacity: 0.70 }} />
        {social.label} ↗
      </motion.a>

      {/* Handle — bold body text */}
      <div style={{
        fontFamily:    '"Sora", sans-serif',
        fontSize:      'clamp(16px, 2.5vw, 22px)',
        fontWeight:    900,
        lineHeight:    1.4,
        color:         '#F8FAFC',
        letterSpacing: '-0.02em',
        textShadow:    TEXT_SHADOW,
      }}>
        {social.handle}
      </div>
    </motion.div>
  )
}

function Footer() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      style={{
        marginTop:   '64px',
        paddingTop:  '28px',
        borderTop:   '0.5px solid rgba(166,168,205,0.10)',
        textAlign:   'center',
      }}
    >
      <div style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '10px',
        letterSpacing: '0.10em',
        color:         'rgba(166,168,205,0.22)',
        lineHeight:    2,
      }}>
        <div>Varun Muchanapally — AI Engineer & Software Engineer</div>
        <div style={{ opacity: 0.6 }}>
          Built with React · Framer Motion · Three.js — {new Date().getFullYear()}
        </div>
      </div>
    </motion.footer>
  )
}

export default function Contact() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '64px' }}>

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
          ◈ SECTION_05 // COMMS_ARRAY
        </div>
        <h2 style={{
          fontFamily:    '"DM Serif Display", serif',
          fontSize:      'clamp(48px, 8vw, 84px)',
          color:         '#F8FAFC',
          margin:        0,
          letterSpacing: '-0.02em',
          textShadow:    TEXT_SHADOW,
        }}>
          Contact
        </h2>
      </motion.div>

      {/* VERTICAL DATA LINE */}
      <div style={{ borderLeft: '1px solid rgba(166,168,205,0.2)', paddingLeft: '40px' }}>
        {SOCIALS.map((s, i) => (
          <SocialEntry key={s.label} social={s} delay={0.08 + i * 0.10} />
        ))}
      </div>

      <Footer />
    </div>
  )
}
