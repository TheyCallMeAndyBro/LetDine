const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controllers')

const restController = require('../controllers/restaurant-controllers')
const passport = require('../config/passport')
const { authenticated, authenticatedAdmin, authenticatedLeader } = require('../middlewares/auth')
const admin = require('./modules/admin')
const leader = require('./modules/leader')

router.use('/admin', authenticatedAdmin, admin)
router.use('/leader', authenticatedLeader, leader)

router.get('/signin', userController.getSigninPage)

router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true // 設置可以使用 flash 
}) ,userController.postSignin)

router.get('/signup', userController.getSignupPage)
router.post('/signup', userController.postSignup)
router.get('/logout', userController.postLogout)

router.get('/groups/:groupId/:leaderId/:userId/order', userController.getUserOrder)

router.get('/groupslist', authenticated, restController.getGroupsList)
// router.get('/groupsdetail', authenticated, restController.getgroupsdetail)
router.get('/restaurants/:id', authenticated, restController.getRestaurant)
router.get('/restaurants', authenticated, restController.getRestaurants)
router.get('/', (req, res) => res.redirect('/restaurants'))

module.exports = router
