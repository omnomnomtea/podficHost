const router = require('express').Router()
const {Character} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Character.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
  })
    .then(characters => res.json(characters))
    .catch(next)
})

router.get('/:id/podfics', (req, res, next) => {
  const id = Number(req.params.id)
  Character.findById(id)
    .then(character => {
      return character.getPodfics()
    })
    .then(characters => res.json(characters))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Character.findById(id)
    .then(character => res.json(character))
    .catch(next)
})
