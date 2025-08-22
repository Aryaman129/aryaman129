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
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{skill.name}</h3>
              <span className="text-primary font-bold">{skill.level}%</span>
            </div>
            
            {/* Skill Level Bar */}
            <div className="w-full bg-muted/30 rounded-full h-2 mb-4 overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'power2.out' }}
              />
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

      {/* Hardware & Targets */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h3 className="text-3xl font-bold mb-8 text-primary">Hardware Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <motion.div
            className="glass-card p-6 rounded-xl nexus-border"
            whileHover={{ scale: 1.05, rotateY: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h4 className="font-bold text-xl mb-4 text-neural-blue">Desktop Development</h4>
            <p className="text-muted-foreground">
              Windows | RTX 4050 + Intel i5 HX<br />
              Optimized for AI training & 3D development
            </p>
          </motion.div>
          
          <motion.div
            className="glass-card p-6 rounded-xl nexus-border"
            whileHover={{ scale: 1.05, rotateY: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h4 className="font-bold text-xl mb-4 text-neural-pink">Mobile Testing</h4>
            <p className="text-muted-foreground">
              Android | OnePlus 11R<br />
              ADB debugging & cross-device automation
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default SkillsSection