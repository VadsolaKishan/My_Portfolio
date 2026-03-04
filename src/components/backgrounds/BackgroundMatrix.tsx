import { useEffect, useRef } from 'react'
import { useReducedMotion, useInView } from 'framer-motion'

export function BackgroundMatrix() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const isInView = useInView(containerRef, { margin: "0px" })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let w = canvas.width = window.innerWidth
        let h = canvas.height = window.innerHeight

        const columns = Math.floor(w / 14) + 1
        const ypos = Array(columns).fill(0)

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, w, h)
            ctx.fillStyle = '#0f0'
            ctx.font = '14pt monospace'

            ypos.forEach((y, ind) => {
                const text = String.fromCharCode(Math.random() * 128)
                const x = ind * 14
                ctx.fillText(text, x, y)
                if (y > 100 + Math.random() * 10000) ypos[ind] = 0
                else ypos[ind] = y + 14
            })
        }

        const interval = reducedMotion ? 100 : 50
        let timer: ReturnType<typeof setInterval> | null = null;
        if (isInView) {
            timer = setInterval(draw, interval)
        }

        const handleResize = () => {
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        return () => {
            if (timer) clearInterval(timer)
            window.removeEventListener('resize', handleResize)
        }
    }, [reducedMotion, isInView])

    return (
        <div ref={containerRef} className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            <div className="sticky top-0 h-screen w-full">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
                <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wLDBMNCwgME0wLDFMNCwgMU0wLDJMNCwgMk0wLDNMNCwgMyIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-20" />
            </div>
        </div>
    )
}
