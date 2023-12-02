const restServices = require('../services/restaurant-services')

const restController = {
  getRestaurants: (req, res, next) => {
    restServices.getRestaurants(req, (err, data) => err ? next(err) : res.render('restaurants', data))
  },
  getRestaurant: (req, res, next) => {
    restServices.getRestaurant(req, (err, data) => err ? next(err) : res.render('restaurant', data))
  }
}

module.exports = restController