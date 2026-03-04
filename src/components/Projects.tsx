import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { projects } from '../data/projects'
import { TiltCard } from './TiltCard'

export function Projects() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {projects.map((p) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="group"
        >
          <TiltCard className="rounded-2xl h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-cyan-500/20 bg-black/60 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.05)] transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]">
              <div className="relative">
                <div className="h-40 w-full bg-gradient-to-br from-cyan-900/40 to-purple-900/40 opacity-90 relative overflow-hidden flex items-center justify-center">
                  <span className="text-4xl text-cyan-500/50">{'< />'}</span>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              <div className="p-6 flex flex-col h-[calc(100%-10rem)]">
                <h3 className="text-xl font-bold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-cyan-100/70 mb-6 flex-grow">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <a
                    href={p.liveUrl ?? '#'}
                    target={p.liveUrl?.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-cyan-400 bg-cyan-500/10 px-4 py-2.5 text-sm font-bold text-cyan-300 transition-all hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                  >
                    <FiExternalLink size={18} /> Demo
                  </a>
                  <a
                    href={p.githubUrl ?? '#'}
                    target={p.githubUrl?.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/20"
                  >
                    <FiGithub size={18} /> GitHub
                  </a>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-cyan-400/50 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  )
}
