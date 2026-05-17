const { DataTypes } = require('sequelize')
const { sequelize }  = require('../config/database')

const Contact = sequelize.define('Contact', {
  id:        { type: DataTypes.INTEGER,     primaryKey: true, autoIncrement: true },
  name:      { type: DataTypes.STRING(100), allowNull: false },
  email:     { type: DataTypes.STRING(150), allowNull: false, validate: { isEmail: true } },
  subject:   { type: DataTypes.STRING(200), allowNull: false },
  message:   { type: DataTypes.TEXT,        allowNull: false },
  isRead:    { type: DataTypes.BOOLEAN,     defaultValue: false },
  ipAddress: { type: DataTypes.STRING(45),  allowNull: true },
}, { tableName: 'contacts', timestamps: true })

module.exports = Contact
