import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import TextReveal from '../ui/TextReveal'

const IntroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Temporarily disabled GSAP animations
    // const tl = gsap.timeline({ delay: 3 }) // Wait for 3D animation

    // tl.fromTo(
    //   titleRef.current,
    //   { opacity: 0, y: 100 },
    //   { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    // )
    // .fromTo(
    //   subtitleRef.current,
    //   { opacity: 0, y: 50 },
    //   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    //   '-=0.5'
    // )
    // .fromTo(
    //   descriptionRef.current,
    //   { opacity: 0, scale: 0.8 },
    //   { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' },
    //   '-=0.3'
    // )
  }, [])

  return (
    <div className="text-center max-w-4xl mx-auto px-6 z-10 relative">
      <motion.h1
        ref={titleRef}
        className="text-7xl md:text-8xl font-bold mb-6 liquid-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 3 }}
      >
        <TextReveal text="Aryaman Mohta" effect="fade" delay={3.2} />
      </motion.h1>
      

      <motion.div
        ref={descriptionRef}
        className="glass-card p-8 rounded-2xl nexus-border max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
      >
        <p className="text-lg text-muted-foreground leading-relaxed">
          B.Tech Computer Science Engineering student at{' '}
          <span className="text-primary font-semibold">SRM University, KTR</span>, 
          passionate about{' '}
          <span className="text-secondary font-semibold">full-stack development</span> and{' '}
          <span className="text-accent font-semibold">experimental AI automation systems</span>.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[
            'React/Next.js',
            'AI Orchestration',
            'Full-Stack Engineering',
            'Computer Vision',
            'LLM Integration'
          ].map((skill, index) => (
            <motion.span
              key={skill}
              className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full text-sm font-medium border border-primary/30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Floating neural nodes */}
      <div className="absolute inset-0 -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full neural-glow"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default IntroSection