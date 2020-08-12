<template>
  <div class="about">
    <h1>{{ id? `编辑`:`新增` }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.categories" multiple >
          <el-option v-for="item in categories" :key="item._id"
                  :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";
  export default {
    components: {
      VueEditor
    },
    props: {
      id: {}
    },
    data(){
      return {
        model: {},
        categories: [],
      }
    },
    methods: {
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
  
        const formData = new FormData();
        formData.append("file", file);

        const res = await this.$http.post('upload',formData);
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      },
      // 判断是新建还是编辑，如果是编辑的话编辑后的数据要在数据库里更新
      async save(){        
        let res;// eslint-disable-line no-unused-vars
        if(this.id){
          res = await this.$http.put(`rest/articles/${this.id}`,this.model)
        }
        else {
          // 和服务器文件夹下的admin/index.js里的 router.post('/articles' 对应
          res = await this.$http.post('rest/articles',this.model)
        }
        this.$router.push('/articles/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/articles/${this.id}`)// eslint-disable-line no-unused-vars
        this.model = res.data
      },
      // 在刚进来的时候就要获取到数据库的数据（上级名称的数据）
      async fetchCategories(){
        const res = await this.$http.get(`rest/categories`)// eslint-disable-line no-unused-vars
        this.categories = res.data
      }
    },
    created() {
      this.fetchCategories()
      // 如果有了id，就执行fetch方法
      this.id && this.fetch()
    },
  }

</script>