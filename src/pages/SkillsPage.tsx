import { motion } from 'framer-motion'
import { BackgroundOrbit } from '../components/backgrounds/BackgroundOrbit'
import { SkillsOrbit } from '../components/SkillsOrbit'
import { PageTransition } from '../components/PageTransition'

export function SkillsPage() {
    return (
        <PageTransition id="skills">
            <BackgroundOrbit />
            <div className="flex flex-col items-center justify-start w-full min-h-screen py-20 sm:py-24 px-4 relative z-10">
                <div className="max-w-6xl w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                            Skill Galaxy
                        </h1>
                        <p className="text-purple-200 mt-4 tracking-[0.2em] uppercase text-sm font-semibold">
                            Orbiting Around Knowledge
                        </p>
                    </motion.div>

                    <SkillsOrbit />
                </div>
            </div>
        </PageTransition>
    )
}
