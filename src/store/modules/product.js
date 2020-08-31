import {
  fetchProducts,
  fetchQuote,
  fetchProductCategories,
  fetchCategoryTree,
  getProductCategoryById,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductCategory,
  updateProductCategory,
  fetchImagesByProductId
} from '@/api/service'
import request from '@/utils/request'
const state = {
  categories: [],
  flags: [
    {
      text: 'Default',
      value: 1
    },
    {
      text: 'Promoted',
      value: 2
    },
    {
      text: 'Hot',
      value: 3
    },
    {
      text: 'New',
      value: 4
    },
    {
      text: 'Featured',
      value: 5
    }
  ]
}
const getters = {
  getProductCategories: (state) => {
    return state.categories
  },
  getProductFlags: (state) => {
    return state.flags
  },
  getFlagLabel: (state) => (value) => {
    const find = state.flags.find((item) => item.value === value)
    return find ? find.text : ''
  },
  getProperties: (state) => {
    return state.properties
  },
  getSkuProperties: (state) => {
    return state.properties.filter((item) => item.type === 'sku')
  },
  getSpuProperties: (state) => {
    return state.properties.filter((item) => item.type === 'spu')
  },
  getPropUnits: (state) => {
    return state.units
  },
  getPropTypes: (state) => {
    return state.types
  }
}
const actions = {
  fetchProducts({ commit }, query) {
    return fetchProducts(query).then((resp) => {
      return resp
    })
  },

  fetchQuote({ commit }, query) {
    return fetchQuote(query).then((resp) => {
      return resp
    })
  },
  fetchProductCategories({ commit }, query) {
    return fetchProductCategories(query).then((resp) => {
      return resp
    })
  },

  fetchProductCategoryTree({ commit }) {
    return fetchCategoryTree().then((resp) => {
      commit('SET_PRODUCT_CATEGORY', resp)
      return resp
    })
  },

  fetchImageByProductId({ commit }, id) {
    return fetchImagesByProductId(id).then((resp) => {
      return resp
    })
  },
  getProductById({ commit }, id) {
    return getProductById(id).then((resp) => {
      return resp
    })
  },

  getProductCategoryById({ commit }, id) {
    return getProductCategoryById(id).then((resp) => {
      return resp
    })
  },
  getPropertyByCategoryId({ commit }, id) {
    return request({
      url: `/mall/category/${id}/property`,
      method: 'get'
    }).then((resp) => {
      return resp
    })
  },
  updateProduct({ commit }, { id, data }) {
    return updateProduct(id, data).then((resp) => {
      return resp
    })
  },
  deleteProduct({ commit }, id) {
    return deleteProduct(id).then((resp) => {
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

  updateProductCategory({ commit }, { id, data }) {
    return updateProductCategory(id, data).then((resp) => {
      return resp
    })
  },

  fetchProperty({ commit }, query) {
    return request({
      url: '/mall/property',
      method: 'get',
      params: query
    }).then((resp) => {
      if (query && query.pageSize == -1) {
        commit('SET_PRODUCT_PROPERTIES', resp.data)
      }
      return resp
    })
  },

  createProperty({ commit }, data) {
    return request({
      url: '/mall/property',
      method: 'post',
      data: data
    })
  },
  updateProperty({ commit }, { id, data }) {
    return request({
      url: `/mall/property/${id}`,
      method: 'put',
      data: data
    })
  },

  deleteProperty({ commit }, id) {
    return request({
      url: `/mall/property/${id}`,
      method: 'delete'
    })
  },

  fetchValueById({ commit }, id) {
    return request({
      url: `/mall/property/${id}/value`,
      method: 'get'
    })
  },

  getPropertyById({ commit }, id) {
    return request({
      url: `/mall/property/${id}`,
      method: 'get'
    })
  },

  fetchSpecByProductId({ commit }, id) {
    return request({
      url: `/mall/item/${id}/sku`,
      method: 'get'
    })
  },

  getProductByCategoryId({ commit }, { id, query }) {
    return request({
      url: `/mall/category/${id}/item`,
      method: 'get',
      query: query
    })
  },
  attachValueForProperty({ commit }, { id, data }) {
    return request({
      url: `/mall/property/${id}/value`,
      method: 'put',
      data: data
    })
  },
  attachPropsForProduct({ commit }, { id, data }) {
    return request({
      url: `/mall/item/${id}/property`,
      method: 'post',
      data: data
    })
  },
  attachSkuForProduct({ commit }, { id, data }) {
    return request({
      url: `/mall/item/${id}/sku`,
      method: 'post',
      data: data
    })
  },
  deletePropertyValue({ commit }, id) {
    return request({
      url: `/mall/property_value/${id}`,
      method: 'delete'
    })
  },
  createProductCategory({ commit }, data) {
    return request({
      url: `/mall/category/`,
      method: 'post',
      data: data
    })
  }
}
const mutations = {
  SET_PRODUCT_CATEGORY(state, { data }) {
    state.categories = data
  },
  SET_PRODUCT_PROPERTIES(state, data) {
    state.properties = data
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
