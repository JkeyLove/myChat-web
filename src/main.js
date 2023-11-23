import { createApp } from 'vue'

import App from './App.vue'

createApp(App).mount('#app')


import axios from 'axios'

let Vue;
Vue.prototype.$axios = axios
