import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
  title: string
  status: string
  description: string
  techStack: string[]
  features: string[]
  gradient: string
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="relative w-full h-96 perspective-1000"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700 transform-gpu preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <motion.div
          className="absolute inset-0 glass-card rounded-2xl p-6 nexus-border backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Status Badge */}
          <motion.div
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-gradient-to-r ${project.gradient} text-background`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {project.status}
          </motion.div>

          {/* Project Title */}
          <h3 className="text-xl font-bold mb-4 liquid-text leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack Preview */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-4 right-4 text-xs text-muted-foreground"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Hover for details →
          </motion.div>
        </motion.div>

        {/* Back Face */}
        <motion.div
          className="absolute inset-0 glass-card rounded-2xl p-6 nexus-border backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-lg font-bold mb-4 text-primary">
            Key Features
          </h3>

          <ul className="space-y-2 mb-6">
            {project.features.map((feature, index) => (
              <motion.li
                key={feature}
                className="text-sm text-muted-foreground flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <motion.span
                  className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-1.5 flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: index * 0.2 
                  }}
                />
                {feature}
              </motion.li>
            ))}
          </ul>

          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3 text-secondary">
              Full Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isFlipped ? 1 : 0, 
                    scale: isFlipped ? 1 : 0 
                  }}
                  transition={{ 
                    delay: 0.5 + index * 0.05, 
                    duration: 0.2,
                    type: 'spring',
                    stiffness: 200
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating particles around the card */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${10 + i * 25}%`,
              top: `${10 + (i % 2) * 80}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default ProjectCard