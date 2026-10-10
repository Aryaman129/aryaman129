import { useCallback, useEffect, useRef, useState, type MutableRefObject, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check,
  Command, Github, Layers3, Mail, Orbit, Radio, Sparkles
} from 'lucide-react';

type Stage = 0 | 1 | 2 | 3 | 4 | 5;
type MutableStage = MutableRefObject<number>;

const scrambleChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789<>/*+=-';

function TextDecode({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [started, setStarted] = useState(false);
  const [value, setValue] = useState(() => text.split('').map((char) => char === ' ' || char === '\n' ? char : '·').join(''));
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!started) return;
    if (reduceMotion) { setValue(text); return; }
    let frame = 0;
    const maxFrames = 17;
    const timer = window.setInterval(() => {
      frame += 1;
      const revealUntil = Math.floor((frame / maxFrames) * text.length);
      setValue(text.split('').map((char, i) => {
        if (char === ' ' || char === '\n') return char;
        if (i < revealUntil) return char;
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }).join(''));
      if (frame >= maxFrames) {
        window.clearInterval(timer);
        setValue(text);
      }
    }, 34);
    return () => window.clearInterval(timer);
  }, [started, text, reduceMotion]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => { if (!started) window.setTimeout(() => setStarted(true), delay * 1000); }}
      viewport={{ once: true, amount: 0.35 }}
    >
      {value}
    </motion.span>
  );
}

function BootSequence({ onFinish, reduced }: { onFinish: () => void; reduced: boolean }) {
  const [display, setDisplay] = useState('SIGNAL / 001');
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced) { onFinish(); return; }
    let frame = 0;
    const target = 'ARYAMAN MOHTA';
    const timer = window.setInterval(() => {
      frame += 1;
      const count = Math.max(0, Math.floor((frame - 2) * target.length / 18));
      setDisplay(target.split('').map((char, i) => {
        if (i < count || char === ' ') return char;
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }).join(''));
      if (frame === 6) setPhase(1);
      if (frame >= 22) {
        window.clearInterval(timer);
        setDisplay(target);
        setPhase(2);
        window.setTimeout(onFinish, 420);
      }
    }, 42);
    return () => window.clearInterval(timer);
  }, [onFinish, reduced]);

  return (
    <motion.div className="boot-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.02 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
      <div className="boot-top"><span>SE / INITIALIZE</span><span>SESSION 001</span></div>
      <div className="boot-center">
        <motion.div className="boot-emblem" animate={phase >= 1 ? { rotate: 135, scale: 1 } : { rotate: 0, scale: 0.72 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <span className="boot-emblem-ring ring-outer" />
          <span className="boot-emblem-ring ring-inner" />
          <span className="boot-emblem-core" />
        </motion.div>
        <div className="boot-wordmark">{display}</div>
        <div className="boot-status"><span className="boot-status-dot" /> {phase >= 2 ? 'SIGNAL ACQUIRED' : phase >= 1 ? 'CALIBRATING FIELD' : 'ESTABLISHING CONNECTION'}</div>
      </div>
      <div className="boot-sweep" />
      <div className="boot-bottom"><span>GRAPHITE / SILVER</span><span>PLEASE STAY CURIOUS <Sparkles size={12} /></span></div>
      <button className="boot-skip" onClick={onFinish}>SKIP INTRO <ArrowUpRight size={12} /></button>
    </motion.div>
  );
}

function SignalGeometry({ stageRef, reduced }: { stageRef: MutableStage; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Group>(null);
  const core = useRef<THREE.MeshPhysicalMaterial>(null);
  const wire = useRef<THREE.MeshBasicMaterial>(null);
  const knotMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size, camera } = useThree();

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      mouse.current.x = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      mouse.current.y = (event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useFrame((state, delta) => {
    const stage = Math.min(5, Math.max(0, Math.round(stageRef.current)));
    const mobile = size.width < 720;
    const desktopPos: [number, number, number, number][] = [
      [2.65, 0.08, -0.4, 1.05],
      [3.05, -0.55, -0.9, 0.67],
      [-3.45, -0.35, -1.2, 0.58],
      [3.05, 0.35, -0.9, 0.72],
      [-3.2, -0.1, -1.1, 0.65],
      [3.1, 0.3, -0.8, 0.7]
    ];
    const mobilePos: [number, number, number, number][] = [
      [0.0, -0.8, -0.2, 0.64],
      [0.85, -1.25, -1.1, 0.4],
      [0.15, -1.75, -1.7, 0.34],
      [1.35, -0.8, -1.2, 0.42],
      [-1.25, -1.3, -1.4, 0.38],
      [0.7, -1.25, -1.0, 0.42]
    ];
    const pose = (mobile ? mobilePos : desktopPos)[stage];
    if (reduced) {
      if (root.current) {
        root.current.position.set(mobile ? 0 : 2.65, mobile ? -0.8 : 0.05, -0.4);
        root.current.scale.setScalar(mobile ? 0.48 : 0.82);
      }
      return;
    }
    const cameraOffsets = [0, 0.45, -0.25, 0.65, 0.1, 0.35];
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 9.7 + cameraOffsets[stage], 1.5, delta);
    if (root.current) {
      const target = new THREE.Vector3(pose[0] + mouse.current.x * (mobile ? 0.015 : 0.16), pose[1] - mouse.current.y * (mobile ? 0.012 : 0.08), pose[2]);
      root.current.position.lerp(target, 1 - Math.exp(-delta * 2.6));
      const scale = THREE.MathUtils.damp(root.current.scale.x, pose[3], 2.4, delta);
      root.current.scale.setScalar(scale);
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, state.clock.elapsedTime * 0.08 + mouse.current.x * 0.12 + stage * 0.48, 1.8, delta);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, mouse.current.y * 0.08 + Math.sin(state.clock.elapsedTime * 0.19) * 0.045, 1.8, delta);
    }
    if (shell.current && !reduced) {
      shell.current.rotation.x += delta * 0.035;
      shell.current.rotation.z -= delta * 0.024;
    }
    if (core.current) {
      const opacity = [0.96, 0.28, 0.15, 0.28, 0.22, 0.45][stage];
      core.current.opacity = THREE.MathUtils.damp(core.current.opacity, opacity, 2.5, delta);
      core.current.roughness = THREE.MathUtils.damp(core.current.roughness, stage === 2 ? 0.15 : 0.28, 2, delta);
    }
    if (wire.current) {
      const opacity = [0.17, 0.62, 0.78, 0.88, 0.82, 0.28][stage];
      wire.current.opacity = THREE.MathUtils.damp(wire.current.opacity, opacity, 2.5, delta);
    }
    if (knotMat.current) {
      const opacity = [0.62, 0.45, 0.12, 0.2, 0.22, 0.35][stage];
      knotMat.current.opacity = THREE.MathUtils.damp(knotMat.current.opacity, opacity, 2.5, delta);
    }
    if (!reduced) {
      if (ringA.current) ringA.current.rotation.z += delta * 0.045;
      if (ringB.current) ringB.current.rotation.x -= delta * 0.024;
      if (ringC.current) ringC.current.rotation.y += delta * 0.032;
    }
  });

  return (
    <group ref={root} position={[2.55, 0.15, -0.4]} scale={1.05}>
      <group ref={shell}>
        <mesh>
          <icosahedronGeometry args={[1.48, 4]} />
          <meshBasicMaterial ref={wire} color="#dfe7f2" wireframe transparent opacity={0.2} />
        </mesh>
        <mesh>
          <torusKnotGeometry args={[0.91, 0.29, 160, 18, 2, 5]} />
          <meshPhysicalMaterial ref={knotMat} color="#a8b6c9" metalness={0.96} roughness={0.22} clearcoat={1} clearcoatRoughness={0.14} transparent opacity={0.6} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.62, 3]} />
          <meshPhysicalMaterial ref={core} color="#e1e7ef" metalness={1} roughness={0.24} clearcoat={1} clearcoatRoughness={0.13} transparent opacity={0.96} />
        </mesh>
        <mesh ref={ringA} rotation={[1.05, 0.3, 0.2]}>
          <torusGeometry args={[1.95, 0.009, 8, 160]} />
          <meshStandardMaterial color="#d5dfec" metalness={1} roughness={0.22} transparent opacity={0.62} />
        </mesh>
        <mesh ref={ringB} rotation={[0.25, 0.8, -0.4]}>
          <torusGeometry args={[2.25, 0.006, 8, 160]} />
          <meshStandardMaterial color="#778ba7" metalness={0.95} roughness={0.35} transparent opacity={0.48} />
        </mesh>
        <mesh ref={ringC} rotation={[1.4, -0.2, 0.7]}>
          <torusGeometry args={[1.65, 0.004, 6, 160]} />
          <meshStandardMaterial color="#e9eff7" metalness={1} roughness={0.2} transparent opacity={0.28} />
        </mesh>
      </group>
      <mesh position={[1.98, 0.93, 0.4]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color="#f1f5fa" emissive="#b3c6e1" emissiveIntensity={0.45} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-2.08, -0.72, 0.25]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#a4b8d4" emissive="#778cac" emissiveIntensity={0.24} />
      </mesh>
    </group>
  );
}

function SignalWorld({ stageRef, reduced }: { stageRef: MutableStage; reduced: boolean }) {
  return (
    <div className="signal-world" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 9.7], fov: 39 }} dpr={[1, 1.35]} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} onCreated={({ gl }) => gl.setClearColor('#07090d', 0)}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[-4, 5, 5]} intensity={2.2} color="#f0f4fb" />
        <pointLight position={[4, 1, 4]} intensity={32} distance={13} color="#b6c9e4" />
        <pointLight position={[-5, -2, 1]} intensity={14} distance={12} color="#7789a4" />
        <Stars radius={48} depth={32} count={reduced ? 180 : 620} factor={1.6} saturation={0} fade speed={reduced ? 0 : 0.16} />
        <SignalGeometry stageRef={stageRef} reduced={reduced} />
      </Canvas>
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 32, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0.01 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === 'phone') return (
    <div className="visual-phone-wrap">
      <div className="visual-orbit visual-orbit-a" /><div className="visual-orbit visual-orbit-b" />
      <div className="visual-phone">
        <div className="phone-speaker" />
        <div className="phone-top"><span>NAV / SENSOR FUSION</span><Radio size={12} /></div>
        <div className="phone-label">MOTION MODEL <span>LIVE</span></div>
        <div className="phone-speed">IMU<span>+</span>ML</div>
        <div className="phone-chart"><svg viewBox="0 0 300 76" preserveAspectRatio="none"><path d="M0 51 L20 49 L35 40 L52 54 L68 31 L85 36 L103 18 L122 28 L139 33 L156 14 L175 25 L195 13 L216 22 L233 9 L251 19 L267 7 L286 17 L300 5" fill="none" stroke="url(#chartGrad)" strokeWidth="2.2"/><defs><linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#6d809c"/><stop offset="1" stopColor="#f1f5fa"/></linearGradient></defs></svg></div>
        <div className="phone-metrics"><span>ACCELEROMETER <b>ACTIVE</b></span><span>INFERENCE <b>ON-DEVICE</b></span><span>CONNECTION <b>LOCAL</b></span></div>
      </div>
    </div>
  );
  if (kind === 'network') return (
    <div className="visual-network">
      <div className="network-scanline" />
      <div className="network-head"><span>REQUEST TRACE / LOCAL</span><span className="network-live"><i /> CAPTURE</span></div>
      <div className="request-row"><b>GET</b><span>/api/resource</span><small>200</small></div>
      <div className="request-row"><b>WS</b><span>socket / stream</span><small>OPEN</small></div>
      <div className="request-row"><b>POST</b><span>/api/session</span><small>201</small></div>
      <div className="network-nodes"><span /><span /><span /><span /><span /><span /><svg viewBox="0 0 400 110" preserveAspectRatio="none"><path d="M10 82 L85 28 L155 70 L220 18 L300 64 L386 28 M85 28 L93 98 L220 18 L240 96 L300 64 L386 92" /></svg></div>
      <div className="network-foot"><span>HTTP / WEBSOCKET</span><span>LOCAL ANALYSIS</span></div>
    </div>
  );
  if (kind === 'vector') return (
    <div className="visual-vector">
      <div className="vector-header"><span>SEMANTIC SEARCH</span><span>RAG / INDEX</span></div>
      <div className="vector-doc"><div className="doc-icon"><Layers3 size={16} /></div><div className="doc-lines"><i /><i /><i /></div><span className="doc-chip">RESUME</span></div>
      <div className="vector-flow"><span /><span /><span /><span /><span /></div>
      <div className="vector-embed"><div className="embed-sphere" /><div className="embed-copy"><b>VECTOR SPACE</b><small>Similarity · Context · Retrieval</small></div></div>
      <div className="vector-results"><span>01 / MATCH</span><div className="result-bar"><i style={{ width: '82%' }} /></div><span>02 / MATCH</span><div className="result-bar"><i style={{ width: '57%' }} /></div></div>
    </div>
  );
  return (
    <div className="visual-dashboard">
      <div className="dash-top"><span>ACADEMIA / OVERVIEW</span><span className="dash-dot" /></div>
      <div className="dash-welcome">Your semester,<br /><em>in perspective.</em></div>
      <div className="dash-cards"><div><small>ATTENDANCE</small><b><span className="dash-ring" />PLAN</b></div><div><small>TIMETABLE</small><b>WEEK <ArrowUpRight size={12} /></b></div></div>
      <div className="dash-schedule"><span>MON</span><i /><i /><span>TUE</span><i /><i /><span>WED</span><i /><i /></div>
      <div className="dash-foot"><span>STUDENT COMPANION</span><span>OFFLINE / READY</span></div>
    </div>
  );
}

const projectData = [
  { number: '01', name: 'NavAi', category: 'ON-DEVICE MACHINE LEARNING', kind: 'phone', description: 'A mobile speed-estimation system built around motion-sensor data, a BiLSTM model and TensorFlow Lite inference. The goal: bring machine learning closer to the signal source.', tags: ['Android', 'BiLSTM', 'TensorFlow Lite'], href: 'https://github.com/Aryaman129/NavAi' },
  { number: '02', name: 'Endpoint Extractor', category: 'DEVELOPER TOOLING', kind: 'network', description: 'A local-first tool for investigating HAR files and captured HTTP/WebSocket traffic, with AI-assisted endpoint discovery and test-case generation using local models.', tags: ['Python', 'mitmproxy', 'Ollama'], href: 'https://github.com/Aryaman129/Endpoint_Extractor' },
  { number: '03', name: 'AI HR Automation', category: 'APPLIED AI / RETRIEVAL', kind: 'vector', description: 'An API-first recruitment project exploring resume parsing, semantic candidate matching and retrieval-augmented search over structured hiring knowledge.', tags: ['FastAPI', 'PostgreSQL', 'pgvector'], href: 'https://github.com/Aryaman129/AI_HR_Interviewer' },
  { number: '04', name: 'Academia2', category: 'STUDENT UTILITY / FULL-STACK', kind: 'dashboard', description: 'A student companion that brings attendance, marks and timetable information together with portal scraping, attendance planning and progressive-web-app functionality.', tags: ['React', 'Flask', 'PWA'], href: 'https://github.com/Aryaman129/Academia2' }
];

const skillSets = {
  'Interface': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Zustand'],
  'Systems': ['Python', 'FastAPI', 'Flask', 'Node.js', 'Express', 'REST APIs', 'Socket.IO'],
  'Data': ['PostgreSQL', 'Supabase', 'SQLite', 'Prisma', 'pgvector', 'ChromaDB', 'SQL'],
  'Applied AI': ['PyTorch', 'Hugging Face', 'TensorFlow Lite', 'OpenCV', 'EasyOCR', 'Ollama', 'LangChain', 'Selenium']
};

function SignalExperience() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [booted, setBooted] = useState(false);
  const [stage, setStage] = useState<Stage>(0);
  const [skill, setSkill] = useState<keyof typeof skillSets>('Interface');
  const stageRef = useRef(0);
  
  useEffect(() => {
    if (reduceMotion) { setBooted(true); return; }
    try {
      if (sessionStorage.getItem('signal-engine-booted') === '1') { setBooted(true); return; }
    } catch { /* Continue without session storage. */ }
    return;
  }, [reduceMotion]);

  const finishBoot = useCallback(() => {
    setBooted(true);
    try { sessionStorage.setItem('signal-engine-booted', '1'); } catch { /* Optional. */ }
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-world-section]'));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const next = Number((visible.target as HTMLElement).dataset.worldSection);
      if (Number.isFinite(next)) {
        stageRef.current = next;
        setStage(next as Stage);
      }
    }, { root: null, rootMargin: '-32% 0px -36% 0px', threshold: [0, 0.12, 0.3, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [booted]);

  return (
    <div className="signal-site" data-stage={stage}>
      <div className="signal-atmosphere" aria-hidden="true"><div className="atmosphere-grid" /><div className="atmosphere-glow" /><div className="atmosphere-grain" /></div>
      <SignalWorld stageRef={stageRef} reduced={Boolean(reduceMotion)} />
      <motion.div className="site-progress" style={{ scaleX: scrollYProgress }} />
      <AnimatePresence>{!booted && <BootSequence key="boot" onFinish={finishBoot} reduced={Boolean(reduceMotion)} />}</AnimatePresence>
      <header className="signal-header">
        <a href="#top" className="signal-logo" aria-label="Aryaman Mohta home"><span className="logo-glyph">A<span>.</span></span><span className="logo-name">ARYAMAN<br />MOHTA</span></a>
        <span className="header-mode"><i /> INDEPENDENT / SYSTEMS STUDIO</span>
        <nav className="signal-nav"><a href="#about">About</a><a href="#work">Work <span>04</span></a><a href="#method">Method</a><a href="#toolkit">Toolkit</a><a href="#contact" className="nav-contact">Connect <ArrowUpRight size={13} /></a></nav>
      </header>

      <main className="signal-main">
        <section className="signal-hero world-section" id="top" data-world-section="0">
          <div className="hero-grid-lines" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="hero-left">
            <Reveal className="hero-intro-label"><span className="status-ring" /> SOFTWARE ENGINEERING / APPLIED AI</Reveal>
            <h1 className="signal-headline">
              <span className="headline-line"><motion.span initial={reduceMotion ? false : { y: '115%', rotateX: -65 }} animate={booted ? { y: 0, rotateX: 0 } : { y: '115%', rotateX: -65 }} transition={{ duration: 1.05, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>Ideas into</motion.span></span>
              <span className="headline-line"><motion.span className="headline-outline" initial={reduceMotion ? false : { y: '115%', rotateX: -65 }} animate={booted ? { y: 0, rotateX: 0 } : { y: '115%', rotateX: -65 }} transition={{ duration: 1.05, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}>living systems.</motion.span></span>
            </h1>
            <Reveal delay={0.36}>
              <p className="hero-description">I’m Aryaman — a computer science student exploring the space between software, machine intelligence and the real world.</p>
              <div className="hero-words"><span className="hero-word-rule" /><TextDecode text="BUILD / OBSERVE / REFINE" /></div>
              <div className="hero-ctas"><a className="solid-link" href="#work">Explore work <ArrowDownRight size={16} /></a><a className="text-link" href="mailto:aryamanmohta@gmail.com">Start a conversation <ArrowUpRight size={15} /></a></div>
            </Reveal>
          </div>
          <div className="hero-art-label" aria-hidden="true"><span>FIG. 001</span><span>FORM / FIELD / SIGNAL</span></div>
          <div className="hero-bottom"><span>CHENNAI, INDIA</span><a href="#about">SCROLL TO ENTER <ArrowDown size={12} /></a><span>SCROLL TO TRANSFORM ↘</span></div>
        </section>

        <section className="signal-about world-section" id="about" data-world-section="1">
          <div className="section-topline"><span>01 — THE THINKING</span><span>CONTEXT / APPROACH</span></div>
          <div className="about-heading-wrap">
            <p className="micro-label">NOT JUST INTERFACES.</p>
            <h2 className="massive-heading">I care about<br /><span className="heading-muted">what happens</span><br />underneath<span className="heading-dot">.</span></h2>
            <TextDecode text="Curiosity is the starting point. Engineering is how it becomes real." className="decode-caption" />
          </div>
          <div className="about-bottom-grid">
            <Reveal className="about-note"><span className="note-number">A / 01</span><p>From full-stack products to on-device machine learning, I build systems that connect a useful idea to a working implementation.</p></Reveal>
            <Reveal className="about-note" delay={0.1}><span className="note-number">A / 02</span><p>I enjoy the process behind the output: tracing a problem, designing a model, testing assumptions and making the interface feel natural.</p></Reveal>
            <Reveal className="about-note" delay={0.2}><span className="note-number">A / 03</span><p>Currently studying Computer Science at SRMIST, while building across applied AI, automation, product engineering and creative code.</p></Reveal>
          </div>
          <div className="about-scanline" aria-hidden="true" />
        </section>

        <section className="signal-work world-section" id="work" data-world-section="2">
          <div className="section-heading-row">
            <div><span className="eyebrow-index">02 / SELECTED WORK</span><h2 className="section-heading">Built to <span>move.</span></h2></div>
            <div className="section-heading-meta"><p className="section-deck">A few experiments and products where the interface is only one layer of the system.</p><span className="project-visual-note"><Sparkles size={12} /> VISUAL STUDIES / SOURCE-LINKED PROJECTS</span></div>
          </div>
          <div className="projects-stream">
            {projectData.map((project, index) => (
              <Reveal key={project.number} delay={index % 2 ? 0.1 : 0} className="project-reveal">
                <motion.article className={'project-stage project-stage-' + project.kind} whileHover={reduceMotion ? undefined : { y: -5, rotateX: 0.6 }} onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--mx', ((event.clientX - rect.left) / rect.width * 100) + '%'); event.currentTarget.style.setProperty('--my', ((event.clientY - rect.top) / rect.height * 100) + '%'); }} transition={{ type: 'spring', stiffness: 150, damping: 20 }}>
                  <div className="project-copy">
                    <div className="project-overline"><span>{project.number} / 04</span><span>{project.category}</span></div>
                    <h3>{project.name}</h3><p>{project.description}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <a className="project-inspect" href={project.href} target="_blank" rel="noreferrer">Inspect source <ArrowUpRight size={14} /></a>
                  </div>
                  <div className="project-visual-wrap"><ProjectVisual kind={project.kind} /><span className="visual-corner visual-corner-one" /><span className="visual-corner visual-corner-two" /></div>
                  <div className="project-index-watermark">{project.number}</div>
                </motion.article>
              </Reveal>
            ))}
          </div>
          <Reveal className="work-more"><span>IN THE WORKSHOP</span><a href="https://github.com/Aryaman129/Zomatify" target="_blank" rel="noreferrer">Zomatify <ArrowUpRight size={12} /></a><a href="https://github.com/Aryaman129/Conference-Management-System" target="_blank" rel="noreferrer">Conference Management <ArrowUpRight size={12} /></a><a href="https://github.com/Aryaman129/Blog-management" target="_blank" rel="noreferrer">Blog CMS <ArrowUpRight size={12} /></a></Reveal>
        </section>

        <section className="signal-method world-section" id="method" data-world-section="3">
          <div className="section-topline"><span>03 — THE BUILD LOOP</span><span>HOW IDEAS BECOME SYSTEMS</span></div>
          <Reveal><p className="method-lead">A simple loop.<br /><span>A better question each time.</span></p></Reveal>
          <div className="method-track">
            <svg className="method-connector" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M0 60 C130 60 130 24 250 24 S380 80 500 60 S630 18 750 30 S870 60 1000 60" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.8, ease: 'easeInOut' }} /></svg>
            {[
              { number: '01', title: 'Observe', copy: 'Find the real problem beneath the symptom.' },
              { number: '02', title: 'Model', copy: 'Turn evidence into a system that can be tested.' },
              { number: '03', title: 'Build', copy: 'Make the idea tangible, usable and measurable.' },
              { number: '04', title: 'Refine', copy: 'Learn from failure; improve the whole loop.' }
            ].map((item, index) => <Reveal key={item.number} delay={index * 0.09} className="method-step"><span className="step-node"><i /></span><span className="step-number">{item.number} / LOOP</span><h3>{item.title}</h3><p>{item.copy}</p></Reveal>)}
          </div>
          <div className="method-footnote"><span><Command size={13} /> ITERATION IS THE INTERFACE</span><span>REPEAT WHEN NECESSARY ↻</span></div>
        </section>

        <section className="signal-toolkit world-section" id="toolkit" data-world-section="4">
          <div className="toolkit-intro">
            <span className="eyebrow-index">04 / THE TOOLKIT</span>
            <h2 className="section-heading">Different tools.<br /><span>One system.</span></h2>
            <p>Choose a layer to see the tools I’ve been using to make ideas work.</p>
          </div>
          <div className="toolkit-console">
            <div className="toolkit-tabs" role="tablist" aria-label="Technical skills">
              {(Object.keys(skillSets) as Array<keyof typeof skillSets>).map((name, index) => <button key={name} className={skill === name ? 'toolkit-tab active' : 'toolkit-tab'} onClick={() => setSkill(name)} role="tab" aria-selected={skill === name}><span>0{index + 1}</span>{name}<ArrowUpRight size={13} /></button>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={skill} className="toolkit-output" role="tabpanel" initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }} transition={{ duration: reduceMotion ? 0.01 : 0.36 }}>
                <div className="toolkit-output-top"><span><Radio size={13} /> ACTIVE LAYER</span><span>STACK / {Object.keys(skillSets).indexOf(skill) + 1} OF 04</span></div>
                <div className="skill-orbit-map" aria-hidden="true"><span className="skill-orbit-line line-a" /><span className="skill-orbit-line line-b" /><span className="skill-orbit-line line-c" /><span className="skill-orbit-core"><Sparkles size={16} /></span><i /><i /><i /></div>
                <div className="skill-list">{skillSets[skill].map((name, index) => <motion.span key={name} initial={reduceMotion ? false : { opacity: 0, y: 10, rotateX: -15 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: index * 0.045, duration: 0.35 }}><b>{String(index + 1).padStart(2, '0')}</b>{name}<Check size={12} /></motion.span>)}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="signal-contact world-section" id="contact" data-world-section="5">
          <div className="contact-orbit-art" aria-hidden="true"><span /><span /><span /></div>
          <div className="contact-copy">
            <span className="eyebrow-index">05 / OPEN CHANNEL</span>
            <h2>Have a problem<br />worth <span>solving?</span></h2>
            <TextDecode text="Let’s turn a good question into something real." className="contact-decode" />
            <div className="contact-links"><a href="mailto:aryamanmohta@gmail.com" className="solid-link"><Mail size={15} /> Start a conversation <ArrowUpRight size={14} /></a><a href="https://github.com/Aryaman129" className="text-link" target="_blank" rel="noreferrer"><Github size={15} /> Explore the code <ArrowRight size={14} /></a><a href="https://www.linkedin.com/in/aryaman-mohta-53b715308" className="text-link" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a></div>
          </div>
          <div className="contact-bottom"><span>ARYAMAN MOHTA / SOFTWARE + APPLIED AI</span><span>THANK YOU FOR EXPLORING <Sparkles size={12} /></span><a href="#top">BACK TO SIGNAL ↑</a></div>
        </section>
      </main>
    </div>
  );
}

export default function SignalEngine() {
  return <div className="signal-root"><SignalExperience /></div>;
}
