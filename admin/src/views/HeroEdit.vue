<template>
  <div class="categoryCreate">
    <h1>{{id ? '编辑': '新建'}}英雄</h1>
    <!-- native表示原生表单， prevent表示阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息" name="basic">
          <!-- 名称区域 -->
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <!-- 称号区域 -->
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <!-- 上传头像区域 -->
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(item,'avatar', res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" style="width:3rem" />
              <i v-else class="el-icon-plus avatar-uploader-icon " style="width:3rem"></i>
            </el-upload>
          </el-form-item>
          <!-- 上传背景图 -->
          <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res =>$set(model,'banner',res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
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
          <!-- 逆风出装 -->
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 使用技巧 -->
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <!-- 对抗技巧 -->
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <!-- 团战思路 -->
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 技能信息 -->
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})" type="primary" size="mini">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <!-- 技能名称 -->
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <!-- 技能图标 -->
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :headers="getAuthHeaders()"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar"  style="width: 3rem"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 3rem"></i>
                </el-upload>
              </el-form-item>
              <!-- 技能描述 -->
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <!-- 小提示 -->
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tip"></el-input>
              </el-form-item>
              <!-- 删除技能 -->
              <el-form-item>
                <el-button @click="model.skills.splice(i,1)" size="mini" type="danger">删除技能</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- 保存按钮 -->
      <el-form-item style="margin-top:1rem;">
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
    // afterUpload(res) {
    //   // console.log(res);
    //   // this.$set(this.model,'avatar',res.url)
    //   this.model.avatar = res.url;
    // }
  }
};
</script>

<style>
</style>