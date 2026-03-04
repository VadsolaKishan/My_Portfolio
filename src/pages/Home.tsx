import { useState } from 'react'
import { motion } from 'framer-motion'
import { BackgroundSky3D } from '../components/backgrounds/BackgroundSky3D'
import { useTypewriter } from '../hooks/useTypewriter'
import { PageTransition } from '../components/PageTransition'

export function Home() {
    const [warpSpeed, setWarpSpeed] = useState(false)

    const typed = useTypewriter(
        [
            'React Developer',
            'Django Backend Engineer',
            'DSA Problem Solver',
            'Machine Learning Explorer',
        ],
        { typingMs: 50, deletingMs: 25, holdMs: 1500 },
    )

    const handleEnterUniverse = () => {
        setWarpSpeed(true)
        setTimeout(() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            setWarpSpeed(false)
        }, 900)
    }

    return (
        <PageTransition id="home">
            <BackgroundSky3D warpSpeed={warpSpeed} />
            <div className="flex flex-col items-center justify-center w-full min-h-[100svh] sm:min-h-[85vh] text-center px-4 pt-36 sm:pt-10 md:pt-12 pb-12 relative z-10">
                <div className="max-w-5xl w-full flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 relative inline-block max-w-full"
                    >
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg"></div>
                        <div className="relative flex items-center justify-center px-6 py-4 sm:px-8 sm:py-5 border border-white/10 rounded-2xl bg-black/80 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden min-h-[80px] sm:min-h-[110px]">
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white m-0 text-center">
                                <span>{typed}</span>
                                <span className="ml-1 inline-block w-[0.4ch] h-[0.9em] animate-pulse bg-cyan-400 align-middle shadow-[0_0_15px_rgba(34,211,238,0.8)]">&nbsp;</span>
                            </h1>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-100 mb-4 sm:mb-5"
                    >
                        Hi, I’m Kishan Vadsola
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-400 max-w-2xl mb-6 sm:mb-10 font-medium"
                    >
                        <span className="block">🎓 B.Tech Computer Engineering Student</span>
                        <span className="block mt-2">🚀 Full Stack Developer | AI &amp; System Builder</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <button
                            onClick={handleEnterUniverse}
                            className="group relative inline-flex items-center justify-center rounded-full bg-cyan-500 px-7 py-3.5 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all hover:scale-105 hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                🚀 Begin Exploration
                            </span>
                            <div className="absolute inset-0 -z-10 translate-y-[100%] bg-gradient-to-t from-purple-500 to-cyan-400 transition-transform duration-300 group-hover:translate-y-0"></div>
                        </button>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}
