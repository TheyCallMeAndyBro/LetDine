const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controllers')
const categoryController = require('../../controllers/category-controllers')
const awsS3Upload = require('../../middlewares/multer')



router.get('/users', adminController.getUsers)
router.patch('/users/:id', adminController.patchUser)
router.patch('/leaders/:id', adminController.patchLeader)

router.get('/restaurants/:id/edit', adminController.editRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.put('/restaurants/:id', awsS3Upload.fields([{ name: 'image' }, { name: 'menu' }]), adminController.putRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)
router.get('/restaurants/create', adminController.crateRestaurant)
router.post('/restaurants', awsS3Upload.fields([{ name: 'image' }, { name: 'menu' }]), adminController.postRestaurant)
router.get('/restaurants', adminController.getRestaurants)

router.get('/categories/:id', categoryController.getCategories)
router.put('/categories/:id', categoryController.putCategory)
router.delete('/categories/:id', categoryController.deleteCategory)
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.postCategory)

router.get('/', (req, res) => res.redirect('/admin/restaurants'))

module.exports = router