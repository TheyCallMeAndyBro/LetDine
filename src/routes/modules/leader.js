const express = require('express')
const router = express.Router()
const leaderController = require('../../controllers/leader-controllers')
const groupController = require('../../controllers/group-controllers')


router.get('/groups/:groupId/restaurants/:restaurantId/:userId/name', groupController.getGroupName)
router.post('/groups/:groupId/restaurants/:restaurantId/:userId/name', groupController.postGroupName)
router.get('/groups/:groupId/restaurants/:restaurantId/:userId/food', groupController.getGroupFood)
router.post('/groups/:groupId/restaurants/:restaurantId/:userId/food', groupController.postGroupFood)
router.get('/groups/:groupId/restaurants/:restaurantId/:userId/page', groupController.getGroupPage)
router.put('/groups/:groupId/restaurants/:restaurantId/:userId/page', groupController.putGroupPage)
router.get('/groups/created_successfully', groupController.getGroup)

router.delete('/grouplists/:groupId', groupController.deleteGroupLists)
router.patch('/grouplists/:groupId', groupController.patchGroupLists)
router.get('/grouplists', groupController.getGroupLists)
router.get('/finshedgroup', groupController.getFinshedGroup)

router.get('/groups/restaurants/:restaurantId/:userId', groupController.getCrateGroup)






router.get('/restaurants/:id', leaderController.getRestaurant)
router.get('/restaurants', leaderController.getRestaurants)


router.get('/', (req, res) => res.redirect('/leader/restaurants'))


module.exports = router