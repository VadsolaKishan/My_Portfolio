import { motion } from 'framer-motion'

import { Contact } from '../components/Contact'
import { PageTransition } from '../components/PageTransition'
import { SiteStatusStrip } from '../components/SiteStatusStrip'

export function ContactPage() {
    return (
        <PageTransition id="contact">
            <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(255,255,255,0.22)_2px,transparent_2px)] [background-size:40px_40px] pointer-events-none" />
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wLDBMNCwgME0wLDFMNCwgMU0wLDJMNCwgMk0wLDNMNCwgMyIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] mix-blend-overlay" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_60%)]" />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-[min(30rem,90vw)] h-[min(30rem,90vw)] bg-cyan-700/10 rounded-full blur-[120px] pointer-events-none"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, delay: 2 }}
                    className="absolute bottom-1/4 right-1/4 w-[min(35rem,92vw)] h-[min(35rem,92vw)] bg-blue-700/10 rounded-full blur-[150px] pointer-events-none"
                />
            </div>

            <div className="flex flex-col items-center justify-start w-full min-h-screen pt-20 sm:pt-24 pb-6 px-4 relative z-10">
                <div className="max-w-6xl w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            Initiate Contact
                        </h1>
                        <p className="text-cyan-400/80 mt-4 tracking-[0.2em] uppercase text-sm font-semibold">
                            Global Communications
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="w-full"
                    >
                        <Contact />
                    </motion.div>

                    <div className="mt-14">
                        <SiteStatusStrip />
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}

