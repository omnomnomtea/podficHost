const router = require('express').Router()
const {Fandom} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Fandom.findAll({})
    .then(fandoms => res.json(fandoms))
    .catch(next)
})

router.get('/:id/podfics', (req, res, next) => {
  const id = Number(req.params.id)
  Fandom.findById(id)
    .then(fandom => {
      return fandom.getPodfics()
    })
    .then(podfics => res.json(podfics))
    .catch(next)
})

router.get('/:id/characters', (req, res, next) => {
  const id = Number(req.params.id)
  Fandom.findById(id)
    .then(fandom => {
      return fandom.getCharacters()
    })
    .then(characters => res.json(characters))
    .catch(next)
})

router.get('/:id/pairings', (req, res, next) => {
  const id = Number(req.params.id)
  Fandom.findById(id)
    .then(fandom => {
      return fandom.getPairings()
    })
    .then(pairings => res.json(pairings))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Fandom.findById(id)
    .then(fandom => res.json(fandom))
    .catch(next)
})
