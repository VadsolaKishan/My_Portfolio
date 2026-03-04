import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Lenis from 'lenis'

import { Chatbot } from './components/Chatbot'
import { CursorGlow } from './components/CursorGlow'
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar'

import { Home } from './pages/Home'
import { About } from './pages/About'
import { ProjectsPage } from './pages/ProjectsPage'
import { SkillsPage } from './pages/SkillsPage'
import { AchievementsPage } from './pages/AchievementsPage'
import { ContactPage } from './pages/ContactPage'

export default function App() {
  const [isLocked, setIsLocked] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative bg-black text-slate-50 selection:bg-cyan-500/30 font-sans">
      <CursorGlow />

      <AnimatePresence mode="wait">
        {isLocked ? (
          <LoadingScreen key="loading" onDone={() => setIsLocked(false)} />
        ) : null}
      </AnimatePresence>

      {!isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full flex flex-col"
        >
          <Navbar />

          <main className="flex flex-col w-full">
            <Home />
            <About />
            <ProjectsPage />
            <SkillsPage />
            <AchievementsPage />
            <ContactPage />
          </main>

          <Chatbot />
        </motion.div>
      )}
    </div>
  )
}
