# 🚀 FUTURE_FS_01 — Britney's Portfolio Website

> **Future Interns · Full Stack Web Development Track · Task 1 (2026)**

A modern, fully responsive personal portfolio website built by **Britney**, using **React + Vite** on the frontend and **Express + MySQL** on the backend.

---

## ✨ Sections

| Section | Description |
|---|---|
| **Hero** | Animated intro with typewriter, floating orbs, scan-line and particles |
| **About** | Bio, stats, floating photo card |
| **Skills** | Animated progress bars + tech tag cloud |
| **Projects** | Filterable grid, fetched from MySQL via API |
| **Experience** | Zigzag timeline — work, education & award |
| **Contact** | Validated form → POST `/api/contact` + Nodemailer email |

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite 5, Tailwind CSS 3, Framer Motion 11, Lucide React |
| Backend | Node.js, Express 4, Sequelize 6 |
| Database | MySQL 8 |
| Email | Nodemailer (Gmail SMTP) |

---

## 📁 Project Structure

```
FUTURE_FS_01/
├── backend/
│   ├── config/database.js
│   ├── controllers/{contactController,projectController}.js
│   ├── database/{schema.sql,seed.js,setup-db.sh}
│   ├── models/{Contact,Project}.js
│   ├── routes/{contact,projects}.js
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── App.jsx  main.jsx  index.css
        ├── hooks/useScrollSpy.js
        ├── utils/api.js
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── About.jsx
            ├── Skills.jsx
            ├── Projects.jsx
            ├── Experience.jsx
            ├── Contact.jsx
            └── Footer.jsx
```

---

## 🚀 Quick Start

### 1. Clone

```bash
git clone https://github.com/britney/FUTURE_FS_01.git
cd FUTURE_FS_01
```

### 2. Backend

```bash
cd backend
cp .env.example .env        # fill in your DB & email creds
npm install
node server.js              # → http://localhost:5000
```

**MySQL** — create the database (Sequelize auto-creates tables):

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Or run the SQL file directly:

```bash
mysql -u root -p < backend/database/schema.sql
```

### 3. Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev                 # → http://localhost:5173
```

> Vite proxies `/api/*` → `localhost:5000` automatically — no CORS issues.

---

## 🔌 API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Submit contact form (rate-limited 5/15 min) |
| GET | `/api/contact` | Get all messages |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/featured` | Get featured projects |
| GET | `/api/health` | Health check |

---

## 🗄 Database

Two tables auto-created by Sequelize on first run:

- **`contacts`** — stores form submissions (name, email, subject, message, isRead, ipAddress)
- **`projects`** — stores portfolio projects (title, description, techStack JSON, githubUrl, liveUrl, category, featured, sortOrder)

Seed data (6 demo projects) inserted automatically when the projects table is empty.

---

## 🚢 Deploy

**Frontend → Vercel**
1. Set root directory to `frontend`
2. Add env: `VITE_API_URL=https://your-backend.railway.app/api`

**Backend → Railway / Render**
1. Set root directory to `backend`
2. Add all vars from `.env.example`
3. Start command: `node server.js`

---

## 👩‍💻 Author

**Britney**
- GitHub: [@britney](https://github.com/britney)
- LinkedIn: [linkedin.com/in/britney](https://linkedin.com/in/britney)

---

## 🏷 Task Reference

```
Repository : FUTURE_FS_01
Track      : Full Stack Web Development (FS)
Task       : 01 — Personal Portfolio Website
Intern     : Britney
Cohort     : Future Interns 2026
```
