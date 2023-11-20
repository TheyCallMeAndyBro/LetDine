const restSevices = require('../services/restaurant-services')

const restController = {
  getRestaurants: (req, res, next) => {
    restSevices.getRestaurants(res, (err, data) => err ? next(err) : res.render('restaurants', data))
  }
}

module.exports = restController