import { AuthLayout, DefaultLayout, RouterWrapper } from '@/components/layouts'
export const publicRoute = [
  {
    path: '*',
    component: () => import('@/views/error/NotFound.vue')
  },
  {
    path: '/auth',
    component: AuthLayout,
    meta: {
      title: 'Login'
    },
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',

        meta: {
          title: 'Login'
        },
        component: () => import('@/views/auth/Login.vue')
      }
    ]
  },

  {
    path: '/404',
    name: '404',
    meta: {
      title: 'Not Found'
    },
    component: () => import('@/views/error/NotFound.vue')
  },

  {
    path: '/500',
    name: '500',
    meta: {
      title: 'Server Error'
    },
    component: () => import('@/views/error/Error.vue')
  }
]

export const protectedRoute = [
  {
    path: '/',
    component: DefaultLayout,
    meta: {
      title: 'Home',
      group: 'apps',
      icon: '',
      hiddenInMenu: true
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
          hiddenInMenu: false,
          icon: 'mdi-monitor-dashboard'
        }
      },

      {
        path: '/mall',
        name: 'mall.index',
        meta: {
          group: 'mall',
          title: 'Mall',
          hiddenInMenu: false,
          icon: 'mdi-store'
        },
        component: RouterWrapper,
        redirect: {
          path: '/mall/product'
        },
        children: [
          {
            path: '/mall/product',
            name: 'mall.product',
            component: () => import('@/views/mall/ProductList.vue'),
            meta: {
              title: 'Product List',
              hiddenInMenu: false,
              icon: 'mdi-view'
            }
          },
          {
            path: '/mall/quote',
            name: 'mall.quote',
            component: () => import('@/views/mall/QuoteList.vue'),
            meta: {
              title: 'Quote List',
              hiddenInMenu: false,
              icon: 'mdi-view'
            }
          },
          {
            path: '/mall/product/:id',
            name: 'mall.product.item',
            props: true,
            component: () => import('@/views/mall/ProductItem.vue'),
            meta: {
              title: 'Product Item',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/mall/category',
            name: 'mall.category',
            meta: {
              title: 'Proudct Category',
              hiddenInMenu: false,
              icon: 'mdi-view'
            },
            component: () => import('@/views/mall/CategoryList.vue')
          },
          {
            path: '/mall/category/:id',
            name: 'mall.category.item',
            props: true,
            component: () => import('@/views/mall/CategoryItem.vue'),
            meta: {
              title: 'Product Category Item',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          }
        ]
      },
      {
        path: '/403',
        name: 'Forbidden',
        meta: {
          title: 'Access Denied',
          hiddenInMenu: true
        },
        component: () => import('@/views/error/Deny.vue')
      }
    ]
  }
]
