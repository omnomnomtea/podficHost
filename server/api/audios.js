const router = require('express').Router()
const {Audio} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Audio.findAll({})
    .then(audios => res.json(audios))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Audio.findById(id)
    .then(pairing => res.json(pairing))
    .catch(next)
})
