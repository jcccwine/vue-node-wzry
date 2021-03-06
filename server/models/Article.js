const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  title: {
    type: String
  },
  categories: [{
    type: mogoose.SchemaTypes.ObjectId,ref: 'Category'
  }],
  body: {type: String}
},{
  timestamps: true
})
// 创建数据库表
module.exports = mogoose.model('Article',schema)