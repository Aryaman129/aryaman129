import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import TextRevealEffects from '../ui/TextRevealEffects'

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-card',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const aboutPoints = [
    {
      title: "Full-Stack Expertise",
      description: "From React/Next.js frontends to Flask/Express backends, I build complete systems with security and scalability in mind.",
      icon: "⚡",
      gradient: "from-primary to-secondary"
    },
    {
      title: "AI Innovation",
      description: "Developing experimental AI orchestration frameworks that combine computer vision, OCR, and LLM coordination for autonomous systems.",
      icon: "🧠",
      gradient: "from-secondary to-accent"
    },
    {
      title: "Production Ready",
      description: "My projects aren't just demos - they're deployed solutions used by real users, with proper authentication, databases, and DevOps.",
      icon: "🚀",
      gradient: "from-accent to-neural-purple"
    },
    {
      title: "Continuous Learning",
      description: "Always exploring cutting-edge technologies, from PyTorch model fine-tuning to advanced web frameworks and cloud platforms.",
      icon: "📚",
      gradient: "from-neural-purple to-primary"
    }
  ]

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6 liquid-text">
          <TextRevealEffects text="About Me" effect="glitch" delay={0.2} />
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          I specialize in building production-grade applications and experimental AI systems. 
          My journey spans from secure full-stack engineering to cutting-edge AI orchestration frameworks 
          that push the boundaries of automation and intelligence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {aboutPoints.map((point, index) => (
          <motion.div
            key={point.title}
            className="about-card glass-card p-8 rounded-2xl nexus-border hover-lift perspective-1000"
            whileHover={{ 
              scale: 1.02, 
              rotateY: 5,
              z: 20
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${point.gradient} flex items-center justify-center text-2xl mb-6 shadow-lg`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              {point.icon}
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-4 text-primary">
              {point.title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              {point.description}
            </p>

            {/* Animated connection lines */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
                  style={{
                    left: `${20 + i * 25}%`,
                    top: '10px'
                  }}
                  animate={{
                    height: ['0px', '32px', '0px'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Personal Journey */}
      <motion.div
        className="glass-card p-8 rounded-2xl nexus-border"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold mb-6 text-center liquid-text">
          My Journey
        </h3>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            As a B.Tech Computer Science student at SRM University, I've embarked on a journey that bridges 
            traditional software engineering with experimental AI research. My work spans from production-ready 
            applications serving real users to proof-of-concept AI systems that explore the future of automation.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            What drives me is the intersection of practical engineering and cutting-edge AI. I believe in building 
            systems that not only work today but also push the boundaries of what's possible with artificial intelligence. 
            From my Academia2 student portal to the experimental Ai.NEXUS framework, each project teaches me something 
            new about creating intelligent, adaptive systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { label: 'Production Apps', value: '6+', color: 'text-primary' },
              { label: 'AI Experiments', value: '10+', color: 'text-secondary' },
              { label: 'Tech Stack Items', value: '25+', color: 'text-accent' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-muted/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.div
                  className={`text-3xl font-bold ${stat.color} mb-2`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutSection