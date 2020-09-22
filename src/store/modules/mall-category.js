import request from '@/utils/request'
const state = {}
const getters = {}
const actions = {
  fetchProductCategories({ commit }, query) {
    return request({
      url: '/mall/category',
      method: 'get'
    })
  },

  fetchProductCategoryTree({ commit }) {
    return request({
      url: '/mall/category/tree',
      method: 'get'
    })
  },
  createProductCategory({ commit }, data) {
    return request({
      url: `/mall/category/`,
      method: 'post',
      data: data
    })
  },
  updateProductCategory({ commit }, { id, data }) {
    return request({
      url: `/mall/category/${id}`,
      method: 'put',
      data: data
    }).then((resp) => {
      return resp
    })
  },
  deleteProductCategory({ commit }, id) {
    return request({
      url: `/mall/category/${id}`,
      method: 'delete'
    }).then((resp) => {
      return resp
    })
  },
  attachPropertyForCategory({ commit }, { id, data }) {
    return request({
      url: `/mall/category/${id}/property`,
      method: 'post',
      data: data
    })
  },
  getProductByCategoryId({ commit }, { id, query }) {
    return request({
      url: `/mall/category/${id}/item`,
      method: 'get',
      query: query
    })
  },
  getProductCategoryById({ commit }, id) {
    return request({
      url: `/mall/category/${id}`,
      method: 'get'
    })
  },
  getPropertyByCategoryId({ commit }, id) {
    return request({
      url: `/mall/category/${id}/property`,
      method: 'get'
    }).then((resp) => {
      return resp
    })
  }
}
const mutations = {
  SET_PRODUCT_PROPERTIES(state, data) {
    state.properties = data
  },
  ADD_PROPERTY(state, data) {
    state.properties.push(data)
  },
  UPDATE_PROPERTY(state, data) {
    state.properties.forEach((item) => {
      if (item.id === data.id) {
        item = data
      }
    })
  },
  DELETE_PROPERTY(state, id) {
    state.properties = state.properties.filter((item) => item.id !== id)
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
