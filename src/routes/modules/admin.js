const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controllers')
const upload = require('../../middlewares/multer')

router.get('/restaurants', adminController.getRestaurants)

router.get('/users', adminController.getUsers)
router.patch('/users/:id', adminController.patchUser)
router.patch('/leaders/:id', adminController.patchLeader)
router.get('/restaurants/create', adminController.crateRestaurant)
router.post('/restaurants', upload.fields([{ name: 'image' }, { name: 'menu' }]), adminController.postRestaurant)
router.get('/restaurants/:id/edit', adminController.editRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.put('/restaurants/:id', upload.fields([{ name: 'image' }, { name: 'menu' }]), adminController.putRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)

router.get('/', (req, res) => res.redirect('/admin/restaurants'))

module.exports = router