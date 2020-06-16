//* require things
const router = require('express').Router()
const tracks = require('../controllers/tracks')
const user = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

//* /tracks routes
router.route('/tracks')
  .get(tracks.index)
  .post(secureRoute, tracks.create)

//* /id routes
router.route('/tracks/:id')
  .get(tracks.single)
  .delete(secureRoute, tracks.delete)
  .put(secureRoute, tracks.update)

//* /register
router.route('/register')
  .post(user.register)

//* /login
router.route('/login')
  .post(user.login)

//* /id/comments
router.route('/tracks/:id/reviews')
  .post(secureRoute, tracks.createReview)

//* delete id comments
router.route('/tracks/:id/reviews/:reviewId')
  .delete(secureRoute, tracks.deleteReview)

router.route('/playlist')
  .post(secureRoute, user.createPlaylist)
  .get(secureRoute, user.getPlaylist)

router.route('/playlist/tracks/:id')
  .delete(secureRoute, user.delete)

module.exports = router