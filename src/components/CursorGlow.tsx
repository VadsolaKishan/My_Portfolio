import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate(${x - 180}px, ${y - 180}px)`
      raf = window.requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = window.requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[260px] w-[260px] sm:h-[360px] sm:w-[360px] rounded-full blur-3xl"
      style={{
        background:
          'radial-gradient(circle at 35% 35%, rgba(34,211,238,0.20), transparent 60%), radial-gradient(circle at 65% 60%, rgba(168,85,247,0.16), transparent 55%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
