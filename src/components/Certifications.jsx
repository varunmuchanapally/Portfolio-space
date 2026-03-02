import React from 'react'
import TiltCard from './TiltCard.jsx'
import SectionHeader from './SectionHeader.jsx'

const CERTS = [
  {
    name:     'AWS Certified Machine Learning — Specialty',
    issuer:   'Amazon Web Services',
    date:     'Mar 2024',
    id:       'AWS-ML-4829',
  },
  {
    name:     'Deep Learning Specialization',
    issuer:   'DeepLearning.AI / Coursera',
    date:     'Nov 2023',
    id:       'DL-SPEC-7741',
  },
  {
    name:     'Professional Machine Learning Engineer',
    issuer:   'Google Cloud',
    date:     'Aug 2023',
    id:       'GCP-MLE-2203',
  },
  {
    name:     'TensorFlow Developer Certificate',
    issuer:   'Google / TensorFlow',
    date:     'Feb 2023',
    id:       'TF-DEV-5512',
  },
  {
    name:     'LangChain for LLM Application Development',
    issuer:   'DeepLearning.AI',
    date:     'Oct 2023',
    id:       'LC-LLM-9934',
  },
  {
    name:     'Kubernetes Application Developer',
    issuer:   'Cloud Native Computing Foundation',
    date:     'Jun 2022',
    id:       'CKAD-3381',
  },
]

function VerifiedBadge() {
  return (
    <div style={{
      display:      'inline-flex',
      alignItems:   'center',
      gap:          '6px',
      padding:      '3px 9px 3px 7px',
      borderRadius: '100px',
      background:   'var(--accent-soft)',
      border:       '1px solid var(--accent-border)',
    }}>
      {/* Checkmark */}
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <circle cx="4" cy="4" r="4" fill="var(--accent)" opacity="0.2"/>
        <path d="M2 4l1.5 1.5L6 2.5" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '9px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         'var(--accent)',
      }}>
        Verified
      </span>
    </div>
  )
}

export default function Certifications() {
  return (
    <div className="container" style={{ paddingTop: '128px', paddingBottom: '128px' }}>
      <SectionHeader
        tone="light"
        eyebrow="Certifications"
        title="Credentials earned."
        subtitle="Verified qualifications across machine learning, cloud, and infrastructure."
      />

      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap:                 '18px',
      }}>
        {CERTS.map((cert, i) => (
          <TiltCard key={cert.id} tone="light" delay={i * 0.08} radius="20px" padding="32px 36px">
            {/* Top — date + verified badge */}
            <div style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              marginBottom:   '20px',
            }}>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'var(--text-dark-muted)',
              }}>
                {cert.date}
              </span>
              <VerifiedBadge />
            </div>

            {/* Cert name */}
            <div style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '15px',
              fontWeight:   500,
              color:        'var(--text-dark)',
              lineHeight:   1.45,
              marginBottom: '10px',
            }}>
              {cert.name}
            </div>

            {/* Issuer */}
            <div style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'var(--text-dark-muted)',
              marginBottom:  '20px',
            }}>
              {cert.issuer}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border-light)', marginBottom: '16px' }} />

            {/* Cert ID */}
            <div style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '9px',
              letterSpacing: '0.10em',
              color:         'var(--text-dark-muted)',
            }}>
              ID: {cert.id}
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  )
}