const router = require('express').Router()
const {Fandom} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Fandom.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
  })
    .then(fandoms => res.json(fandoms))
    .catch(next)
})

router.get('/:id/podfics', (req, res, next) => {
  const id = Number(req.params.id)
  Fandom.findById(id)
    .then(fandom => {
      return fandom.getPodfics()
    })
    .then(fandoms => res.json(fandoms))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Fandom.findById(id)
    .then(fandom => res.json(fandom))
    .catch(next)
})
