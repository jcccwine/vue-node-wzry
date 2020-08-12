module.exports = app => {
  const express = require('express')
  // 子路由
  const router = express.Router({
    mergeParams: true
  })

  // 创建分类接口
  router.post('/',async(req,res)=>{
    const model = await (req.Model.create(req.body))
    res.send(model)
  })
  // 编辑以后再保存的分类
  router.put('/:id',async(req,res)=>{
    // 通过id找到对应的数据并进行更新
    const model = await (req.Model.findByIdAndUpdate(req.params.id,req.body))
    res.send(model)
  })
  // 分类列表接口
  router.get('/',async(req,res)=>{
    let queryOptions = {}
    if (req.Model.modelName === 'Category'){
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 编辑分类名称
  router.get('/:id',async(req,res)=>{
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除分类
  router.delete('/:id',async(req,res)=>{
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success: true
    })
  })
  // 将路由挂载到示例下，第一个参数是整个路由文件请求的前半部分地址
  app.use('/admin/api/rest/:resource',async (req,res,next)=>{
    // inflection:改变单词的各种各种形式
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  },router)

  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload',upload.single('file'),async (req,res)=>{
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录接口
  app.post('/admin/api/login',async(req,res)=>{
    const {username,password} = req.body
    // 根据用户名找用户
    const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne(
    // 在数据库里select默认为false，是取不出来的，这里用select是指找到对应的username并且取出它对应的password
    {username}).select('+password')
    // 判断用户是否存在，不存在就报错
    if (!user){
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    // 返回的是个BOOL值
    const isValid =  require('bcrypt').compareSync(password, user.password)
    if (!isValid){
      return res.status(422).send({
        message: '密码错误'
      })
    }


  })


}