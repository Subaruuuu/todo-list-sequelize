// 在 route/index.js 引進
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Please login first!')
    res.redirect('/users/login')
  }
}