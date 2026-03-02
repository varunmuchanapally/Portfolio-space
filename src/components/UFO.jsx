import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function UFO() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Varun_Resume.pdf'
    link.click()
    setTimeout(() => setClicked(false), 2000)
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      animate={clicked ? {} : {
        x: [0, 40, 80, 40, 0, -40, -20, 20, 0],
        y: [0, -30, 10, -50, -20, 20, -40, 30, 0],
      }}
      transition={clicked ? {} : {
        duration: 18,
        repeat:   Infinity,
        ease:     'easeInOut',
      }}
      style={{
        position:       'fixed',
        bottom:         '48px',
        right:          '120px',
        zIndex:         200,
        cursor:         'grab',
        userSelect:     'none',
        pointerEvents:  'auto',
        width:          '72px',
        height:         '72px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexDirection:  'column',
      }}
      whileTap={{ cursor: 'grabbing' }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && !clicked && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{   opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            style={{
              position:       'absolute',
              bottom:         '84px',
              left:           '50%',
              transform:      'translateX(-50%)',
              background:     'rgba(14,13,10,0.90)',
              backdropFilter: 'blur(12px)',
              border:     '1px solid rgba(255,120,40,0.30)',
              borderRadius:   '8px',
              padding:        '6px 12px',
              whiteSpace:     'nowrap',
              pointerEvents:  'none',
            }}
          >
            <span style={{
              fontFamily:    '"JetBrains Mono", monospace',
              fontSize:      '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'rgba(139,158,183,0.85)',
            }}>
              Download Résumé
            </span>
            <div style={{
              position:   'absolute',
              bottom:     '-5px',
              left:       '50%',
              transform:  'translateX(-50%)',
              width:      '8px',
              height:     '8px',
              background: 'rgba(14,13,10,0.90)',
              border: '1px solid rgba(255,120,40,0.30)',
              color: 'rgba(255,160,80,0.90)',
              borderTop:  'none',
              borderLeft: 'none',
              rotate:     '45deg',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Beam */}
      <AnimatePresence>
        {(hovered || clicked) && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{   opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position:        'absolute',
              bottom:          '-28px',
              left:            '30%',
              transform:       'translateX(-50%)',
              transformOrigin: 'top',
              width:           '28px',
              height:          '40px',
              background: 'linear-gradient(to bottom, rgba(255,120,40,0.40), transparent)',
              clipPath:        'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
              pointerEvents:   'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* UFO body */}
      <motion.div
        animate={clicked ? {
          y:      [-2, -18, -2],
          rotate: [0, 8, -8, 0],
        } : {
          y: [0, -5, 0],
        }}
        transition={clicked ? {
          duration: 0.6,
          ease:     'easeInOut',
        } : {
          duration: 2.5,
          repeat:   Infinity,
          ease:     'easeInOut',
        }}
        style={{
          position:      'relative',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          filter: hovered
  ? 'drop-shadow(0 0 16px rgba(255,120,40,0.70))'
  : 'drop-shadow(0 0 8px rgba(255,120,40,0.35))',
          transition:    'filter 0.3s ease',
        }}
      >
        {/* Dome */}
        <div style={{
          width:          '28px',
          height:         '14px',
          borderRadius:   '50% 50% 0 0 / 100% 100% 0 0',
          background: 'linear-gradient(135deg, rgba(255,140,60,0.35) 0%, rgba(255,180,80,0.15) 100%)',
          border:     '1px solid rgba(255,120,40,0.55)',
          borderBottom:   'none',
          position:       'relative',
          zIndex:         2,
          backdropFilter: 'blur(4px)',
        }}>
          {/* Dome glare */}
          <div style={{
            position:     'absolute',
            top:          '3px',
            left:         '6px',
            width:        '8px',
            height:       '4px',
            borderRadius: '50%',
            background: 'rgba(255,200,120,0.35)',
            transform:    'rotate(-20deg)',
          }} />
        </div>

        {/* Saucer disc */}
        <div style={{
          width:          '56px',
          height:         '14px',
          borderRadius:   '50%',
          background: 'linear-gradient(180deg, rgba(255,140,60,0.60) 0%, rgba(200,80,20,0.45) 100%)',
          border:     '1px solid rgba(255,120,40,0.55)',
          marginTop:      '-2px',
          position:       'relative',
          zIndex:         1,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '4px',
        }}>
          {/* Rim lights */}
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              animate={{
            opacity:    clicked ? [1, 0.2, 1] : [0.4, 1, 0.4],
            background: clicked
                ? ['#FF7828', '#FFD080', '#FF7828']
                : ['rgba(255,120,40,0.5)', 'rgba(255,200,80,0.95)', 'rgba(255,120,40,0.5)'],
            }}
              transition={{
                duration: clicked ? 0.15 : 1.6,
                repeat:   Infinity,
                delay:    i * (clicked ? 0.08 : 0.28),
              }}
              style={{
                width:        '4px',
                height:       '4px',
                borderRadius: '50%',
                background:   'rgba(255,120,40,0.70)',
                }}
            />
          ))}
        </div>

        {/* Shadow */}
        <div style={{
          width:        '40px',
          height:       '4px',
          borderRadius: '50%',
          background: 'rgba(255,80,0,0.20)',
          marginTop:    '2px',
          filter:       'blur(3px)',
        }} />
      </motion.div>

      {/* Abducting label */}
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position:      'absolute',
              bottom:        '-36px',
              left:          '50%',
              transform:     'translateX(-50%)',
              whiteSpace:    'nowrap',
              fontFamily:    '"JetBrains Mono", monospace',
              fontSize:      '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,160,80,0.80)',
              pointerEvents: 'none',
            }}
          >
            Abducting…
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}