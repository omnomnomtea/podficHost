const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
})

module.exports = Tag

