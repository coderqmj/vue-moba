<template>
  <div class="father">
    <div class="form-wrapper">
      <div class="header">LOGIN</div>
      <div class="input-wrapper">
        <div class="border-wrapper">
          <input
            v-model="model.username"
            type="text"
            name="username"
            placeholder="用户名"
            class="border-item"
          />
        </div>
        <div class="border-wrapper">
          <input
            v-model="model.password"
            type="password"
            name="password"
            placeholder="密码"
            class="border-item"
          />
        </div>
      </div>
      <div class="action">
        <div class="btn" @click="login">登录</div>
      </div>
      <div class="icon-wrapper">
        <i class="iconfont phs-weixin"></i>
        <i class="iconfont phs-weibo"></i>
        <i class="iconfont phs-github"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      // 得到一个token
      const res = await this.$http.post("login", this.model);
      // 1.关掉浏览器再打开还会保持登录，sessionStorage是关掉浏览器之后再打开需要重新登录
      localStorage.token = res.data.token
      console.log(res);
      // if (res.status !== 200) {
      //   console.log('aaaaaaa')
      //   return this.$message.error("用户名或密码错误!");
      // }
      this.$message.success('登陆成功')
      this.$router.push("/")
      
    }
  }
};
</script>

<style scoped>
@import url("//at.alicdn.com/t/font_1576261_51iq19kjpqg.css");
* {
  padding: 0;
  margin: 0;
}

html {
  height: 100%;
}
body {
  height: 100%;
  font-family: "JetBrains Mono Medium";
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0e92b3;
}

.form-wrapper {
  width: 300px;
  background-color: rgb(41, 45, 62);
  color: #fff;
  border-radius: 3px;
  padding: 50px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 10%;
}

.form-wrapper .header {
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  line-height: 100px;
}

.form-wrapper .input-wrapper input {
  background-color: rgb(41, 45, 62);
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #fff;
  outline: none;
}
.form-wrapper .input-wrapper input::placeholder {
  text-transform: uppercase;
}

.form-wrapper .input-wrapper .border-wrapper {
  background-image: linear-gradient(to right, #e8198b, #0eb4dd);
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper .input-wrapper .border-wrapper .border-item {
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  border-radius: 30px;
}
.form-wrapper .action {
  display: flex;
  justify-content: center;
}
.form-wrapper .action .btn {
  width: 60%;
  text-transform: uppercase;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 50px;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.2s;
}

.form-wrapper .action .btn:hover {
  background-color: #0e92b3;
}

.form-wrapper .icon-wrapper {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  border-top: 1px dashed rgb(146, 146, 146);
  padding: 20px;
}

.form-wrapper .icon-wrapper i {
  font-size: 20px;
  color: rgb(187, 187, 187);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
}
</style>