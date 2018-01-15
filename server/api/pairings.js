const router = require('express').Router()
const {Pairing, Podfic, db} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Pairing.findAll({})
    .then(pairings => res.json(pairings))
    .catch(next)
})


// router.get('/top/:number/byHits', (req, res, next) => {
//   const numberToFind = Number(req.params.number)
//   Pairings.findAll()
//   .then(pairings => {
//   })
// })


router.get('/:id/podfics', (req, res, next) => {
  const id = Number(req.params.id)
  Pairing.findById(id)
    .then(pairing => {
      return pairing.getPodfics()
    })
    .then(podfics => res.json(podfics))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Pairing.findById(id)
    .then(pairing => res.json(pairing))
    .catch(next)
})
