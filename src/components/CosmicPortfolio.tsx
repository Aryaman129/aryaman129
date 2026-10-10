import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, useThree } from "@react-three/drei";
import * as THREE from "three";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, Code2, Github,
  Layers3, Mail, Orbit, Workflow
} from "lucide-react";

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  href: string;
  note: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "NavAi",
    category: "On-device machine learning",
    description: "An Android speed-estimation system combining motion-sensor data, a BiLSTM model and TensorFlow Lite inference, with an Extended Kalman Filter in the sensor-fusion pipeline.",
    stack: ["Android", "BiLSTM", "TensorFlow Lite", "IMU / EKF"],
    href: "https://github.com/Aryaman129/NavAi",
    note: "Model + mobile implementation"
  },
  {
    number: "02",
    title: "Endpoint Extractor",
    category: "Developer tooling",
    description: "A local-first inspection tool that analyzes HAR files and captured HTTP/WebSocket traffic, then uses an Ollama model to help find relevant endpoints and generate test ideas.",
    stack: ["Python", "Streamlit", "mitmproxy", "Ollama"],
    href: "https://github.com/Aryaman129/Endpoint_Extractor",
    note: "Development project"
  },
  {
    number: "03",
    title: "AI HR Automation",
    category: "Applied AI / backend",
    description: "A recruitment platform exploring resume parsing, semantic candidate–job matching and retrieval-augmented search over company knowledge, backed by an API-first service architecture.",
    stack: ["FastAPI", "PostgreSQL", "pgvector", "RAG"],
    href: "https://github.com/Aryaman129/AI_HR_Interviewer",
    note: "Local development"
  },
  {
    number: "04",
    title: "Academia2",
    category: "Student utility / full-stack",
    description: "A student companion that brings attendance, marks and timetable data into one interface, with portal scraping, attendance-planning logic and progressive-web-app features.",
    stack: ["React", "Flask", "Selenium", "PWA"],
    href: "https://github.com/Aryaman129/Academia2",
    note: "Run locally from source"
  },
  {
    number: "05",
    title: "Zomatify",
    category: "Product engineering",
    description: "A food-ordering platform concept covering customer ordering, vendor workflows, group orders, order tracking and a Razorpay payment integration path.",
    stack: ["React", "TypeScript", "Express", "Razorpay"],
    href: "https://github.com/Aryaman129/Zomatify",
    note: "Database-backed local project"
  },
  {
    number: "06",
    title: "Conference Management",
    category: "Workflow platform",
    description: "A multi-role event platform for speaker availability, session bookings, attendee management and QR-code check-in. The repository documents payment as a simulated demo flow.",
    stack: ["Next.js", "Express", "Prisma", "QR codes"],
    href: "https://github.com/Aryaman129/Conference-Management-System",
    note: "Demo / source available"
  }
];

const skillGroups = [
  { name: "Frontend", icon: Code2, title: "Interfaces with intention", copy: "Responsive interfaces, component systems and motion that supports the experience.", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Zustand"] },
  { name: "Backend", icon: Workflow, title: "Systems behind the screen", copy: "API design, authentication and application workflows across client and server.", items: ["Python", "Flask", "FastAPI", "Node.js", "Express", "REST APIs", "JWT / OTP", "Socket.IO"] },
  { name: "Data", icon: Layers3, title: "Data that stays useful", copy: "Relational data, ORM workflows and vector retrieval for search-oriented applications.", items: ["PostgreSQL", "Supabase", "SQLite", "Prisma", "pgvector", "ChromaDB", "SQL"] },
  { name: "AI & Automation", icon: BrainCircuit, title: "Applied intelligence", copy: "Building experiments that connect models to real software, sensors and interfaces.", items: ["PyTorch", "Hugging Face", "TensorFlow Lite", "OpenCV", "EasyOCR", "Ollama", "LangChain", "Selenium", "Playwright"] }
];

function MetallicCore({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      pointer.current.y = (event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((state, delta) => {
    const progress = progressRef.current;
    if (group.current) {
      const compact = size.width < 700;
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, compact ? 1.65 : 2.65, 2, delta);
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, (compact ? -1.0 : 0.04) + Math.sin(state.clock.elapsedTime * 0.4) * 0.12 - progress * 0.28, 2, delta);
      group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, compact ? 0.72 : 1.16, 2, delta));
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.current.x * 0.16 + progress * 0.62, 2.1, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.current.y * 0.09 + Math.sin(state.clock.elapsedTime * 0.22) * 0.025, 2.1, delta);
    }
    if (core.current) {
      core.current.rotation.x += delta * 0.08;
      core.current.rotation.y += delta * 0.12;
    }
    if (ringA.current) ringA.current.rotation.z -= delta * 0.045;
    if (ringB.current) ringB.current.rotation.z += delta * 0.025;
  });

  return (
    <group ref={group} position={[2.65, 0.04, -0.4]} scale={1.16}>
      <Float speed={0.55} rotationIntensity={0.07} floatIntensity={0.12}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.62, 5]} />
          <meshPhysicalMaterial color="#9ba8b9" metalness={0.92} roughness={0.24} clearcoat={1} clearcoatRoughness={0.16} flatShading />
        </mesh>
        <mesh scale={1.014}>
          <icosahedronGeometry args={[1.62, 4]} />
          <meshBasicMaterial color="#e5ebf3" wireframe transparent opacity={0.065} />
        </mesh>
      </Float>
      <mesh ref={ringA} rotation={[1.07, 0.27, 0.2]}>
        <torusGeometry args={[2.2, 0.012, 8, 180]} />
        <meshStandardMaterial color="#c3cedd" metalness={1} roughness={0.24} transparent opacity={0.62} />
      </mesh>
      <mesh ref={ringB} rotation={[0.37, 1.08, -0.55]}>
        <torusGeometry args={[2.58, 0.006, 8, 180]} />
        <meshStandardMaterial color="#71849e" metalness={0.8} roughness={0.4} transparent opacity={0.54} />
      </mesh>
      <mesh position={[2.2, 0.95, 0.15]}>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshStandardMaterial color="#eef3fb" emissive="#a5b6d0" emissiveIntensity={0.25} metalness={0.8} roughness={0.18} />
      </mesh>
      <mesh position={[-2.35, -0.62, 0.45]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial color="#c3cedd" emissive="#7489a7" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function CosmicScene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <div className="cosmic-stage" aria-hidden="true">
      <Canvas
        className="cosmos-canvas"
        camera={{ position: [0, 0, 9.6], fov: 42 }}
        dpr={[1, 1.45]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => { gl.setClearColor("#080a0e", 0); }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[-4, 5, 5]} intensity={2.1} color="#eef3fb" />
        <pointLight position={[4, 1, 4]} intensity={45} distance={13} color="#a9bdd8" />
        <pointLight position={[-5, -2, 1]} intensity={22} distance={12} color="#667b9b" />
        <Stars radius={48} depth={35} count={950} factor={1.7} saturation={0} fade speed={0.18} />
        <MetallicCore progressRef={progressRef} />
      </Canvas>
      <div className="cosmic-vignette" />
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function CosmicPortfolio() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSkill, setActiveSkill] = useState("Frontend");
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => { progressRef.current = value; });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => setRoleIndex((current) => (current + 1) % 4), 2450);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const roles = ["AI systems", "full-stack products", "mobile ML", "developer tools"];
  const skill = skillGroups.find((item) => item.name === activeSkill) ?? skillGroups[0];
  const SkillIcon = skill.icon;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="cosmic-site">
      <CosmicScene progressRef={progressRef} />
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <header className="site-nav">
        <a className="brand-mark" href="#top" aria-label="Aryaman Mohta, back to top" onClick={closeMenu}>
          <span className="brand-glyph">A.</span>
          <span>ARYAMAN MOHTA</span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`} aria-label="Main navigation">
          <a className="nav-link" href="#about" onClick={closeMenu}>About</a>
          <a className="nav-link" href="#work" onClick={closeMenu}>Selected work</a>
          <a className="nav-link" href="#stack" onClick={closeMenu}>Toolkit</a>
          <a className="nav-cta" href="https://github.com/Aryaman129" target="_blank" rel="noreferrer" onClick={closeMenu}><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>
        </nav>
      </header>

      <main className="site-content">
        <section className="hero-section" id="top">
          <div className="hero-copy">
            <Reveal className="hero-eyebrow"><span className="eyebrow-dot" /> Software engineering · Applied AI · Automation</Reveal>
            <h1 className="hero-title" aria-label="Building at the edge of software and intelligence">
              <span className="hero-title-line"><motion.span initial={reduceMotion ? false : { y: "115%", rotateX: -70 }} animate={{ y: 0, rotateX: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>Building at the</motion.span></span>
              <span className="hero-title-line"><motion.span className="metal-text" initial={reduceMotion ? false : { y: "115%", rotateX: -70 }} animate={{ y: 0, rotateX: 0 }} transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}>edge of software</motion.span></span>
              <span className="hero-title-line"><motion.span initial={reduceMotion ? false : { y: "115%", rotateX: -70 }} animate={{ y: 0, rotateX: 0 }} transition={{ duration: 1, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}>and intelligence<span className="title-period">.</span></motion.span></span>
            </h1>
            <Reveal delay={0.42}>
              <p className="hero-description">
                I’m Aryaman — a computer science student who turns curious ideas into useful systems.
                Lately, I’ve been working on{" "}
                <span className="rolling-role"><AnimatePresence mode="wait" initial={false}><motion.span key={roles[roleIndex]} initial={{ y: "105%", opacity: 0, filter: "blur(5px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: "-105%", opacity: 0, filter: "blur(5px)" }} transition={{ duration: reduceMotion ? 0.01 : 0.38, ease: [0.22, 1, 0.36, 1] }}>{roles[roleIndex]}</motion.span></AnimatePresence></span>.
              </p>
              <div className="hero-actions">
                <a className="button-metal" href="#work">Explore selected work <ArrowDownRight size={16} /></a>
                <a className="button-quiet" href="mailto:aryamanmohta@gmail.com">Let’s talk <ArrowUpRight size={16} /></a>
              </div>
            </Reveal>
            <Reveal delay={0.58} className="hero-meta">
              <span><span className="meta-ring"><Orbit size={13} /></span> Based in India</span>
              <span><span className="meta-dash" /> SRMIST · Computer Science</span>
              <span><span className="meta-dash" /> Building & experimenting</span>
            </Reveal>
          </div>
          <div className="hero-side-label"><span>INDEPENDENT THINKING</span><span className="side-label-line" /><span>ITERATION / 2026</span></div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about"><span className="scroll-cue-line" />Scroll to explore <ArrowDownRight size={13} /></a>
          <div className="hero-coordinate" aria-hidden="true">LAT 13° 04' N <span>·</span> DIGITAL SPACE / 001</div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((copy) => <div className="ticker-group" key={copy}><span>Applied AI</span><i>✳</i><span>Product engineering</span><i>✳</i><span>Automation systems</span><i>✳</i><span>Creative code</span><i>✳</i><span>Applied AI</span><i>✳</i><span>Product engineering</span><i>✳</i><span>Automation systems</span><i>✳</i><span>Creative code</span><i>✳</i></div>)}
          </div>
        </div>

        <section className="section-wrap" id="about">
          <Reveal className="section-heading">
            <div><span className="section-kicker"><span className="section-index">01 /</span> The person behind the pixels</span><h2 className="section-title">Curiosity,<br /><span className="metal-text">engineered.</span></h2></div>
            <p className="section-intro">I like the part where ideas leave the whiteboard and become real systems — the architecture, the edge cases, the tiny interactions that make software feel considered.</p>
          </Reveal>
          <div className="about-grid">
            <Reveal className="metal-panel about-story">
              <span className="panel-label">A little context / 001</span>
              <p className="panel-copy">I’m studying Computer Science at SRM Institute of Science and Technology. My projects move between full-stack applications, local AI workflows, computer vision and tools that automate repetitive work.</p>
              <p className="panel-copy panel-copy-secondary">I’m most interested in the space where practical engineering meets experimentation: build something, understand its failure modes, refine the model or interaction, and make the whole thing easier to use.</p>
              <div className="about-bottom"><span className="about-monogram">AM<span>.</span></span><span className="about-caption">Less noise.<br />More intention.</span></div>
            </Reveal>
            <div className="focus-list">
              {[
                { n: "01", title: "Build the whole system", text: "From a considered interface to APIs, data models and deployment workflows." },
                { n: "02", title: "Make AI useful", text: "Connect models to real applications, sensor signals, documents and developer tasks." },
                { n: "03", title: "Care about the details", text: "Readable architecture, sensible fallbacks, clear feedback and interactions that feel right." }
              ].map((item, index) => <Reveal delay={index * 0.09} key={item.n}><article className="focus-item"><span className="focus-index">{item.n}</span><div><h3 className="focus-title">{item.title}</h3><p className="focus-desc">{item.text}</p></div><ArrowUpRight className="focus-arrow" size={15} /></article></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section-wrap work-section" id="work">
          <Reveal className="section-heading">
            <div><span className="section-kicker"><span className="section-index">02 /</span> Selected work</span><h2 className="section-title">Things I’ve<br /><span className="metal-text">put into motion.</span></h2></div>
            <div><p className="section-intro">A mix of applied ML, full-stack products and tools that explore how software can work a little harder for people.</p><p className="source-note"><Github size={13} /> Source code is the reference point. Hosted demos may be inactive; core projects are runnable locally.</p></div>
          </Reveal>
          <div className="project-grid">
            {projects.map((project, index) => <Reveal key={project.number} delay={(index % 2) * 0.08} className="project-reveal"><motion.article className="project-card" initial={false} whileHover={reduceMotion ? undefined : { y: -6, rotateX: 1.2, rotateY: index % 2 ? -0.7 : 0.7 }} transition={{ type: "spring", stiffness: 170, damping: 19 }} style={{ transformPerspective: 1000 }}>
              <div className="project-topline"><span className="project-number">{project.number} <span className="project-num-divider">/</span> 06</span><span className="project-status">{project.note}</span></div>
              <div className="project-orbit" aria-hidden="true"><span className="orbit-core" /><span className="orbit-path orbit-path-one" /><span className="orbit-path orbit-path-two" /></div>
              <p className="project-category">{project.category}</p><h3 className="project-title">{project.title}</h3><p className="project-description">{project.description}</p>
              <div className="project-tags">{project.stack.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}</div>
              <div className="project-footer"><span className="project-type">PROJECT / {project.number}</span><a className="project-link" href={project.href} target="_blank" rel="noreferrer">Inspect source <ArrowUpRight size={14} /></a></div>
            </motion.article></Reveal>)}
          </div>
          <Reveal delay={0.1} className="additional-work"><span className="additional-label">Also in the workshop</span><a href="https://github.com/Aryaman129/Blog-management" target="_blank" rel="noreferrer">Mosaic Paths / Blog CMS <ArrowUpRight size={13} /></a><a href="https://github.com/Aryaman129/Stocks" target="_blank" rel="noreferrer">StockSphere / portfolio analytics <ArrowUpRight size={13} /></a><a href="https://github.com/Aryaman129/Captcha_Solver_Bot" target="_blank" rel="noreferrer">Android + OCR automation <ArrowUpRight size={13} /></a></Reveal>
        </section>

        <section className="section-wrap skills-section" id="stack">
          <Reveal className="section-heading">
            <div><span className="section-kicker"><span className="section-index">03 /</span> Tools of the trade</span><h2 className="section-title">My current<br /><span className="metal-text">toolkit.</span></h2></div>
            <p className="section-intro">A practical set of tools I’ve used across projects — not a wall of logos, and not a claim that every tool is at the same level.</p>
          </Reveal>
          <div className="skill-layout">
            <div className="skill-tabs" role="tablist" aria-label="Skill categories">{skillGroups.map((item) => <button key={item.name} className="skill-tab" type="button" role="tab" aria-selected={activeSkill === item.name} onClick={() => setActiveSkill(item.name)}><span>{item.name}</span><ArrowUpRight size={14} /></button>)}</div>
            <AnimatePresence mode="wait"><motion.div className="skill-panel" role="tabpanel" key={skill.name} initial={reduceMotion ? false : { opacity: 0, x: 14, filter: "blur(4px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -10, filter: "blur(3px)" }} transition={{ duration: reduceMotion ? 0.01 : 0.27 }}><div className="skill-panel-top"><span className="skill-icon"><SkillIcon size={20} /></span><span className="panel-label">Selected discipline / {String(skillGroups.findIndex((item) => item.name === skill.name) + 1).padStart(2, "0")}</span></div><h3 className="skill-panel-title">{skill.title}</h3><p className="skill-panel-copy">{skill.copy}</p><div className="skill-chip-wrap">{skill.items.map((item) => <motion.span layout key={item} className="skill-chip">{item}</motion.span>)}</div></motion.div></AnimatePresence>
          </div>
        </section>

        <section className="section-wrap contact-section" id="contact">
          <Reveal className="contact-panel">
            <span className="section-kicker"><span className="eyebrow-dot" /> 04 / The next orbit</span>
            <h2 className="contact-title">Have something<br /><span className="metal-text">interesting in mind?</span></h2>
            <p className="contact-copy">I’m open to internships, collaborative projects and conversations about software, applied AI and automation.</p>
            <div className="contact-actions"><a className="button-metal" href="mailto:aryamanmohta@gmail.com"><Mail size={16} /> Get in touch <ArrowUpRight size={15} /></a><a className="button-quiet" href="https://github.com/Aryaman129" target="_blank" rel="noreferrer"><Github size={16} /> Browse the code <ArrowRight size={15} /></a></div>
            <div className="contact-socials"><a href="https://www.linkedin.com/in/aryaman-mohta-53b715308" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12} /></a><a href="https://github.com/Aryaman129" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a><a href="mailto:aryamanmohta@gmail.com">Email <ArrowUpRight size={12} /></a></div>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer"><a className="footer-brand" href="#top">AM<span>.</span></a><span>Designed in graphite, orbiting around good ideas.</span><a href="#top" className="back-top">Back to the top <ArrowUpRight size={13} /></a></footer>
    </div>
  );
}
