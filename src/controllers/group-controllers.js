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
  deleteGroupPage: (req, res, next) => {
    groupServices.deleteGroupPage(req, (err, data) => {
      if (err) return next(err)
      const { restaurantId, userId, groupId } = data
      req.flash('success_messages', '刪除完成')
      res.redirect(`/leader/groups/${groupId}/restaurants/${restaurantId}/${userId}/page`)
    })
  },
  getGroup: (req, res, next) => {
    req.flash('success_messages', '開團成功')
    return res.redirect('/leader/groupslist')
  },
  getGroupsList: (req, res, next) => {
    groupServices.getGroupsList(req, (err, data) => {
      if (err) return next(err)
      res.render('leader/groupslist', data)
    })
  },
  getShowGroup:(req, res, next) => {
    groupServices.getShowGroup(req, (err, data) => {
    if (err) return next(err)
    res.render('leader/showgroup', data)
  })
},
  patchGroupsList: (req, res, next) => {
    groupServices.patchGroupsList(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '美食團結案!')
      res.redirect('/leader/groupslist')
    })
  },
  getEditGroups: (req, res, next) => {
    groupServices.getEditGroups(req, (err, data) => {
      if (err) return next(err)
      res.render('leader/editgroups', data)
    })
  },
  putEditGroup: (req, res, next) => {
    groupServices.putEditGroup(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '編輯完成')
      res.redirect('/leader/groupslist')
    })
  },
  deleteGroupsList: (req, res, next) => {
    groupServices.deleteGroupsList(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '刪除成功!')
      res.redirect('/leader/groupslist')
    })
  },
  getFinshedGroups: (req, res, next) => {
    groupServices.getFinshedGroups(req, (err, data) => {
      if (err) return next(err)
      res.render('leader/finshedgroups', data)
    })
  },
  getShowFinshedGroup: (req, res, next) => {
    groupServices.getShowFinshedGroup(req, (err, data) => {
      if (err) return next(err)
      res.render('leader/showfinshedgroup', data)
    })
  },

}

module.exports = groupController