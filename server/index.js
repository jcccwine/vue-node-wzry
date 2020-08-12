const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())
// 托管静态文件
app.use('/uploads',express.static(__dirname+'/uploads'))
// 调用模块方法，在模块里是个箭头函数，app是参数
require('./plugin/db')(app)
require('./routers/admin')(app)

app.listen(3000,()=>{
  console.log('http://localhost:3000');
})