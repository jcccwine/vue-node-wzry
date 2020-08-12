const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  }
})
// 创建数据库表
module.exports = mogoose.model('Item',schema)