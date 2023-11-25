const { User, Food, Group, Restaurant } = require('../../models')
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
    })
    ])
      .then(([foods, group]) => {
        return cb(null, { foods, group, leaderId, userId })
      })
      .catch(err => cb(err))
  },
}

module.exports = userService