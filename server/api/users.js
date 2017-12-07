const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'username', 'image', 'bio']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id/podfics', (req, res, next) => {
  const id = Number(req.params.id)
  User.findById(id)
    .then(user => {
      return user.getPodfics()
    })
    .then(podfics => res.json(podfics))
    .catch(next)
})
