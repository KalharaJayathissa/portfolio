"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
    children: ReactNode
    direction?: 'left' | 'right'
    className?: string
}

export default function PageTransition({
    children,
    direction = 'right',
    className = ''
}: PageTransitionProps) {
    const variants = {
        initial: {
            x: direction === 'right' ? '100%' : '-100%',
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: direction === 'right' ? '-100%' : '100%',
            opacity: 0
        }
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99] as const
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Multi-layer animation variants
export const layerVariants = {
    background: {
        initial: { x: '100%' },
        animate: {
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99] as const
            }
        },
        exit: {
            x: '-100%',
            transition: {
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99] as const
            }
        }
    },
    content: {
        initial: { x: '-100%', opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                delay: 0.1,
                ease: [0.6, -0.05, 0.01, 0.99] as const
            }
        },
        exit: {
            x: '100%',
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99] as const
            }
        }
    },
    cards: {
        initial: { x: '100%', opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.7,
                delay: 0.2,
                ease: [0.6, -0.05, 0.01, 0.99] as const
            }
        },
        exit: {
            x: '-100%',
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99] as const
            }
        }
    }
}

// Stagger children animation
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const cardVariants = {
    initial: {
        y: 60,
        opacity: 0,
        scale: 0.9
    },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99] as const
        }
    }
}
