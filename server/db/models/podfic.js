const Sequelize = require('sequelize')
const db = require('../db')

const Podfic = db.define('podfic', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.STRING,
  },
  audioURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  textUrl: {
    type: Sequelize.STRING,
  },
  draft: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  originalUrl: {
    type: Sequelize.STRING,
  },

})

module.exports = Podfic
