'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Character } from '@/components/Error/Character'

// Tạo mảng vị trí cố định cho các ngôi sao
const starPositions = Array.from({ length: 50 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
}));

export default function NotFoundPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1e1033] to-[#2c1654]">
            {/* Stars Background */}
            <div className="absolute inset-0">
                {starPositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-white"
                        style={{
                            top: `${pos.top}%`,
                            left: `${pos.left}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative flex min-h-screen items-center justify-center p-4">
                <div className="flex max-w-4xl flex-col-reverse items-center gap-8 lg:flex-row">
                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <motion.h1
                            className="mb-2 text-7xl font-bold text-white lg:text-8xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            404
                        </motion.h1>
                        <motion.h2
                            className="mb-4 text-2xl font-semibold text-white lg:text-3xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Lost in Space
                        </motion.h2>
                        <motion.p
                            className="mb-8 text-lg text-gray-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            You have reached the edge of the movie universe.
                            <br />
                            The page you are looking for cannot be found.
                        </motion.p>
                        <motion.div
                            className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Link
                                href="/"
                                className="rounded-full bg-white px-8 py-3 text-center font-semibold text-[#2c1654] transition-transform hover:scale-105"
                            >
                                GO HOME
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="rounded-full border border-white px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
                            >
                                GO BACK
                            </button>
                        </motion.div>
                    </div>

                    {/* Astronaut Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Character />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}