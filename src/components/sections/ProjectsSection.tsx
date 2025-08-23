import { motion } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'
import { TextRevealEffects } from '../ui/TextRevealEffects'

const projectsData = [
  {
    title: 'Academia2 — SRM Student Companion',
    status: 'Completed, deployed (prod-like)',
    description: 'A full-stack student portal for SRM University students, combining scraping, real-time updates, and offline PWA support. Unified dashboard for attendance, marks, timetable, predictions, and reminders.',
    techStack: ['React 18 (PWA)', 'Flask (Python)', 'Supabase (Postgres)', 'Selenium', 'JWT authentication', 'Docker', 'Socket.IO'],
    features: [
      'Secure login and encrypted storage',
      'Real-time attendance prediction',
      'Offline support (PWA)',
      'Split microservices for reliability',
      'Row Level Security implementation'
    ],
    gradient: 'from-primary to-secondary'
  },
  {
    title: 'Zomatify — Food Ordering Platform',
    status: 'Complete (demo Razorpay integration)',
    description: 'A full-stack food ordering and delivery app, inspired by Zomato, with special focus on local restaurants. Includes user ordering and owner dashboards.',
    techStack: ['React.js', 'TypeScript', 'Zustand', 'Styled Components', 'Supabase (Postgres + Auth + Storage)', 'Razorpay', 'Framer Motion'],
    features: [
      'Real-time menu browsing, cart, orders',
      'Scheduled/group ordering',
      'Owner dashboard with analytics, menu management',
      'Queue/interval batching for kitchens',
      'Payment integration (10% → my account, 90% → vendor)'
    ],
    gradient: 'from-neural-amber to-neural-pink'
  },
  {
    title: 'Ai.NEXUS — Adaptive AI Orchestration Framework (PoC)',
    status: 'Proof-of-concept, ongoing R&D',
    description: 'An experimental AI framework for orchestrating multi-specialist AI agents (vision, research, automation). Designed for cross-application UI and web automation with adaptability.',
    techStack: ['YOLO (UI detection)', 'OpenCV', 'EasyOCR', 'PyTesseract', 'Ollama', 'Groq', 'HuggingFace Transformers', 'LangChain', 'Mistral', 'Gemini'],
    features: [
      'Multi-specialist AI: VisionAI, ResearchAI, AutomationAI, CoordinatorAI',
      'Shared memory + adaptive selection',
      'Extensible for new AI specialists',
      'Cross-device/system UI automation',
      'Modular architecture with logging, error handling, security'
    ],
    gradient: 'from-secondary to-accent'
  },
  {
    title: 'GDG — Conference Management System',
    status: 'Complete (Render demo deploy)',
    description: 'A conference system for managing speakers, attendees, sessions, and check-ins.',
    techStack: ['Next.js (React/TypeScript)', 'Express.js (TypeScript)', 'Prisma ORM', 'SQLite (dev)', 'JWT + OTP flows', 'qrcode library', 'Docker + Compose'],
    features: [
      'Multi-role authentication (admin, speaker, attendee)',
      'QR-based check-in validation',
      'Speaker availability & income tracking',
      'Admin dashboard with manual overrides and stats'
    ],
    gradient: 'from-neural-blue to-primary'
  },
  {
    title: 'Company Website — Shyam Trading Company',
    status: 'Complete, production-ready',
    description: 'A modern corporate website for a 40+ year old construction company with editable CMS features.',
    techStack: ['React + TypeScript', 'Framer Motion', 'GSAP animations', 'Supabase (Postgres + Storage + RLS)', 'Vercel (production)'],
    features: [
      'CMS-like admin portal with real-time editing',
      'LocalStorage fallback + error handling',
      'Migration/setup tools + admin authentication',
      'Professional corporate branding with animations'
    ],
    gradient: 'from-accent to-neural-purple'
  },
  {
    title: 'Captcha Solver Bot — Android ↔ Laptop Automation',
    status: 'Complete (PoC)',
    description: 'A cross-device automation loop that solves captchas automatically.',
    techStack: ['OpenCV', 'EasyOCR', 'PyTesseract', 'BakLlava AI model', 'ADB'],
    features: [
      'ADB screenshot from phone → laptop',
      'Preprocessing with OpenCV',
      'OCR with EasyOCR/PyTesseract',
      'AI model fallback to BakLlava',
      'Wireless/USB debugging supported'
    ],
    gradient: 'from-neural-purple to-neural-pink'
  },
  {
    title: 'AI HR / Voice Interview Simulator',
    status: 'Local demo completed',
    description: 'A local AI HR assistant that filters resumes and conducts voice-based mock interviews.',
    techStack: ['Whisper (STT)', 'Coqui TTS', 'Local LLMs (Ollama)', 'Streamlit frontend'],
    features: [
      'Real-time voice interaction',
      'Resume filtering + scoring logic',
      'Human-in-the-loop evaluation',
      'Fully offline operation'
    ],
    gradient: 'from-primary to-neural-blue'
  },
  {
    title: 'Endpoint Extractor — Developer Tool',
    status: 'Completed',
    description: 'A tool for developers to capture and filter browser XHR/fetch/WebSocket traffic to extract hidden APIs and data sources.',
    techStack: ['Python', 'Streamlit (UI)', 'FastAPI (backend)', 'Modular architecture'],
    features: [
      'Browser traffic capture',
      'API endpoint filtering',
      'Hidden data source extraction',
      'Developer-friendly interface'
    ],
    gradient: 'from-secondary to-neural-amber'
  }
]

const ProjectsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6 liquid-text">
          <TextRevealEffects text="Major Projects" effect="scramble" delay={0.3} />
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
            { name: 'Autonomus_Ai — Multi-Agent Prototype', tech: 'PyTorch + LangChain' },
            { name: 'AI Chatroom', tech: 'Multi-AI collaboration' },
            { name: 'Kaggle Model Fine-tuning', tech: 'PyTorch + W&B + Lightning Studio' },
            { name: 'Docker Images', tech: 'Academia2 & GDG deployment' }
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