import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import { useScrollSpy, useScrolled } from '../hooks/useScrollSpy'

const NAV = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact' },
]

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(60)
  const active   = useScrollSpy(NAV.map(n => n.id))

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5 shadow-2xl' : ''}`}
      >
        <div className="cmax flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button onClick={() => go('home')}
            className="flex items-center gap-2.5 font-display font-bold text-lg"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#00f5d4,#6366f1)' }}>
              <Code2 size={17} className="text-ink" />
            </div>
            <span className="grad-text">Britney</span>
          </motion.button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ label, id }) => (
              <motion.button key={id} onClick={() => go(id)}
                className={`relative px-4 py-2 text-sm font-body font-medium rounded-lg transition-colors duration-200
                  ${active === id ? 'text-neon' : 'text-slate-400 hover:text-white'}`}
                whileHover={{ scale: 1.05 }}>
                {active === id && (
                  <motion.span layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(0,245,212,.1)', border: '1px solid rgba(0,245,212,.2)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="relative z-10">{label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:flex">
            <motion.button onClick={() => go('contact')} className="btn-glow text-xs"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span>Hire Britney</span>
            </motion.button>
          </div>

          <motion.button onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white transition-colors"
            whileTap={{ scale: 0.9 }} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-6 pt-16">
            {NAV.map(({ label, id }, i) => (
              <motion.button key={id}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => { go(id); setOpen(false) }}
                className={`text-2xl font-display font-bold transition-colors
                  ${active === id ? 'text-neon text-neon-glow' : 'text-slate-300 hover:text-white'}`}>
                {label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: NAV.length * 0.06 + 0.1 }}
              onClick={() => { go('contact'); setOpen(false) }}
              className="btn-glow mt-4"><span>Hire Britney</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
