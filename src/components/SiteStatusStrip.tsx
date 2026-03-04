import { useEffect, useState } from 'react'

import { useLocalStorageState } from '../hooks/useLocalStorageState'

type RatingState = {
  totalRatings: number
  avg: number
  totalScore?: number
  myRating: number
  likes: number
  loves: number
}

const initialRating: RatingState = {
  totalRatings: 128,
  avg: 4.7,
  myRating: 0,
  likes: 74,
  loves: 39,
}

export function SiteStatusStrip() {
  const [visits, setVisits] = useState(0)
  const [rating, setRatingState] = useLocalStorageState<RatingState>('kv:rating', initialRating)

  useEffect(() => {
    const namespace = import.meta.env.VITE_VISITS_NAMESPACE || 'kishan-vadsola-portfolio'
    const key = import.meta.env.VITE_VISITS_KEY || 'visits'
    const countedFlag = 'kv:visitCounted:session'

    const safeParseValue = async (res: Response) => {
      const data = (await res.json()) as { value?: unknown }
      return typeof data.value === 'number' && Number.isFinite(data.value) ? data.value : 0
    }

    const run = async () => {
      try {
        const shouldHit = sessionStorage.getItem(countedFlag) !== '1'
        const endpoint = shouldHit
          ? `https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`
          : `https://api.countapi.xyz/get/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`

        let res = await fetch(endpoint, { cache: 'no-store' })

        if (!res.ok) {
          const createUrl = `https://api.countapi.xyz/create?namespace=${encodeURIComponent(namespace)}&key=${encodeURIComponent(key)}&value=0`
          await fetch(createUrl, { cache: 'no-store' })
          res = await fetch(endpoint, { cache: 'no-store' })
        }

        if (res.ok) {
          const value = await safeParseValue(res)
          setVisits(value)
          if (shouldHit) sessionStorage.setItem(countedFlag, '1')
        }
      } catch {
        return
      }
    }

    void run()
  }, [])

  const totalRatings = Number.isFinite(rating.totalRatings) ? rating.totalRatings : 0
  const baseTotalScore =
    typeof rating.totalScore === 'number' && Number.isFinite(rating.totalScore)
      ? rating.totalScore
      : (Number.isFinite(rating.avg) ? rating.avg : 0) * totalRatings
  const avg = totalRatings > 0 ? baseTotalScore / totalRatings : 0

  const submitRating = (value: number) => {
    if (value < 1 || value > 5) return

    const prev = Number.isFinite(rating.myRating) ? rating.myRating : 0
    const currentTotalRatings = Number.isFinite(rating.totalRatings) ? rating.totalRatings : 0
    const currentTotalScore = baseTotalScore

    if (prev === value) return

    const nextTotalRatings = prev ? currentTotalRatings : currentTotalRatings + 1
    const nextTotalScore = currentTotalScore + value - (prev || 0)
    const nextAvg = nextTotalRatings > 0 ? nextTotalScore / nextTotalRatings : 0

    setRatingState({
      ...rating,
      myRating: value,
      totalRatings: nextTotalRatings,
      totalScore: nextTotalScore,
      avg: Math.round(nextAvg * 10) / 10,
    })
  }

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md shadow-lg">
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <p className="text-sm sm:text-base font-bold tracking-tight text-white">
                  © {new Date().getFullYear()} KISHAN VADSOLA
                </p>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold tracking-[0.22em] uppercase text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.35)]" />
                  Online
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-slate-400">Visits</p>
                  <p className="mt-1 text-sm font-black text-cyan-200">{visits.toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-purple-400/20 bg-purple-500/10 px-3 py-2">
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-purple-200/80">Rating</p>
                  <p className="mt-1 text-sm font-black text-purple-100">
                    {Number.isFinite(avg) ? avg.toFixed(1) : '—'}{' '}
                    <span className="text-purple-200/70 font-bold">/ 5</span>{' '}
                    <span className="text-purple-200/70 font-bold">
                      ({Number.isFinite(rating.totalRatings) ? rating.totalRatings : '—'})
                    </span>
                  </p>

                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const value = i + 1
                      const active = (Number.isFinite(rating.myRating) ? rating.myRating : 0) >= value
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => submitRating(value)}
                          className={
                            'grid h-7 w-7 place-items-center rounded-lg border text-sm font-black transition ' +
                            (active
                              ? 'border-purple-300/40 bg-purple-500/25 text-purple-100'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10')
                          }
                          aria-label={`Rate ${value} star${value === 1 ? '' : 's'}`}
                        >
                          ★
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="col-span-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-slate-400">Built with</p>
                  <p className="mt-1 text-sm font-extrabold text-slate-100">
                    React <span className="text-slate-500">+</span> Vite{' '}
                    <span className="text-slate-500">+</span> Tailwind
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
