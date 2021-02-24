import Vue from 'vue'
import App from './App.vue'
import router from "@/router/router";
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Myhttp from "@/utils/api/Myhttp";
import {Message} from "element-ui";

Vue.config.productionTip = false

Vue.use(router)
Vue.use(Elementui)
Vue.prototype.$message=Message
Vue.prototype.http=Myhttp

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
