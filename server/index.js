const express = require('express')

const app = express()

// 在当前app的实例上设置一个全局
app.set('secret','jksdajhdue')

app.use(require('cors')())
app.use(express.json())
// 托管静态文件
app.use('/',express.static(__dirname+'/web'))
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/uploads',express.static(__dirname+'/uploads'))
// 调用模块方法，在模块里是个箭头函数，app是参数
require('./plugin/db')(app)
require('./routers/admin')(app)
require('./routers/web')(app)


app.listen(3000,()=>{
  console.log('http://localhost:3000');
})