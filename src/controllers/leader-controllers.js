const leaderServices = require('../services/leader-services')

const leaderControllers = {
  getRestaurants: (req, res, next) => {
    leaderServices.getRestaurants(req, (err, data) => err ? next(err) : res.render('leader/restaurants', data))
  },
  getRestaurant: (req, res, next) => {
    leaderServices.getRestaurant(req, (err, data) => err ? next(err) : res.render('leader/restaurant', data))
  },
  getChat: (req, res, next) => {
    leaderServices.getChat(req, (err, data) => err ? next(err) : res.render('leader/chat', data))
  },
}

module.exports = leaderControllers