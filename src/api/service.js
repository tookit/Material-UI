import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}

//user
export function fetchUsers(query) {
  return request({
    url: '/acl/users',
    method: 'get',
    params: query
  })
}

export function getUserById(id) {
  return request({
    url: `/acl/users/${id}`,
    method: 'get'
  })
}
export function updateUser(id, data) {
  return request({
    url: `/acl/users/${id}`,
    method: 'put',
    data: data
  })
}

export function createUser(data) {
  return request({
    url: `/acl/users`,
    method: 'post',
    data: data
  })
}

export function deleteUser(id) {
  return request({
    url: `/acl/users/${id}`,
    method: 'delete'
  })
}

//role
export function fetchRoles(query) {
  return request({
    url: '/acl/roles',
    method: 'get',
    params: query
  })
}

export function getRoleById(id) {
  return request({
    url: `/acl/roles/${id}`,
    method: 'get'
  })
}
export function updateRole(id, data) {
  return request({
    url: `/acl/users/${id}`,
    method: 'put',
    data: data
  })
}

export function createRole(data) {
  return request({
    url: `/acl/roles`,
    method: 'post',
    data: data
  })
}

export function deleteRole(id) {
  return request({
    url: `/acl/roles/${id}`,
    method: 'delete'
  })
}

//media
export function fetchMedia(query) {
  return request({
    url: '/media',
    method: 'get',
    params: query
  })
}

export function updateMedia(id, data) {
  return request({
    url: `/media/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteMedia(id) {
  return request({
    url: `/media/${id}`,
    method: 'delete'
  })
}

//tag
export function fetchTags(query) {
  return request({
    url: '/tag',
    method: 'get',
    params: query
  })
}

export function getTagById(id) {
  return request({
    url: `/tag/${id}`,
    method: 'get'
  })
}

export function createTag(data) {
  return request({
    url: `/tag`,
    method: 'post',
    data: data
  })
}

export function updateTag(id, data) {
  return request({
    url: `/tag/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteTag(id) {
  return request({
    url: `/tag/${id}`,
    method: 'delete'
  })
}
//product
export function fetchProducts(query) {
  return request({
    url: '/mall/item',
    method: 'get',
    params: query
  })
}

export function fetchQuote(query) {
  return request({
    url: '/mall/quote',
    method: 'get',
    params: query
  })
}

export function fetchProductCategories() {
  return request({
    url: '/mall/category',
    method: 'get'
  })
}

export function fetchImagesByProductId(id) {
  return request({
    url: `/mall/item/${id}/image`,
    method: 'get'
  })
}

export function fetchImageByCategoryId(id) {
  return request({
    url: `/mall/category/${id}/image`,
    method: 'get'
  })
}

export function fetchCategoryTree() {
  return request({
    url: '/mall/category/tree',
    method: 'get'
  })
}

export function getProductById(id) {
  return request({
    url: `/mall/item/${id}`,
    method: 'get'
  })
}

export function getProductCategoryById(id) {
  return request({
    url: `/mall/category/${id}`,
    method: 'get'
  })
}

export function updateProduct(id, data) {
  return request({
    url: `/mall/item/${id}`,
    method: 'put',
    data: data
  })
}

export function attachMediaForProduct(id, mediaId) {
  return request({
    url: `/mall/item/${id}/media`,
    method: 'post',
    data: {
      media_id: mediaId
    }
  })
}

export function createProductCategory(data) {
  return request({
    url: `/mall/category/`,
    method: 'post',
    data: data
  })
}

export function updateProductCategory(id, data) {
  return request({
    url: `/mall/category/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteProduct(id) {
  return request({
    url: `/mall/item/${id}`,
    method: 'delete'
  })
}
//image
export function updateImageById(id, data) {
  return request({
    url: `/media/image/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteImageById(id, data) {
  return request({
    url: `/media/image/${id}`,
    method: 'delete'
  })
}

// cms
//news
export function fetchNews(query) {
  return request({
    url: '/cms/post',
    method: 'get',
    params: query
  })
}

export function getNewsById(id) {
  return request({
    url: `/cms/post/${id}`,
    method: 'get'
  })
}

export function deleteNewsById(id) {
  return request({
    url: `/cms/post/${id}`,
    method: 'delete'
  })
}

export function createNews(data) {
  return request({
    url: `/cms/post`,
    method: 'post',
    data: data
  })
}

//category
export function updateNews(id, data) {
  return request({
    url: `/cms/post/${id}`,
    method: 'put',
    data: data
  })
}

//category
export function updateNewsCategory(id, data) {
  return request({
    url: `/cms/category/${id}`,
    method: 'put',
    data: data
  })
}

export function fetchNewsCategory(query) {
  return request({
    url: '/cms/category',
    method: 'get',
    params: query
  })
}

export function getNewsCategoryById(id) {
  return request({
    url: `/cms/category/${id}`,
    method: 'get',
    query: {
      pageSize: -1
    }
  })
}

export function createNewsCategory(data) {
  return request({
    url: `/cms/category`,
    method: 'post',
    data: data
  })
}

//slider
export function getSilderById(id) {
  return request({
    url: `/cms/slider/${id}`,
    method: 'get'
  })
}

export function fetchSlider(query) {
  return request({
    url: '/cms/slider',
    method: 'get',
    params: query
  })
}

export function createSlider(data) {
  return request({
    url: `/cms/slider`,
    method: 'post',
    data: data
  })
}

export function updateSlider(id, data) {
  return request({
    url: `/cms/slider/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteSilderById(id) {
  return request({
    url: `/cms/slider/${id}`,
    method: 'delete'
  })
}
