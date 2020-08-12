import axios from 'axios'
import Vue from 'vue'

// 创建axios示例
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 响应时的拦截器 通用的错误处理
http.interceptors.response.use(res=>{
  return res
},err=>{
  // 对错误做些什么
  if (err.response.data.message){
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  return Promise.reject(err)
})

export default http