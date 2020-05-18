const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

// 导出的是一个mongoose的模型，哪里需要，就从哪里引入
module.exports = mongoose.model('Ad', schema)