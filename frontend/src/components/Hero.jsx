import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Instagram, FileDown, Zap } from 'lucide-react'

const ROLES = ['Full Stack Developer', 'React Specialist', 'Node.js Engineer', 'UI/UX Enthusiast', 'Open Source Contributor']
const SOCIALS = [
  { Icon:Github,   href:'https://github.com/neyrren',    label:'GitHub' },
  { Icon:Linkedin, href:'https://linkedin.com/in/britney-norman-8b483a367', label:'LinkedIn' },
  { Icon:Instagram, href:'https://instagram.com/neyrren03', label:'Instagram' },
]

function TypeWriter({ words }) {
  const [display, setDisplay]   = useState('')
  const [wordIdx, setWordIdx]   = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)
  const t = useRef(null)

  useEffect(() => {
    const word = words[wordIdx]
    if (!deleting && charIdx <= word.length) {
      t.current = setTimeout(() => setCharIdx(c => c + 1), 70)
    } else if (!deleting && charIdx > word.length) {
      t.current = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIdx > 0) {
      t.current = setTimeout(() => setCharIdx(c => c - 1), 38)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }
    setDisplay(word.slice(0, charIdx))
    return () => clearTimeout(t.current)
  }, [charIdx, deleting, wordIdx, words])

  return <span className="text-neon font-medium">{display}<span className="animate-blink">|</span></span>
}

const stagger = { visible: { transition: { staggerChildren: 0.11 } } }
const fadeUp  = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16,1,0.3,1] } } }

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink bg-mesh">

      {/* Orbs */}
      <motion.div className="absolute -top-32 -left-48 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,212,.12) 0%, transparent 70%)' }}
        animate={{ scale:[1,1.15,1], opacity:[.6,1,.6] }} transition={{ duration:9, repeat:Infinity, ease:'easeInOut' }} />
      <motion.div className="absolute -bottom-32 -right-48 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,.1) 0%, transparent 70%)' }}
        animate={{ scale:[1.1,1,1.1], opacity:[.5,.9,.5] }} transition={{ duration:11, repeat:Infinity, ease:'easeInOut', delay:2 }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[.027]"
        style={{ backgroundImage:'linear-gradient(rgba(0,245,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,1) 1px,transparent 1px)', backgroundSize:'72px 72px' }} />

      {/* Scan line */}
      <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background:'linear-gradient(90deg,transparent,#00f5d4,transparent)', opacity:.16 }}
        animate={{ y:['-10vh','110vh'] }} transition={{ duration:6, repeat:Infinity, ease:'linear', repeatDelay:1 }} />

      {/* Particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span key={i} className="absolute w-1 h-1 rounded-full bg-neon/30 pointer-events-none"
          style={{ left:`${8 + (i*6.5) % 82}%`, top:`${10 + (i*6.3) % 78}%` }}
          animate={{ y:[-14,14,-14], opacity:[.15,.7,.15] }}
          transition={{ duration:3+(i%4), repeat:Infinity, delay:i*0.37 }} />
      ))}

      <div className="cmax relative z-10 text-center py-32">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">

          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono font-semibold"
              style={{ background:'rgba(0,245,212,.07)', border:'1px solid rgba(0,245,212,.22)', color:'#00f5d4' }}>
              <Zap size={11} />
              Available for work
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={fadeUp} className="font-display font-extrabold leading-none">
            <span className="block text-[clamp(2.2rem,7vw,5.5rem)] text-white/90 mb-2 tracking-tight">Hi, I'm</span>
            <span className="block text-[clamp(2.8rem,9vw,7.5rem)] grad-text tracking-tight">Britney</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={fadeUp}
            className="text-[clamp(1rem,2.5vw,1.4rem)] text-slate-400 font-body h-8 flex justify-center items-center gap-2">
            <span>I'm a</span>
            <TypeWriter words={ROLES} />
          </motion.div>

          {/* Description */}
          <motion.p variants={fadeUp} className="text-slate-500 font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            I craft scalable full-stack web applications — clean code on the backend,
            beautiful interfaces on the frontend, and great experiences for everyone.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-2">
            <motion.button onClick={() => document.getElementById('projects').scrollIntoView({ behavior:'smooth' })}
              className="btn-glow" whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
              <span>View My Work</span>
            </motion.button>
            <motion.a href="/resume.pdf" download className="btn-ghost"
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
              <FileDown size={15} />Download CV
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="flex justify-center gap-3 pt-2">
            {SOCIALS.map(({ Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-neon transition-colors"
                style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)' }}
                whileHover={{ scale:1.12, y:-3 }} whileTap={{ scale:0.9 }}>
                <Icon size={17} />
              </motion.a>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.5 }}>
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:2, repeat:Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
