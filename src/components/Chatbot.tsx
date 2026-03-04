import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FiSend, FiX } from 'react-icons/fi'
import { FaRobot } from 'react-icons/fa'
import { chatProfile } from '../data/chatbot'

type Role = 'user' | 'bot'
type ChatMsg = { id: string; role: Role; text: string }

function id() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function answer(input: string) {
  const t = input.toLowerCase()

  if (t.includes('resume') || t.includes('cv')) {
    return `You can download the resume here: ${chatProfile.resumeUrl}`
  }

  if (t.includes('education') || t.includes('college') || t.includes('university')) {
    return chatProfile.education
  }

  if (t.includes('intern') || t.includes('experience')) {
    return 'I’m actively seeking internship opportunities to apply full stack + AI skills on real-world products.'
  }

  if (t.includes('hire') || t.includes('why') || t.includes('candidate')) {
    return 'You should hire me for strong fundamentals (DSA/CS core), clean engineering habits, and fast learning across full stack + AI — I deliver polished UI + reliable backend thinking.'
  }

  if (t.includes('project') || t.includes('work')) {
    return 'Projects include: Hospital Management System, Student Record System, AI Mini Project, Web Dev Project, and a DSA Algorithm Visualizer. Ask “show projects” and I’ll guide you to the section.'
  }

  if (t.includes('contact') || t.includes('email')) {
    return `You can reach me at ${chatProfile.contactEmail}. Or scroll to the Contact section to send a message.`
  }

  if (t.includes('skill')) {
    return 'Key skills: React, Django, MySQL, Git, C++/Python, and ML basics. Hover the orbiting skills to see the levels.'
  }

  if (t.includes('leet') || t.includes('codechef') || t.includes('leetcode')) {
    return 'Coding profile stats can be added (LeetCode/CodeChef). Share your profile links and I’ll wire them into this portfolio.'
  }

  return 'Ask me about education, projects, skills, resume, internships, contact info, or “why hire me?”.'
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMsg[]>(() => [
    {
      id: id(),
      role: 'bot',
      text: `Hi! I’m your portfolio assistant. Ask me anything about ${chatProfile.name}.`,
    },
  ])

  const quick = useMemo(
    () => [
      'Education',
      'Show projects',
      'Skills',
      'Resume link',
      'Internship details',
      'Why should we hire you?',
      'Contact info',
    ],
    [],
  )

  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: 10_000, behavior: 'smooth' })
  }, [messages.length, open])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages((m) => [...m, { id: id(), role: 'user', text: trimmed }])
    setInput('')

    window.setTimeout(() => {
      const a = answer(trimmed)
      setMessages((m) => [...m, { id: id(), role: 'bot', text: a }])

      if (trimmed.toLowerCase().includes('show projects')) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      }
      if (trimmed.toLowerCase().includes('contact')) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }
    }, 350)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.18)] transition hover:bg-cyan-300/15"
        aria-label="Open AI chatbot"
      >
        <span className="absolute inset-0 animate-pulse rounded-full bg-cyan-300/10" />
        <FaRobot className="relative" size={24} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-5 right-5 z-50 w-[min(420px,92vw)] overflow-hidden rounded-2xl border border-white/10 bg-black/65 backdrop-blur"
            role="dialog"
            aria-label="AI Portfolio Assistant"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.32em] text-slate-300">
                  AI ASSISTANT
                </p>
                <p className="text-sm font-semibold text-slate-50">
                  {chatProfile.name}
                </p>
                <p className="text-xs text-slate-300">{chatProfile.roleLine}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
                aria-label="Close chatbot"
              >
                <FiX />
              </button>
            </div>

            <div ref={listRef} className="max-h-[360px] overflow-auto p-4">
              <div className="grid gap-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={
                      'max-w-[88%] rounded-2xl border px-4 py-3 text-sm leading-relaxed ' +
                      (m.role === 'user'
                        ? 'ml-auto border-cyan-300/25 bg-cyan-300/10 text-slate-50'
                        : 'border-white/10 bg-white/5 text-slate-200')
                    }
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {quick.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="flex items-center gap-2 border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about education, projects, resume…"
                className="flex-1 rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40"
              />
              <button
                type="submit"
                className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.14)] transition hover:bg-cyan-300/15"
                aria-label="Send"
              >
                <FiSend />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
