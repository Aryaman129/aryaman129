import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Stars, OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LiquidSphere from './3d/LiquidSphere'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import IntroSection from './sections/IntroSection'
import AboutSection from './sections/AboutSection'
import LoadingScreen from './ui/LoadingScreen'
import WebGLErrorBoundary, { isWebGLSupported } from './ui/WebGLErrorBoundary'
import { motion } from 'framer-motion'
import TextRevealEffects from './ui/TextRevealEffects'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const AIPortfolio = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    // Check WebGL support on mount
    setWebglSupported(isWebGLSupported())
    
    if (!scrollRef.current) return

    // Initialize scroll-driven animations
    const ctx = gsap.context(() => {
      // Create scroll-triggered animations for 3D scene progression
      ScrollTrigger.create({
        trigger: scrollRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          // Update camera position based on scroll progress
          const progress = self.progress
          // This will be passed to the 3D scene via context or refs
          document.documentElement.style.setProperty('--scroll-progress', `${progress}`)
        }
      })

      // Parallax effects for background elements
      gsap.utils.toArray('.parallax-element').forEach((element: any) => {
        const speed = element.dataset.speed || 0.5
        gsap.to(element, {
          yPercent: -50 * parseFloat(speed),
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })
    }, scrollRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Loading Screen */}
      <LoadingScreen />
      
      {/* Fixed 3D Canvas Background */}
      <div className="fixed inset-0 -z-10">
        <WebGLErrorBoundary 
          fallback={
            <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
          }
        >
          {webglSupported && (
            <Canvas
              ref={canvasRef}
              camera={{ 
                position: [0, 0, 10], 
                fov: 75,
                near: 0.1,
                far: 1000
              }}
              dpr={[1, 2]}
              performance={{ min: 0.5 }}
              onCreated={(state) => {
                // Additional WebGL context validation
                const gl = state.gl.getContext()
                if (!gl) {
                  throw new Error('WebGL context not available')
                }
              }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
                
                <Stars 
                  radius={300} 
                  depth={60} 
                  count={1000} 
                  factor={4} 
                  saturation={0.5}
                  fade={true}
                />
                
                <LiquidSphere />
                
                {/* Orbit controls for desktop interaction */}
                <OrbitControls 
                  enableZoom={true}
                  enablePan={false}
                  enableRotate={true}
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2}
                />
              </Suspense>
            </Canvas>
          )}
        </WebGLErrorBoundary>
      </div>

      {/* Scrollable Content */}
      <div 
        ref={scrollRef}
        className="relative z-10 w-full"
        style={{ height: '600vh' }} // Extended height for scroll sections
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        
        {/* Intro Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <IntroSection />
        </section>

        {/* About Section */}
        <section className="min-h-screen relative py-20 flex items-center justify-center">
          <AboutSection />
        </section>

        {/* Projects Section */}
        <section className="min-h-screen relative py-20">
          <ProjectsSection />
        </section>

        {/* Skills Section */}
        <section className="min-h-screen relative py-20">
          <SkillsSection />
        </section>

        {/* Final Section with Neural Network Animation */}
        <section className="min-h-screen flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-center max-w-2xl mx-auto px-6"
          >
            <h2 className="text-5xl font-bold mb-8 liquid-text">
              <TextRevealEffects text="Ready to Connect?" effect="blur" delay={0.5} />
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's build the future together through AI and full-stack innovation.
            </p>
            <motion.div
              className="glass-card p-8 rounded-2xl nexus-border"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="space-y-4 text-lg">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">📧</span>
                  <a 
                    href="mailto:aryamanmohta@gmail.com" 
                    className="text-primary hover:text-primary-glow transition-colors"
                    onClick={() => window.open('mailto:aryamanmohta@gmail.com', '_blank')}
                  >
                    aryamanmohta@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">📱</span>
                  <a 
                    href="tel:+919309114125" 
                    className="text-primary hover:text-primary-glow transition-colors"
                    onClick={() => window.open('tel:+919309114125', '_self')}
                  >
                    +91 9309114125
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">💼</span>
                  <a 
                    href="https://www.linkedin.com/in/aryaman-mohta-53b715308" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-glow transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">💻</span>
                  <a 
                    href="https://github.com/Aryaman129/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-glow transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>
                <div className="text-center text-muted-foreground mt-4">
                  B.Tech Computer Science Engineering<br />
                  SRM University, KTR
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Data streams overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${20 + i * 30}%`,
              left: 0,
            }}
            animate={{
              x: ['0vw', '100vw'],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AIPortfolio