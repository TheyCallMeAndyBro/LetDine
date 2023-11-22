const { Restaurant, Category, User } = require('../../models')
const { localFileHandler } = require('../helpers/file-helper')

const adminServices = {
  getRestaurants: (req, cb) => {
    return Restaurant.findAll({
      raw: true,
      nest: true, //讓他從 Restaurant[Category.id] => Restaurant.Category.id 比較好抓取資料
      include: [Category] //抓取 Category資料
    })
      .then(restaurants => {
        return cb(null, { restaurants })
      })
      .catch(err => cb(err))
  },
  getRestaurant: (req, cb) => {
    return Restaurant.findByPk(req.params.id, {
      include: [Category]
    })
      .then(restaurant => {
        if (!restaurant) throw new Error('Restaurant did not Exist!')
        return cb(null, { restaurant: restaurant.toJSON() })
      })
      .catch(err => cb(err))
  },
  createRestaurant: (req, cb) => {
    return Category.findAll({ raw: true })
      .then(categories => {
        return cb(null, { categories })
      })
      .catch(err => cb(err))
  },
  postRestaurant: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Restaurant name is required !')

    const imageFile = req.files.image[0]   //file 要加 s  才是multer正確呼叫格式 如果是複數個file的話
    const menuFile = req.files.menu[0]

    if (imageFile.length === 0 || menuFile.length === 0) throw new Error('please upload image and menu!')

    return Promise.all([localFileHandler(imageFile), localFileHandler(menuFile)])
      .then(([imageFilePath, menuFilePath]) => {
        return Restaurant.create({
          name, tel, address, openingHours, description, categoryId, image: imageFilePath || null, menu: menuFilePath || null
        })
      })
      .then(creadteRestaurant => {
        return cb(null, { restaurant: creadteRestaurant })
      })
      .catch(err => cb(err))
  },
  editRestaurant: (req, cb) => {
    return Promise.all([
      Restaurant.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([restaurant, categories]) => {
        if (!restaurant) throw new Error('Restaurant did not exist!')

        return cb(null, { restaurant, categories })
      })
      .catch(err => cb(err))
  },
  putRestaurant: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Restaurant name is required !')

    const imageFile = req.files.image ? req.files.image[0] : null
    const menuFile = req.files.menu ? req.files.menu[0] : null

    return Promise.all([
      Restaurant.findByPk(req.params.id),
      localFileHandler(imageFile),
      localFileHandler(menuFile)
    ])
      .then(([restaurant, imageFilePath, menuFilePath]) => {
        return restaurant.update({
          name, tel, address, openingHours, description, categoryId,
          image: imageFilePath || restaurant.image,
          menu: menuFilePath || restaurant.menu
        })
      })
      .then(updatedRestaurant => {
        return cb(null, { restaurant: updatedRestaurant.toJSON() })
      })
      .catch(err => cb(err))
  },
  deleteRestaurant: (req, cb) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        if (!restaurant) throw new Error('Restaurant did not exist!')
        // 也可用Restaurant.update寫法 裡面多添加where 就好
        return restaurant.destroy()
      })
      .then(deletedRestaurant => {
        return cb(null, { restaurant: deletedRestaurant })
      })
      .catch(err => cb(err))
  },
  getUsers: (req, cb) => {
    return User.findAll({ raw: true, })
      .then(users => {
        return cb(null, { users })
      })
      .catch(err => cb(err))
  },
  patchUser: (req, res, cb) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error('User did not exist!')
        if (user.email === 'root@example.com') {
          req.flash('error_messages', '禁止變更 root 權限')
          return res.redirect('back')
        }
        return user.update({ isAdmin: !user.isAdmin })
      })
      .then(patchUser => {
        return cb(null, { user: patchUser })
      })
      .catch(err => cb(err))
  },
  patchLeader: (req, res, cb) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error('User did not exist!')
        if (user.email === 'root@example.com') {
          req.flash('error_messages', '禁止變更 root 權限')
          return res.redirect('back')
        }
        return user.update({ isLeader: !user.isLeader })
      })
      .then(patchLeader => {
        return cb(null, { user: patchLeader })
      })
      .catch(err => cb(err))
  },
}

module.exports = adminServices