import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignUpView.vue'
import UsersView from '../views/UsersView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: function () {
      return import('../views/InvoicesView.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    name: 'edit_membership',
    path: '/edit_membership',
    component: function () {
      return import('../views/EditMembershipView.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
