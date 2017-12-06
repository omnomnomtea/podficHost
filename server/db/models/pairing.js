const Sequelize = require('sequelize')
const db = require('../db')

const Pairing = db.define('pairing', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  pairingType: {
    type: Sequelize.STRING,
    defaultValue: '/',
  },
})

module.exports = Pairing
