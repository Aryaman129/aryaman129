import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TextRevealProps {
  text: string
  effect?: 'typewriter' | 'fade' | 'slide' | 'glitch'
  className?: string
  delay?: number
}

const TextReveal = ({ text, effect = 'fade', className = '', delay = 0 }: TextRevealProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (effect === 'typewriter') {
        typewriterEffect()
      } else {
        setDisplayText(text)
        setIsComplete(true)
      }
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [text, effect, delay])

  const typewriterEffect = () => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i))
      i++
      if (i > text.length) {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 2000 / text.length) // Spread over 2 seconds
  }

  if (effect === 'fade') {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay }}
      >
        {text}
      </motion.span>
    )
  }

  if (effect === 'slide') {
    return (
      <motion.span
        className={className}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, delay, type: 'spring', stiffness: 100 }}
      >
        {text}
      </motion.span>
    )
  }

  if (effect === 'glitch') {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay }}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isComplete ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  )
}

export default TextReveal