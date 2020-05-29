import Vue from 'vue'
import App from './App'
import PubFunc from './common/js/util.js'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$pubFunc = PubFunc

// 挂载
Vue.prototype.$websiteUrl = 'http://localhost:3000';
Vue.prototype.$imgSuffix = '?imageView&thumbnail=369x0&quality=75&tostatic=0'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
