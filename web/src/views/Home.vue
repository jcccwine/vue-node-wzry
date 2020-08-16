<template>
  <div class="home">
    <!-- 轮播图 -->
    <swiper >
      <swiper-slide :option="swiperOptions">
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
  </swiper>
  <!-- end -->
  <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
    <div class="d-flex flex-wrap">
      <div class="nav-item mb-3" v-for="(n,index) in subscript" :key="index">
        <i class="sprite" :class="`${n.spriteClass}`"></i>
        <div class="py-2">{{n.name}}</div>
      </div>
    </div>
    <div class="bg-light py-2 fs-sm">
      <i class="sprite sprite-arrow mr-1"></i>
      <span>收起</span>
    </div>  
  </div>
  <!-- end -->
  <!-- 新闻资讯 -->
  <m-list-card icon="menu-1" title="新闻资讯" :categories="newsCats">
    <template #items="{category}">
      <router-link 
      tag="div"
      :to="`/articles/${news._id}`"
      class="py-2 fs-lg d-flex"
      v-for="(news,newsIndex) in category.newsList" :key="newsIndex">
        <span class="text-info">[{{news.categoryName}}]</span>
        <span class="px-2">|</span>
        <span class="flex-1 text-ellipsis pr-2">{{news.title}}</span>
        <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
      </router-link>
    </template>
    
  </m-list-card>
  <!-- 英雄列表 -->
  <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
    <template #items="{category}">
      <div class="d-flex flex-wrap" style="margin: 0 0.5rem">
        <router-link 
        tag="div"
        :to="`/heroes/${hero._id}`"
        class="p-2 text-center" 
        style="width: 20%;"
        v-for="(hero,heroIndex) in category.heroList" :key="heroIndex">
        <img :src="hero.pic" alt="" class="w-100">
        <div>{{ hero.name }}</div>
      </router-link>
      </div>
    </template>
  </m-list-card>
  <m-list-card icon="iconmenu-1" title="英雄列表" :categories="heroCats">

  </m-list-card>

  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  // 过滤器
  filters: {
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data(){
    return {
      swiperOptions: {
          pagination: {
            el: '.pagination-home',
          },
        },
      subscript: [
        {spriteClass: 'sprite-news', name: '爆料站'},
        {spriteClass: 'sprite-stories', name: '故事站'},
        {spriteClass: 'sprite-malls', name: '周边商城'},
        {spriteClass: 'sprite-exper', name: '体验服'},
        {spriteClass: 'sprite-new-people', name: '新人专区'},
        {spriteClass: 'sprite-honour', name: '荣耀·传承'},
        {spriteClass: 'sprite-camps', name: '王者营地'},
        {spriteClass: 'sprite-cp', name: '同人社区'},
        {spriteClass: 'sprite-public', name: '公众号'},
        {spriteClass: 'sprite-version', name: '版本介绍'}
      ],
      newsCats: [],
      heroCats: []
    };
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchHeroCats()
    this.fetchNewsCats()
  },
}
</script>

<style lang="scss">
  @import '../assets/scss/variables';
  .pagination-home {
    .swiper-pagination {
      opacity: 1;
      border-radius: 0.1538rem;
      background: map-get($colors, 'white' );
      &.swiper-pagination-bullet-active {
        background: map-get($colors, 'info' )
      }
    }
  }
  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n){
        border-right: none;
      }
    }
  }
  
</style>
