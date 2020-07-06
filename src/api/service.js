import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
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

export function updateProductCategory(id, data) {
  return request({
    url: `/mall/category/${id}`,
    method: 'put',
    data: data
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
export function fetchNews(query) {
  return request({
    url: '/cms/post',
    method: 'get',
    params: query
  })
}

export function fetchSlider(query) {
  return request({
    url: '/cms/slider',
    method: 'get',
    params: query
  })
}
