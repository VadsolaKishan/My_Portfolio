import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { skills } from '../data/skills'



export function SkillsOrbit() {
  const [active, setActive] = useState(skills[0]?.name ?? '')
  const [isSmUp, setIsSmUp] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(min-width: 640px)').matches
  })

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 640px)')
    const onChange = () => setIsSmUp(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const orbit = useMemo(() => {
    const radius = isSmUp ? 152 : 118
    return skills.map((s, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      return { ...s, x, y }
    })
  }, [isSmUp])

  const activeSkill = skills.find((s) => s.name === active) ?? skills[0]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] w-full">
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-black/60 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.05)] hover:border-purple-400 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] transition-all duration-300">
        <div className="relative mx-auto h-[min(360px,80vw)] w-[min(360px,80vw)] max-w-full">
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
          >
            {orbit.map((s) => (
              <motion.button
                key={s.name}
                type="button"
                className={
                  'absolute left-1/2 top-1/2 grid h-12 w-12 sm:h-14 sm:w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border backdrop-blur transition border-purple-500/30 bg-purple-950/40 hover:bg-purple-900/60'
                }
                style={{ transform: `translate(${s.x}px, ${s.y}px)` }}
                whileHover={{ scale: 1.2, borderColor: s.originalColor, boxShadow: `0 0 20px ${s.originalColor}60` }}
                onMouseEnter={() => setActive(s.name)}
                onFocus={() => setActive(s.name)}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
                >
                  <s.Icon size={isSmUp ? 26 : 22} color={s.originalColor} />
                </motion.div>
              </motion.button>
            ))}
          </motion.div>

          <div className="absolute left-1/2 top-1/2 grid h-20 w-20 sm:h-24 sm:w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[1.5rem] border border-purple-400/50 bg-black/80 shadow-[0_0_50px_rgba(192,132,252,0.4)] backdrop-blur-md">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="40" width="40" xmlns="http://www.w3.org/2000/svg" color="#c084fc"><path d="M8 0c1.5 0 2.8.5 3.8 1.4C13.5 1.5 15 3.6 15 6c0 2.4-1.5 4.5-3.2 4.6C10.8 11.5 9.5 12 8 12s-2.8-.5-3.8-1.4C2.5 10.5 1 8.4 1 6c0-2.4 1.5-4.5 3.2-4.6C5.2.5 6.5 0 8 0zm0 1.5c-1.2 0-2.2.4-3 .9C3.6 2.5 2.5 4 2.5 6s1.1 3.5 2.5 3.6c.8.5 1.8.9 3 .9s2.2-.4 3-.9c1.4-.1 2.5-1.6 2.5-3.6s-1.1-3.5-2.5-3.6c-.8-.5-1.8-.9-3-.9zm0 2c.8 0 1.5.3 2 .8 1.1 1.2 1.1 3.2 0 4.4-.5.5-1.2.8-2 .8s-1.5-.3-2-.8c-1.1-1.2-1.1-3.2 0-4.4.5-.5 1.2-.8 2-.8zm0 1.5c-.3 0-.6.1-.8.4-.5.6-.5 1.6 0 2.2.2.3.5.4.8.4s.6-.1.8-.4c.5-.6.5-1.6 0-2.2-.2-.3-.5-.4-.8-.4z"></path></svg>
              </motion.div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-purple-400/20" />
        </div>
      </div>

      <div className="grid content-start gap-6">
        <div className="rounded-2xl border border-purple-500/20 bg-black/60 p-6 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.05)] hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300">
          <p className="text-xs font-semibold tracking-[0.32em] text-purple-300">
            FOCUSED COMPONENT
          </p>
          <h3 className="mt-2 text-2xl font-bold text-white flex items-center gap-3">
            <activeSkill.Icon size={24} color={activeSkill?.originalColor} />
            {activeSkill?.name}
          </h3>
          <div className="mt-6 overflow-hidden rounded-full border border-purple-500/30 bg-black/80 h-4">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${activeSkill?.level ?? 0}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                backgroundColor: activeSkill?.originalColor ?? '#c084fc',
                boxShadow: `0 0 15px ${activeSkill?.originalColor ?? '#c084fc'}80`
              }}
            />
          </div>
          <p className="mt-4 text-sm font-medium text-purple-200">
            Proficiency Level: <span className="text-white font-bold ml-1">{activeSkill?.level ?? 0}%</span>
          </p>
        </div>

        <div className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/10 p-6 text-sm leading-relaxed text-pink-100/80 backdrop-blur-xl shadow-[0_0_20px_rgba(236,72,153,0.05)] border-l-4 border-l-pink-500">
          <p className="font-semibold text-pink-300 mb-2 tracking-wide uppercase text-xs">System Log</p>
          The orbiting nodes represent core technologies that power my engineering workflow.From system-level programming to full-stack architecture and AI experimentation, each skill contributes to building reliable, scalable, and production-ready solutions.
        </div>
      </div>
    </div>
  )
}
