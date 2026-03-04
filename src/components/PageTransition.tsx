import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type PageTransitionProps = {
    children: ReactNode
    id?: string
}

export function PageTransition({ children, id }: PageTransitionProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen relative"
        >
            {children}
        </motion.section>
    )
}
