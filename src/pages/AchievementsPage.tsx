import { motion } from 'framer-motion'

import { PageTransition } from '../components/PageTransition'
import { ResumeCard } from '../components/ResumeCard'
import { TiltCard } from '../components/TiltCard'

const achievements = [
    { title: "Smart India Hackathon", category: "Hackathon Finalist", icon: "🏆" },
    { title: "Google Cloud Ready", category: "Certification", icon: "☁️" },
    { title: "500+ LeetCode", category: "Coding Stats", icon: "💻" },
    { title: "Software Eng Intern", category: "Internship", icon: "💼" },
]

export function AchievementsPage() {
    return (
        <PageTransition id="achievements">
            <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(255,255,255,0.22)_2px,transparent_2px)] [background-size:40px_40px] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_60%)]" />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
                    className="absolute top-1/3 left-1/4 w-[min(40rem,90vw)] h-[min(40rem,90vw)] bg-green-700/10 rounded-full blur-[120px] pointer-events-none"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, delay: 2 }}
                    className="absolute bottom-1/4 right-1/4 w-[min(35rem,90vw)] h-[min(35rem,90vw)] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none"
                />
            </div>
            <div className="flex flex-col items-center justify-start w-full min-h-screen py-20 sm:py-24 px-4 relative z-10">
                <div className="max-w-6xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]">
                            Cyber Wall
                        </h1>
                        <p className="text-green-300 mt-4 tracking-[0.2em] uppercase text-sm font-semibold">
                            Achievements & Stats
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {achievements.map((acc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <TiltCard className="h-full">
                                    <div className="h-full flex flex-col items-center justify-center p-8 rounded-2xl border border-green-500/30 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all">
                                        <div className="text-4xl mb-4">{acc.icon}</div>
                                        <h3 className="text-xl font-bold text-white mb-2 text-center">{acc.title}</h3>
                                        <p className="text-sm text-green-400 font-mono text-center">{acc.category}</p>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <ResumeCard />
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}
