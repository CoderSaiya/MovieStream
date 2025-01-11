'use client'

import { motion } from "framer-motion"

export function Character() {
    const staticStars = Array.from({ length: 8 }).map(() => ({
        cx: 100 + Math.random() * 100,
        cy: 50 + Math.random() * 200,
        r: 1 + Math.random() * 2,
    }));

    return (
        <div className="relative">
            {/* Background Shape */}
            <motion.div
                className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
                style={{
                    background: 'linear-gradient(135deg, #2c1654 0%, #1e1033 100%)',
                }}
                animate={{
                    borderRadius: [
                        '40% 60% 70% 30% / 40% 50% 60% 50%',
                        '45% 55% 65% 35% / 45% 55% 55% 45%',
                        '40% 60% 70% 30% / 40% 50% 60% 50%',
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Astronaut SVG */}
            <motion.svg
                viewBox="0 0 300 300"
                className="relative h-[300px] w-[300px]"
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, -2, 2, 0],
                }}
                transition={{
                    y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                    rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            >
                {/* Suit */}
                <motion.g>
                    {/* Main Body */}
                    <path
                        d="M120 140 C120 80 180 80 180 140 L180 200 C180 240 120 240 120 200 Z"
                        fill="#fff"
                        stroke="#e2e8f0"
                        strokeWidth="4"
                    />

                    {/* Helmet */}
                    <g>
                        <circle cx="150" cy="110" r="45" fill="#fff" stroke="#e2e8f0" strokeWidth="4" />
                        <path
                            d="M115 110 C115 80 185 80 185 110"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="4"
                        />

                        {/* Visor */}
                        <motion.path
                            d="M125 105 C125 85 175 85 175 105 C175 125 125 125 125 105"
                            fill="#1e1033"
                            animate={{
                                fill: ['#1e1033', '#2c1654', '#1e1033'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Visor Reflection */}
                        <motion.path
                            d="M130 100 L140 95 L150 93 L160 95"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </g>

                    {/* Arms */}
                    <g>
                        {/* Left Arm */}
                        <motion.path
                            d="M120 150 C90 150 80 180 85 200"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="20"
                            strokeLinecap="round"
                            animate={{
                                d: [
                                    "M120 150 C90 150 80 180 85 200",
                                    "M120 150 C95 155 85 185 85 200",
                                    "M120 150 C90 150 80 180 85 200",
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Right Arm */}
                        <motion.path
                            d="M180 150 C210 150 220 180 215 200"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="20"
                            strokeLinecap="round"
                            animate={{
                                d: [
                                    "M180 150 C210 150 220 180 215 200",
                                    "M180 150 C205 155 215 185 215 200",
                                    "M180 150 C210 150 220 180 215 200",
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.2,
                            }}
                        />
                    </g>

                    {/* Legs */}
                    <g>
                        {/* Left Leg */}
                        <path
                            d="M130 200 L125 240"
                            stroke="#fff"
                            strokeWidth="20"
                            strokeLinecap="round"
                        />

                        {/* Right Leg */}
                        <path
                            d="M170 200 L175 240"
                            stroke="#fff"
                            strokeWidth="20"
                            strokeLinecap="round"
                        />
                    </g>

                    {/* Backpack */}
                    <rect
                        x="135"
                        y="140"
                        width="30"
                        height="40"
                        rx="5"
                        fill="#e2e8f0"
                    />
                </motion.g>

                {/* Stars */}
                {staticStars.map((star, i) => (
                    <motion.circle
                        key={i}
                        cx={star.cx}
                        cy={star.cy}
                        r={star.r}
                        fill="#fff"
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
            </motion.svg>
        </div>
    )
}