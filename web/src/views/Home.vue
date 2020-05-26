<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper2.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper3.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="item in card" :key="item">
          <i class="sprite sprite-story"></i>
          <div class="py-2">{{item.title}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav-icons -->

    <!-- this is news card -->
    <list-card icon="news" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news,newsIndex) in category.newsList"
          :key="newsIndex"
        >
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-gery-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </list-card>

    <!-- this is hero card -->
    <list-card icon="hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%;"
            v-for="(hero,heroIndex) in category.heroList"
            :key="heroIndex"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </list-card>
  </div>
</template>

<script>
// import MCard from "../components/Card";
import ListCard from "../components/ListCard";
import dayjs from "dayjs";
export default {
  data() {
    return {
      // swiper setting
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: true
      },
      // news data
      newsCats: [],
      heroCats: [],
      card: [
        { icon: "story", title: "故事" },
        { icon: "news", title: "爆料站" },
        { icon: "yinfdi", title: "营地" },
        { icon: "tiyanfu", title: "体验服" },
        { icon: "xinren", title: "新人" },
        { icon: "ziliaoku", title: "资料库" },
        { icon: "zhoubian", title: "周边" },
        { icon: "gongzhonghao", title: "公众号" }
      ]
    };
  },
  components: {
    // MCard,
    ListCard
  },

  methods: {
    // fetch categories of news
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      console.log(res);
      this.newsCats = res.data;
    },
    // fetch categories of heroes
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>
