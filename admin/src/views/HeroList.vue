<template>
  <div class="CategoryList">
    <h1>这是英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
            size="small"
          >编辑</el-button>
          <el-button type="primary" @click="remove(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // 获取操作
    async fetch() {
      const res = await this.$http.get("rest/heroes");
      // console.log(res);
      this.items = res.data;
      // console.log(this.heroes)
    },
    // 删除操作
    async remove(row) {
      this.$confirm(`是否要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // 删除操作无需赋值
        await this.$http.delete(`rest/heroes/${row._id}`)
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  }
};
</script>

<style>
</style>