import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Layers } from 'lucide-react'

const FALLBACK = [
  {
    id:1,
    title:'Flutter Todo App',
    description:'Cross-platform task management application with task creation, editing, deletion and clean mobile UI built using Flutter.',
    techStack:['Flutter','Dart','Mobile UI'],
    category:'mobile',
    featured:true
  },

  {
    id:2,
    title:'Restaurant App',
    description:'Modern restaurant application with food menu browsing, responsive layouts and interactive user experience.',
    techStack:['Flutter','Dart','UI/UX Design'],
    category:'web',
    featured:true
  },

  {
    id:3,
    title:'Recipe Finder',
    description:'Recipe discovery application that allows users to search and explore meals with dynamic recipe data integration.',
    techStack:['React','JavaScript','API Integration','CSS'],
    category:'web',
    featured:true
  },

  {
    id:4,
    title:'Movie Finder',
    description:'Interactive movie search platform displaying movie information, ratings and posters using external APIs.',
    techStack:['React','API Integration','JavaScript','CSS'],
    category:'web',
    featured:false
  },

  {
    id:5,
    title:'3D Photos Project',
    description:'Creative frontend project focused on displaying immersive 3D-style photo effects and interactive visual experiences.',
    techStack:['JavaScript','CSS','Frontend Development'],
    category:'frontend',
    featured:false
  },

  {
    id:6,
    title:'Nutrition Expert Bot',
    description:'AI-powered nutrition assistant chatbot designed to provide healthy food recommendations and nutrition guidance.',
    techStack:['React','AI Chatbot','JavaScript','API'],
    category:'ai',
    featured:true
  },
]

const FILTERS = ['all','web','mobile','frontend','ai']

const CAT_CLR = {
  web:'text-sky-400',
  mobile:'text-amber-400',
  frontend:'text-violet-400',
  ai:'text-neon'
}

function Card({ project, i }) {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:32 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:.55, delay:i*0.08, ease:[.16,1,.3,1] }}
      className="card rounded-2xl p-6 flex flex-col group h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
          <Layers size={18} className="text-neon" />
        </div>
      </div>

      <span className={`text-[10px] font-mono font-semibold uppercase tracking-widest mb-2 ${CAT_CLR[project.category]||'text-slate-400'}`}>
        {project.category}
      </span>

      <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-neon transition-colors duration-300">
        {project.title}
      </h3>

      <p className="text-slate-500 font-body text-sm leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map(t => (
          <span key={t} className="pill text-[10px] px-2 py-1">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [projects] = useState(FALLBACK)
  const [filter, setFilter] = useState('all')
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.05 })

  const filtered =
    filter === 'all'
      ? projects
      : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="section relative overflow-hidden"
      style={{ background:'linear-gradient(180deg,#0a0f1e 0%,#030712 100%)' }}>

      <div className="cmax relative z-10" ref={ref}>

        <motion.div className="text-center mb-12"
          initial={{ opacity:0, y:28 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:.6 }}
        >
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] text-white">
            Britney's <span className="grad-text">Projects</span>
          </h2>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold capitalize transition-all duration-200 ${
                filter===f ? 'bg-neon text-ink' : 'text-slate-400 hover:text-white'
              }`}
              whileHover={{ scale:1.05 }}
              whileTap={{ scale:.95 }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p, i) => (
              <Card key={p.id} project={p} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}