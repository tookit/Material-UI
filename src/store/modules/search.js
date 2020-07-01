import _unionWith from 'lodash/unionWith'
import deepEqual from 'fast-deep-equal'
import _isEqual from 'lodash/isEqual'
import add from 'date-fns/add'
import { getRuleList } from '@/api/service'
const state = {
  // filter
  page: 1,
  pageSize: 20,
  keyword: null,
  filterTerms: [],
  schemaAggration: [],
  collectionAggration: [],
  rangeFrom: null,
  rangeTo: null,
  dateField: 'stored_at',
  dateFilterTab: 'quick',
  // sort
  sortFields: [],
  sortBy: [],
  sortDesc: [],
  quickCommon: [
    {
      from: new Date(),
      to: add(new Date(), {
        minutes: 15
      })
    },
    {
      from: new Date(),
      to: add(new Date(), {
        hours: 1
      })
    }
  ],
  terms: [], // termsQuery
  geo: {
    // distance: '100m'
    // lon: ''
    // lat: ''
  },
  sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  //current query
  queryBody: null,
  operators: [
    {
      text: 'is',
      value: 'must',
      method: 'must',
      label: ':'
    },
    {
      text: 'is not',
      value: 'mustNot',
      method: 'must_not',
      label: ':'
    },
    {
      text: 'wildcard',
      value: 'wildcard',
      method: 'wildcard',
      label: ':'
    },
    {
      text: 'is one of',
      value: 'should',
      label: 'is one of'
    },
    {
      text: 'is not one of',
      value: 'shouldNot',
      label: 'is not one of'
    },
    {
      text: 'is between',
      value: 'between',
      label: 'between'
    },
    {
      text: 'exists',
      value: 'exists',
      label: 'exists'
    },
    {
      text: 'does not exists',
      value: 'dontExists',
      label: 'dont exisits'
    }
  ],
  index: [],
  rules: [],
  selectRule: null
}
const getters = {
  getKeyword: (state) => state.keyword,
  getSortBy: (state) => state.sortBy,
  getSortDesc: (state) => state.sortDesc,
  getSortFields: (state) => {
    return state.sortFields
  },
  getFilterTerms: (state) => {
    return state.filterTerms
  },
  getQueryBody: (state) => {
    return state.queryBody
  },
  getQuickCommon: (state) => {
    return state.quickCommon
  },
  getOperators: (state) => {
    return state.operators
  },
  getOperatorLabel: (state) => (key) => {
    const operator = state.operators
      .filter((item) => {
        return item.value === key
      })
      .pop()
    return operator.label
  },
  getGeo: (state) => {
    return state.geo
  },
  getDateFilterTab: (state) => state.dateFilterTab,
  getSizes: (state) => state.sizes,
  getPage: (state) => state.page,
  getPageSize: (state) => state.pageSize,
  //rules
  getRules: (state) => {
    return state.rules
  },
  getRuleById: (state) => (id) => {
    return state.rules.filter((item) => item._id === id).pop()
  },
  getSelectRule: (state) => {
    return state.selectRule
  }
}
const actions = {
  // init query state
  initState({ commit }, payload) {
    commit('SET_KEYWORD', payload.keyword)
    commit('SET_GEO_FILTER', payload.g)
    commit('INIT_FILTER_TERMS', payload.t)
    commit('SET_RANGE_FROM', payload.rangeFrom)
    commit('SET_RANGE_TO', payload.rangeTo)
    commit('SET_DATE_FILTER_TAB', payload.dateFilterTab)
    commit('UPDATE_SORT_BY', payload.sortBy)
    commit('UPDATE_SORT_DESC', payload.sortDesc)
    commit('SET_SELECTED_DATE_FIELD', payload.dateField)
  },
  addFilterTerm({ commit }, term) {
    commit('ADD_FILTER_TERM', term)
  },
  removeFilterTerm({ commit }, term) {
    commit('REMOVE_FILTER_TERM', term)
  },
  updateFilterTerms({ commit }, terms) {
    commit('UPDATE_FILTER_TERMS', terms)
  },
  updateSortBy({ commit }, sortBy) {
    commit('UPDATE_SORT_BY', sortBy)
  },
  updateSortDesc({ commit }, sortDesc) {
    commit('UPDATE_SORT_DESC', sortDesc)
  },
  updateQueryBody({ commit }, payload) {
    commit('UPDATE_QUERY_BODY', payload)
  },
  clearGeo({ commit }) {
    commit('CLEAR_GEO')
  },
  resetPagination({ commit }) {
    commit('SET_PAGE', 1)
    commit('SET_PAGE_SIZE', 20)
  },
  applyRule({ commit }, payload) {
    commit('RESET_FILTER')
    commit('SET_SELECT_RULE', payload)
    const must = payload._source.query.bool.must
    if (Array.isArray(must)) {
      must.forEach((item) => {
        const key = Object.keys(item).pop()
        const value = item[key]
        if (key === 'simple_query_string') {
          commit('SET_KEYWORD', value.query)
        } else if (key === 'terms') {
          for (let field in value) {
            const fieldValues = value[field]
            const terms = fieldValues.map((val) => {
              return {
                key: field,
                opt: 'must',
                val: val
              }
            })
            commit('UPDATE_FILTER_TERMS', terms)
          }
        } else if (key === 'range') {
          for (let field in value) {
            const fieldValues = value[field]
            commit('SET_SELECTED_DATE_FIELD', field)
            commit('SET_RANGE_FROM', fieldValues.gte)
            commit('SET_RANGE_TO', fieldValues.lte)
          }
        }
      })
    } else {
      // reset filter first, then apply the rule
      const key = Object.keys(must).pop()
      if (key === 'simple_query_string') {
        commit('SET_KEYWORD', must[key].query)
      } else if (key === 'terms') {
        const value = must[key]
        for (let field in value) {
          const fieldValues = value[field]
          const terms = fieldValues.map((val) => {
            return {
              key: field,
              opt: 'must',
              val: val
            }
          })
          commit('UPDATE_FILTER_TERMS', terms)
        }
      } else {
        console.log('undefined key', key)
      }
    }
  },
  fetchRuleByProject({ commit }, projectId) {
    return getRuleList(projectId).then((resp) => {
      commit('SET_RULES', resp)
      return resp
    })
  }
}
const mutations = {
  // query
  SET_KEYWORD(state, keyword) {
    state.keyword = keyword
  },
  INIT_FILTER_TERMS(state, terms) {
    state.filterTerms = terms
  },
  UPDATE_FILTER_TERMS(state, terms) {
    state.filterTerms = _unionWith(state.filterTerms, terms, _isEqual)
  },
  ADD_FILTER_TERM(state, term) {
    const { filterTerms } = state
    if (filterTerms.length > 0) {
      filterTerms.forEach((item) => {
        if (!deepEqual(item, term)) {
          filterTerms.push(term)
        }
      })
    } else {
      filterTerms.push(term)
    }
  },
  REMOVE_FILTER_TERM(state, term) {
    const { filterTerms } = state
    state.filterTerms = filterTerms.filter((item) => {
      return (
        (item.key === term.key &&
          item.val === term.val &&
          item.opt === term.opt) === false
      )
    })
  },

  RESET_FILTER(state) {
    state.filterTerms = []
    state.keyword = null
    state.geo = null
    state.rangeFrom = null
    state.rangeTo = null
    state.dateField = 'stored_at'
    state.sortBy = []
    state.sortDesc = []
  },
  UPDATE_SORT_BY(state, sortBy) {
    state.sortBy = sortBy
  },
  UPDATE_SORT_DESC(state, sortDesc) {
    state.sortDesc = sortDesc
  },
  SET_DATE_FILTER_TAB(state, tab) {
    state.dateFilterTab = tab
  },
  SET_GEO_FILTER(state, payload) {
    state.geo = payload
  },
  SET_PAGE(state, page) {
    state.page = page
  },
  SET_PAGE_SIZE(state, pageSize) {
    state.pageSize = pageSize
  },
  SET_SELECTED_DATE_FIELD(state, field) {
    state.dateField = field
  },
  SET_RANGE_FROM(state, payload) {
    state.rangeFrom = payload
  },
  SET_RANGE_TO(state, payload) {
    state.rangeTo = payload
  },
  CLEAR_GEO(state) {
    state.geo = null
  },
  SET_SELECT_RULE(state, payload) {
    state.selectRule = payload
  },
  SET_RULES(state, payload) {
    state.rules = payload
  },
  UPDATE_QUERY_BODY(state, payload) {
    state.queryBody = payload
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
