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
  draft: { //if true, this is a draft and others shouldn't see it
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  textAuthor: {
    type: Sequelize.STRING,
  },
  textAuthorUrl: {
    type: Sequelize.STRING,
  },
  textUrl: {
    type: Sequelize.STRING,
  },
})

module.exports = Podfic
