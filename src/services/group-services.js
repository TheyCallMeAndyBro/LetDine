const { Restaurant, Group, Food, User, Order, OrderItem } = require('../../models')

const groupServices = {
  getCrateGroup: (req, cb) => {
    const { restaurantId, userId } = req.params
    return Group.create({ userId, restaurantId })
      .then(group => {
        return cb(null, { group: group.toJSON(), restaurantId, userId })
      })
      .catch(err => cb(err))
  },
  getGroupName: (req, cb) => {
    const { groupId, userId } = req.params
    return Restaurant.findByPk(req.params.restaurantId, { raw: true })
      .then(restaurant => {
        return cb(null, { restaurant, groupId, userId })
      })
      .catch(err => cb(err))
  },
  postGroupName: (req, cb) => {
    const { restaurantId, userId } = req.params
    return Group.findByPk(req.params.groupId)
      .then(group => {
        return group.update({
          name: req.body.name,
          note: req.body.note
        })
      })
      .then(updatedDate => {
        return cb(null, { group: updatedDate, restaurantId, userId })
      })
      .catch(err => cb(err))
  },

  getGroupFood: (req, cb) => {
    const { groupId, userId } = req.params
    return Restaurant.findByPk(req.params.restaurantId, { raw: true })
      .then(restaurant => {
        return cb(null, { restaurant, groupId, userId })
      })
      .catch(err => cb(err))
  },
  postGroupFood: (req, cb) => {
    const { groupId, userId, restaurantId } = req.params

    const food = req.body.food.slice(1)
    const price = req.body.price.slice(1)
    if (food.length === 0 || price.length === 0) throw new Error('At least one item of food and price information is required!')
    if (food.includes('') || price.includes('')) throw new Error('Food and Price is required!')

    const foodData = food.map((foodName, index) => ({
      name: foodName,
      price: price[index],
      groupId
    }))
    return Food.bulkCreate(foodData)
      .then(newfood => {
        return cb(null, { food: newfood, groupId, userId, restaurantId })
      })
      .catch(err => cb(err))
  },
  getGroupPage: (req, cb) => {
    const { groupId, userId } = req.params
    return Promise.all([
      Food.findAll({ where: { groupId: req.params.groupId }, raw: true }),
      Restaurant.findByPk(req.params.restaurantId, { raw: true })
    ])
      .then(([foods, restaurant]) => {
        return cb(null, { foods, restaurant, groupId, userId })
      })
      .catch(err => cb(err))
  },
  deleteGroupPage: (req, cb) => {
    const { groupId, userId, restaurantId } = req.params
    const { foodId } = req.body
    return Food.findByPk(foodId)
      .then(food => {
        return food.destroy()
      })
      .then(deleteFood => {
        return cb(null, { food: deleteFood.toJSON(), groupId, userId, restaurantId })
      })
      .catch(err => cb(err))
  },
  getGroupsList: (req, cb) => {
    return Group.findAll({ where: { userId: req.user.id, done: false }, raw: true })
      .then(groups => {
        return cb(null, { groups })
      })
      .catch(err => cb(err))
  },
  patchGroupsList: (req, cb) => {
    return Group.findByPk(req.params.groupId)
      .then(group => {
        return group.update({ done: !group.done })
      })
      .then(updatedGroup => {
        return cb(null, { groups: updatedGroup })
      })
      .catch(err => cb(err))
  },
  getShowGroup: (req, cb) => {
    const { groupId } = req.params
    return Food.findAll({
      where: { groupId },
      include: [{
        model: OrderItem,
        include: [{
          model: Order,
          include: [User]
        }]
      }],
      raw: true,
      nest: true
    })
      .then(foods => {
        const foodsData = foods.map(f => ({
          ...f,
          totalprice: f.price * f.OrderItems.quantity
        }))

        let groupPrice = 0
        foodsData.forEach(f => groupPrice += f.totalprice)
        return cb(null, { foods: foodsData, groupPrice })
      })
      .catch(err => cb(err))
  },
  getEditGroups: (req, cb) => {
    const userId = req.user.id
    return Promise.all([Group.findByPk(req.params.groupId, {
      include: [Restaurant,],
      raw: true,
      nest: true
    }),
    Food.findAll({ where: { groupId: req.params.groupId }, raw: true })
    ])
      .then(([group, foods]) => {
        return cb(null, { group, foods, userId })
      })
      .catch(err => cb(err))
  },
  putEditGroup: (req, cb) => {
    const { groupId, userId, restaurantId } = req.params
    const { food, price } = req.body
    return Food.findAll({ where: { groupId: req.params.groupId } })
      .then(foods => {
        const updatedFood = foods.map((fooddata, index) => ({
          id: fooddata.id,
          name: food[index],
          price: price[index],
          groupId
        }))
        return Food.bulkCreate(updatedFood, { updateOnDuplicate: ['id', 'name', 'price', 'groupId'] }) // 用這四個參數當作更新值
      })
      .then(updateFoods => {
        return cb(null, { food: updateFoods, groupId, userId, restaurantId })
      })
      .catch(err => cb(err))
  },
  deleteGroupsList: (req, cb) => {
    return Group.findByPk(req.params.groupId)
      .then(group => {
        return group.destroy()
      })
      .then(deletedGroup => {
        return cb(null, { groups: deletedGroup })
      })
      .catch(err => cb(err))
  },
  getFinshedGroups: (req, cb) => {
    return Group.findAll({ where: { userId: req.user.id, done: true }, raw: true })
      .then(groups => {
        return cb(null, { groups })
      })
      .catch(err => cb(err))
  },
  getShowFinshedGroup: (req, cb) => {
    const { groupId } = req.params
    return Food.findAll({
      where: { groupId },
      include: [{
        model: OrderItem,
        include: [{
          model: Order,
          include: [User]
        }]
      }],
      raw: true,
      nest: true
    })
      .then(foods => {
        const foodsData = foods.map(f => ({
          ...f,
          totalprice: f.price * f.OrderItems.quantity
        }))

        let groupPrice = 0
        foodsData.forEach(f => groupPrice += f.totalprice)
        return cb(null, { foods: foodsData, groupPrice })
      })
      .catch(err => cb(err))
  },
}

module.exports = groupServices