import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件的引入
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
