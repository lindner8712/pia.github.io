import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Settings from '../views/Settings.vue'
import Parameter from '../views/Parameter.vue'

const routes: RouteRecordRaw[] = [
  { path: '/Dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users },
  { path: '/Parameter', name: 'Parameter', component: Parameter }, 
  { path: '/settings', name: 'Settings', component: Settings },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router