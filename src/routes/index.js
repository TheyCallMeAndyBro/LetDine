const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controllers')

const restController = require('../controllers/restaurant-controllers')
const passport = require('../config/passport')
const { authenticated, authenticatedAdmin } = require('../middlewares/auth')
const admin = require('./modules/admin')

router.use('/admin', authenticatedAdmin, admin)

router.get('/signin', userController.getSigninPage)

router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true // 設置可以使用 flash 
}) ,userController.postSignin)

router.get('/signup', userController.getSignupPage)
router.post('/signup', userController.postSignup)
router.get('/logout', userController.postlogout)

router.get('/restaurants', authenticated, restController.getRestaurants)
router.get('/', (req, res) => res.redirect('/restaurants'))

module.exports = router
