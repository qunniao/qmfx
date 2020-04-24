import Vue from 'vue';
import Vuex from 'vuex';

import gMutation from './mutations';
import gActions from './actions';

import moduleA from './modules/moduleA';
import moduleLogin from './modules/moduleLogin';
import menu from './modules/menu';
import prod from './modules/prod';

Vue.use(Vuex);

const storeInit = {
    state: {
        count: 0,
    },
    mutations: gMutation,
    actions: gActions,
    modules: {
        moduleA,
        moduleLogin,
        menu,
        prod
    },
}
const store = new Vuex.Store(storeInit);

export default store;