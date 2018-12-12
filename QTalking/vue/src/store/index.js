import Vue from 'vue'
import VueX from 'vuex'
import Loading from '../components/Loading'

Vue.use(VueX);
Vue.use(Loading);

import actions from './actions'
import mutations from './mutations'
export default new VueX.Store({
	modules:{
		mutations
	},
	actions
})