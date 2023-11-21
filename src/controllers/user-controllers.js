const userService = require('../services/user-services')


const userController = {
  getSigninPage: (req, res) => {
    return res.render('signin')
  },
  postSignin: (req, res) => {
    req.flash('success_messages', '登入成功')
    return res.redirect('/restaurants')  // 登入邏輯由passport這邊去控制
  },
  getSignupPage: (req, res, next) => {
    return res.render('signup')
  },
  postSignup: (req, res, next) => {
    userService.postSignup(req, (err, data) => {
      if(err) next(err)
      req.flash('success_messages', '註冊成功')
      req.session.createUser = data
      return res.redirect('/signin')
    }) 
  },
}
module.exports = userController