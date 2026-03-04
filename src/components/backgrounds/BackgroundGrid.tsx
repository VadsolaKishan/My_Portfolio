export function BackgroundGrid() {
    return (
        <div className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            {/* Dotted grid (subtle) */}
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.25)_2px,transparent_2px)] [background-size:40px_40px]" />

            {/* Soft vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.9)_100%)]" />

            {/* Ambient glows (kept minimal) */}
            <div className="absolute -top-24 left-1/2 h-[min(30rem,90vw)] w-[min(30rem,90vw)] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
            <div className="absolute -bottom-40 left-1/4 h-[min(32rem,92vw)] w-[min(32rem,92vw)] rounded-full bg-blue-500/10 blur-[160px]" />
        </div>
    )
}
