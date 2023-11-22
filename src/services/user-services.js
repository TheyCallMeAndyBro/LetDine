const { User } = require('../../models')
const bcrypt = require('bcryptjs')

const userService = {
  postSignup: (req, cb) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')

    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Eamil already Exists!')

        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
      })
      .then(newUser => cb(null, { User: newUser }))
      .catch(err => cb(err))
  },
}

module.exports = userService