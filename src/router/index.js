/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-12 17:28:10
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-02-02 13:38:09
 */

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),     //路由模式
  routes:[
    {
      name: 'index',
      path: '/',
      component: () => import('../views/homeA.vue')
    },
    {
      name: 'a',
      path: '/a',
      component: () => import('../views/homeA.vue')
    },
    {
      name: 'b',
      path: '/b',
      component: () => import('../views/homeB.vue')
    },
    {
      path: "/calculationNode",
      name: "calculationNode",
      component:() => import('../views/CalculationNodeView.vue')
    },
  
  ]
})

export default router;      //导出