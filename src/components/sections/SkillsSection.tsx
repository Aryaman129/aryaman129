
import { motion } from 'framer-motion'
import { useState } from 'react'

const skillsData = {
  'Frontend': {
    'React/Next.js': ['React 18', 'Next.js', 'TypeScript', 'React Router', 'PWA'],
    'Styling & UI': ['Tailwind CSS', 'Styled Components', 'Framer Motion', 'GSAP'],
    'State Management': ['Zustand', 'Context API']
  },
  'Backend & APIs': {
    'Python': ['Flask', 'JWT/OTP authentication', 'Socket.IO'],
    'Node.js': ['Express (TypeScript)', 'REST APIs'],
    'Real-time': ['Supabase realtime', 'WebSockets + AIOHTTP']
  },
  'Databases & Data': {
    'SQL Databases': ['Supabase/Postgres', 'Row Level Security', 'SQLite', 'Prisma SQLite'],
    'ORM & Tools': ['Prisma ORM'],
    'Vector & NoSQL': ['ChromaDB'],
    'Visualization': ['Matplotlib', 'Plotly']
  },
  'AI & Automation': {
    'Computer Vision': ['YOLO (UI detection)', 'OpenCV', 'EasyOCR', 'PyTesseract'],
    'Machine Learning': ['PyTorch', 'Transformers', 'HuggingFace Transformers'],
    'AI Orchestration': ['LangChain', 'AutoGPT', 'Ollama', 'Groq'],
    'Voice & Audio': ['Whisper STT', 'Coqui TTS'],
    'UI Automation': ['PyAutoGUI', 'PyWin', 'ADB', 'Playwright'],
    'Models & Tools': ['BakLlava', 'Sloth (dataset annotation)', 'Mistral', 'Gemini']
  },
  'DevOps & Infra': {
    'Containerization': ['Docker', 'Docker Compose'],
    'Version Control': ['Git/GitHub'],
    'Cloud Platforms': ['Vercel', 'Render', 'Railway', 'Koyeb'],
    'GPU Computing': ['Lightning Studio (GPU)']
  }
}

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const [activeSubcategory, setActiveSubcategory] = useState('React/Next.js')
  const categories = Object.keys(skillsData)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    const firstSubcategory = Object.keys(skillsData[category as keyof typeof skillsData])[0]
    setActiveSubcategory(firstSubcategory)
  }

  const currentCategoryData = skillsData[activeCategory as keyof typeof skillsData]
  const subcategories = Object.keys(currentCategoryData)
  const currentSkills: string[] = currentCategoryData[activeSubcategory as keyof typeof currentCategoryData] || []

  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
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
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
              activeCategory === category
                ? 'glass-card text-primary'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Fluid neon RGB border flowing around edges */}
            {activeCategory === category && (
              <>
                {/* Top edge */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), transparent)',
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
                
                {/* Right edge */}
                <motion.div
                  className="absolute top-0 right-0 h-full w-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, transparent, hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), transparent)',
                  }}
                  animate={{
                    y: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.5
                  }}
                />
                
                {/* Bottom edge */}
                <motion.div
                  className="absolute bottom-0 right-0 w-full h-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(270deg, transparent, hsl(240 100% 50%), hsl(300 100% 50%), hsl(0 100% 50%), transparent)',
                  }}
                  animate={{
                    x: ['100%', '-100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 1
                  }}
                />
                
                {/* Left edge */}
                <motion.div
                  className="absolute bottom-0 left-0 h-full w-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(0deg, transparent, hsl(300 100% 50%), hsl(320 100% 50%), hsl(0 100% 50%), transparent)',
                  }}
                  animate={{
                    y: ['100%', '-100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 1.5
                  }}
                />
                
                {/* Corner glow dots */}
                <motion.div
                  className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <motion.div
                  className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-2 h-2 bg-accent rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-2 h-2 bg-primary rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5
                  }}
                />
              </>
            )}
            <span className="relative z-10">{category}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Subcategory Selector */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {subcategories.map((subcategory) => (
          <motion.button
            key={subcategory}
            onClick={() => setActiveSubcategory(subcategory)}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden ${
              activeSubcategory === subcategory
                ? 'text-white'
                : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Liquid RGB rotating border for active subcategory */}
            {activeSubcategory === subcategory && (
              <>
                {/* Rotating RGB border that flows around corners */}
                <motion.div
                  className="absolute inset-0 rounded-lg p-[2px]"
                  style={{
                    background: 'conic-gradient(from 0deg, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(0 100% 50%))',
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  <div className="w-full h-full bg-black rounded-lg" />
                </motion.div>
                
                {/* Corner flowing dots */}
                <motion.div
                  className="absolute top-0 left-0 w-1 h-1 bg-primary rounded-full blur-sm"
                  animate={{
                    x: [0, '100%', '100%', 0, 0],
                    y: [0, 0, '100%', '100%', 0],
                    scale: [1, 1.2, 1.5, 1.2, 1],
                    opacity: [0.6, 1, 1, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </>
            )}
            <span className="relative z-10">{subcategory}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Display */}
      <motion.div
        key={`${activeCategory}-${activeSubcategory}`}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="relative"
      >
        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {currentSkills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
              className="group"
            >
              <motion.div
                className="glass-card px-6 py-4 rounded-xl border border-primary/20 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: '0 10px 30px rgba(0, 255, 255, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Skill name */}
                <motion.h3 
                  className="font-semibold text-lg text-center relative z-10"
                  whileHover={{ color: 'hsl(var(--primary))' }}
                >
                  {skill}
                </motion.h3>
                
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary rounded-full opacity-40"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.1 + i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Neural Connection Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative h-32 overflow-hidden mb-8"
        >
          {/* Central hub */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                `0 0 0 0 hsl(var(--primary) / 0.7)`, 
                `0 0 0 20px hsl(var(--primary) / 0)`, 
                `0 0 0 0 hsl(var(--primary) / 0)`
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          />
          
          {/* Connection lines to each skill */}
          {currentSkills.map((_, index) => {
            const angle = (index * (360 / currentSkills.length)) * Math.PI / 180
            const radius = 60
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            
            return (
              <div key={index}>
                {/* Connection line */}
                <motion.div
                  className="absolute w-px bg-gradient-to-r from-primary to-secondary opacity-60"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'left center',
                    transform: `rotate(${(index * (360 / currentSkills.length))}deg)`,
                    height: '1px',
                    width: `${radius}px`
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scaleX: [0, 1, 0.7, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut'
                  }}
                />
                
                {/* End node */}
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-secondary"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [0.8, 1.4, 0.8],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1,
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
        </motion.div>

        {/* Data stream effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
              style={{
                top: `${20 + i * 15}%`,
                width: '200px',
              }}
              animate={{
                x: ['-200px', 'calc(100vw + 200px)'],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SkillsSection
