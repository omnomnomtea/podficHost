const router = require('express').Router()
module.exports = router


router.use('/users', require('./users'))
router.use('./podfics', require('./podfics'))
router.use('/tags/', require('./tags'))
router.use('/pairings', require('./pairings'))
router.use('/characters', require('./characters'))
router.use('/audios/', require('./audios'))
router.use('/fandoms/', require('./fandoms'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
