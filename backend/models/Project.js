const { DataTypes } = require('sequelize')
const { sequelize }  = require('../config/database')

const Project = sequelize.define('Project', {
  id:          { type: DataTypes.INTEGER,    primaryKey: true, autoIncrement: true },
  title:       { type: DataTypes.STRING(150), allowNull: false },
  description: { type: DataTypes.TEXT,        allowNull: false },
  techStack:   { type: DataTypes.JSON,         defaultValue: [] },
  githubUrl:   { type: DataTypes.STRING(300),  allowNull: true },
  liveUrl:     { type: DataTypes.STRING(300),  allowNull: true },
  imageUrl:    { type: DataTypes.STRING(500),  allowNull: true },
  category: {
    type: DataTypes.ENUM('web', 'mobile', 'backend', 'fullstack', 'other'),
    defaultValue: 'fullstack',
  },
  featured:  { type: DataTypes.BOOLEAN, defaultValue: false },
  sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'projects', timestamps: true })

module.exports = Project
