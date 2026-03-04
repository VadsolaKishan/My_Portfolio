import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const reducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = links.map(l => document.getElementById(l.id))
      let current = ''
      for (const section of sections) {
        if (section && window.scrollY >= section.offsetTop - 200) {
          current = section.id
        }
      }
      setActiveTab(current || 'home')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const Comp = reducedMotion ? 'header' : motion.header

  return (
    <Comp
      {...(!reducedMotion
        ? {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: 'easeOut' },
        }
        : {})}
      className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-6"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div
          className={
            'overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-colors duration-300 ' +
            (scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-black/60 backdrop-blur')
          }
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <a
              href="#home"
              className="text-base sm:text-xl font-bold tracking-tight text-white transition-colors"
            >
              KISHAN VADSOLA
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {links.map((l) => {
                const isActive = activeTab === l.id
                return (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    className={`group relative py-1 text-sm font-bold transition-colors ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-slate-400 hover:text-white'}`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 -bottom-1 block h-[3px] rounded-full w-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                      />
                    )}
                    <span className="absolute left-0 -bottom-1 block h-[3px] rounded-full w-0 bg-cyan-400/50 transition-all duration-300 group-hover:w-full" />
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                download="Kishan_Vadsola_Resume.pdf"
                className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-100 shadow-lg transition-all hover:bg-white/10 hover:scale-105"
              >
                Resume
              </a>

              <a
                href="#contact"
                className="hidden sm:inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-2 text-sm font-semibold text-cyan-50 shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all hover:bg-cyan-500/20 hover:scale-105"
              >
                Let's Talk
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="sm:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d={mobileOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {mobileOpen ? (
            <div className="sm:hidden border-t border-white/10 bg-black/70">
              <nav className="px-4 py-3">
                <div className="grid gap-1">
                  {links.map((l) => {
                    const isActive = activeTab === l.id
                    return (
                      <a
                        key={l.id}
                        href={`#${l.id}`}
                        onClick={() => setMobileOpen(false)}
                        className={
                          'rounded-xl px-3 py-2 text-sm font-semibold transition ' +
                          (isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white')
                        }
                      >
                        {l.label}
                      </a>
                    )
                  })}

                  <a
                    href="/resume.pdf"
                    download="Kishan_Vadsola_Resume.pdf"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    Download Resume
                  </a>
                </div>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </Comp>
  )
}
