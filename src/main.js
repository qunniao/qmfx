import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App.vue';
import echarts from 'echarts';

import htmlToPdf from '@/utils/htmlToPdf'

import store from '@/store';
import router from '@/router';

Vue.use(ElementUI);
Vue.use(htmlToPdf)
Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.directive('enterNumber', {
    inserted: function (el) {
      el.addEventListener("keypress",function(e){
        e = e || window.event;
        let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
        let re = /\d/;
        if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
          if(e.preventDefault){
            e.preventDefault();
          }else{
            e.returnValue = false;
          }
        }
      });
    }
  });
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');