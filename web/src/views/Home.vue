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
        <div class="nav-item mb-3" v-for="n in 13" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
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
        <div class="py-2" v-for="(news,newsIndex) in category.newsList" :key="newsIndex">
            <span>[{{news.categoryName}}]</span>
            <span>|</span>
            <span>{{news.title}}</span>
            <span>{{news.date}}</span>
          </div>
      </template>
    </list-card>


    <p>aaaaaa</p>
    <p>aaaaaa</p>
    <p>aaaaaa</p>
    <p>aaaaaa</p>
    <p>aaaaaa</p>
    <p>aaaaaa</p>
    <p>aaaaaa</p>
    <p>aaaaaa</p>
    <p>aaaaaa</p>
    <p>aaaaaa</p>
  </div>
</template>

<script>
// import MCard from "../components/Card";
import ListCard from "../components/ListCard";
export default {
  data() {
    return {
      // swiper setting
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        }
      },
      // news data
      newsCats: [
        {
          name: "热门",
          newsList: [
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
          ]
        },
        {
          name: "新闻",
          newsList: [
            {
              categoryName: "新闻",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "新闻",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "新闻",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "新闻",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
          ]
        },
        {
          name: "公告",
          newsList: [
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
          ]
        },
        {
          name: "活动",
          newsList: [
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
          ]
        },
        {
          name: "赛事",
          newsList: [
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
            {
              categoryName: "公告",
              title: "5.20全服不停机公告",
              date: "5/19"
            },
          ]
        },
      ]
    };
  },
  components: {
    // MCard,
    ListCard
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
