// ── Shared HUD design-language components ─────────────────────────────────────

// ── L-shaped corner brackets ───────────────────────────────────────────────────
export function CornerBrackets({ size = 14, color = '#A6A8CD', opacity = 0.55 }) {
  const b = `1px solid ${color}`
  const corners = [
    { top: 0,    left: 0,    borderTop: b,    borderLeft: b    },
    { top: 0,    right: 0,   borderTop: b,    borderRight: b   },
    { bottom: 0, left: 0,    borderBottom: b, borderLeft: b    },
    { bottom: 0, right: 0,   borderBottom: b, borderRight: b   },
  ]
  return (
    <>
      {corners.map((s, i) => (
        <div
          key={i}
          style={{
            position:      'absolute',
            width:         size,
            height:        size,
            opacity,
            pointerEvents: 'none',
            zIndex:        10,
            ...s,
          }}
        />
      ))}
    </>
  )
}

// ── Base HUD panel (transparent — frosted backdrop, no fill, structural border) ─
export function HUDPanel({ children, style = {}, bracketSize = 14 }) {
  return (
    <div
      style={{
        position:       'relative',
        border:         '0.5px solid rgba(166,168,205,0.25)',
        backdropFilter: 'blur(5px)',
        ...style,
      }}
    >
      <CornerBrackets size={bracketSize} />
      {children}
    </div>
  )
}

// ── Section heading with lavender glow ─────────────────────────────────────────
export function HUDHeading({ children, overline }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {overline && (
        <div style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '9px',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color:         '#A6A8CD',
          opacity:       0.60,
          marginBottom:  '14px',
        }}>
          {overline}
        </div>
      )}
      <div style={{
        fontFamily:    '"DM Serif Display", serif',
        fontSize:      'clamp(28px, 4vw, 40px)',
        fontWeight:    400,
        letterSpacing: '0.18em',
        color:         '#F8FAFC',
        textShadow:    '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4), 0 0 40px rgba(166,168,205,0.20)',
        lineHeight:    1.1,
      }}>
        {children}
      </div>
    </div>
  )
}

// ── Mono label / overline ──────────────────────────────────────────────────────
export function MonoLabel({ children, color = '#A6A8CD', opacity = 0.65, style = {} }) {
  return (
    <div style={{
      fontFamily:    '"JetBrains Mono", monospace',
      fontSize:      '9px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color,
      opacity,
      ...style,
    }}>
      {children}
    </div>
  )
}
