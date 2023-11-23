const { Category } = require('../../models')

const categoryServices = {
  getCategories: (req, cb) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
    ])
      .then(([categories, category]) => {
        return cb(null, { categories, category })
      })
      .catch(err => cb(err))
  },
  putCategory: (req, cb) => {
    const { name } = req.body

    if (!name) throw new Error('Category name is required!')

    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("Category doesn't exist!") // 反查，確認要刪除的類別存在，再進行下面刪除動作
        return category.update({ name })
      })
      .then((putCategory) => cb(null, { Category: putCategory }))
      .catch(err => cb(err))
  },
  deleteCategory: (req, cb) => {
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("Category didn't exist!")
        return category.destroy()
      })
      .then((deleteCategory) => cb(null, { Category: deleteCategory }))
      .catch(err => cb(err))
  },
  postCategory: (req, cb) => {
    const { name } = req.body

    if (!name) throw new Error('Category name is required!')

    return Category.create({ name })
      .then(createCategory => cb(null, { Category: createCategory }))
      .catch(err => cb(err))
  }
}

module.exports = categoryServices