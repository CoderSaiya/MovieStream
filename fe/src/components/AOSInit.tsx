'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out'
    })
  }, [])

  return null
}