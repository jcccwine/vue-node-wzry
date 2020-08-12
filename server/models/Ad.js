const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  name: {
    type: String
  },
  // 广告位的图片带有链接地址
  items: [{
    image: {type: String},
    url: {type: String}
  }]
})
// 创建数据库表
module.exports = mogoose.model('Ad',schema)