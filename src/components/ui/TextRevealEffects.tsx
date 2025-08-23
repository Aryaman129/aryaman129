import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TextRevealProps {
  text: string
  effect?: 'blur' | 'scramble' | 'fall' | 'typewriter' | 'glitch'
  className?: string
  delay?: number
}

export const TextRevealEffects = ({ text, effect = 'blur', className = '', delay = 0 }: TextRevealProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      switch (effect) {
        case 'scramble':
          scrambleEffect()
          break
        case 'typewriter':
          typewriterEffect()
          break
        case 'glitch':
          glitchEffect()
          break
        default:
          setDisplayText(text)
          setIsRevealed(true)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, effect, delay])

  const scrambleEffect = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let iterations = 0
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (index < iterations) return text[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      
      if (iterations >= text.length) {
        clearInterval(interval)
        setIsRevealed(true)
      }
      iterations += 1 / 3
    }, 30)
  }

  const typewriterEffect = () => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i))
      i++
      if (i > text.length) {
        clearInterval(interval)
        setIsRevealed(true)
      }
    }, 50)
  }

  const glitchEffect = () => {
    const glitchChars = ['█', '▓', '▒', '░', '■', '□', '▪', '▫']
    let phase = 0
    const interval = setInterval(() => {
      if (phase < 5) {
        setDisplayText(text.split('').map((char, index) => {
          if (char === ' ') return ' '
          return Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        }).join(''))
        phase++
      } else {
        setDisplayText(text)
        clearInterval(interval)
        setIsRevealed(true)
      }
    }, 100)
  }

  if (effect === 'blur') {
    return (
      <motion.span
        className={className}
        initial={{ filter: 'blur(10px)', opacity: 0 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 1, delay }}
      >
        {text}
      </motion.span>
    )
  }

  if (effect === 'fall') {
    return (
      <div className={className}>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: -100, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + index * 0.05,
              type: 'spring',
              stiffness: 200
            }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    )
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isRevealed ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  )
}

export default TextRevealEffects