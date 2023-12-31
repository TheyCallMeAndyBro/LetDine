const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controllers')

const restController = require('../controllers/restaurant-controllers')
const { passport } = require('../config/passport')
const { authenticated, authenticatedAdmin, authenticatedLeader } = require('../middlewares/auth')
const admin = require('./modules/admin')
const leader = require('./modules/leader')

router.use('/admin', authenticatedAdmin, admin)
router.use('/leader', authenticatedLeader, leader)

router.get('/signin', userController.getSigninPage)

router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true // 設置可以使用 flash 
}), userController.postSignin)

router.get('/signup', userController.getSignupPage)
router.post('/signup', userController.postSignup)
router.get('/logout', userController.postLogout)

router.get('/groups/:groupId/:leaderId/:userId/order', authenticated, userController.getUserOrder)
router.post('/groups/:groupId/:leaderId/:userId/created_successfully', authenticated, userController.postUserOrder)
router.get('/groupsdetail/:groupId/show', authenticated, userController.getShowGroupsDetail)
router.delete('/groupsdetail/:groupId/delete', authenticated, userController.deleteGroupsDetail)
router.put('/groupsdetail/:groupId/:userId/edit', authenticated, userController.putUserOrder)
router.get('/groupsdetail', authenticated, userController.getGroupsDetail)
router.get('/groupslist', authenticated, userController.getGroupsList)
router.get('/chat', authenticated, userController.getChat)

router.get('/restaurants/:id', authenticated, restController.getRestaurant)
router.get('/restaurants', authenticated, restController.getRestaurants)
router.get('/', (req, res) => res.redirect('/restaurants'))

router.get('/', (req, res) => res.json('success'))
module.exports = router
