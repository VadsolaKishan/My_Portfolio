import { Canvas, useFrame } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useState, useRef } from 'react'

function Sky({ warpSpeed = false }: { warpSpeed?: boolean }) {
    const ref = useRef<THREE.Points>(null!)
    const [sphere] = useState(() => {
        const arr = new Float32Array(5000 * 3)
        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - 0.5) * 20
            const y = (Math.random() - 0.5) * 20
            const z = (Math.random() - 0.5) * 20
            arr[i * 3] = x
            arr[i * 3 + 1] = y
            arr[i * 3 + 2] = z
        }
        return arr
    })

    useFrame((_state, delta) => {
        if (ref.current) {
            if (warpSpeed) {
                ref.current.position.z += delta * 15
                if (ref.current.position.z > 10) ref.current.position.z = 0
            } else {
                ref.current.rotation.x -= delta / 15
                ref.current.rotation.y -= delta / 20
                ref.current.position.z += delta * 0.5
                if (ref.current.position.z > 10) ref.current.position.z = 0
            }
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}


export function BackgroundSky3D({ warpSpeed = false }: { warpSpeed?: boolean }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: "0px" })

    return (
        <div ref={ref} className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            <div className="sticky top-0 h-screen w-full">
                <Canvas camera={{ position: [0, 0, 1] }} frameloop={isInView ? "always" : "demand"}>
                    <Sky warpSpeed={warpSpeed} />
                </Canvas>
            </div>
        </div>
    )
}
