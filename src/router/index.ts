//  Copyright (C) 2025 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginRedirectView from '../views/LoginRedirectView.vue'
import LoginView from '../views/LoginView.vue'
import DistributorsView from '../views/DistributorsView.vue'
import ResellersView from '@/views/ResellersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/login-redirect',
      name: 'loginRedirect',
      component: LoginRedirectView,
    },
    {
      path: '/distributors',
      name: 'distributors',
      component: DistributorsView,
    },
    {
      path: '/resellers',
      name: 'resellers',
      component: ResellersView,
    },
    {
      //// remove
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/test/subtest',
      name: 'subtest',
      component: () => import('../views/SubTestView.vue'),
    },
  ],
})

export default router
