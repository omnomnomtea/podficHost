const router = require('express').Router()
const {Tag, Podfic} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Tag.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
  })
    .then(tags => res.json(tags))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Tag.findById(id)
    .then(tag => {
      return tag.getPodfics()
    })
    .then(tags => res.json(tags))
    .catch(next)
})

