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
            path: '/mall/product/create',
            name: 'mall.product.create',
            props: true,
            component: () => import('@/views/mall/ProductItem.vue'),
            meta: {
              title: 'Create Product',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/mall/product/item/:id',
            name: 'mall.product.item',
            props: true,
            component: () => import('@/views/mall/ProductItem.vue'),
            meta: {
              title: 'Edit Prouduct',
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
            path: '/mall/category/create',
            name: 'mall.category.create',
            props: true,
            component: () => import('@/views/mall/CategoryItem.vue'),
            meta: {
              title: 'Create Product Category',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/mall/category/item/:id',
            name: 'mall.category.item',
            props: true,
            component: () => import('@/views/mall/CategoryItem.vue'),
            meta: {
              title: 'Edit Product Category',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          }
        ]
      },
      {
        path: '/cms',
        name: 'cms.index',
        meta: {
          group: 'cms',
          title: 'CMS',
          hiddenInMenu: false,
          icon: 'mdi-newspaper'
        },
        component: RouterWrapper,
        redirect: {
          path: '/cms/news'
        },
        children: [
          {
            path: '/cms/news',
            name: 'cms.news',
            component: () => import('@/views/cms/NewsList.vue'),
            meta: {
              title: 'News',
              hiddenInMenu: false,
              icon: 'mdi-view'
            }
          },
          {
            path: '/cms/news/item/:id',
            name: 'cms.news.edit',
            props: true,
            component: () => import('@/views/cms/NewsItem.vue'),
            meta: {
              title: 'Edit News',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/cms/news/create',
            name: 'cms.news.create',
            props: true,
            component: () => import('@/views/cms/NewsItem.vue'),
            meta: {
              title: 'Create News',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/cms/categories',
            name: 'cms.categories',
            component: () => import('@/views/cms/CategoryList.vue'),
            meta: {
              title: 'Category',
              hiddenInMenu: false,
              icon: 'mdi-view'
            }
          },
          {
            path: '/cms/category/item/:id',
            name: 'cms.category.edit',
            props: true,
            component: () => import('@/views/cms/CategoryItem.vue'),
            meta: {
              title: 'Edit category',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/cms/category/create',
            name: 'cms.category.create',
            props: true,
            component: () => import('@/views/cms/CategoryItem.vue'),
            meta: {
              title: 'Create category',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/cms/slider',
            name: 'cms.slider',
            component: () => import('@/views/cms/SliderList.vue'),
            meta: {
              title: 'Slider',
              hiddenInMenu: false,
              icon: 'mdi-view'
            }
          },
          {
            path: '/cms/slider/item/:id',
            name: 'cms.slider.edit',
            props: true,
            component: () => import('@/views/cms/SliderItem.vue'),
            meta: {
              title: 'Edit Slider',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/cms/slider/create',
            name: 'cms.slider.create',
            props: true,
            component: () => import('@/views/cms/SliderItem.vue'),
            meta: {
              title: 'Create Slider',
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
