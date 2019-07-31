export default function ({ $axios, store }) {
  $axios.interceptors.request.use((config) => {
    if (store.state && store.state.dashboard && store.state.dashboard.token) {
      const token = store.state.dashboard.token
      config.headers.token = token
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  $axios.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response.status === 401) { // 登录状态失效
      store.commit('dashboard/initDashboard')
      window.location.href = '/login'
    }
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
    return $axios(config).then((response) => {
      return response && response.data
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

  const $get = function (url = '', data = {}, _config) {
    return $http(url, data, 'GET', _config)
  }

  const $post = function (url = '', data = {}, _config) {
    return $http(url, data, 'POST', _config)
  }

  $axios.get = $get
  $axios.post = $post
}
