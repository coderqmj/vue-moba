<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{active: active===index}" v-for="(category,index) in categories" :key="index" @click="$refs.list.$swiper.slideTo(index)">
        <div  class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper ref="list" :options="{autoHeight: true}" @slide-change="()=> active = $refs.list.$swiper.realIndex">
        <swiper-slide v-for="(category, index) in categories" :key="index">
          <!-- it needs a slot with name here -->
          <slot name="items" :category="category"></slot>
          <!-- <div class="py-2" v-for="(news,newsIndex) in category.newsList" :key="newsIndex">
            <span>{{news.categoryName}}</span>
            <span>|</span>
            <span>{{news.title}}</span>
            <span>{{news.date}}</span>
          </div> -->
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
import MCard from "./Card";
export default {
  components: {
    MCard
  },
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    // changeCategory(index) {
    //   this.active = index
    // }
  }
};
</script>

<style>
</style>