import { motion } from 'framer-motion'

import { RatePortfolio } from '../components/RatePortfolio'
import { PageTransition } from '../components/PageTransition'

export function RatingPage() {
    return (
        <PageTransition id="rating">
            <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(255,255,255,0.22)_2px,transparent_2px)] [background-size:40px_40px] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03)_0%,transparent_60%)]" />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
                    className="absolute top-[20%] right-[-10%] w-[min(45rem,90vw)] h-[min(45rem,90vw)] bg-purple-700/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                    className="absolute bottom-[-10%] left-[-10%] w-[min(50rem,92vw)] h-[min(50rem,92vw)] bg-fuchsia-700/10 rounded-full blur-[160px] pointer-events-none mix-blend-screen"
                />
            </div>

            <div className="flex flex-col items-center justify-start w-full min-h-screen py-20 sm:py-24 px-4 relative z-10">
                <div className="max-w-6xl w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            Global Feedback
                        </h1>
                        <p className="text-purple-400/80 mt-4 tracking-[0.2em] uppercase text-sm font-semibold">
                            System Assessment
                        </p>
                    </motion.div>

                    <div className="flex flex-col w-full max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="w-full"
                        >
                            <RatePortfolio />
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
