<template>
  <div class="about">
    <h1>{{ id? `编辑`:`新增` }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save" style="margin-top:1.5rem">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action=" $http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.pic" :src="model.pic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple >
              <el-option v-for="item in categories" :key="item._id"
              :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top:0.5rem" show-score :max="9" v-model="model.scores.difficult" ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.5rem" show-score :max="9" v-model="model.scores.skills" ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.5rem" show-score :max="9" v-model="model.scores.attack" ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.5rem" show-score :max="9" v-model="model.scores.survive" ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple >
              <el-option v-for="item in items" :key="item._id"
              :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple >
              <el-option v-for="item in items" :key="item._id"
              :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战技巧">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <!-- item指当前的一条数据，就是当前的一组数据，i是索引值 -->
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action=" $http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res=>{$set(item,'icon',res.url)}">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <!-- model.skills是一个数组，利用数组的splice方法裁减掉当前想要删除的技能 -->
                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      
      <el-form-item>
        <el-button style="margin-top:3rem" type="primary" native-type="submit">保存</el-button>
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
        model: {
          name: '',
          pic: '',
          scores: {
            difficult: 0,
            skills: 0,
            attack: 0,
            survive: 0
          }
        },
        categories: [],
        items: [],
      }
    },
    methods: {
      afterUpload(res){
        this.model.pic = res.url
      },
      // 判断是新建还是编辑，如果是编辑的话编辑后的数据要在数据库里更新
      async save(){        
        let res;// eslint-disable-line no-unused-vars
        if(this.id){
          res = await this.$http.put(`rest/hero/${this.id}`,this.model)
        }
        else {
          res = await this.$http.post('rest/hero',this.model)
        }
        this.$router.push('/hero/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/hero/${this.id}`)// eslint-disable-line no-unused-vars
        // 如果直接用res.data会覆盖掉model的数据
        this.model = Object.assign({},this.model,res.data)
      },
      async fetchCategories(){
        const res = await this.$http.get(`rest/categories`)// eslint-disable-line no-unused-vars
        this.categories = res.data
      },
      async fetchItems(){
        const res = await this.$http.get(`rest/items`)// eslint-disable-line no-unused-vars
        this.items = res.data
      },
    },
    created() {
      this.fetchItems()
      this.fetchCategories()
      // 如果有了id，就执行fetch方法
      this.id && this.fetch()
    },
  }

</script>

