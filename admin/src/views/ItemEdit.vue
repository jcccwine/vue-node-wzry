<template>
  <div class="about">
    <h1>{{ id? `编辑`:`新增` }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      afterUpload(res){
        // 对model进行动态赋值
        this.$set(this.model,'icon',res.url)
        // this.model.icon = res.url
      },
      // 判断是新建还是编辑，如果是编辑的话编辑后的数据要在数据库里更新
      async save(){        
        let res;// eslint-disable-line no-unused-vars
        if(this.id){
          res = await this.$http.put(`rest/items/${this.id}`,this.model)
        }
        else {
          res = await this.$http.post('rest/items',this.model)
        }
        // this.$router.push('/items/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/items/${this.id}`)// eslint-disable-line no-unused-vars
        this.model = res.data
      },
    },
    created() {
      // 如果有了id，就执行fetch方法
      this.id && this.fetch()
    },
  }

</script>

