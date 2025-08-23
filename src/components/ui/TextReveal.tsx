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
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // For scramble and typewriter, we need to manage the text state
    if (effect === 'scramble' || effect === 'typewriter') {
      const timer = setTimeout(() => {
        if (effect === 'scramble') {
          scrambleText()
        } else if (effect === 'typewriter') {
          typeText()
        }
      }, delay * 1000)
      return () => clearTimeout(timer)
    } else {
      // For other effects, show immediately but let animation handle the reveal
      setDisplayText(text)
      setIsComplete(true)
    }
  }, [text, effect, delay])

  const scrambleText = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let iterations = 0
    
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (index < iterations) return text[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      
      iterations += 0.3
      if (iterations >= text.length) {
        clearInterval(interval)
        setDisplayText(text)
        setIsComplete(true)
      }
    }, 60)
  }

  const typeText = () => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 100)
  }

  // Blur effect
  if (effect === 'blur') {
    return (
      <motion.span
        className={className}
        initial={{ filter: 'blur(8px)', opacity: 0.3 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 1.5, delay }}
      >
        {text}
      </motion.span>
    )
  }

  // Fall effect - characters falling from top
  if (effect === 'fall') {
    const words = text.split(' ')
    return (
      <span className={className}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: delay + (wordIndex * 0.1) + (charIndex * 0.05),
                  type: 'spring',
                  stiffness: 200
                }}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <motion.span
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + (wordIndex * 0.1) + (word.length * 0.05) }}
              >
                &nbsp;
              </motion.span>
            )}
          </span>
        ))}
      </span>
    )
  }

  // Slide effect
  if (effect === 'slide') {
    return (
      <motion.span
        className={className}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay, type: 'spring', stiffness: 150 }}
      >
        {text}
      </motion.span>
    )
  }

  // Scramble and typewriter effects
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {displayText || text}
    </motion.span>
  )
}

export default TextReveal