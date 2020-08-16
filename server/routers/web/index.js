module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')

  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["8月14日全服不停机优化公告", "8月14日体验服停机更新公告", "“游戏家中国行·王者零距离”活动重启说明", "8月12日净化游戏环境声明及处罚公告", "8月12日外挂专项打击公告", "“缘起峡谷，情定七夕”——《王者荣耀》七夕告白季，邀你来峡谷，表达爱！", "叮！你的潇潇子已抵达王者营地", "策划有话说丨新一系野刀即将到来", "三分之地，阵营对决赢手机周边，快来参与！", "曲韵芳华丨经典咏流传 《数字化破局》新文创微纪录片首期全网上线", "8月14日全服不停机优化公告", "8月14日体验服停机更新公告", "“游戏家中国行·王者零距离”活动重启说明", "8月12日IP核心团招募公告", "8月12日净化游戏环境声明及处罚公告", "【看世冠对决 赢豪华大礼】活动公告", "应援世冠得好礼，墨子两款皮肤重塑完成即将登场", "夏日盛典开启，新英雄阿古朵登场！送皮肤、抽内测惊喜好礼享不停", "【三分探险】活动开启公告", "夏日有好礼，峡谷乐不停"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })
  // 导入新闻资讯信息
  router.get('/news/list', async (req, res) => {
    // const cats = await Category.findOne({
    //   name: '新闻资讯'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门'
          ? news.categories[0].name : cat.name
        return
      })
    })
    res.send(cats)
  })

  // 导入英雄数据
  // router.get('/heroes/init', async (req, res) => {
  //   await Hero.deleteMany({})
  //   const rowData = []
  //   for (let cat of rowData) {
  //     if (cat.name === '热门') {
  //       continue;
  //     }
  //     // 找到当前分类在数据库中对应的数据
  //     const category = await Category.findOne({
  //       name: cat.name
  //     })
  //     cat.heroes = cat.heroes.map(hero => {
  //       hero.categories = [category]
  //       return hero
  //     })
  //     // 录入英雄
  //     await Hero.insertMany(cat.heroes)
  //   }
  //   res.send(await Hero.find())
  // })

  // 英雄列表接口
  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '英雄列表'
    })
    // 聚合查询
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subCats }
      }).limit(10).lean()
    })
    res.send(cats)
  });
  // 文章详情
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean();
    data.related = await Article.find().where({
      categories: { $in: data.categories }
    }).limit(2);
    res.send(data);
  })

  router.get('/heroes/:id', async (req, res) => {
    const data = await Hero.findById(req.params.id).populate('categories items1 items2 parterns.hero').lean()
    res.send(data)
    
  })


  app.use('/web/api', router)
}