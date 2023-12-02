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
      if (err) next(err)
      req.flash('success_messages', '註冊成功')
      req.session.createUser = data
      return res.redirect('/signin')
    })
  },
  postLogout: (req, res, next) => {
    req.flash('success_messages', '登出成功')
    req.logout(err => {
      if (err) return next(err)
      return res.redirect('/signin')
    })
  },
  getGroupsList: (req, res, next) => {
    userService.getGroupsList(req, (err, data) => {
      if (err) return next(err)
      return res.render('groupslist', data)
    })
  },
  getUserOrder: (req, res, next) => {
    userService.getUserOrder(req, (err, data) => {
      if (err) return next(err)
      return res.render('order', data)
    })
  },
  postUserOrder: (req, res, next) => {
    userService.postUserOrder(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '點餐成功')
      return res.redirect('/groupsdetail')
    })
  },
  getGroupsDetail: (req, res, next) => {
    userService.getGroupsDetail(req, (err, data) => {
      if (err) return next(err)
      return res.render('groupsdetail', data)
    })
  },
  getShowGroupsDetail: (req, res, next) => {
    userService.getShowGroupsDetail(req, (err, data) => {
      if (err) return next(err)
      return res.render('showgroupsdetail', data)
    })
  },
  putUserOrder: (req, res, next) => {
    userService.putUserOrder(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '更改成功')
      return res.redirect('/groupsdetail')
    })
  },
  deleteGroupsDetail: (req, res, next) => {
    userService.deleteGroupsDetail(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '退出成功')
      return res.redirect('/groupsdetail')
    })
  },
  getChat: (req, res) => {
    userService.getChat(req, (err, data) => {
      if (err) return next(err)
      return res.render('chat', data)
    })
  }
}
module.exports = userController