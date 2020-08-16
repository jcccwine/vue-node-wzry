<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30">
      <div class="px-3 flex-1">
        <span>王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link
      to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{ model.title}}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">{{ model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">
            皮肤：5 &gt;
          </router-link>
        </div> 
      </div>
    </div>
    <!-- end of top -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
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
          <!-- 整个swiper的div -->
          <div>
            <!-- 两个button和skills -->
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont iconmenu-1"></i>
                  英雄介绍视频
              </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont iconmenu-1"></i>
                  图识英雄
                </router-link>
              </div>  
              <!-- skills -->
              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <!-- 点击第几个技能，就把当前的索引值赋给currentSkillIndex -->
                  <img 
                  class="icon"
                  @click="currentSkillIndex = i"
                  :class="{active: currentSkillIndex === i}"
                  :src="item.icon" 
                  v-for="(item,i) in model.skills" 
                  :key="item.name" 
                  >
                </div>
                <!-- 技能描述 -->
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3 class="m-0">{{ currentSkill.name }}</h3>
                    <span class="text-gery-1 ml-4">
                      （冷却值：{{currentSkill.delay}}
                       消耗：{{currentSkill.cost}}）
                    </span>
                  </div>
                  <p>{{currentSkill.description}}</p>
                  <div class="border-bottom"></div>
                  <p class="text-grey-1">小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>
            <!-- 出装 -->
            <m-card plain icon="menu-1" title="出装推荐" class="hero-items">
              <div class="fs-lg">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="index1 in model.items1" :key="index1.name">
                  <img class="icon" :src="index1.icon" >
                  <div class="fs-xs">{{index1.name}}</div>
                </div>
              </div>
              <div class="border-bottom"></div>
              <div class="fs-lg mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="index2 in model.items2" :key="index2.name">
                  <img class="icon" :src="index2.icon" >
                  <div class="fs-xs pb-0">{{index2.name}}</div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="menu-1" title="使用技巧">
              <p class="m-0">{{model.usageTips}}</p>
            </m-card>
            <m-card plain icon="menu-1" title="对抗技巧">
              <p class="m-0">{{model.battleTips}}</p>
            </m-card>
            <m-card plain icon="menu-1" title="团战思路">
              <p class="m-0">{{model.teamTips}}</p>
            </m-card>
            <m-card plain icon="menu-1" title="英雄关系">
              <div class="fs-lg mt-3">最佳搭档</div>
              <div class="d-flex mt-3" v-for="item in model.parterns" :key="item.name">
                <img height="50" :src="item.hero.pic" >
                <p class="m-0 flex-1 ml-3">{{item.description}}</p>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-lg mt-3">被谁克制</div>
              
              <div class="border-bottom mt-3"></div>
            </m-card>
            
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {required: true}
  },
  data(){
    return {
      model: null,
      currentSkillIndex: 0,
    }
  },
  // 计算属性
  computed: {
    // currentSkill返回的是一个对象
    currentSkill(){
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetch(){
      // 请求接口，相当于调用函数，所以id是实参，而在服务器端是定义了接口，id是形参，所以写成:id
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
  .page-hero {
    .top {
      height: 50vw;
      background-size: auto 100%;
      // background: #fff no-repeat top center;
    }
    .info {
      background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
      .scores {
        .badge {
          margin: 0 0.25rem;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 0.9rem;
          text-align: center;
          border-radius: 50%;
          font-size: 0.6rem;
          border: 1px solid rgba(255,255,255,0.2);
        }
      }
    }
    .skills {
      img.icon {
        width: 4.8462rem;
        height: 4.8462rem;
        border: 3px solid map-get($colors, 'white');
        border-radius: 45%;
        &.active {
          border-color: map-get($colors, 'primary');
        }
      }
    }
    .hero-items {
      img.icon {
        width: 3.4615rem;
        height: 3.4615rem;
        border-radius: 50%;
      }
    }
  }
</style>