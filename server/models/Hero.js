const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  name: {
    type: String
  },
  pic: {
    type: String
  },
  // 皮肤
  title: {
    type: String
  },
  // 英雄分类
  categories: [{
    type: mogoose.SchemaTypes.ObjectId,ref: 'Category'
  }],
  // 分数
  scores: {
    difficult: {type: Number},
    skills: {type: Number},
    attack: {type: Number},
    survive: {type: Number}
  },
  // 技能
  skills: [{
    icon: {type: String},
    name: {type: String},
    description: {type: String},
    tips: {type: String}
  }],
  // 出装
  items1: [{
    type: mogoose.SchemaTypes.ObjectId,ref: 'Item'
  }],
  items2: [{
    type: mogoose.SchemaTypes.ObjectId,ref: 'Item'
  }],
  // 使用技巧
  usageTips: {type: String},
  // 对抗技巧
  battleTips: {type: String},
  // 团战思路
  teamTips: {type: String},
  // 英雄关系
  parterns: [{
    hero: {type: mogoose.SchemaTypes.ObjectId,ref: 'Hero'},
    description: {type: String}
  }]

})
// 创建数据库表
module.exports = mogoose.model('Hero',schema)