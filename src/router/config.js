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
              title: 'Product',
              hiddenInMenu: false,
              icon: 'mdi-database'
            }
          },
          {
            path: '/mall/quote',
            name: 'mall.quote',
            component: () => import('@/views/mall/QuoteList.vue'),
            meta: {
              title: 'Quote',
              hiddenInMenu: false,
              icon: 'mdi-basket'
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
              title: 'Edit Product',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/mall/category',
            name: 'mall.category',
            meta: {
              title: 'Category',
              hiddenInMenu: false,
              icon: 'mdi-buffer'
            },
            component: () => import('@/views/mall/CategoryList.vue')
          },
          {
            path: '/mall/category/create',
            name: 'mall.category.create',
            props: true,
            component: () => import('@/views/mall/CategoryItem.vue'),
            meta: {
              title: 'Create  Category',
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
              title: 'Edit  Category',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/mall/property',
            name: 'mall.property',
            meta: {
              title: 'Propterty',
              hiddenInMenu: false,
              icon: 'mdi-filter-variant'
            },
            component: () => import('@/views/mall/PropertyList.vue')
          },
          {
            path: '/mall/property/create',
            name: 'mall.property.create',
            props: true,
            component: () => import('@/views/mall/PropertyItem.vue'),
            meta: {
              title: 'Create Property',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/mall/property/item/:id',
            name: 'mall.property.item',
            props: true,
            component: () => import('@/views/mall/PropertyItem.vue'),
            meta: {
              title: 'Edit Property',
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
              icon: 'mdi-post'
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
            path: '/cms/tags',
            name: 'cms.tags',
            component: () => import('@/views/cms/TagList.vue'),
            meta: {
              title: 'Tags',
              hiddenInMenu: false,
              icon: 'mdi-tag'
            }
          },
          {
            path: '/cms/tags/create',
            name: 'cms.tags.create',
            props: true,
            component: () => import('@/views/cms/TagItem.vue'),
            meta: {
              title: 'Create Tag',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/cms/tags/item/:id',
            name: 'cms.tags.edit',
            props: true,
            component: () => import('@/views/cms/TagItem.vue'),
            meta: {
              title: 'Edit Tag',
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
              icon: 'mdi-buffer'
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
              icon: 'mdi-image-multiple'
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
              icon: 'mdi-folder-image'
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
              icon: 'mdi-image-multiple'
            }
          }
        ]
      },
      {
        path: '/media',
        name: 'media.index',
        meta: {
          group: 'media',
          title: 'Media',
          hiddenInMenu: false,
          icon: 'mdi-image'
        },
        component: () => import('@/views/Media.vue')
      },
      {
        path: '/setting',
        name: 'setting.index',
        meta: {
          group: 'setting',
          title: 'Setting',
          hiddenInMenu: false,
          icon: 'mdi-cogs'
        },
        component: () => import('@/views/Setting.vue')
      },
      {
        path: '/acl',
        name: 'acl.index',
        meta: {
          group: 'acl',
          title: 'ACL',
          hiddenInMenu: false,
          icon: 'mdi-shield-account'
        },
        component: RouterWrapper,
        redirect: {
          path: '/acl/user'
        },
        children: [
          {
            path: '/acl/user',
            name: 'acl.user',
            component: () => import('@/views/acl/UserList.vue'),
            meta: {
              title: 'Users',
              hiddenInMenu: false,
              icon: 'mdi-account'
            }
          },
          {
            path: '/acl/user/create',
            name: 'acl.user.create',
            component: () => import('@/views/acl/UserItem.vue'),
            meta: {
              title: 'Create User',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/acl/user/item/:id',
            name: 'cms.user.edit',
            component: () => import('@/views/acl/UserItem.vue'),
            props: true,
            meta: {
              title: 'Edit User',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/acl/role',
            name: 'acl.role',
            component: () => import('@/views/acl/RoleList.vue'),
            meta: {
              title: 'Roles',
              hiddenInMenu: false,
              icon: 'mdi-account-group'
            }
          },
          {
            path: '/acl/role/create',
            name: 'acl.role.create',
            component: () => import('@/views/acl/RoleItem.vue'),
            meta: {
              title: 'Create Role',
              hiddenInMenu: true,
              icon: 'mdi-view'
            }
          },
          {
            path: '/acl/role/item/:id',
            name: 'cms.role.edit',
            component: () => import('@/views/acl/RoleItem.vue'),
            props: true,
            meta: {
              title: 'Edit Role',
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
