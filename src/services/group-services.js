const { Restaurant, Group, Food } = require('../../models')

const groupServices = {
  getCrateGroup: (req, cb) => {
    const { restaurantId, userId } = req.params
    return Group.create({ userId })
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
  putGroupPage: (req, cb) => {
    const { groupId, userId, restaurantId } = req.params
    const { food, price } = req.body
    return Food.findAll({ where: { groupId: req.params.groupId } })
      .then(foods => {
        const updatedFood = foods.map((fooddata, index) => ({
          id: fooddata.id,
          name: food[index],
          price: price[index]
        }))
        return Food.bulkCreate(updatedFood, { updateOnDuplicate: ['name', 'price'], raw: true })
      })
      .then(updateFoods => {
        return cb(null, { food: updateFoods, groupId, userId, restaurantId })
      })
      .catch(err => cb(err))
  },
  getGroupLists: (req, cb) => {
    return Group.findAll({ where: { userId: req.user.id, done: false }, raw: true })
      .then(groups => {
        return cb(null, { groups })
      })
      .catch(err => cb(err))
  },
  patchGroupLists: (req, cb) => {
    return Group.findByPk(req.query.groupId)
      .then(group => {
        return group.update({ done: !group.done })
      })
      .then(updatedGroup => {
        return cb(null, { groups: updatedGroup })
      })
      .catch(err => cb(err))
  },
  deleteGroupLists: (req, cb) => {
    return Group.findByPk(req.query.groupId)
      .then(group => {
        return group.destroy()
      })
      .then(deletedGroup => {
        return cb(null, { groups: deletedGroup })
      })
      .catch(err => cb(err))
  },
  getFinshedGroup: (req, cb) => {
    return Group.findAll({ where: { done: true }, raw: true })
      .then(groups => {
        return cb(null, { groups })
      })
      .catch(err => cb(err))
  },

}

module.exports = groupServices