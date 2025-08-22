import { motion } from 'framer-motion'
import { useState } from 'react'

const skillsData = {
  'Frontend': [
    { name: 'React 18', level: 95, color: 'from-primary to-primary-glow' },
    { name: 'Next.js', level: 90, color: 'from-secondary to-primary' },
    { name: 'TypeScript', level: 88, color: 'from-neural-blue to-secondary' },
    { name: 'Tailwind CSS', level: 92, color: 'from-accent to-neural-pink' },
    { name: 'Framer Motion', level: 85, color: 'from-neural-amber to-accent' },
    { name: 'GSAP', level: 80, color: 'from-neural-purple to-neural-blue' }
  ],
  'Backend & APIs': [
    { name: 'Flask (Python)', level: 90, color: 'from-neural-amber to-primary' },
    { name: 'Express (TypeScript)', level: 85, color: 'from-secondary to-neural-purple' },
    { name: 'REST APIs', level: 92, color: 'from-primary to-accent' },
    { name: 'JWT/OTP Auth', level: 88, color: 'from-neural-pink to-secondary' },
    { name: 'Socket.IO', level: 80, color: 'from-accent to-neural-blue' },
    { name: 'Supabase Realtime', level: 87, color: 'from-neural-purple to-primary' }
  ],
  'Databases & Data': [
    { name: 'Supabase/Postgres', level: 90, color: 'from-primary to-neural-pink' },
    { name: 'Prisma ORM', level: 85, color: 'from-secondary to-accent' },
    { name: 'SQLite', level: 88, color: 'from-neural-blue to-neural-amber' },
    { name: 'ChromaDB', level: 75, color: 'from-accent to-neural-purple' },
    { name: 'Row Level Security', level: 82, color: 'from-neural-purple to-primary' }
  ],
  'AI & Automation': [
    { name: 'PyTorch', level: 85, color: 'from-neural-amber to-secondary' },
    { name: 'LangChain', level: 88, color: 'from-primary to-neural-purple' },
    { name: 'OpenCV', level: 90, color: 'from-secondary to-accent' },
    { name: 'YOLO (UI Detection)', level: 87, color: 'from-accent to-neural-pink' },
    { name: 'Whisper STT', level: 80, color: 'from-neural-pink to-neural-blue' },
    { name: 'HuggingFace', level: 83, color: 'from-neural-blue to-primary' }
  ],
  'DevOps & Infra': [
    { name: 'Docker', level: 88, color: 'from-primary to-secondary' },
    { name: 'Vercel', level: 92, color: 'from-secondary to-neural-amber' },
    { name: 'Railway', level: 85, color: 'from-accent to-neural-purple' },
    { name: 'Git/GitHub', level: 95, color: 'from-neural-purple to-primary' },
    { name: 'Render', level: 82, color: 'from-neural-pink to-accent' }
  ]
}

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const categories = Object.keys(skillsData)

  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'power3.out' }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6 liquid-text">
          Technical Skills
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive tech stack spanning from frontend frameworks to AI orchestration,
          built through hands-on production experience.
        </p>
      </motion.div>

      {/* Category Selector */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'glass-card neural-glow text-primary'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillsData[activeCategory as keyof typeof skillsData].map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 150,
            }}
            className="glass-card p-6 rounded-xl hover-lift group"
            whileHover={{ y: -8, rotateY: 5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <h3 className="font-semibold text-lg text-center">{skill.name}</h3>
            </div>
            
            {/* Skill Network Visualization */}
            <div className="relative h-16 mb-4 overflow-hidden">
              {/* Central node */}
              <motion.div
                className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [`0 0 0 0 hsl(var(--primary) / 0.7)`, `0 0 0 10px hsl(var(--primary) / 0)`, `0 0 0 0 hsl(var(--primary) / 0)`]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
              
              {/* Connecting nodes */}
              {[...Array(4)].map((_, nodeIndex) => {
                const angle = (nodeIndex * 90) * Math.PI / 180
                const radius = 25
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                
                return (
                  <div key={nodeIndex}>
                    {/* Connection line */}
                    <motion.div
                      className={`absolute w-px bg-gradient-to-r ${skill.color} opacity-60`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'left center',
                        transform: `rotate(${nodeIndex * 90}deg)`,
                        height: '1px',
                        width: `${radius}px`
                      }}
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: nodeIndex * 0.2,
                        ease: 'easeInOut'
                      }}
                    />
                    
                    {/* Node */}
                    <motion.div
                      className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        rotate: 360
                      }}
                      transition={{
                        scale: {
                          duration: 1.5,
                          repeat: Infinity,
                          delay: nodeIndex * 0.1,
                          ease: 'easeInOut'
                        },
                        rotate: {
                          duration: 4,
                          repeat: Infinity,
                          ease: 'linear'
                        }
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Animated particles */}
            <div className="relative h-12 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
                  style={{
                    left: `${20 + i * 25}%`,
                    bottom: '0px',
                  }}
                  animate={{
                    y: [-48, -24, -48],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}

export default SkillsSection