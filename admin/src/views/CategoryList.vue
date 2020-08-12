<template>
  <div>
    <h3>分类列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="230"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
        <template slot-scope="scope">
          <!-- scope.row当前这一行的数据 跳转到categories/edit/${scope.row._id}这个页面-->
          <el-button type="text" width="180" 
          @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
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
      const res = await this.$http.get('rest/categories')
      // 把传给前端的数据给data
      this.items = res.data
    },
    async remove(row){
      this.$confirm(`是否删除分类 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          const res = await this.$http.delete(`rest/categories/${row._id}`)// eslint-disable-line no-unused-vars
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
