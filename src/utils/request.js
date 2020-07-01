import axios from 'axios'
import store from '@/store'
// create axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  timeout: 150000 // 请求超时时间
})

const err = (error) => {
  const { status, data } = error.response
  switch (status) {
    case 400:
      window.ELEPHANT.$emit('SHOW_SNACKBAR', {
        show: true,
        text: 'Bad Request ' + data.message,
        color: 'red'
      })
      break
    case 401:
      window.ELEPHANT.$emit('AUTH_FAILED', data)
      break
    case 403:
      window.ELEPHANT.$emit('SHOW_SNACKBAR', {
        show: true,
        text: 'Access Denied ' + data.message,
        color: 'red'
      })
      break
    case 500:
      window.ELEPHANT.$emit('Internal Server error', {
        show: true,
        text: 'Server error ' + data.message,
        color: 'red'
      })
      break
    default:
      break
  }

  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Authorization'] = 'Bearer ' + store.getters.getAccessToken
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  if (response.data.error !== undefined) {
    window.ELEPHANT.$emit('API_FAILED', response.data.error)
  }
  return response.data
}, err)

export default service
