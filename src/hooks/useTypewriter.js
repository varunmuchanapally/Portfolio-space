import { useState, useEffect, useRef } from 'react'

export default function useTypewriter(strings, { startDelay = 0, speed = 52 } = {}) {
  const [displayedTexts,  setDisplayedTexts]  = useState(() => strings.map(() => ''))
  const [currentlyTyping, setCurrentlyTyping] = useState(-1)
  const [done,            setDone]            = useState(false)

  const stringIndex = useRef(0)
  const charIndex   = useRef(0)
  const timers      = useRef([])

  // Clear all pending timers
  const clearAll = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const tick = id => { timers.current.push(id); return id }

  useEffect(() => {
    function typeNext() {
      const si = stringIndex.current
      if (si >= strings.length) {
        setCurrentlyTyping(-1)
        setDone(true)
        return
      }

      setCurrentlyTyping(si)
      const str = strings[si]
      const pauseBefore = si === 0 ? 0 : 420

      tick(setTimeout(() => {
        function typeChar() {
          const ci = charIndex.current
          if (ci > str.length) return

          setDisplayedTexts(prev => {
            const next = [...prev]
            next[si] = str.slice(0, ci)
            return next
          })
          charIndex.current++

          if (ci < str.length) {
            const variance = (Math.random() - 0.5) * 18
            tick(setTimeout(typeChar, speed + variance))
          } else {
            stringIndex.current++
            charIndex.current = 0
            typeNext()
          }
        }
        typeChar()
      }, pauseBefore))
    }

    const startTimer = tick(setTimeout(typeNext, startDelay))

    return clearAll
  }, []) // eslint-disable-line

  return { displayedTexts, done, currentlyTyping }
}