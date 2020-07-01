const state = {
  searchLayout: '3_9_0',
  showDetailDrawer: false,
  showDetailPanel: false,
  showDetailOption: 'overlay'
}
const getters = {
  getShowDetailPanel: (state) => {
    return state.showDetailPanel
  },
  getShowDetailDrawer: (state) => {
    return state.showDetailDrawer
  },
  getDetailOption: (state) => {
    return state.showDetailOption
  },
  getSearchLayout(state) {
    return state.searchLayout
  }
}
const actions = {
  closeDetailDrawer({ commit }) {
    commit('SET_DETAIL_DRAWER', false)
  },
  closeDetailPanel({ commit }) {
    commit('SET_DETAIL_PANEL', false)
  }
}
const mutations = {
  SET_DETAIL_DRAWER(state, bool) {
    state.showDetailDrawer = bool
  },
  SET_DETAIL_OPTION(state, option) {
    state.showDetailOption = option
  },
  SET_DETAIL_PANEL(state, bool) {
    state.showDetailPanel = bool
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
