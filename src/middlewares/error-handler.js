module.exports = {
  generalErrorHandler(err, req, res, next) {
    console.error("Error caught by generalErrorHandler:", err)
    if (err instanceof Error) {
      req.flash('error_messages', `${err.name}: ${err.message}`)
    } else {
      req.flash('error_messages', `${err}`)
    }

    res.redirect('back')

    next(err)

  },
}