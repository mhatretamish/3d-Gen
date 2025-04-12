"use client"

import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"

export default function LoadingSpinner() {
  const groupRef = useRef<THREE.Group>(null)
  const innerGroupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3
    }

    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.x = time * 0.5
      innerGroupRef.current.rotation.z = time * 0.2
    }

    // Animate particles
    if (particlesRef.current && particlesRef.current.geometry.attributes.position) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3
        positions[i + 1] += Math.sin(time + i3) * 0.01
        positions[i] += Math.cos(time + i3 * 0.5) * 0.01
        positions[i + 2] += Math.sin(time * 0.5 + i3) * 0.01
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Create particle positions
  const particleCount = 200
  const particlePositions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    particlePositions[i3] = (Math.random() - 0.5) * 5
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 5
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 5
  }

  return (
    <group ref={groupRef}>
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#00ffff" transparent opacity={0.8} />
      </points>

      <group ref={innerGroupRef}>
        {/* Core spinning elements */}
        <mesh>
          <torusGeometry args={[1.2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>

        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>

        {/* Inner core */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>

        {/* Orbiting spheres */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[Math.cos(i * Math.PI * 0.4) * 1.8, Math.sin(i * Math.PI * 0.4) * 1.8, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
