import colors from 'vuetify/es5/util/colors'
import _orderby from 'lodash/orderBy'
import {
  fetchMapping,
  fetchCollection,
  fetchMeta,
  fetchTermAggregations
} from '@/api/service'
const state = {
  themeMode: 'light',
  themeColor: 'teal',
  app: null,
  clusters: [],
  categories: null,
  countries: null,
  languages: null,
  schema: null,
  meta: null,

  mappings: [],
  countableItems: [],
  fields: null,
  collections: [],
  mimeTypes: {},
  termAgg: null,
  breadcrumbs: [
    {
      text: 'Dashboard',
      disabled: false,
      href: '/'
    }
  ]
}
// getters
const getters = {
  getBreadcrumbs: (state) => state.breadcrumbs,
  getCountries: (state) => state.countries,
  getCountryName: (state) => (short) => {
    return state.countries[short.toLowerCase()] || ''
  },

  getThemeColor: (state) => {
    return colors[state.themeColor].base
  },

  getCollections: (state) => {
    return state.collections.map((item) => {
      return {
        text: item.label,
        category: item.category,
        count: item.count,
        value: item.collection_id
      }
    })
  },
  getCollectionById: (state) => (id) => {
    return state.collections[id]
  },
  getSummaryByCollectionId: (state) => (id) => {
    const collection = state.collections[id]
    return collection.summary
  },
  getCountByCollectionId: (state) => (id) => {
    const collection = state.collections[id]
    return collection._source.count
  },
  getCollectionIcon: (state) => (key) => {
    const collection = state.collections.find(
      (item) => item.collection_id === key
    )
    return collection.icon || 'mdi-help'
  },
  getCollectionLabel: (state) => (key) => {
    const collection = state.collections.filter(
      (item) => item.collection_id === key
    )
    return collection ? collection.label : 'key'
  },

  getCollectionsByCId: (state) => (id) => {
    return state.collections.filter((item) => item.category === id)
  },
  getCategoryByKey: (state) => (key) => {
    return state.categories[key]
  },
  getCategoryIcon: (state) => (key) => {
    return state.categories &&
      Object.prototype.hasOwnProperty.call(state.categories, key)
      ? state.categories[key].icon
      : 'mdi-help'
  },
  getCategoryLabel: (state) => (key) => {
    return state.categories &&
      Object.prototype.hasOwnProperty.call(state.categories, key)
      ? state.categories[key].label
      : key
  },

  getCategories: (state) => {
    let tmp = []
    const obj = state.categories
    for (var key in obj) {
      tmp.push({
        text: obj[key].label,
        icon: obj[key].icon,
        value: key
      })
    }
    return tmp
  },
  getTypes: (state) => {
    let tmp = []
    const obj = state.types
    for (var key in obj) {
      tmp.push({
        name: obj[key].name,
        icon: obj[key].icon,
        group: obj[key].group
      })
    }
    return tmp
  },
  getFields: (state) => {
    return state.fields
  },
  getFieldList: (state) => {
    const fields = state.fields
    return Object.keys(fields).map((key) => {
      const { icon, type } = fields[key]
      return {
        text: key,
        value: key,
        icon: icon,
        type: type || null
      }
    })
  },
  getFieldIcon: (state) => (key) => {
    return state.fields[key].icon
  },
  getFieldType: (state) => (key) => {
    return state.fields[key].type
  },
  getProperties: (state) => {
    let tmp = []
    const schema = state.schema
    for (var key in schema) {
      const props = schema[key].properties
      for (var field in props) {
        tmp.push(props[field])
      }
    }
    return _orderby(tmp, ['label'])
  },
  getNodes: (state) => {
    return state.nodes
  },
  getClusters: (state) => {
    return state.clusters
  },
  getSchemas: (state) => {
    let tmp = []
    const obj = state.schema
    for (var key in obj) {
      tmp.push({
        text: obj[key].label,
        icon: obj[key].icon,
        value: key
      })
    }
    return tmp
  },
  getSchemaIcon: (state) => (key) => {
    return state.schema &&
      Object.prototype.hasOwnProperty.call(state.schema, key)
      ? state.schema[key].icon
      : 'mdi-help'
  },
  getSchemaByKey: (state) => (key) => {
    return state.schema[key]
  },
  getSchemaLabel: (state) => (key) => {
    return state.schema &&
      Object.prototype.hasOwnProperty.call(state.schema, key)
      ? state.schema[key].label
      : key
  },
  getSchemaPlural: (state) => (key) => {
    return state.schema && state.schema.hasOwnProperty(key)
      ? state.schema[key].plural
      : key
  }
}

// actions
const actions = {
  getMeta({ commit }) {
    return fetchMeta()
      .then((resp) => {
        commit('SET_META', resp)
      })
      .catch(() => {
        window.ELEPHANT.$router.push('/auth/login')
        window.ELEPHANT.$emit('SHOW_SNACKBAR', {
          text: 'Loading Application Failed',
          color: 'error'
        })
      })
  },
  getMapping({ commit }) {
    return fetchMapping().then((resp) => {
      commit('SET_MAPPING', resp)
    })
  },
  getCollection({ commit }) {
    return fetchCollection().then((resp) => {
      commit('SET_COLLECTION', resp)
      return resp
    })
  },
  updateTermAgg({ commit }, payload) {
    commit('SET_TERMAGG', payload)
  },
  fetchAggregationsByTerm({ commit }, { field, query }) {
    return fetchTermAggregations(field, query)
  }
}

// mutations
const mutations = {
  SET_THEME_MODE(state, mode) {
    state.themeMode = mode
  },

  SET_META(state, payload) {
    state.app = payload.app
    state.categories = payload.categories
    state.countries = payload.countries
    state.schema = payload.schema
    state.fields = payload.fields
    state.nodes = payload.nodes
    state.clusters = payload.clusters
  },
  SET_MAPPING(state, payload) {
    state.mappings = payload
  },

  SET_TERMAGG(state, payload) {
    state.termAgg[payload.key] = payload.items
  },
  SET_COLLECTION(state, payload) {
    state.collections = payload
  },

  SET_AGGRATION_SCHEMA(state, payload) {
    state.schemaAggration = payload
  },
  SET_AGGRATION_COLLECTION(state, payload) {
    state.schemaAggration = payload
  },

  UPDATE_QUERY_COUNT(state, payload) {
    if (state.countableItems.length === 0) {
      state.countableItems.push(payload)
    } else {
      state.countableItems.forEach((item) => {
        if (item.keyword === payload.keyword) {
          item.count = payload.count
        }
      })
    }
  },
  UPDATE_BREADCRUMBS(state, payload) {
    state.breadcrumbs = payload
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
