import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  sass: {
    implementation: require('node-sass'),
  },
  cssModulesTypescriptLoader: {},
  title: 'i觅宠 - 后台管理系统',
  routes: [
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        {
          path: '/',
          redirect: '/login',
        },
        {
          // 仪表盘
          path: '/dashboard',
          component: '@/pages/Dashboard'
        },
        {
          // 商品列表
          path: '/goods',
          component: '@/pages/Goods/Goods'
        },
        {
          // 商品列表-最新上传
          path: '/goods-news',
          component: '@/pages/Goods/News'
        },
        {
          // 售后-已审核
          path: '/after-sale/reviewed',
          component: '@/pages/AfterSale/Reviewed'
        },
        {
           // 售后-未审核
           path: '/after-sale/un-reviewed',
           component: '@/pages/AfterSale/UnReviewed'
        },
        {
          // 商家审核
          path: '/business',
          component: '@/pages/Business'
        },
        {
          // 登录
          path: '/login',
          component: '@/pages/Login'
        },
        {
          path: '/heros',
          routes: [
            { path: '/heros', redirect: '/heros/list' },
            { path: '/heros/list', component: '@/pages/Heros/index' },
            { path: '/heros/add', component: '@/pages/Heros/AddHero' },
          ]
        }
      ]
    },
  ],
});
