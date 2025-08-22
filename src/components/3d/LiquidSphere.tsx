import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

const LiquidSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<any>(null!)

  useEffect(() => {
    if (meshRef.current) {
      // Entrance animation
      gsap.fromTo(
        meshRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { 
          x: 1, 
          y: 1, 
          z: 1, 
          duration: 2, 
          ease: 'elastic.out(1, 0.3)',
          delay: 1
        }
      )

      // Initial rotation animation
      gsap.fromTo(
        meshRef.current.rotation,
        { x: 0, y: 0, z: 0 },
        { 
          x: Math.PI * 0.1, 
          y: Math.PI * 0.2, 
          z: 0, 
          duration: 3, 
          ease: 'power2.out',
          delay: 2
        }
      )
    }
  }, [])

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Get scroll progress from CSS variable
      const scrollProgress = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--scroll-progress') || '0'
      )

      // Animate based on scroll
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + scrollProgress * Math.PI
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + scrollProgress * Math.PI * 0.5
      
      // Animate material properties
      materialRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime) * 0.2
      materialRef.current.speed = 1 + scrollProgress * 2

      // Animate position based on scroll
      meshRef.current.position.z = -scrollProgress * 15
      meshRef.current.position.y = Math.sin(scrollProgress * Math.PI * 2) * 2

      // Change color based on scroll progress
      const hue = scrollProgress * 360
      const color = new THREE.Color().setHSL(hue / 360, 1, 0.5)
      materialRef.current.color = color
    }
  })

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#00ffff"
        transparent
        opacity={0.8}
        distort={0.3}
        speed={1}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  )
}

export default LiquidSphere