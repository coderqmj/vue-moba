<template>
  <div class="categoryCreate">
    <h1>{{id ? '编辑': '新建'}}物品</h1>
    <!-- native表示原生表单， prevent表示阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
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
  data() {
    return {
      model: {}
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      // 1.有id就是修改(put)请求，没有则是post提交请求
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
        // console.log(res)
        if (res.status !== 200) return this.$message.error("修改失败");
        this.$router.push("/items/list");
        this.$message.success("修改成功");
      } else {
        res = await this.$http.post("rest/items", this.model);
        if (res.status !== 200) return this.$message.error("添加失败");
        this.$router.push("/items/list");
        this.$message.success("添加成功!");
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    afterUpload(res) {
      // console.log(res);
      this.$set(this.model,'icon',res.url)
      // this.model.icon = res.url
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
.avatar-uploader-icon {
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