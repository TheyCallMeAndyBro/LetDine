const express = require('express')
const router = express.Router()
const leaderController = require('../../controllers/leader-controllers')
const groupController = require('../../controllers/group-controllers')


router.get('/groups/:groupId/restaurants/:restaurantId/:userId/name', groupController.getGroupName)
router.post('/groups/:groupId/restaurants/:restaurantId/:userId/name', groupController.postGroupName)
router.get('/groups/:groupId/restaurants/:restaurantId/:userId/food', groupController.getGroupFood)
router.post('/groups/:groupId/restaurants/:restaurantId/:userId/food', groupController.postGroupFood)
router.get('/groups/:groupId/restaurants/:restaurantId/:userId/page', groupController.getGroupPage)
router.delete('/groups/:groupId/restaurants/:restaurantId/:userId/page', groupController.deleteGroupPage)
router.get('/groups/created_successfully', groupController.getGroup)

router.get('/groups/:groupId/edit', groupController.getEditGroups)
router.put('/groups/:groupId/restaurants/:restaurantId/:userId/edit', groupController.putEditGroup)
router.delete('/groupslist/:groupId', groupController.deleteGroupsList)
router.patch('/groupslist/:groupId', groupController.patchGroupsList)
router.get('/groupslist', groupController.getGroupsList)
router.get('/finshedgroups', groupController.getFinshedGroups)

router.get('/groups/restaurants/:restaurantId/:userId', groupController.getCrateGroup)






router.get('/restaurants/:id', leaderController.getRestaurant)
router.get('/restaurants', leaderController.getRestaurants)


router.get('/', (req, res) => res.redirect('/leader/restaurants'))


module.exports = router