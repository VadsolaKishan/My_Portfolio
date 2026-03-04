import { motion } from 'framer-motion'
import { FiHeart, FiThumbsUp } from 'react-icons/fi'
import { useLocalStorageState } from '../hooks/useLocalStorageState'


type RatingState = {
  totalRatings: number
  avg: number
  myRating: number
  likes: number
  loves: number
}

const initial: RatingState = {
  totalRatings: 128,
  avg: 4.7,
  myRating: 0,
  likes: 74,
  loves: 39,
}

export function RatePortfolio() {
  const [state, setState] = useLocalStorageState<RatingState>('kv:rating', initial)
  const [flash, setFlash] = useLocalStorageState<number>('kv:ratingFlash', 0)

  const setRating = (r: number) => {
    if (r < 1 || r > 5) return
    if (state.myRating === r) return
    const newTotal = state.totalRatings + 1
    const newAvg = (state.avg * state.totalRatings + r) / newTotal
    setState({ ...state, myRating: r, totalRatings: newTotal, avg: Math.round(newAvg * 10) / 10 })
    setFlash(Date.now())
  }

  return (
    <div className="flex gap-6 w-full max-w-2xl mx-auto flex-col sm:flex-row">
      <div className="flex-1 rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all hover:bg-white/[0.04] hover:border-white/10 flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.32em] text-cyan-400 mb-6 text-center">
            RATE PORTFOLIO
          </p>
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 5 }).map((_, i) => {
              const idx = i + 1
              const active = state.myRating >= idx
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setRating(idx)}
                  className={
                    'grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-2xl border transition-all duration-300 ' +
                    (active
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105 sm:scale-110'
                      : 'border-white/10 bg-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/10 hover:border-white/30 hover:scale-105')
                  }
                  aria-label={`Rate ${idx} star${idx === 1 ? '' : 's'}`}
                >
                  <span className="text-2xl">★</span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-sm px-2">
            <p className="text-slate-400 font-medium">
              Average: <span className="text-white font-bold ml-1">{state.avg.toFixed(1)}/5</span>
            </p>
            <p className="text-slate-400 font-medium">
              Votes: <span className="text-white font-bold ml-1">{state.totalRatings}</span>
            </p>
          </div>

          <motion.div
            key={flash}
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: state.myRating ? 1 : 0, y: 0, height: state.myRating ? 'auto' : 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mt-6 rounded-xl border border-green-500/20 bg-green-500/10 py-3 text-sm font-bold text-green-400 text-center shadow-[0_0_15px_rgba(34,197,94,0.1)] overflow-hidden"
          >
            Thank you! Rating submitted.
          </motion.div>
        </div>
      </div>

      <div className="flex-1 rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all hover:bg-white/[0.04] hover:border-white/10 flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.32em] text-purple-400 mb-6 text-center">
            REACTIONS
          </p>
          <div className="grid gap-4">
            <button
              type="button"
              onClick={() => setState({ ...state, likes: state.likes + 1 })}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm font-bold text-slate-300 transition-all hover:bg-white/10 hover:border-white/30 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <FiThumbsUp size={20} className="text-blue-400 group-hover:scale-125 transition-transform" />
                <span>Like</span>
              </div>
              <span className="text-slate-400 group-hover:text-blue-300">{state.likes}</span>
            </button>
            <button
              type="button"
              onClick={() => setState({ ...state, loves: state.loves + 1 })}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5 text-sm font-bold text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all hover:bg-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:text-white"
            >
              <div className="flex items-center gap-3">
                <FiHeart size={20} className="text-purple-400 group-hover:scale-125 transition-transform group-hover:fill-purple-400" />
                <span>Love</span>
              </div>
              <span className="text-purple-300 group-hover:text-white">{state.loves}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
