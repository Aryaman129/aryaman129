import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TextRevealProps {
  text: string
  effect?: 'blur' | 'scramble' | 'fall' | 'typewriter' | 'slide'
  className?: string
  delay?: number
}

const TextReveal = ({ text, effect = 'blur', className = '', delay = 0 }: TextRevealProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (effect === 'scramble') {
        scrambleEffect()
      } else if (effect === 'typewriter') {
        typewriterEffect()
      } else {
        setDisplayText(text)
        setIsRevealed(true)
      }
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [text, effect, delay])

  const scrambleEffect = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let iterations = 0
    const maxIterations = text.length
    
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (index < iterations) return text[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      
      iterations += 0.5
      if (iterations >= maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsRevealed(true)
      }
    }, 50)
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
    }, 1500 / text.length)
  }

  if (effect === 'blur') {
    return (
      <motion.span
        className={className}
        initial={{ filter: 'blur(10px)', opacity: 0 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 1.5, delay }}
      >
        {text}
      </motion.span>
    )
  }

  if (effect === 'fall') {
    return (
      <span className={className}>
        {text.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-4">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                initial={{ y: -100, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: delay + (wordIndex * 0.1) + (charIndex * 0.05),
                  type: 'spring',
                  stiffness: 200
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    )
  }

  if (effect === 'slide') {
    return (
      <motion.span
        className={className}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay, type: 'spring', stiffness: 100 }}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isRevealed ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  )
}

export default TextReveal