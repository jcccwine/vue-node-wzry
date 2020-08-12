const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  name: {
    type: String
  },
  parent: {
    type: mogoose.SchemaTypes.ObjectId,ref: 'Category'
  }
})
// 创建数据库表
module.exports = mogoose.model('Category',schema)