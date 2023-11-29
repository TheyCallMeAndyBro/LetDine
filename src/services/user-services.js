const { User, Food, Group, Restaurant, Order, OrderItem } = require('../../models')
const bcrypt = require('bcryptjs')

const userService = {
  postSignup: (req, cb) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')

    return User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Eamil already Exists!')

        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => {
        return User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
      })
      .then(newUser => cb(null, { User: newUser }))
      .catch(err => cb(err))
  },
  getUserOrder: (req, cb) => {
    const { groupId, leaderId, userId } = req.params
    return Promise.all([Food.findAll({
      where: { groupId },
      raw: true
    }),
    Group.findByPk(groupId, {
      include: [Restaurant],
      raw: true,
      nest: true
    }),
    Order.findAll({
      where: { groupId },
      raw: true
    })
    ])
      .then(([foods, group, orders]) => {
        if (orders.some(orders => orders.userId === Number(userId))) throw new Error(`User already join ${group.name} group!`)
        return cb(null, { foods, group, leaderId, userId })
      })
      .catch(err => cb(err))
  },
  postUserOrder: (req, cb) => {
    const { groupId, userId } = req.params
    const { foodId, quantity } = req.body
    return Order.create(
      { groupId, userId },
      { raw: true }
    )
      .then(order => {
        const orderItemFoodData = foodId.map((foodId, index) => ({
          foodId,
          quantity: quantity[index],
          orderId: order.id
        }))
        return OrderItem.bulkCreate(orderItemFoodData)
      })
      .then((orderitem) => {
        return cb(null, { orderitem })
      })
      .catch(err => cb(err))
  },
  getGroupsDetail: (req, cb) => {
    const userId = req.user.id
    return Order.findAll({
      where: { userId },
      include: [{
        model: Group,
        where: { done: false }
      }],
      raw: true,
      nest: true
    })
      .then(orders => {
        return cb(null, { orders })
      })
      .catch(err => cb(err))
  },
  getShowGroupsDetail: (req, cb) => {
    const { groupId } = req.params
    const userId = req.user.id
    return Order.findOne({ where: { userId, groupId } })
      .then(order => {
        return OrderItem.findAll({
          where: { orderId: order.id },
          include: [Food],
          raw: true,
          nest: true
        })
      })
      .then(orderitem => {
        return cb(null, { orderitem, groupId, userId })
      })
      .catch(err => cb(err))
  },
  putUserOrder: (req, cb) => {
    const { foodId, quantity } = req.body
    const { groupId, userId } = req.params
    return Order.findOne({ where: { groupId, userId } })
      .then(order => {
        return OrderItem.findAll({
          where: { orderId: order.id },
          raw: true,
        })
      })
      .then(orderitem => {
        const updatedQuantity = orderitem.map((orderitem, index) => ({
          id: orderitem.id,
          foodId: foodId[index],
          quantity: quantity[index],
          orderId: orderitem.orderId
        }))
        return OrderItem.bulkCreate(updatedQuantity, { updateOnDuplicate: ['id', 'foodId', 'quantity', 'orderId'] })
      })
      .then(updatedorderitem => {
        return cb(null, { orderitem: updatedorderitem })
      })
      .catch(err => cb(err))
  },
  deleteGroupsDetail: (req, cb) => {
    const userId = req.user.id
    return Order.findOne({ where: { userId } })
      .then(group => {
        return group.destroy()
      })
      .then(deleteGroup => {
        return cb(null, { group: deleteGroup })
      })
      .catch(err => cb(err))
  },
}

module.exports = userService