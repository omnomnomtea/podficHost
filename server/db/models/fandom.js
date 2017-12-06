const Sequelize = require('sequelize')
const db = require('../db')

const Fandom = db.define('fandom', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
})

module.exports = Fandom

