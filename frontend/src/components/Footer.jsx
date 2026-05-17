import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Heart, Code2, ArrowUp } from 'lucide-react'

const SOCIALS = [
  { Icon:Github,   href:'https://github.com/neyrren',    label:'GitHub' },
  { Icon:Linkedin, href:'https://linkedin.com/in/britney-norman-8b483a367', label:'LinkedIn' },
  { Icon:Instagram, href:'https://instagram.com/neyrren03', label:'Instagram' },
]

export default function Footer() {
  return (
    <footer className="relative border-t" style={{ borderColor:'rgba(255,255,255,.06)', background:'#030712' }}>
      <div className="cmax py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 font-display font-bold text-base">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#00f5d4,#6366f1)' }}>
              <Code2 size={15} className="text-ink" />
            </div>
            <span className="grad-text">Britney</span>
          </div>

          <p className="text-slate-500 font-body text-xs flex items-center gap-1.5 order-3 sm:order-2">
            © {new Date().getFullYear()} Britney · Built with
            <Heart size={12} className="text-red-500 inline" />
            using React + Vite &amp; Express
          </p>

          <div className="flex items-center gap-2 order-2 sm:order-3">
            {SOCIALS.map(({ Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-neon transition-colors"
                style={{ background:'rgba(255,255,255,.04)' }}
                whileHover={{ scale:1.1, y:-2 }} whileTap={{ scale:.9 }}>
                <Icon size={15} />
              </motion.a>
            ))}
            <motion.button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-neon transition-colors ml-1"
              style={{ background:'rgba(0,245,212,.08)', border:'1px solid rgba(0,245,212,.15)' }}
              whileHover={{ scale:1.1, y:-2 }} whileTap={{ scale:.9 }} aria-label="Back to top">
              <ArrowUp size={15} />
            </motion.button>
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="text-[10px] font-mono text-slate-600 tracking-widest">
            FUTURE_FS_01 · Full Stack Web Development Track · Future Interns 2026 · Britney
          </span>
        </div>
      </div>
    </footer>
  )
}
