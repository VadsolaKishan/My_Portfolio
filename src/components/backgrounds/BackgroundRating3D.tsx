import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
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

function FloatingCrystals() {
    const groupRef = useRef<THREE.Group>(null!)

    // Setup random properties for crystals exactly once
    const crystals = useMemo(() => {
        return Array.from({ length: 45 }).map((_, i) => {
            const rand = mulberry32(73000 + i)
            return {
            position: [
                (rand() - 0.5) * 20,
                (rand() - 0.5) * 15,
                (rand() - 0.5) * 10 - 2
            ] as [number, number, number],
            rotationSpeed: [
                (rand() - 0.5) * 2,
                (rand() - 0.5) * 2,
                (rand() - 0.5) * 2
            ] as [number, number, number],
            speedY: rand() * 0.5 + 0.2,
            scale: rand() * 0.15 + 0.05
            }
        })
    }, [])

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                const data = crystals[i]
                child.position.y += data.speedY * delta
                child.rotation.x += data.rotationSpeed[0] * delta
                child.rotation.y += data.rotationSpeed[1] * delta
                child.rotation.z += data.rotationSpeed[2] * delta

                if (child.position.y > 8) {
                    child.position.y = -8
                }
            })
        }
    })

    return (
        <group ref={groupRef}>
            {crystals.map((data, i) => (
                <mesh key={i} position={data.position} scale={data.scale}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial color="#e879f9" wireframe transparent opacity={0.6} depthWrite={false} />
                </mesh>
            ))}
        </group>
    )
}

function GlowParticles() {
    const ref = useRef<THREE.Points>(null!)
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.03
            ref.current.position.y += delta * 0.1
            if (ref.current.position.y > 5) ref.current.position.y = -5
        }
    })

    const positions = useMemo(() => {
        const rand = mulberry32(74000)
        const p = new Float32Array(600 * 3)
        for (let i = 0; i < 600; i++) {
            p[i * 3] = (rand() - 0.5) * 20
            p[i * 3 + 1] = (rand() - 0.5) * 20
            p[i * 3 + 2] = (rand() - 0.5) * 15 - 5
        }
        return p
    }, [])

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#f0abfc" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </points>
    )
}

export function BackgroundRating3D() {
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: "0px" })

    return (
        <div ref={ref} className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[120px] mix-blend-screen" />

            <div className="sticky top-0 h-screen w-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }} frameloop={isInView ? "always" : "demand"} dpr={[1, 2]}>
                    <FloatingCrystals />
                    <GlowParticles />
                </Canvas>
            </div>
        </div>
    )
}
