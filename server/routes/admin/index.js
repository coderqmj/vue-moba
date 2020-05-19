module.exports = app => {
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const router = express.Router({
    mergeParams: true   //表示合并参数
  })

  // const Category = require('../../models/Categoty') 不需要
  // 1.创建添加分类的接口
  router.post('/', async (req, res) => {
    // const modelName = require('inflection').classify(req.params.resource)
    // const Model = require(`../../models/${modelName}`)
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 1.创建修改分类的接口
  router.put('/:id', async (req, res) => {
    // findByIdAndUpdate找到对应ID并且更新
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 封装登陆校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  // 2.分类列表的接口
  router.get('/',authMiddleware(), async (req, res) => {
    // populate表示关联取出东西，不仅仅可以取到id，可以取到完整的对象信息
    // const items = await req.Model.find().populate('parent').limit(10) // 限制十条数据
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)  // 直接发送给前端
  })
  // 3.获取详情页的接口
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id) // 限制十条数据
    res.send(model)  // 直接发送给前端
  })
  // 4.删除操作
  router.delete('/:id', async (req, res) => {
    // 删除操作不需要赋值
    await req.Model.findByIdAndDelete(req.params.id, req.body) // 限制十条数据
    res.send({
      success: true
    })  // 返回给前端一个success的状态
  })
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  const multer = require('multer')
  // __dirname表示当前文件所在的文件夹
  const upload = multer({ dest: __dirname + '/../../uploads' })
  // sigle表示接受的是单个文件的上传,后面的参数代表字段名
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    // 本来本身在express是没用file这个东西，是因为用了upload中间件
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    // req.body表示客户端传过来的所有数据
    const { username, password } = req.body
    // 1.根据用户名找用户,无法通过密码，数据库里面没有密码
    const user = await AdminUser.findOne({ username }).select('+password')
    // 2.校验密码
    assert(user, 422, '用户不存在')
    console.log(password)

    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理
  app.use(async (err, req, res, next) => {
    // console(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}