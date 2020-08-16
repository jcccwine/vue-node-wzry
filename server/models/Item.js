const mongoose = require('mongoose')

// 创建表的规则
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  }
})
// 创建数据库表
module.exports = mongoose.model('Item',schema)