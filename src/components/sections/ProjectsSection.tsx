import { motion } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'

const projectsData = [
  {
    title: 'Academia2 — SRM Student Companion',
    status: 'Production Ready',
    description: 'Full-stack student portal with scraping, real-time updates, and offline PWA support. Unified dashboard for attendance, marks, timetable predictions.',
    techStack: ['React 18', 'Flask', 'Supabase', 'Docker', 'Selenium', 'JWT'],
    features: [
      'Secure login and encrypted storage',
      'Real-time attendance prediction',
      'Offline PWA support',
      'Split microservices architecture'
    ],
    gradient: 'from-primary to-secondary'
  },
  {
    title: 'Zomatify — Food Ordering Platform',
    status: 'Demo Ready',
    description: 'Full-stack food ordering platform inspired by Zomato, with special focus on local restaurants. Includes user ordering and owner dashboards.',
    techStack: ['React', 'TypeScript', 'Zustand', 'Supabase', 'Razorpay'],
    features: [
      'Real-time menu browsing and cart',
      'Scheduled/group ordering system',
      'Owner dashboard with analytics',
      'Payment integration with revenue split'
    ],
    gradient: 'from-neural-amber to-neural-pink'
  },
  {
    title: 'Ai.NEXUS — AI Orchestration Framework',
    status: 'R&D Prototype',
    description: 'Experimental AI framework for orchestrating multi-specialist AI agents (vision, research, automation). Cross-application UI automation with adaptability.',
    techStack: ['YOLO', 'OpenCV', 'LangChain', 'Ollama', 'PyTorch'],
    features: [
      'Multi-specialist AI coordination',
      'Vision-based UI detection',
      'Cross-device automation',
      'Adaptive agent selection'
    ],
    gradient: 'from-secondary to-accent'
  },
  {
    title: 'GDG — Conference Management',
    status: 'Complete',
    description: 'Conference system for managing speakers, attendees, sessions, and check-ins with QR code integration and multi-role authentication.',
    techStack: ['Next.js', 'Express', 'Prisma', 'SQLite', 'Docker'],
    features: [
      'Multi-role authentication system',
      'QR-based check-in validation',
      'Speaker availability tracking',
      'Admin dashboard with overrides'
    ],
    gradient: 'from-neural-blue to-primary'
  },
  {
    title: 'Company Website — Shyam Trading',
    status: 'Production',
    description: 'Modern corporate website for a 40+ year construction company with editable CMS features and real-time content management.',
    techStack: ['React', 'TypeScript', 'Supabase', 'GSAP', 'Framer Motion'],
    features: [
      'CMS-like admin portal',
      'Real-time content editing',
      'Professional corporate branding',
      'Advanced animations'
    ],
    gradient: 'from-accent to-neural-purple'
  },
  {
    title: 'Captcha Solver Bot',
    status: 'PoC Complete',
    description: 'Cross-device automation loop that solves captchas automatically using computer vision and AI models with ADB integration.',
    techStack: ['OpenCV', 'EasyOCR', 'BakLlava', 'ADB', 'PyTesseract'],
    features: [
      'Wireless/USB debugging support',
      'Computer vision preprocessing',
      'AI model fallback system',
      'Automated tap simulation'
    ],
    gradient: 'from-neural-purple to-neural-pink'
  }
]

const ProjectsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'power3.out' }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6 liquid-text">
          Major Projects
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From production-grade full-stack applications to experimental AI orchestration frameworks,
          each project represents a journey into cutting-edge technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 100, rotateX: 45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 100,
            }}
            viewport={{ once: true }}
            className="perspective-1000"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      {/* Additional experiments section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h3 className="text-3xl font-bold mb-8 text-primary">Other Experiments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'AI HR Interview Simulator', tech: 'Whisper + LLMs' },
            { name: 'Endpoint Extractor Tool', tech: 'Python + FastAPI' },
            { name: 'Kaggle Model Fine-tuning', tech: 'PyTorch + W&B' },
            { name: 'Docker Microservices', tech: 'Docker + Compose' }
          ].map((experiment, index) => (
            <motion.div
              key={experiment.name}
              className="glass-card p-4 rounded-xl hover-lift"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4 className="font-semibold text-sm mb-2">{experiment.name}</h4>
              <p className="text-xs text-muted-foreground">{experiment.tech}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectsSection