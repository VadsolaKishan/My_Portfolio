import { motion, useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'

function mulberry32(seed: number) {
    let t = seed
    return () => {
        t += 0x6d2b79f5
        let r = Math.imul(t ^ (t >>> 15), 1 | t)
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296
    }
}

export function BackgroundAurora() {
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: "0px" })

    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => {
            const rand = mulberry32(42000 + i)
            const opacityPeak = rand() * 0.8
            const duration = rand() * 3 + 2
            const delay = rand() * 2
            const top = rand() * 100
            const left = rand() * 100

            return { opacityPeak, duration, delay, top, left }
        })
    }, [])

    return (
        <div ref={ref} className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            <div className="sticky top-0 h-screen w-full">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0)_0%,_#000000_100%)] opacity-80" />
                {isInView && (
                    <>
                        <motion.div
                            animate={{
                                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-[-50%] z-[-1] opacity-40 blur-[100px]"
                            style={{
                                background: 'linear-gradient(45deg, rgba(34, 211, 238, 0.4), rgba(56, 189, 248, 0.4), rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))',
                                backgroundSize: '400% 400%'
                            }}
                        />
                        {stars.map((s, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                                animate={{ opacity: [0, s.opacityPeak, 0] }}
                                transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
                                style={{
                                    top: `${s.top}%`,
                                    left: `${s.left}%`,
                                }}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
