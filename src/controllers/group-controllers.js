const groupServices = require('../services/group-services')

const groupController = {
  getCrateGroup: (req, res, next) => {
    groupServices.getCrateGroup(req, (err, data) => {
      if (err) return next(err)
      const groupId = data.group.id
      const { restaurantId, userId } = data
      res.redirect(`/leader/groups/${groupId}/restaurants/${restaurantId}/${userId}/name`)
    })
  },
  getGroupName: (req, res, next) => {
    groupServices.getGroupName(req, (err, data) => {
      if (err) return next(err)
      res.render('leader/groupname', data)
    })
  },
  postGroupName: (req, res, next) => {
    groupServices.postGroupName(req, (err, data) => {
      if (err) return next(err)
      const groupId = data.group.id
      const { restaurantId, userId } = data
      res.redirect(`/leader/groups/${groupId}/restaurants/${restaurantId}/${userId}/food`)
    })
  },
  getGroupFood: (req, res, next) => {
    groupServices.getGroupFood(req, (err, data) => err ? next(err) : res.render('leader/groupfood', data))
  },
  postGroupFood: (req, res, next) => {
    groupServices.postGroupFood(req, (err, data) => {
      if (err) return next(err)
    const { restaurantId, userId, groupId } = data
      res.redirect(`/leader/groups/${groupId}/restaurants/${restaurantId}/${userId}/page`)
    })
  },
  getGroupPage: (req, res, next) => {
    groupServices.getGroupPage(req, (err, data) => {
      if (err) return next(err)
      res.render('leader/grouppage', data)
    })
  },
  putGroupPage: (req, res, next) => {
    groupServices.putGroupPage(req, (err, data) => {
      if (err) return next(err)
      const { restaurantId, userId, groupId } = data
      req.flash('success_messages', '編輯完成')
      res.redirect(`/leader/groups/${groupId}/restaurants/${restaurantId}/${userId}/page`)
    })
  },
  getGroup: (req, res, next) => {
    req.flash('success_messages', '開團成功')
    return res.redirect('/leader/grouplists')
  },
  getGroupLists: (req, res, next) => {
    groupServices.getGroupLists(req, (err, data) => {
      if (err) return next(err)
      res.render('leader/grouplists', data)
    })
  }
}

module.exports = groupController