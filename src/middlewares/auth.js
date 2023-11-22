const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {

  if (ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/signin')
}

const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if (getUser(req).isAdmin) {
      return next()
    }
    res.redirect('/')
  }
  res.redirect('/signin')
}

const authenticatedLeader = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if (getUser(req).isLeader) {
      return next()
    }
    res.redirect('/')
  }
  res.redirect('/signin')
}


module.exports = {
  authenticated,
  authenticatedAdmin,
  authenticatedLeader
}