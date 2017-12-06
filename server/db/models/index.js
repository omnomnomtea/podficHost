const User = require('./user')
const Fandom = require('./fandom')
const Character = require('./character')
const Pairing = require('./pairing')
const Podfic = require('./podfic')
const Tag = require('./tag')
const Audio = require('./audio')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// tags may be fandom specific (or may be general)
Tag.belongsToMany(Fandom, {through: 'tagFandom'})
Fandom.belongsToMany(Tag, {through: 'tagFandom'})

// characters belong to one or more fandoms
Character.belongsToMany(Fandom, {through: 'characterFandom'})
Fandom.belongsToMany(Character, {through: 'characterFandom'})

// Each pairing has one or more characters
Pairing.belongsToMany(Character, {through: 'characterPairing'})
Character.belongsToMany(Pairing, {through: 'characterPairing'})

// Podfics have characters, pairings, and tags
Podfic.belongsToMany(Character, {through: 'podficCharacter'})
Podfic.belongsToMany(Pairing, {through: 'podficPairing'})
Podfic.belongsToMany(Tag, {through: 'podficTag'})
Tag.belongsToMany(Podfic, {through: 'podficTag'})

// Podfics can have multiple files of various formats
// But each file belongs to only one podfic
Podfic.hasMany(Audio)
Audio.belongsTo(Podfic)

// authorship
// Podfics can have more than one reader
// Readers can have more than one podfic
Podfic.belongsToMany(User, {through: 'userPodfics'})
User.belongsToMany(Podfic, {through: 'userPodfic'})

// Users can belong to wrangling groups for fandoms
User.belongsToMany(Fandom, {through: 'wranglingPrivs'})

// // Users can subscribe to fandoms, podfics, pairings, or characters (FOR LATER)
// User.belongsToMany(Fandom, {through: 'fandomSubscriptions'})
// User.belongsToMany(Podfic, {through: 'podficSubscriptions'})
// User.belongsToMany(Pairing, {through: 'pairingSubscriptions'})
// User.belongsToMany(Character, {through: 'characterSubscriptions'})

// Associate fandoms in a parent-child relationship to allow for nested fandoms
Fandom.belongsToMany(Fandom, {through: 'parentFandom', as: 'child', foreignKey: 'childId'})
Fandom.belongsToMany(Fandom, {through: 'parentFandom', as: 'parent', foreignKey: 'parentId'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Fandom,
  Character,
  Pairing,
  Podfic,
  Tag,
}
