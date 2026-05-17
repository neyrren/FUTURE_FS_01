import { useState, useEffect } from 'react'

export function useScrollSpy(ids, offset = 100) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const fn = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= offset) { setActive(ids[i]); return }
      }
      setActive(ids[0])
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [ids, offset])
  return active
}

export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [threshold])
  return scrolled
}
