import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

type Props = {
  children: ReactNode
  className?: string
  maxDeg?: number
}

export function TiltCard({ children, className, maxDeg = 10 }: Props) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const ry = (px - 0.5) * maxDeg
      const rx = -(py - 0.5) * maxDeg

      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
      el.style.setProperty('--px', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--py', `${(py * 100).toFixed(1)}%`)
    }

    const reset = () => {
      el.style.setProperty('--rx', `0deg`)
      el.style.setProperty('--ry', `0deg`)
      el.style.setProperty('--px', `50%`)
      el.style.setProperty('--py', `40%`)
    }

    reset()
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', reset)
    el.addEventListener('pointercancel', reset)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
      el.removeEventListener('pointercancel', reset)
    }
  }, [maxDeg, reducedMotion])

  return (
    <div
      ref={ref}
      className={
        'relative [transform-style:preserve-3d] transition-transform duration-150 ' +
        (reducedMotion
          ? ''
          : '[transform:perspective(900px)_rotateX(var(--rx))_rotateY(var(--ry))]') +
        ' ' +
        (className ?? '')
      }
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px 320px at var(--px) var(--py), rgba(255,255,255,0.12), transparent 55%)',
        }}
      />
      {children}
    </div>
  )
}
