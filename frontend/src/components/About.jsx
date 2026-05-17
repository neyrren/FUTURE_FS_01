import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, GraduationCap, Briefcase, Coffee, Heart, Download } from 'lucide-react'

const STATS = [
  { label:'Years Exp.',     value:'3+',  Icon:Briefcase },
  { label:'Projects Built', value:'25+', Icon:Heart },
  { label:'Cups of Coffee', value:'∞',   Icon:Coffee },
  { label:'Happy Clients',  value:'10+', Icon:Heart },
]
const INFO = [
  { Icon:MapPin,        text:'Dar es Salaam, Tanzania' },
  { Icon:GraduationCap, text:'B.Sc. Information systems Management' },
  { Icon:Briefcase,     text:'Full Stack Developer' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.08 })
  const slide = (dir, delay=0) => ({
    hidden:  { opacity:0, x: dir==='left' ? -50 : 50 },
    visible: { opacity:1, x:0, transition:{ duration:.7, delay, ease:[.16,1,.3,1] } },
  })

  return (
    <section id="about" className="section relative overflow-hidden"
      style={{ background:'linear-gradient(180deg,#030712 0%,#0a0f1e 50%,#030712 100%)' }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-3/4 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at right, rgba(99,102,241,.06) 0%,transparent 65%)' }} />

      <div className="cmax" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <motion.div variants={slide('left')} initial="hidden" animate={inView?'visible':'hidden'}>
            <div className="relative w-72 sm:w-80 mx-auto lg:mx-0 mb-10">
              <div className="absolute -inset-2 rounded-3xl opacity-30 blur-xl"
                style={{ background:'linear-gradient(135deg,#00f5d4,#6366f1)' }} />
              <div className="relative rounded-2xl overflow-hidden neon-ring"
                style={{ background:'linear-gradient(135deg,#0f172a,#1e293b)' }}>
                <div className="aspect-square flex items-center justify-center text-9xl">👩‍💻</div>
              </div>
              <motion.div animate={{ y:[-6,6,-6] }} transition={{ duration:3.5, repeat:Infinity }}
                className="absolute -bottom-5 -right-5 glass neon-ring rounded-2xl px-4 py-3 text-center min-w-[80px]">
                <p className="text-xl font-display font-bold text-neon">3+</p>
                <p className="text-[10px] text-slate-400 font-mono">Years</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map(({ label, value, Icon }) => (
                <motion.div key={label} whileHover={{ scale:1.03 }}
                  className="card rounded-xl p-4 text-center cursor-default">
                  <Icon size={16} className="text-neon mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-white">{value}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div variants={slide('right',.12)} initial="hidden" animate={inView?'visible':'hidden'}
            className="space-y-6">
            <div>
              <p className="label">About Britney</p>
              <h2 className="font-display font-extrabold leading-tight text-[clamp(2rem,4vw,3.2rem)] text-white">
                Building the web,<br />
                <span className="grad-text">one commit at a time</span>
              </h2>
            </div>

            <p className="text-slate-400 font-body leading-relaxed text-[15px]">
              I'm Britney — a passionate Full Stack Developer who loves turning ideas into polished,
              production-ready web applications. My stack of choice is{' '}
              <span className="text-neon font-medium">React + Vite</span> on the front and{' '}
              <span className="text-neon font-medium">Node.js + MySQL</span> on the back.
            </p>

            <p className="text-slate-400 font-body leading-relaxed text-[15px]">
              I care deeply about performance, accessibility and clean architecture.
              When I'm not shipping features I'm contributing to open source, writing
              technical deep-dives or mentoring junior developers.
            </p>

            <ul className="space-y-2.5">
              {INFO.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-neon" />
                  </div>
                  <span className="text-slate-300 font-body text-sm">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <motion.button onClick={() => document.getElementById('contact').scrollIntoView({ behavior:'smooth' })}
                className="btn-glow" whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
                <span>Get In Touch</span>
              </motion.button>
              <motion.a href="/resume.pdf" download className="btn-ghost"
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
                <Download size={15} />Download CV
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
