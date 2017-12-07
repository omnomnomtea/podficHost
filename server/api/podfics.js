const router = require('express').Router()
const {Podfic} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Podfic.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
  })
    .then(podfics => res.json(podfics))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Podfic.findById(id)
    .then(podfic => res.json(podfic))
    .catch(next)
})
