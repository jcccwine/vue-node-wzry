const mongoose = require('mongoose')

// 创建表的规则
const schema = new mongoose.Schema({
  name: { type: String },
  pic: { type: String },
  // 背景图
  banner: { type: String },
  // 皮肤
  title: { type: String },
  // 英雄分类
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,ref: 'Category'
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
    delay: {type: String},
    cost: {type: String},
    description: {type: String},
    tips: {type: String}
  }],
  // 出装
  items1: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
  }],
  items2: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
  }],
  // 使用技巧
  usageTips: {type: String},
  // 对抗技巧
  battleTips: {type: String},
  // 团战思路
  teamTips: {type: String},
  // 英雄关系
  parterns: [{
    hero: {type: mongoose.SchemaTypes.ObjectId,ref: 'Hero'},
    description: {type: String}
  }]

})
// 创建数据库表
module.exports = mongoose.model('Hero',schema,'heroes')