<template>
  <div class="about">
    <h1>{{ id? `编辑`:`新增` }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <!-- 和数据库里parent字段进行双向绑定 -->
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id"
                  :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
        parents: []
      }
    },
    methods: {
      // 判断是新建还是编辑，如果是编辑的话编辑后的数据要在数据库里更新
      async save(){        
        let res;// eslint-disable-line no-unused-vars
        if(this.id){
          res = await this.$http.put(`rest/categories/${this.id}`,this.model)
        }
        else {
          // 和服务器文件夹下的admin/index.js里的 router.post('/categories' 对应
          res = await this.$http.post('rest/categories',this.model)
        }
        this.$router.push('/categories/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/categories/${this.id}`)// eslint-disable-line no-unused-vars
        this.model = res.data
      },
      // 在刚进来的时候就要获取到数据库的数据（上级名称的数据）
      async fetchParents(){
        const res = await this.$http.get(`rest/categories`)// eslint-disable-line no-unused-vars
        this.parents = res.data
      }
    },
    created() {
      this.fetchParents()
      // 如果有了id，就执行fetch方法
      this.id && this.fetch()
    },
  }

</script>