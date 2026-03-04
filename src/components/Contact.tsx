import { motion } from 'framer-motion'
import type { FormEvent } from 'react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'


type FormState = {
  name: string
  email: string
  message: string
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (status !== 'idle') return
    setErrorMsg('')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

    if (!serviceId || !templateId || !publicKey) {
      const missing = [
        !serviceId ? 'VITE_EMAILJS_SERVICE_ID' : null,
        !templateId ? 'VITE_EMAILJS_TEMPLATE_ID' : null,
        !publicKey ? 'VITE_EMAILJS_PUBLIC_KEY' : null,
      ].filter(Boolean)
      setStatus('error')
      setErrorMsg(
        `Email service is not configured yet. Missing: ${missing.join(', ')}. ` +
          'Create a .env file (see .env.example) and restart the dev server.',
      )
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          reply_to: form.email,
        },
        { publicKey },
      )
      setStatus('sent')
      window.setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', email: '', message: '' })
      }, 1200)
    } catch {
      setStatus('error')
      setErrorMsg('Failed to send. Please try again in a moment.')
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Send a Transmission</h2>
        <p className="text-slate-400 text-sm">Fill out the form below to establish a secure comms link.</p>
      </div>

      <form
        onSubmit={submit}
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10"
      >
        <div className="grid gap-5">
          <label className="grid gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 sm:px-5 sm:py-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400 focus:bg-white/[0.02] focus:ring-1 focus:ring-cyan-400/50"
              placeholder="Your name"
              required
            />
          </label>

          <label className="grid gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Email
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 sm:px-5 sm:py-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400 focus:bg-white/[0.02] focus:ring-1 focus:ring-cyan-400/50"
              placeholder="you@email.com"
              type="email"
              required
            />
          </label>

          <label className="grid gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Message
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 min-h-[140px] resize-y rounded-2xl border border-white/10 bg-black/40 px-4 py-3 sm:px-5 sm:py-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400 focus:bg-white/[0.02] focus:ring-1 focus:ring-cyan-400/50"
              placeholder="How can I help you?"
              required
            />
          </label>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full relative inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:bg-cyan-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {status === 'sending'
              ? 'Transmitting...'
              : status === 'sent'
                ? 'Transmission Successful ✓'
                : status === 'error'
                  ? 'Transmission Failed'
                  : 'Initialize Contact'}
          </button>
        </div>

        {status === 'error' ? (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-sm font-bold text-red-300 text-center">
            {errorMsg || 'Failed to send.'}
          </div>
        ) : null}

        {status === 'sending' ? (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="absolute inset-y-0 left-[-50%] w-[50%] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-md transform -skew-x-12"
              initial={{ x: 0 }}
              animate={{ x: '300%' }}
              transition={{ duration: 0.8, ease: 'easeInOut', repeat: Infinity }}
            />
          </motion.div>
        ) : null}
      </form>

      <div className="flex justify-center gap-4 mt-4">
        <a
          href="https://github.com/VadsolaKishan"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        >
          <FiGithub size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/kishan-vadsola-a68b05331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-400 hover:text-sky-300 hover:bg-sky-500/20 hover:border-sky-400/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        >
          <FiLinkedin size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
        </a>
        <a
          href="mailto:vadsolakishan1310@gmail.com"
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-400 hover:text-pink-300 hover:bg-pink-500/20 hover:border-pink-400/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        >
          <FiMail size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
        </a>
      </div>
    </div>
  )
}
