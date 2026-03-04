import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { useInView } from 'framer-motion'
import * as THREE from 'three'

function mulberry32(seed: number) {
    let t = seed
    return () => {
        t += 0x6d2b79f5
        let r = Math.imul(t ^ (t >>> 15), 1 | t)
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296
    }
}

function SignalRings() {
    const groupRef = useRef<THREE.Group>(null!)

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = 1.4 // Tilt to look like a perspective radar/signal
            groupRef.current.children.forEach((child) => {
                const mesh = child as THREE.Mesh
                const material = mesh.material as THREE.MeshBasicMaterial
                const speed = 0.8
                const scale = mesh.scale.x + delta * speed

                if (scale > 8) {
                    mesh.scale.set(0.1, 0.1, 0.1)
                    material.opacity = 0.8
                } else {
                    mesh.scale.set(scale, scale, scale)
                    material.opacity = 0.8 * (1 - scale / 8) // Fade out as it expands
                }
            })
        }
    })

    return (
        <group ref={groupRef} position={[0, -1, 0]}>
            {[0, 2, 4, 6].map((startScale, i) => (
                <mesh key={i} scale={[startScale || 0.1, startScale || 0.1, startScale || 0.1]}>
                    <ringGeometry args={[0.98, 1, 64]} />
                    <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} depthWrite={false} side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    )
}

function ContactParticles() {
    const ref = useRef<THREE.Points>(null!)
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.05
        }
    })

    const positions = useMemo(() => {
        const rand = mulberry32(91001)
        const p = new Float32Array(500 * 3)
        for (let i = 0; i < 500; i++) {
            p[i * 3] = (rand() - 0.5) * 15
            p[i * 3 + 1] = (rand() - 0.5) * 15
            p[i * 3 + 2] = (rand() - 0.5) * 15 - 5
        }
        return p
    }, [])

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </points>
    )
}

export function BackgroundContact3D() {
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: "0px" })

    return (
        <div ref={ref} className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_60%)]" />
            <div className="sticky top-0 h-screen w-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }} frameloop={isInView ? "always" : "demand"} dpr={[1, 2]}>
                    <SignalRings />
                    <ContactParticles />
                </Canvas>
            </div>
        </div>
    )
}
