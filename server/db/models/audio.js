const Sequelize = require('sequelize')
const db = require('../db')

const Audio = db.define('audio', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  notes: {
    type: Sequelize.TEXT,
  },
  fileType: {
    type: Sequelize.ENUM('mp3', 'm4a/m4b', 'wav')
  },
  audioUrl: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  downloadCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
})

Audio.prototype.incrementDownloadCount = (user) => {
  user.downloadCount++
  return user.update();
}
module.exports = Audio
