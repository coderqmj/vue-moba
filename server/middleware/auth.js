module.exports = options => {
  const assert = require('http-assert')
  const AdminUser = require('../models/AdminUser')
  const jwt = require('jsonwebtoken')
  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    // console.log(req.headers.authorization)
    assert(token, 401, '请登录1')
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录2')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录3')
    await next()
  }
}