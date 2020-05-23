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

    <!-- 英雄基本信息栏 -->
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v=>v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤: 7 &gt;</router-link>
        </div>
      </div>
    </div>

    <!-- 对战信息 -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex pt-3 pb-2 jc-around border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" class="btn btn-lg flex-1" to="/">
                  <i class="iconfont icon-newplayer_play"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" class="btn btn-lg flex-1 ml-2" to="/">
                  <i class="iconfont icon-newplayer_play"></i>英雄介绍视频
                </router-link>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
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
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    // console.log('aaaaaaaa')
    this.fetch();
  }
};
</script>

<style lang="scss">
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.7rem;
      }
    }
  }
}
</style>