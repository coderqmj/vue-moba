<template>
  <div class="page-hero" v-if="model">
    <!-- 顶部栏 -->
    <div class="topbar bg-black py-2 px-4 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-white ml-2">攻略站</span>
        <!-- <div class="text-grey-1 fs-xxs">团队成就更多</div> -->
      </div>
      <router-link to="/" tag="div" class="text-white">更多英雄 &gt;</router-link>
      <!-- <button type="button" class="btn bg-primary">立即下载</button> -->
    </div>
    {{id}}
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    }
  }
};
</script>

<style>
</style>