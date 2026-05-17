require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const { sequelize, connectDB } = require('../config/database')
const Project = require('../models/Project')
require('../models/Contact') // ensure contacts table created too

const SEEDS = [
  { title: 'E-Commerce Platform',      description: 'Full-stack e-commerce with cart, Stripe checkout and admin dashboard.',         techStack: ['React','Node.js','Express','MySQL','Tailwind CSS'],         githubUrl: 'https://github.com/britney/ecommerce',    liveUrl: 'https://ecommerce-demo.vercel.app', category: 'fullstack', featured: true,  sortOrder: 1 },
  { title: 'Task Management App',      description: 'Kanban board with real-time collaboration via Socket.io and drag-and-drop.',    techStack: ['React','Socket.io','Express','MongoDB','Framer Motion'],   githubUrl: 'https://github.com/britney/taskmanager',  liveUrl: 'https://tasks-demo.netlify.app',    category: 'fullstack', featured: true,  sortOrder: 2 },
  { title: "Britney's Portfolio",      description: 'Personal portfolio — React + Vite frontend, Express + MySQL backend.',          techStack: ['React','Vite','Express','MySQL','Tailwind CSS'],           githubUrl: 'https://github.com/britney/FUTURE_FS_01', liveUrl: null,                                category: 'fullstack', featured: true,  sortOrder: 3 },
  { title: 'Weather Dashboard',        description: 'Live weather with 7-day forecast and interactive charts.',                     techStack: ['React','Vite','Chart.js','OpenWeatherMap API'],            githubUrl: 'https://github.com/britney/weather',      liveUrl: 'https://weather-dash.vercel.app',   category: 'web',       featured: false, sortOrder: 4 },
  { title: 'REST API Boilerplate',     description: 'Production-ready Express API with JWT auth, Swagger docs and Docker.',         techStack: ['Node.js','Express','MySQL','JWT','Docker','Swagger'],      githubUrl: 'https://github.com/britney/rest-api',     liveUrl: null,                                category: 'backend',   featured: false, sortOrder: 5 },
  { title: 'Blog CMS',                 description: 'Headless CMS with rich-text editor, SEO and comment moderation.',              techStack: ['React','Express','MySQL','TipTap','Tailwind CSS'],         githubUrl: 'https://github.com/britney/blog-cms',     liveUrl: null,                                category: 'fullstack', featured: false, sortOrder: 6 },
]

;(async () => {
  try {
    await connectDB()
    const count = await Project.count()
    if (count > 0 && !process.argv.includes('--force')) {
      console.log(`⚠️  ${count} projects exist. Run with --force to overwrite.`)
      await sequelize.close(); process.exit(0)
    }
    if (count > 0) { await Project.destroy({ where: {}, truncate: true }); console.log('🗑  Cleared existing projects') }
    await Project.bulkCreate(SEEDS)
    console.log(`✅  Seeded ${SEEDS.length} projects for Britney's portfolio!\n`)
    const rows = await Project.findAll({ attributes: ['id','title','category','featured'], order: [['sortOrder','ASC']] })
    rows.forEach(r => console.log(`  [${r.id}] ${r.title} — ${r.category}${r.featured ? ' ★' : ''}`))
    await sequelize.close(); process.exit(0)
  } catch (err) {
    console.error('❌  Seeder failed:', err.message); process.exit(1)
  }
})()
