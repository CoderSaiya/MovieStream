import { motion } from "framer-motion"

interface ChibiCharacterProps {
  variant: 'neko' | 'ninja' | 'mage'
  className?: string
}

export function ChibiCharacter({ variant, className = "" }: ChibiCharacterProps) {
  const characters = {
    neko: (
      <svg viewBox="0 0 100 100" className={className}>
        <motion.g
          animate={{
            y: [0, -10, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Neko body */}
          <circle cx="50" cy="50" r="30" fill="#FFB6C1" />
          {/* Ears */}
          <path d="M30 30L40 40L50 30Z" fill="#FFB6C1" />
          <path d="M70 30L60 40L50 30Z" fill="#FFB6C1" />
          {/* Face */}
          <circle cx="40" cy="45" r="5" fill="#000" />
          <circle cx="60" cy="45" r="5" fill="#000" />
          <path d="M45 55Q50 60 55 55" stroke="#000" strokeWidth="2" fill="none" />
          {/* Tail */}
          <motion.path
            d="M80 50Q90 60 85 70"
            stroke="#FFB6C1"
            strokeWidth="8"
            fill="none"
            animate={{ d: ["M80 50Q90 60 85 70", "M80 50Q90 40 85 30", "M80 50Q90 60 85 70"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>
      </svg>
    ),
    ninja: (
      <svg viewBox="0 0 100 100" className={className}>
        <motion.g
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Ninja body */}
          <circle cx="50" cy="50" r="30" fill="#4A5568" />
          {/* Mask */}
          <rect x="35" y="40" width="30" height="10" fill="#2D3748" />
          {/* Eyes */}
          <circle cx="40" cy="45" r="3" fill="#FFF" />
          <circle cx="60" cy="45" r="3" fill="#FFF" />
          {/* Headband */}
          <motion.path
            d="M20 40H80"
            stroke="#FF0000"
            strokeWidth="5"
            animate={{
              strokeDashoffset: [0, 100]
            }}
            style={{
              strokeDasharray: 100
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </motion.g>
      </svg>
    ),
    mage: (
      <svg viewBox="0 0 100 100" className={className}>
        <motion.g
          animate={{
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Mage body */}
          <circle cx="50" cy="50" r="30" fill="#9F7AEA" />
          {/* Hat */}
          <motion.path
            d="M20 50L50 10L80 50"
            fill="#805AD5"
            animate={{
              fill: ['#805AD5', '#6B46C1', '#805AD5']
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          {/* Eyes */}
          <circle cx="40" cy="45" r="4" fill="#FFF" />
          <circle cx="60" cy="45" r="4" fill="#FFF" />
          {/* Magic stars */}
          <motion.g
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              staggerChildren: 0.2
            }}
          >
            <path d="M20 30L25 35L20 40L15 35Z" fill="#F6E05E" />
            <path d="M70 20L75 25L70 30L65 25Z" fill="#F6E05E" />
            <path d="M80 50L85 55L80 60L75 55Z" fill="#F6E05E" />
          </motion.g>
        </motion.g>
      </svg>
    )
  }

  return characters[variant]
}