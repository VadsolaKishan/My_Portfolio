import { Canvas, useFrame } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
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

function TechScene() {
    const groupRef = useRef<THREE.Group>(null!)
    const shapes = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => {
            const rand = mulberry32(81000 + i)
            return {
                position: [
                    (rand() - 0.5) * 20,
                    (rand() - 0.5) * 20,
                    (rand() - 0.5) * 20
                ] as [number, number, number],
                rotation: [rand() * Math.PI, rand() * Math.PI, 0] as [number, number, number],
                scale: rand() * 0.5 + 0.1
            }
        })
    }, [])

    useFrame((_state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.05
            groupRef.current.rotation.y += delta * 0.075
        }
    })

    return (
        <>
            <color attach="background" args={['#000000']} />
            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 10, 5]} intensity={1} color="#60a5fa" />
            <group ref={groupRef}>
                {shapes.map((props, i) => (
                    <mesh
                        key={i}
                        position={props.position}
                        rotation={props.rotation}
                        scale={props.scale}
                    >
                        {i % 2 === 0 ? <boxGeometry args={[1, 1, 1]} /> : <tetrahedronGeometry args={[1, 0]} />}
                        <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
                    </mesh>
                ))}
            </group>
        </>
    )
}

export function BackgroundTech() {
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: "0px" })

    return (
        <div ref={ref} className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            <div className="sticky top-0 h-screen w-full">
                <Canvas camera={{ position: [0, 0, 5] }} frameloop={isInView ? "always" : "demand"}>
                    <TechScene />
                </Canvas>
            </div>

            <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(255,255,255,0.22)_2px,transparent_2px)] [background-size:40px_40px]" />
        </div>
    )
}
