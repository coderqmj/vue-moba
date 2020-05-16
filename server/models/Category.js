const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // 传进来的value是一个ObjectId parent:"5ebf77ffa351092fbc300101"(vue插件) ref表示关联哪一个模型(这里是本身)
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

// 导出的是一个mongoose的模型，哪里需要，就从哪里引入
module.exports = mongoose.model('Category', schema)