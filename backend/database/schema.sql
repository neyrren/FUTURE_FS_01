-- ============================================================
--  FUTURE_FS_01 — Britney's Portfolio Database Schema
--  MySQL 8.0+
-- ============================================================

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

CREATE TABLE IF NOT EXISTS contacts (
  id          INT           NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL,
  subject     VARCHAR(200)  NOT NULL,
  message     TEXT          NOT NULL,
  isRead      TINYINT(1)    NOT NULL DEFAULT 0,
  ipAddress   VARCHAR(45)            DEFAULT NULL,
  createdAt   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_email (email),
  INDEX idx_isRead (isRead)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS projects (
  id          INT           NOT NULL AUTO_INCREMENT,
  title       VARCHAR(150)  NOT NULL,
  description TEXT          NOT NULL,
  techStack   JSON                   DEFAULT NULL,
  githubUrl   VARCHAR(300)           DEFAULT NULL,
  liveUrl     VARCHAR(300)           DEFAULT NULL,
  imageUrl    VARCHAR(500)           DEFAULT NULL,
  category    ENUM('web','mobile','backend','fullstack','other') NOT NULL DEFAULT 'fullstack',
  featured    TINYINT(1)    NOT NULL DEFAULT 0,
  sortOrder   INT           NOT NULL DEFAULT 0,
  createdAt   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_category (category),
  INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed projects
INSERT INTO projects (title, description, techStack, githubUrl, liveUrl, category, featured, sortOrder) VALUES
('E-Commerce Platform',         'Full-stack e-commerce with cart, Stripe checkout and admin dashboard.',               '["React","Node.js","Express","MySQL","Tailwind CSS"]',          'https://github.com/britney/ecommerce',   'https://ecommerce-demo.vercel.app', 'fullstack', 1, 1),
('Task Management App',         'Kanban board with real-time collaboration via Socket.io and drag-and-drop.',          '["React","Socket.io","Express","MongoDB","Framer Motion"]',     'https://github.com/britney/taskmanager', 'https://tasks-demo.netlify.app',    'fullstack', 1, 2),
("Britney's Portfolio",         'Personal portfolio — React + Vite frontend, Express + MySQL backend.',                '["React","Vite","Express","MySQL","Tailwind CSS"]',             'https://github.com/britney/FUTURE_FS_01', NULL,                              'fullstack', 1, 3),
('Weather Dashboard',           'Live weather with 7-day forecast and interactive charts.',                            '["React","Vite","Chart.js","OpenWeatherMap API"]',               'https://github.com/britney/weather',     'https://weather-dash.vercel.app',   'web',       0, 4),
('REST API Boilerplate',        'Production-ready Express API with JWT auth, RBAC, Swagger docs and Docker.',          '["Node.js","Express","MySQL","JWT","Docker","Swagger"]',         'https://github.com/britney/rest-api',    NULL,                              'backend',   0, 5),
('Blog CMS',                    'Headless CMS with rich-text editor, tag system, SEO and comment moderation.',         '["React","Express","MySQL","TipTap","Tailwind CSS"]',            'https://github.com/britney/blog-cms',    NULL,                              'fullstack', 0, 6);

SELECT 'Setup complete for Britney portfolio!' AS status;
SELECT 'contacts' AS tbl, COUNT(*) AS rows FROM contacts
UNION ALL
SELECT 'projects', COUNT(*) FROM projects;
