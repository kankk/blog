import axios from 'axios'

axios.defaults.baseURL = '/'
axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

const $http = function (url = '', data = {}, type = 'GET', _config = {}) {
  type = type.toUpperCase()
  const config = Object.assign(_config, {
    method: type,
    url
  })
  if (['GET', 'DELETE'].includes(type)) {
    config.params = data
  } else {
    config.data = data
  }
  return axios(config).then((response) => {
    return response && response.data
  }).catch((error) => {
    return Promise.reject(error)
  })
}

export const $get = function (url = '', data = {}, _config) {
  return $http(url, data, 'GET', _config)
}

export const $post = function (url = '', data = {}, _config) {
  return $http(url, data, 'POST', _config)
}

export default {
  $get,
  $post
}
