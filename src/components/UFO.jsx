import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Rim light colors — classic sci-fi rainbow sequence
const RIM_COLORS = ['#FF4455', '#FF8800', '#FFEE22', '#44FF88', '#22CCFF', '#AA44FF', '#FF44CC', '#FF4455']

export default function UFO() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    const link = document.createElement('a')
    link.href = '/resume_sde.pdf'
    link.download = 'Varun_Resume.pdf'
    link.click()
    setTimeout(() => setClicked(false), 2200)
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      animate={clicked ? {} : {
        x: [0, 50, 90, 40, 0, -50, -20, 30, 0],
        y: [0, -35, 8, -55, -22, 18, -42, 28, 0],
      }}
      transition={clicked ? {} : {
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'fixed',
        bottom: '52px',
        right: '100px',
        zIndex: 200,
        cursor: 'grab',
        userSelect: 'none',
        pointerEvents: 'auto',
        width: '110px',
        height: '110px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      whileTap={{ cursor: 'grabbing' }}
    >

      {/* ── Tooltip ── */}
      <AnimatePresence>
        {hovered && !clicked && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.90 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.90 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              bottom: '108px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(8,8,12,0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(100,200,255,0.28)',
              borderRadius: '10px',
              padding: '7px 14px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 12px rgba(100,200,255,0.10)',
            }}
          >
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(160,210,255,0.90)',
            }}>
              Download Résumé
            </span>
            {/* Arrow */}
            <div style={{
              position: 'absolute',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '8px',
              height: '8px',
              background: 'rgba(8,8,12,0.92)',
              border: '1px solid rgba(100,200,255,0.28)',
              borderTop: 'none',
              borderLeft: 'none',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tractor beam ── */}
      <AnimatePresence>
        {(hovered || clicked) && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0, scaleX: 0.3 }}
            animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleY: 0, scaleX: 0.3 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              bottom: '-52px',
              left: '50%',
              transform: 'translateX(-50%)',
              transformOrigin: 'top center',
              width: '70px',
              height: '60px',
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            {/* Beam cone */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(100,220,255,0.35) 0%, rgba(60,160,255,0.15) 50%, transparent 100%)',
              clipPath: 'polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)',
            }} />
            {/* Animated scan line inside beam */}
            <motion.div
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: '20%',
                width: '60%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(160,230,255,0.70), transparent)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
            />
            {/* Beam edge glow lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'polygon(28% 0%, 30% 0%, 4% 100%, 0% 100%)',
              background: 'linear-gradient(to bottom, rgba(100,220,255,0.55), transparent)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'polygon(70% 0%, 72% 0%, 100% 100%, 96% 100%)',
              background: 'linear-gradient(to bottom, rgba(100,220,255,0.55), transparent)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── UFO body ── */}
      <motion.div
        animate={clicked ? {
          y: [-3, -22, -3],
          rotate: [0, 10, -10, 0],
        } : {
          y: [0, -6, 0],
        }}
        transition={clicked ? {
          duration: 0.65,
          ease: 'easeInOut',
        } : {
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          filter: hovered
            ? 'drop-shadow(0 0 22px rgba(80,180,255,0.65)) drop-shadow(0 0 8px rgba(80,180,255,0.40))'
            : 'drop-shadow(0 0 10px rgba(80,180,255,0.28)) drop-shadow(0 2px 6px rgba(0,0,0,0.60))',
          transition: 'filter 0.35s ease',
        }}
      >

        {/* ── Glass dome ── */}
        <div style={{
          width: '42px',
          height: '21px',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          background: 'radial-gradient(ellipse at 38% 28%, rgba(200,245,255,0.60) 0%, rgba(100,200,240,0.35) 35%, rgba(30,90,160,0.65) 80%, rgba(10,40,90,0.85) 100%)',
          border: '1px solid rgba(160,230,255,0.55)',
          borderBottom: 'none',
          position: 'relative',
          zIndex: 4,
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 6px rgba(255,255,255,0.20)',
        }}>
          {/* Main glare spot */}
          <div style={{
            position: 'absolute',
            top: '4px',
            left: '7px',
            width: '13px',
            height: '7px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.62)',
            transform: 'rotate(-22deg)',
            filter: 'blur(1px)',
          }} />
          {/* Secondary small reflection */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '22px',
            width: '6px',
            height: '3px',
            borderRadius: '50%',
            background: 'rgba(200,240,255,0.30)',
          }} />
          {/* Alien glow inside dome */}
          <motion.div
            animate={{ opacity: clicked ? [0.8, 0.2, 0.8] : [0.25, 0.55, 0.25] }}
            transition={{ duration: clicked ? 0.2 : 2.2, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '18px',
              height: '8px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(120,255,180,0.85), transparent 70%)',
              filter: 'blur(2px)',
            }}
          />
        </div>

        {/* ── Dome–saucer collar ring ── */}
        <div style={{
          width: '54px',
          height: '5px',
          borderRadius: '50%',
          background: 'linear-gradient(180deg, rgba(180,210,240,0.90) 0%, rgba(100,140,180,0.70) 100%)',
          marginTop: '-1px',
          position: 'relative',
          zIndex: 3,
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.35), 0 1px 3px rgba(0,0,0,0.5)',
        }} />

        {/* ── Main saucer disc ── */}
        <div style={{
          width: '92px',
          height: '20px',
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #c8d8ec 0%, #8fa8c8 18%, #5a7898 42%, #3a5878 65%, #1e3855 88%, #0e2035 100%)',
          marginTop: '-2px',
          position: 'relative',
          zIndex: 2,
          boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.22), inset 0 -2px 4px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.60)',
          overflow: 'visible',
        }}>
          {/* Metallic sheen stripe */}
          <div style={{
            position: 'absolute',
            top: '3px',
            left: '10%',
            width: '80%',
            height: '3px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            filter: 'blur(1px)',
          }} />

          {/* ── Rim lights ring ── */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '82px',
            height: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}>
            {RIM_COLORS.map((color, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: clicked ? [1, 0.15, 1] : [0.30, 1, 0.30],
                  scale: clicked ? [1.2, 0.7, 1.2] : [0.85, 1.15, 0.85],
                  boxShadow: clicked
                    ? [`0 0 6px ${color}`, `0 0 2px ${color}`, `0 0 6px ${color}`]
                    : [`0 0 3px ${color}`, `0 0 7px ${color}`, `0 0 3px ${color}`],
                }}
                transition={{
                  duration: clicked ? 0.12 : 1.8,
                  repeat: Infinity,
                  delay: i * (clicked ? 0.06 : 0.22),
                  ease: 'easeInOut',
                }}
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: color,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Underbelly / lower hull ── */}
        <div style={{
          width: '62px',
          height: '10px',
          borderRadius: '0 0 50% 50% / 0 0 100% 100%',
          background: 'linear-gradient(180deg, #1e3855 0%, #0a1e35 60%, rgba(6,14,28,0.70) 100%)',
          marginTop: '-1px',
          position: 'relative',
          zIndex: 1,
          boxShadow: 'inset 0 -1px 3px rgba(0,0,0,0.60)',
        }}>
          {/* Central landing light */}
          <motion.div
            animate={{
              opacity: hovered ? [0.6, 1, 0.6] : [0.2, 0.45, 0.2],
              scale: hovered ? [1, 1.3, 1] : [1, 1.1, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '10px',
              height: '5px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(120,220,255,0.95), transparent 70%)',
              filter: 'blur(1.5px)',
            }}
          />
        </div>

        {/* ── Ground shadow / reflection ── */}
        <motion.div
          animate={{ opacity: hovered ? 0.5 : 0.22, scaleX: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.35 }}
          style={{
            width: '70px',
            height: '5px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(60,140,255,0.55), transparent 70%)',
            marginTop: '4px',
            filter: 'blur(4px)',
          }}
        />
      </motion.div>

      {/* ── Abducting label ── */}
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              bottom: '-42px',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(120,210,255,0.85)',
              pointerEvents: 'none',
              textShadow: '0 0 8px rgba(80,180,255,0.60)',
            }}
          >
            Downloading…
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
