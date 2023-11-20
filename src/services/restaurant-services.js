const { Restaurant, Category } = require('../../models')


const restSevices = {
  getRestaurants: (req, cb) => {
    return Restaurant.findAll({
      include: Category,
      raw: true,
      nest: true
    })

      .then(restaurants => {
        const data = restaurants.map(r => ({
          ...r,
          description: r.description.substring(0, 50),
        }))
        return cb(null, {
          restaurants: data
        })
      })
      .catch(err => cb(err))
  }
}

module.exports = restSevices