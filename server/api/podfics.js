const router = require('express').Router()
const {Podfic, Audio, Character, Fandom, Pairing, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Podfic.findAll({})
    .then(podfics => res.json(podfics))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Podfic.create(req.data)
  .then(podfic => res.json(podfic))
  .catch(next)
})

router.get('/recent/:numToFetch/after/:after', (req, res, next) => {
  const numToFetch = Number(req.params.numToFetch)
  const after = Number(req.params.after) || 0;

  Podfic.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    limit: numToFetch,
    offset: after,
    include: [
      Pairing,
      Character,
      Fandom,
      {model: User, through: 'userPodfic', attributes: ['username', 'id']}

    ]
  })
    .then(podfics => res.json(podfics))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Podfic.findOne({
    where: {id},
    include:
     [
       Audio,
       Pairing,
       Character,
       Fandom,
       {model: User, through: 'userPodfic', attributes: ['username', 'id']}
     ],
    })
    .then(podfic => res.json(podfic))
    .catch(next)
})
