const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME     || 'portfolio_db',
  process.env.DB_USER     || 'root',
  process.env.DB_PASSWORD || '',
  {
    host:    process.env.DB_HOST || 'localhost',
    port:    Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅  MySQL connected')
    await sequelize.sync({ alter: true })
    console.log('✅  Tables synced')
  } catch (err) {
    console.error('❌  DB error:', err.message)
    process.exit(1)
  }
}

module.exports = { sequelize, connectDB }
