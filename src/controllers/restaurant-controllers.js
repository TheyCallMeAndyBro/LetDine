const restServices = require('../services/restaurant-services')

const restController = {
  getRestaurants: (req, res, next) => {
    restServices.getRestaurants(res, (err, data) => err ? next(err) : res.render('restaurants', data))
  }
}

module.exports = restController