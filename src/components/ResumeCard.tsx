import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import { TiltCard } from './TiltCard'

export function ResumeCard() {
  const [scanning, setScanning] = useState(false)

  const startDownload = () => {
    if (scanning) return
    setScanning(true)
    window.setTimeout(() => {
      const a = document.createElement('a')
      a.href = '/resume.pdf'
      a.download = 'Kishan_Vadsola_Resume.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      setScanning(false)
    }, 1100)
  }

  return (
    <div className="w-full">
      <TiltCard className="group rounded-2xl">
        <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-black/60 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(34,197,94,0.1)] hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all">
          <div className="absolute -inset-10 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-teal-500/10 blur-2xl" />

          <div className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.32em] text-green-400">
                LOCKED PROFILE
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                Engineering Profile Vault
              </h3>
              <p className="mt-2 text-sm text-green-100/70">
                Access structured resume data and core technical highlights.
              </p>
            </div>

            <button
              type="button"
              onClick={startDownload}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-400 bg-green-500/10 px-6 py-3 text-sm font-bold text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all hover:bg-green-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
            >
              <FiDownload size={18} /> Download
            </button>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-green-500/20 bg-black/40 p-6 font-mono">
            <div className="grid gap-3 text-sm text-green-200/80">
              <p className="flex items-center gap-2"><span className="text-green-400">›</span> Encryption: AES-256 (Mock)</p>
              <p className="flex items-center gap-2"><span className="text-green-400">›</span> Clearance Level: Recruiter</p>
              <p className="flex items-center gap-2"><span className="text-green-400">›</span> Core Focus: Full Stack / AI / DSA</p>
            </div>

            {scanning ? (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                <motion.div
                  className="absolute inset-y-0 left-[-45%] w-[45%] bg-gradient-to-r from-transparent via-green-400/40 to-transparent blur-md"
                  initial={{ x: 0 }}
                  animate={{ x: '230%' }}
                  transition={{ duration: 1.05, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 grid place-items-center text-lg font-bold text-green-400 font-mono tracking-widest drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                  DECRYPTING...
                </div>
              </motion.div>
            ) : null}
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-green-400/50 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </TiltCard>
    </div>
  )
}
