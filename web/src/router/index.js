import Vue from 'vue'
import VueRouter from 'vue-router'
import Mian from '../views/Main.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Mian,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/articles/:id', name: 'article', component: Article },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
