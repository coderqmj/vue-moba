<template>
  <div class="categoryCreate">
    <h1>{{id ? '编辑': '新建'}}文章</h1>
    <!-- native表示原生表单， prevent表示阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 标题 -->
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <!-- 详情 -->
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
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
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  methods: {
    // 1.自定义上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    // 2.保存按钮
    async save() {
      // 1.有id就是修改(put)请求，没有则是post提交请求
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
        // console.log(res)
        if (res.status !== 200) return this.$message.error("修改失败");
        this.$router.push("/articles/list");
        this.$message.success("修改成功");
      } else {
        res = await this.$http.post("rest/articles", this.model);
        if (res.status !== 200) return this.$message.error("添加失败");
        this.$router.push("/articles/list");
        this.$message.success("添加成功!");
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    // 从后台获取父级分类
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  }
};
</script>

<style>
</style>