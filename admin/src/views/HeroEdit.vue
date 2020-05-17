<template>
  <div class="categoryCreate">
    <h1>{{id ? '编辑': '新建'}}英雄</h1>
    <!-- native表示原生表单， prevent表示阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 名称区域 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <!-- 称号区域 -->
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <!-- 头像区域 -->
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 类型区域 -->
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item of categories"
            :label="item.name"
            :value="item._id"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 分数区域 -->
      <el-form-item label="难度">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
      </el-form-item>
      <!-- 技能 -->
      <el-form-item label="技能">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
      </el-form-item>
      <!-- 攻击 -->
      <el-form-item label="攻击">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
      </el-form-item>
      <!-- 生存 -->
      <el-form-item label="生存">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
      </el-form-item>
      <!-- 顺风出装 -->
      <el-form-item label="顺风出装">
        <el-select v-model="model.items1" multiple>
          <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
        </el-select>
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
      items: [],
      model: {
        name: "",
        avatar: "",
        scores: {
          difficlut: 0
        }
      },
      categories: []
    };
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    this.id && this.fetch();
  },
  methods: {
    // 1.保存数据
    async save() {
      // 1.有id就是修改(put)请求，没有则是post提交请求
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
        // console.log(res)
        if (res.status !== 200) return this.$message.error("修改失败");
        this.$router.push("/heroes/list");
        this.$message.success("修改成功");
      } else {
        res = await this.$http.post("rest/heroes", this.model);
        if (res.status !== 200) return this.$message.error("添加失败");
        this.$router.push("/heroes/list");
        this.$message.success("添加成功!");
      }
    },
    // 2.获取model数据
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
      console.log(this.model);
    },
    // 3.获取分类数据
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      // console.log(res);
      this.categories = res.data;
    },
    // 4.获取装备数据
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
      // console.log(this.item);
    },
    // 5.上传头像后显示头像
    afterUpload(res) {
      // console.log(res);
      // this.$set(this.model,'avatar',res.url)
      this.model.avatar = res.url;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-avatar {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>