const passport = require('passport')
const LocalStrategy = require('passport-local')
const { User } = require('../../models')
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //設置可以使用req當作第一個參數
  },
  function localStrategyCallback(req, email, password, cb) {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
        bcrypt.compare(password, user.password).then(res => {
          if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
          return cb(null, user)
        })
      })
      .catch(err => cb(err))
  }
))

passport.serializeUser((user, cb) => {
  return cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  return User.findByPk(id)
    .then(user => {
      if (!user) return cb(null, false, req.flash('error_messages', '找不到此用戶!'))
      return cb(null, user.toJSON())
    })
    .catch(err => cb(err))
})


module.exports = {
  passport
}