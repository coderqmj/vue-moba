const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  title: { type: String },
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tip: { type: String }
    }
  ],
  items1: [
    {
      type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
    }
  ],
  items2: [
    {
      type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
    }
  ],
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  usageTips: { type: String },
  teamTips: { type: String },
  battleTips: { type: String },
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String },
  }]
})

// 导出的是一个mongoose的模型，哪里需要，就从哪里引入
module.exports = mongoose.model('Hero', schema, 'heroes')