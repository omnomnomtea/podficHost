const router = require('express').Router()
const { User, Tag, Pairing, Fandom, Character } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({})
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  User.findById(id)
    .then(user => res.json(user))
    .catch(next)
})

router.get('/:id/podfics', (req, res, next) => {
  const id = Number(req.params.id)
  User.findById(id)
    .then(user => {
      return user.getPodfics({
        include: [
          User,
          Tag,
          Pairing,
          Fandom,
          Character
        ]
      })
    })
    .then(podfics => res.json(podfics))
    .catch(next)
})
