import {
  fetchProducts,
  fetchQuote,
  getProductCategoryById,
  getProductById,
  updateProduct,
  deleteProduct,
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
  }
}
const mutations = {
  SET_PRODUCT_CATEGORY(state, { data }) {
    state.categories = data
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
