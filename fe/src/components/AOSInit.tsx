'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function AOSInit({ isOnce = false }: { isOnce?: boolean }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: isOnce,
      easing: 'ease-out'
    })
  }, [])

  return null
}