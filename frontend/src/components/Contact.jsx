import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { contactAPI } from '../utils/api'

const INFO = [
  { Icon:Mail,   label:'Email',    value:'xavierahnorman@gmail.com',        href:'mailto:xavierahnorman@gmail.com' },
  { Icon:Phone,  label:'Phone',    value:'+255 677 320 620',         href:'tel:+255677320620' },
  { Icon:MapPin, label:'Location', value:'Dar es Salaam, Tanzania',  href:null },
]
const INIT = { name:'', email:'', subject:'', message:'' }

export default function Contact() {
  const [form, setForm]     = useState(INIT)
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.06 })

  const set = k => e => setForm(f => ({ ...f, [k]:e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading'); setErrMsg('')
    try {
      await contactAPI.send(form)
      setStatus('success'); setForm(INIT)
    } catch (err) {
      setStatus('error'); setErrMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="section relative overflow-hidden"
      style={{ background:'linear-gradient(180deg,#030712 0%,#0a0f1e 50%,#030712 100%)' }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at bottom, rgba(0,245,212,.07) 0%,transparent 70%)' }} />

      <div className="cmax relative z-10" ref={ref}>
        <motion.div className="text-center mb-14"
          initial={{ opacity:0, y:28 }} animate={inView?{ opacity:1, y:0}:{}} transition={{ duration:.6 }}>
          <p className="label justify-center">Contact</p>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] text-white">
            Work with <span className="grad-text">Britney</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto font-body">
            Have a project in mind? Britney would love to hear about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div className="lg:col-span-2 space-y-5"
            initial={{ opacity:0, x:-40 }} animate={inView?{ opacity:1, x:0}:{}} transition={{ duration:.7 }}>
            {INFO.map(({ Icon, label, value, href }) => (
              <motion.div key={label} whileHover={{ scale:1.02 }}
                className="card rounded-2xl p-5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-neon" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-mono uppercase tracking-widest mb-0.5">{label}</p>
                  {href
                    ? <a href={href} className="text-slate-200 font-body text-sm hover:text-neon transition-colors">{value}</a>
                    : <p className="text-slate-200 font-body text-sm">{value}</p>}
                </div>
              </motion.div>
            ))}
            <div className="card rounded-2xl p-5">
              <p className="text-[11px] text-slate-500 font-mono uppercase tracking-widest mb-2">Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-200 font-body text-sm">Open to opportunities</span>
              </div>
              <p className="text-slate-500 text-xs font-body mt-2">Britney typically responds within 24 hours.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div className="lg:col-span-3"
            initial={{ opacity:0, x:40 }} animate={inView?{ opacity:1, x:0}:{}} transition={{ duration:.7, delay:.08 }}>
            <form onSubmit={handleSubmit} className="card rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] text-slate-400 font-mono uppercase tracking-widest mb-2">Name *</label>
                  <input className="inp" placeholder="Enter your name" value={form.name} onChange={set('name')} required minLength={2} />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 font-mono uppercase tracking-widest mb-2">Email *</label>
                  <input type="email" className="inp" placeholder="Enter your email" value={form.email} onChange={set('email')} required />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 font-mono uppercase tracking-widest mb-2">Subject *</label>
                <input className="inp" placeholder="Project enquiry / collaboration" value={form.subject} onChange={set('subject')} required minLength={3} />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 font-mono uppercase tracking-widest mb-2">Message *</label>
                <textarea className="inp resize-none" rows={5}
                  placeholder="Tell Britney about your project, idea or opportunity…"
                  value={form.message} onChange={set('message')} required minLength={10} />
              </div>

              {status==='success' && (
                <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
                  className="flex items-center gap-2 p-3 rounded-xl text-emerald-400 text-sm font-body"
                  style={{ background:'rgba(52,211,153,.08)', border:'1px solid rgba(52,211,153,.2)' }}>
                  <CheckCircle2 size={16} />Message sent! Britney will get back to you soon.
                </motion.div>
              )}
              {status==='error' && (
                <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
                  className="flex items-center gap-2 p-3 rounded-xl text-red-400 text-sm font-body"
                  style={{ background:'rgba(248,113,113,.08)', border:'1px solid rgba(248,113,113,.2)' }}>
                  <AlertCircle size={16} />{errMsg}
                </motion.div>
              )}

              <motion.button type="submit" disabled={status==='loading'}
                className="btn-glow w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale:status==='loading'?1:1.02 }} whileTap={{ scale:status==='loading'?1:0.97 }}>
                {status==='loading'
                  ? <><Loader2 size={16} className="animate-spin" /><span>Sending…</span></>
                  : <><Send size={15} /><span>Send Message</span></>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
