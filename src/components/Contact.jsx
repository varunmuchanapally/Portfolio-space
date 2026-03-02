import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TiltCard from './TiltCard.jsx'
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
} from 'react-icons/fi'

const EASE = [0.16, 1, 0.3, 1]

const SOCIALS = [
  {
    label:   'GitHub',
    handle:  'varunmuchanapally',
    href:    'https://github.com/varunmuchanapally',
    desc:    'Open-source projects & code',
    Icon:    FiGithub,
    color:   'rgba(232,230,224,0.80)',
  },
  {
    label:   'LinkedIn',
    handle:  'varun-pm',
    href:    'https://www.linkedin.com/in/varun-pm/',
    desc:    'Professional network',
    Icon:    FiLinkedin,
    color:   '#5b9bd5',
  },
  {
    label:   'Email',
    handle:  'varunmuchanapally@gmail.com',
    href:    'mailto:varunmuchanapally@gmail.com',
    desc:    'Fastest way to reach me',
    Icon:    FiMail,
    color:   '#8B9EB7',
  },
]

// ── Field ────────────────────────────────────────────────────────────────────
function Field({ label, type = 'text', multiline = false, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false)
  const Tag = multiline ? 'textarea' : 'input'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '10px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color:         focused ? '#8B9EB7' : 'rgba(232,230,224,0.22)',
        transition:    'color 0.2s ease',
      }}>
        {label}
      </label>
      <Tag
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={multiline ? 5 : undefined}
        style={{
          fontFamily:   '"Sora", sans-serif',
          fontSize:     '14px',
          fontWeight:   300,
          color:        'rgba(232,230,224,0.90)',
          background:   'rgba(255,255,255,0.03)',
          border:       `1px solid ${focused ? 'rgba(139,158,183,0.55)' : 'rgba(232,230,224,0.07)'}`,
          borderRadius: '10px',
          padding:      '13px 16px',
          outline:      'none',
          resize:       multiline ? 'vertical' : 'none',
          transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow:    focused ? '0 0 0 3px rgba(139,158,183,0.08)' : 'none',
          width:        '100%',
          caretColor:   '#8B9EB7',
          lineHeight:   1.6,
        }}
      />
    </div>
  )
}

// ── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // EmailJS will go here later
    setTimeout(() => setStatus('sent'), 1400)
  }

  return (
    <div style={{
      background:     'rgba(14,13,10,0.75)',
      backdropFilter: 'blur(40px)',
      border:         '1px solid rgba(139,158,183,0.13)',
      borderRadius:   '20px',
      padding:        '44px 48px',
      boxShadow:      '0 4px 24px rgba(0,0,0,0.25)',
    }}>
      {status === 'sent' ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            minHeight:      '280px',
            gap:            '16px',
            textAlign:      'center',
          }}
        >
          <div style={{
            width:          '52px',
            height:         '52px',
            borderRadius:   '50%',
            background:     'rgba(139,158,183,0.10)',
            border:         '1px solid rgba(139,158,183,0.22)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4.5 4.5L16 6" stroke="#8B9EB7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontFamily: '"DM Serif Display", serif', fontSize: '26px', color: 'rgba(232,230,224,0.95)' }}>
            Message sent.
          </div>
          <div style={{ fontFamily: '"Sora", sans-serif', fontSize: '14px', fontWeight: 300, color: 'rgba(232,230,224,0.48)' }}>
            I'll get back to you within 24 hours.
          </div>
        </motion.div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

          {/* Header */}
          <div style={{ marginBottom: '4px' }}>
            <div style={{
              fontFamily:   '"DM Serif Display", serif',
              fontSize:     '28px',
              fontWeight:   400,
              color:        'rgba(232,230,224,0.95)',
              marginBottom: '8px',
            }}>
              Send a message.
            </div>
            <div style={{
              fontFamily: '"Sora", sans-serif',
              fontSize:   '14px',
              fontWeight: 300,
              color:      'rgba(232,230,224,0.45)',
            }}>
              Have a project in mind or just want to connect?
            </div>
          </div>

          {/* Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Field label="Name"  value={form.name}  onChange={set('name')}  placeholder="Your name" />
            <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" />
          </div>
          <Field label="Message" multiline value={form.message} onChange={set('message')} placeholder="Tell me about your project..." />

          {/* Submit */}
          <div>
            <motion.button
              onClick={handleSubmit}
              whileTap={{ scale: 0.97 }}
              disabled={status === 'sending'}
              style={{
                fontFamily:    '"Sora", sans-serif',
                fontSize:      '14px',
                fontWeight:    400,
                letterSpacing: '0.02em',
                padding:       '13px 32px',
                borderRadius:  '100px',
                border:        'none',
                cursor:        status === 'sending' ? 'not-allowed' : 'pointer',
                background:    '#8B9EB7',
                color:         '#09090C',
                opacity:       status === 'sending' ? 0.7 : 1,
                transition:    'box-shadow 0.2s, opacity 0.2s',
              }}
              onMouseEnter={e => {
                if (status !== 'sending') e.currentTarget.style.boxShadow = '0 0 28px rgba(139,158,183,0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Social card ───────────────────────────────────────────────────────────────
function SocialCard({ social, delay }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:     'rgba(14,13,10,0.75)',
        backdropFilter: 'blur(40px)',
        border:         `1px solid ${hovered ? 'rgba(139,158,183,0.28)' : 'rgba(139,158,183,0.13)'}`,
        borderRadius:   '20px',
        boxShadow:      hovered
          ? '0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(139,158,183,0.08)'
          : '0 4px 24px rgba(0,0,0,0.25)',
        transition:     'border-color 0.3s ease, box-shadow 0.3s ease',
        overflow:       'hidden',
      }}
    >
      
        <a href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          display:        'flex',
          alignItems:     'center',
          gap:            '20px',
          padding:        '28px 32px',
        }}
      >
        {/* Icon */}
        <div style={{
          width:          '46px',
          height:         '46px',
          borderRadius:   '12px',
          background:     hovered ? 'rgba(139,158,183,0.12)' : 'rgba(139,158,183,0.06)',
          border:         `1px solid ${hovered ? 'rgba(139,158,183,0.30)' : 'rgba(139,158,183,0.12)'}`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          flexShrink:     0,
          transition:     'all 0.3s ease',
        }}>
          <social.Icon
            size={20}
            color={hovered ? social.color : 'rgba(139,158,183,0.55)'}
            style={{ transition: 'color 0.3s ease' }}
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily:    '"JetBrains Mono", monospace',
            fontSize:      '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color:         '#8B9EB7',
            marginBottom:  '5px',
          }}>
            {social.label}
          </div>
          <div style={{
            fontFamily:   '"Sora", sans-serif',
            fontSize:     '14px',
            fontWeight:   400,
            color:        'rgba(232,230,224,0.85)',
            marginBottom: '3px',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
          }}>
            {social.handle}
          </div>
          <div style={{
            fontFamily: '"Sora", sans-serif',
            fontSize:   '12px',
            fontWeight: 300,
            color:      'rgba(232,230,224,0.35)',
          }}>
            {social.desc}
          </div>
        </div>

        {/* Arrow */}
        {/* Arrow */}
        {/* Arrow */}
        <motion.span
          animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
          style={{
            color:      '#8B9EB7',
            fontSize:   '16px',
            flexShrink: 0,
          }}
        >
          ↗
        </motion.span>
      </a>
    </motion.div>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
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
        marginTop:  '96px',
        paddingTop: '32px',
        borderTop:  '1px solid rgba(232,230,224,0.06)',
        textAlign:  'center',
      }}
    >
      <div style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '11px',
        letterSpacing: '0.10em',
        color:         'rgba(232,230,224,0.22)',
        lineHeight:    1.8,
      }}>
        <div>Varun — AI Engineer & Software Engineer</div>
        <div style={{ marginTop: '4px', opacity: 0.6 }}>
          Designed & built with React, Framer Motion, Three.js — {new Date().getFullYear()}
        </div>
      </div>
    </motion.footer>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Contact() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div className="container" style={{ paddingTop: '128px', paddingBottom: '64px' }}>
      
      {/* Form */}
      {/* <div style={{ marginBottom: '18px' }}>
        <ContactForm />
      </div> */}
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
              Contact
            </motion.div>
      {/* Social cards */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap:                 '16px',
      }}>
        {SOCIALS.map((s, i) => (
          <SocialCard key={s.label} social={s} delay={0.1 + i * 0.08} />
        ))}
      </div>

      <Footer />
    </div>
  )
}