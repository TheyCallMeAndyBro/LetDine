const { Restaurant, Category, Group, User } = require('../../models')


const restServices = {
  getRestaurants: (req, cb) => {
    const categoryId = Number(req.query.categoryId) || ''
    // 變成數字是因為 id在db資料庫值為integer 然後丟到views也要為number才有辦法比較
    return Promise.all([Restaurant.findAll({
      include: Category,
      where: {
        ...categoryId ? { categoryId } : {}
      },
      raw: true,
      nest: true}),
      Category.findAll({ raw: true })
    ])
      .then(([restaurants, categories]) => {
        const data = restaurants.map(r => ({
          ...r,
          description: r.description.substring(0, 50),
        }))
        return cb(null, {
          restaurants: data,
          categories,
          categoryId
        })
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
  getgroupslist: (req, cb) => {
    return Group.findAll({ 
      where: { userId: req.user.id, done: false }, 
      raw: true,
      nest:true,
      include:[User]
    })
      .then(groups => {
        console.log(groups)
        return cb(null, { groups })
      })
      .catch(err => cb(err))
  },
}

module.exports = restServices