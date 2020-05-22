const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body: { type: String }
},{
  timestamps: true
})

// 导出的是一个mongoose的模型，哪里需要，就从哪里引入
module.exports = mongoose.model('Article', schema)