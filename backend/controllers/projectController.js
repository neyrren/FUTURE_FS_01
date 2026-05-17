const Project = require('../models/Project')

const SEEDS = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce with product catalog, cart, Stripe checkout, order tracking and an admin dashboard.',
    techStack: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS', 'Stripe'],
    githubUrl: 'https://github.com/britney/ecommerce',
    liveUrl:   'https://ecommerce-demo.vercel.app',
    category: 'fullstack', featured: true, sortOrder: 1,
  },
  {
    title: 'Task Management App',
    description: 'Kanban-style app with drag-and-drop, real-time collaboration via Socket.io and team workspaces.',
    techStack: ['React', 'Socket.io', 'Express', 'MongoDB', 'Framer Motion'],
    githubUrl: 'https://github.com/britney/taskmanager',
    liveUrl:   'https://tasks-demo.netlify.app',
    category: 'fullstack', featured: true, sortOrder: 2,
  },
  {
    title: "Britney's Portfolio (This Site)",
    description: 'Personal portfolio built for FUTURE_FS_01. React + Vite frontend, Express + MySQL backend, animated with Framer Motion.',
    techStack: ['React', 'Vite', 'Express', 'MySQL', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/britney/FUTURE_FS_01',
    liveUrl:   null,
    category: 'fullstack', featured: true, sortOrder: 3,
  },
  {
    title: 'Weather Dashboard',
    description: 'Live weather from OpenWeatherMap — 7-day forecast, interactive maps and responsive charts.',
    techStack: ['React', 'Vite', 'Chart.js', 'OpenWeatherMap API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/britney/weather',
    liveUrl:   'https://weather-dash.vercel.app',
    category: 'web', featured: false, sortOrder: 4,
  },
  {
    title: 'REST API Boilerplate',
    description: 'Production-ready Express API with JWT auth, RBAC, rate limiting, Swagger docs and Docker compose.',
    techStack: ['Node.js', 'Express', 'MySQL', 'JWT', 'Docker', 'Swagger'],
    githubUrl: 'https://github.com/britney/rest-api',
    liveUrl:   null,
    category: 'backend', featured: false, sortOrder: 5,
  },
  {
    title: 'Blog CMS',
    description: 'Headless CMS for blogs — rich-text editor, tag system, SEO meta and comment moderation.',
    techStack: ['React', 'Express', 'MySQL', 'TipTap', 'Tailwind CSS'],
    githubUrl: 'https://github.com/britney/blog-cms',
    liveUrl:   null,
    category: 'fullstack', featured: false, sortOrder: 6,
  },
]

exports.getProjects = async (_req, res) => {
  try {
    let projects = await Project.findAll({ order: [['sortOrder', 'ASC']] })
    if (!projects.length) {
      await Project.bulkCreate(SEEDS)
      projects = await Project.findAll({ order: [['sortOrder', 'ASC']] })
    }
    res.json({ success: true, data: projects })
  } catch { res.status(500).json({ success: false, message: 'Server error' }) }
}

exports.getFeatured = async (_req, res) => {
  try {
    let projects = await Project.findAll({ where: { featured: true }, order: [['sortOrder', 'ASC']] })
    if (!projects.length) {
      await Project.bulkCreate(SEEDS)
      projects = await Project.findAll({ where: { featured: true }, order: [['sortOrder', 'ASC']] })
    }
    res.json({ success: true, data: projects })
  } catch { res.status(500).json({ success: false, message: 'Server error' }) }
}

exports.createProject = async (req, res) => {
  try {
    const p = await Project.create(req.body)
    res.status(201).json({ success: true, data: p })
  } catch { res.status(500).json({ success: false, message: 'Server error' }) }
}
