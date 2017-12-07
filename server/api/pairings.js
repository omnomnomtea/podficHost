const router = require('express').Router()
const {Pairing, Podfic} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Pairing.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
  })
    .then(pairings => res.json(pairings))
    .catch(next)
})

router.get('/:id/podfics', (req, res, next) => {
  const id = Number(req.params.id)
  Pairing.findById(id)
    .then(pairing => {
      return pairing.getPodfics()
    })
    .then(pairings => res.json(pairings))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Pairing.findById(id)
    .then(pairing => res.json(pairing))
    .catch(next)
})
