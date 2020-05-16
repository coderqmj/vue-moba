<template>
  <div class="categoryCreate">
    <h1>{{id ? '编辑分类': '新建分类'}}</h1>
    <!-- native表示原生表单， prevent表示阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
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
  data() {
    return {
      model: {},
      parents: []
    };
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
  methods: {
    async save() {
      // 1.有id就是修改(put)请求，没有则是post提交请求
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
        // console.log(res)
        if (res.status !== 200) return this.$message.error("修改失败");
        this.$router.push("/categories/list");
        this.$message.success("修改成功");
      } else {
        res = await this.$http.post("rest/categories", this.model);
        if (res.status !== 200) return this.$message.error("添加失败");
        this.$router.push("/categories/list");
        this.$message.success("添加成功!");
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    // 从后台获取父级分类
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  }
};
</script>

<style>
</style>