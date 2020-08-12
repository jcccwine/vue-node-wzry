const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String, 
    // 确保密码只散列一次，防止点击保存以后密码被保存成了散列值
    select: false,
    set(val){
      return require('bcrypt').hashSync(val,10)
    }
  }
})  
// 创建数据库表
module.exports = mogoose.model('AdminUser',schema)