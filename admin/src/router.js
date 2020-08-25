import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'
import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/admin',
  routes: [
    {path: '/login',name: 'login',component: Login,meta: {isPublic: true}},
    {
      path: '/',
      name: 'main',
      component: Main,
      // 路由嵌套
      children: [
        // 分类
        {path: '/categories/create',component: CategoryEdit},
        {path: '/categories/list',component: CategoryList},
        // 动态路径参数，props：true代表路径中的参数注入到组件中，组件可以直接使用_id这个参数
        {path: '/categories/edit/:id',component: CategoryEdit, props: true},
        // 物品
        {path: '/items/create',component: ItemEdit},
        {path: '/items/list',component: ItemList},
        {path: '/items/edit/:id',component: ItemEdit, props: true},
        // 英雄
        {path: '/hero/create',component: HeroEdit},
        {path: '/hero/list',component: HeroList},
        {path: '/hero/edit/:id',component: HeroEdit, props: true},
        // 文章
        {path: '/articles/create',component: ArticleEdit},
        {path: '/articles/list',component: ArticleList},
        {path: '/articles/edit/:id',component: ArticleEdit, props: true},
        // 广告位
        {path: '/ads/create',component: AdEdit},
        {path: '/ads/list',component: AdList},
        {path: '/ads/edit/:id',component: AdEdit, props: true},
        // 管理员
        {path: '/admin_users/create',component: AdminUserEdit},
        {path: '/admin_users/list',component: AdminUserList},
        {path: '/admin_users/edit/:id',component: AdminUserEdit, props: true},
      ]
    }
  ]
})

// to: 即将进入的页面  from: 当前所在页面
router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    // 如果token不存在且isPublish为false，就返回login页面
    return next('/login')
  }
  next()
})

export default router
