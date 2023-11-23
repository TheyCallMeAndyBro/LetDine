const categoryServices = require('../services/category-services')

const categoryControllers = {
  getCategories: (req, res, next) => {
    categoryServices.getCategories(req, (err, data) => err ? next(err): res.render('admin/categories', data))
  },
  putCategory: (req, res, next) => {
    categoryServices.putCategory(req, (err, data) => err ? next(err) : res.redirect('/admin/categories'))
  },
  deleteCategory: (req, res, next) => {
    categoryServices.deleteCategory(req, (err, data) => err ? next(err) : res.redirect('/admin/categories'))
  },
  postCategory: (req, res, next) => {
    categoryServices.postCategory(req, (err, data) => err ? next(err) : res.redirect('/admin/categories'))
  },
}

module.exports = categoryControllers