const mongoose = require('mongoose')

// 创建表的规则
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,ref: 'Category'
  }
})

schema.virtual('children',{
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})
schema.virtual('newsList',{
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})
// 创建数据库表
module.exports = mongoose.model('Category',schema)