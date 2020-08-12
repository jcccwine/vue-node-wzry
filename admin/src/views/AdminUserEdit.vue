<template>
  <div class="about">
    <h1>{{ id? `编辑`:`新增` }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save"> 
      <el-form-item label="姓名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data(){
      return {
        model: {},
      }
    },
    methods: {
      // 判断是新建还是编辑，如果是编辑的话编辑后的数据要在数据库里更新
      async save(){        
        let res;// eslint-disable-line no-unused-vars
        if(this.id){
          res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)
        }
        else {
          // 和服务器文件夹下的admin/index.js里的 router.post('/admin_users' 对应
          res = await this.$http.post('rest/admin_users',this.model)
        }
        this.$router.push('/admin_users/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/admin_users/${this.id}`)// eslint-disable-line no-unused-vars
        this.model = res.data
      },
    },
    created() {
      // 如果有了id，就执行fetch方法
      this.id && this.fetch()
    },
  }

</script>