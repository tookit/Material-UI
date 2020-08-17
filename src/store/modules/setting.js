import request from '@/utils/request'
const state = {
  availableTranslations: [
    { text: 'English', value: 'en', code: ['en-us', 'en'] },
    { text: 'Deutsch', value: 'de', code: ['de'] },
    { text: 'Français', value: 'fr', code: ['fr'] },
    { text: 'Espanol', value: 'es', code: ['es'] },
    { text: 'Italiana', value: 'it', code: ['it'] },
    { text: 'Nederlands', value: 'nl', code: ['nl'] },
    { text: 'Polskie', value: 'pl', code: ['pl'] },
    { text: 'Pусский', value: 'ru', code: ['ru'] },
    { text: '日本の', value: 'ja', code: ['ja'] },
    { text: 'Português Brasileiro', value: 'pt-br', code: ['pt-br'] },
    { text: '简体中文', value: 'zh', code: ['zh', 'zh-cn'] }
  ],
  sizes: [],
  pageSize: 15,
  settings: null,
  colors: [
    'red',
    'black',
    'white',
    'purple',
    'blue',
    'green',
    'grey',
    'pink',
    'yellow'
  ],
  flags: [
    {
      text: 'Default',
      value: 0
    },
    {
      text: 'New',
      value: 1
    },
    {
      text: 'Hot',
      value: 2
    },
    {
      text: 'Featured',
      value: 2
    }
  ]
}
const getters = {
  getAvailableTranslations: (state) => state.availableTranslations,
  getSizes: (state) => state.sizes,
  getPageSize: (state) => state.pageSize,
  getSiteSetting: (state) => state.settings,
  getColors: (state) => state.colors,
  getFlags: (state) => state.flags
}
const actions = {
  fetchSetting({ commit }) {
    return request({
      url: `/cms/setting/`,
      method: 'get'
    })
  },
  updateSetting({ commit }, data) {
    return request({
      url: `/cms/setting/`,
      method: 'post',
      data: data
    })
  }
}
const mutations = {}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
