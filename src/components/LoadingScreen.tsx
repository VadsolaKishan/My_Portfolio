import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {
  onDone: () => void
}

const codeLines = [
  'INIT::SECURE_CHANNEL()',
  'SCAN::BIOMETRIC_MATCH(OK)',
  'VERIFY::TOKEN_SIGNATURE...',
  'DECRYPT::PROFILE_PAYLOAD()',
]

export function LoadingScreen({ onDone }: Props) {
  const [unlocking, setUnlocking] = useState(false)
  const [lines, setLines] = useState<string[]>([])
  const reducedMotion = useReducedMotion()
  const unlockButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (unlocking) return
    unlockButtonRef.current?.focus()
  }, [unlocking])

  useEffect(() => {
    if (!unlocking) return
    let index = 0
    const interval = setInterval(() => {
      setLines((prev) => [...prev, codeLines[index]])
      index++
      if (index === codeLines.length) {
        clearInterval(interval)
        setTimeout(() => {
          onDone()
        }, 800)
      }
    }, 250)
    return () => clearInterval(interval)
  }, [unlocking, onDone])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      role="dialog"
      aria-modal="true"
      aria-label={unlocking ? 'Decrypting secure portfolio session' : 'Secure portfolio access'}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(168,85,247,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
      </div>

      {!unlocking ? (
        <motion.div
          className="relative z-10 mx-auto w-[min(560px,92vw)]"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="rounded-3xl bg-gradient-to-r from-cyan-400/30 via-white/10 to-fuchsia-400/25 p-[1px] shadow-[0_0_60px_rgba(34,211,238,0.10)]">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/65 backdrop-blur-md">
              <div className="absolute inset-0 opacity-[0.22] bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(168,85,247,0.16),transparent_55%)]" />

              <div className="relative px-6 py-7 sm:px-10 sm:py-9 text-center">
                <p className="text-base sm:text-lg font-bold tracking-tight text-white">
                  KISHAN VADSOLA
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-300/80">
                  Secure Portfolio Gateway
                </p>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-200/90">
                    Encrypted Session
                  </span>
                  <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold text-cyan-100/90">
                    Integrity Check
                  </span>
                </div>

                <div className="relative mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                  <div
                    aria-hidden="true"
                    className="absolute -z-10 h-24 w-24 rounded-full blur-2xl"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 35%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(circle at 65% 60%, rgba(168,85,247,0.25), transparent 55%)',
                      mixBlendMode: 'screen',
                    }}
                  />

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-8 w-8 text-cyan-300"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                <h1 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Access Required
                </h1>
                <p className="mt-2 text-sm text-slate-300/80">
                  Unlock a secure session to view the portfolio experience.
                </p>

                <div className="mt-7 flex items-center justify-center gap-3">
                  <button
                    ref={unlockButtonRef}
                    type="button"
                    onClick={() => setUnlocking(true)}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-cyan-400/30 bg-cyan-500/10 px-8 py-3 text-sm font-semibold text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.10)] transition-all hover:bg-cyan-500/20 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <span className="relative z-10 tracking-[0.18em] uppercase">
                      Enter Portfolio
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.16),transparent)] group-hover:animate-shimmer"
                    />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="relative z-10 mx-auto w-[min(640px,92vw)]"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="rounded-3xl bg-gradient-to-r from-cyan-400/30 via-white/10 to-fuchsia-400/25 p-[1px] shadow-[0_0_60px_rgba(34,211,238,0.10)]">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/65 backdrop-blur-md">
              <div className="absolute inset-0 opacity-[0.20] bg-[radial-gradient(circle_at_25%_25%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(168,85,247,0.15),transparent_55%)]" />

              <div className="relative px-6 py-7 sm:px-10 sm:py-9">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_26px_rgba(34,211,238,0.12)]">
                      <motion.svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6 text-cyan-300"
                        stroke="currentColor"
                        strokeWidth="2"
                        {...(!reducedMotion
                          ? {
                            animate: { rotate: 360 },
                            transition: { duration: 2.2, repeat: Infinity, ease: 'linear' },
                          }
                          : {})}
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </motion.svg>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/80">
                        KISHAN VADSOLA · Secure Session
                      </p>
                      <h1 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white">
                        Initializing Portfolio
                      </h1>
                      <p className="mt-1 text-xs text-slate-300/80 uppercase tracking-[0.25em]">
                        Verifying integrity · Decrypting content
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right">
                    <p className="text-xs text-slate-400/80">Status</p>
                    <p className="text-sm font-semibold text-slate-200">Secure Handshake</p>
                  </div>
                </div>

                <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full w-full origin-left rounded-full bg-gradient-to-r from-cyan-400/70 to-fuchsia-400/60"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: Math.min(1, lines.length / codeLines.length) }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
                  <div className="font-mono text-[13px] leading-6 text-cyan-200 min-h-[140px]" aria-live="polite" aria-atomic="false">
                    {lines.map((l, i) => (
                      <motion.div
                        key={i}
                        {...(!reducedMotion
                          ? {
                            initial: { opacity: 0, x: -10 },
                            animate: { opacity: 1, x: 0 },
                          }
                          : {})}
                        className="mb-1"
                      >
                        <span className="text-slate-400">&gt;</span> {l}
                      </motion.div>
                    ))}

                    {lines.length === codeLines.length && (
                      <motion.div
                        {...(!reducedMotion
                          ? {
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            transition: { delay: 0.15 },
                          }
                          : {})}
                        className="mt-3 font-semibold text-emerald-300"
                      >
                        <span className="text-slate-400">&gt;</span> ACCESS GRANTED
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
