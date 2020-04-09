import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BuyFlight from '../views/BuyFlight.vue'
import MyFlights from '../views/MyFlights.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/buyflight',
    name: 'BuyFlight',
    component: BuyFlight
  },
  {
    path: '/myflights',
    name: 'MyFlights',
    component: MyFlights
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
