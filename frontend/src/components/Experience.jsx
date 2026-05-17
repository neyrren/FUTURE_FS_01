import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, Award } from 'lucide-react'

const ITEMS = [
  {
    type:'work', Icon:Briefcase,
    role:'Full Stack Developer Intern', org:'Future Interns Program', period:'2026 – Present',
    bullets:[
      'Building responsive full-stack web applications using React, Vite, Django, Express and MySQL',
      'Developing REST APIs, authentication systems and database-driven platforms for real-world projects',
      'Collaborating through GitHub using version control, structured branches and deployment workflows'
    ],
  },
  {
    type:'work', Icon:Briefcase,
    role:'Web Developer', org:'Personal & Academic Projects', period:'2024 – Present',
    bullets:[
      'Designed and developed dynamic systems including charity donation platforms, chat systems and digital letter management systems',
      'Created responsive user interfaces using HTML, CSS, JavaScript, Tailwind CSS and React',
      'Integrated Django backend functionality with PostgreSQL/MySQL databases and REST APIs'
    ],
  },
  {
    type:'education', Icon:GraduationCap,
    role:'B.Sc. Information Systems Management', org:'Ardhi University', period:'2023 – 2026',
    bullets:[
      'Focused on Software Engineering, Web Development and Information Systems',
      'Worked on projects involving AI, AR/VR concepts, smart automation systems and full-stack development',
      'Experienced with Django, React, REST APIs, database management and UI/UX design principles'
    ],
  },
  {
    type:'award', Icon:Award,
    role:'Tech & Innovation Projects', org:'Personal Development', period:'2024 – Present',
    bullets:[
      'Built multiple practical systems solving real-world problems using modern web technologies',
      'Learning AI, Machine Learning, React Native, Next.js and advanced frontend/backend development',
      'Passionate about creating impactful digital solutions for education, charity and community systems'
    ],
  },
]

const ACCENT = { work:'#00f5d4', education:'#818cf8', award:'#fb923c' }

function Item({ item, i }) {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.15 })
  const accent = ACCENT[item.type]
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, x: i%2===0 ? -40 : 40 }}
      animate={inView?{ opacity:1, x:0}:{}}
      transition={{ duration:.65, ease:[.16,1,.3,1] }}
      className={`relative flex gap-6 ${i%2!==0 ? 'lg:flex-row-reverse' : ''}`}>
      <div className="hidden lg:flex flex-col items-center gap-0 shrink-0 w-10">
        <div className="w-4 h-4 rounded-full border-2 mt-1.5 shrink-0 z-10"
          style={{ borderColor:accent, background:'#030712', boxShadow:`0 0 12px ${accent}55` }} />
        {i < ITEMS.length-1 && (
          <div className="flex-1 w-px mt-1" style={{ background:`linear-gradient(to bottom,${accent}55,transparent)` }} />
        )}
      </div>
      <div className="card rounded-2xl p-6 mb-6 flex-1 max-w-xl" style={{ borderColor:`${accent}22` }}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background:`${accent}15` }}>
            <item.Icon size={16} style={{ color:accent }} />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base leading-tight">{item.role}</h3>
            <p className="text-sm font-body mt-0.5" style={{ color:accent }}>{item.org}</p>
          </div>
          <span className="ml-auto text-[11px] font-mono text-slate-500 shrink-0 mt-0.5">{item.period}</span>
        </div>
        <ul className="space-y-1.5 pl-1">
          {item.bullets.map(b => (
            <li key={b} className="flex gap-2 text-slate-400 font-body text-[13px] leading-relaxed">
              <span style={{ color:accent }} className="mt-1.5 shrink-0 text-[8px]">▸</span>{b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.05 })
  return (
    <section id="experience" className="section bg-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="cmax relative z-10" ref={ref}>
        <motion.div className="text-center mb-14"
          initial={{ opacity:0, y:28 }} animate={inView?{ opacity:1, y:0}:{}} transition={{ duration:.6 }}>
          <p className="label justify-center">Journey</p>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] text-white">
            Britney's <span className="grad-text">Experience</span>
          </h2>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          {ITEMS.map((item, i) => <Item key={i} item={item} i={i} />)}
        </div>
      </div>
    </section>
  )
}
