<template>
  <div>
    <h3>英雄列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称" width="230"></el-table-column>
      <el-table-column prop="title" label="称号" width="230"></el-table-column>
      <el-table-column prop="pic" label="英雄图片">
        <template slot-scope="scope">
          <img :src="scope.row.pic" alt="" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
        <template slot-scope="scope">
          <el-button type="text" width="180" 
          @click="$router.push(`/hero/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" width="180" 
          @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导出模块本身
export default {
  data(){
    return {
      items: []
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/hero')
      // 把传给前端的数据给data
      this.items = res.data
    },
    async remove(row){
      this.$confirm(`是否删除英雄 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          const res = await this.$http.delete(`rest/hero/${row._id}`)// eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
    }
  },
  // 生命周期钩子函数，创建时期
  created() {
    this.fetch()
  }
}
</script>
