import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入nprogress对应得Js和css
import nprogress from 'nprogress'

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 在request拦截中使用进度条的start
axios.interceptors.request.use(config => {
  nprogress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, err => console.log(err))

// 在response拦截中使用进度条的done
axios.interceptors.response.use((res) => {
  nprogress.done()
  return res
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
