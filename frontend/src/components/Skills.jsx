import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CATS = [
  { title:'Frontend',       accent:'#00f5d4', skills:[{ name:'React.js / Vite',pct:92},{ name:'JavaScript ES2024',pct:90},{ name:'TypeScript',pct:78},{ name:'Tailwind CSS',pct:95},{ name:'Framer Motion',pct:80}] },
  { title:'Backend',        accent:'#818cf8', skills:[{ name:'Node.js',pct:88},{ name:'Express.js',pct:90},{ name:'REST APIs',pct:92},{ name:'GraphQL',pct:68},{ name:'WebSockets',pct:74}] },
  { title:'Database',       accent:'#38bdf8', skills:[{ name:'MySQL',pct:85},{ name:'MongoDB',pct:80},{ name:'Redis',pct:65},{ name:'Sequelize ORM',pct:82}] },
  { title:'DevOps & Tools', accent:'#fb923c', skills:[{ name:'Git / GitHub',pct:92},{ name:'Docker',pct:70},{ name:'Linux CLI',pct:78},{ name:'Postman',pct:88}] },
]

const TAGS = ['⚛️ React','🟢 Node.js','🐬 MySQL','🍃 MongoDB','💙 TypeScript','🐳 Docker','🔀 Git','🎨 Tailwind','🚂 Express','🐧 Linux','🔴 Redux','🔷 GraphQL','⚡ Vite','📦 NPM']

function Bar({ name, pct, accent, delay }) {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.3 })
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-[13px] text-slate-300 font-body">{name}</span>
        <span className="text-[11px] text-slate-500 font-mono">{pct}%</span>
      </div>
      <div className="progress-track">
        <motion.div className="progress-fill"
          style={{ background:`linear-gradient(90deg,${accent}88,${accent})` }}
          initial={{ width:0 }}
          animate={inView ? { width:`${pct}%` } : { width:0 }}
          transition={{ duration:1.3, delay, ease:'easeOut' }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.04 })
  return (
    <section id="skills" className="section bg-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
      <div className="cmax relative z-10" ref={ref}>
        <motion.div className="text-center mb-16"
          initial={{ opacity:0, y:28 }} animate={inView?{ opacity:1, y:0}:{}} transition={{ duration:.6 }}>
          <p className="label justify-center">Tech Stack</p>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] text-white">
            Britney's <span className="grad-text">Skills</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto font-body">
            Technologies I use daily to build modern, production-grade applications
          </p>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-2.5 mb-14"
          initial={{ opacity:0 }} animate={inView?{ opacity:1}:{}} transition={{ delay:.15 }}>
          {TAGS.map((tag, i) => (
            <motion.span key={tag} className="pill cursor-default"
              initial={{ opacity:0, scale:.8 }} animate={inView?{ opacity:1, scale:1}:{}}
              transition={{ delay:i*0.04 }} whileHover={{ scale:1.08, y:-3 }}>{tag}
            </motion.span>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATS.map(({ title, accent, skills }, ci) => (
            <motion.div key={title} className="card rounded-2xl p-6"
              initial={{ opacity:0, y:28 }} animate={inView?{ opacity:1, y:0}:{}}
              transition={{ duration:.6, delay:ci*0.09 }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:accent }} />
                <h3 className="font-display font-semibold text-white text-sm tracking-wide">{title}</h3>
              </div>
              <div className="space-y-4">
                {skills.map((s, si) => <Bar key={s.name} {...s} accent={accent} delay={ci*0.09+si*0.07} />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
