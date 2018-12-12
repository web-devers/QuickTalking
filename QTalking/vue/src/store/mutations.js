import getters from './getters'

const state={
	loading:false,
	starDetail1:false,
	starDetail2:false,
	starSel1:false,
	starSel2:false,
};

const mutations={
	showLoading(state){
		state.loading=true
	},
	hideLoading(state){
		state.loading=false
	},
	showStarDtl1(state){
		state.starDetail1=true
	},
	hideStarDtl1(state){
		state.starDetail1=false
	},
	showStarDtl2(state){
		state.starDetail2=true
	},
	hideStarDtl2(state){
		state.starDetail2=false
	},
	showStarSel1(state){
		state.starSel1=true
	},
	hideStarSel1(state){
		state.starSel1=false
	},
	showStarSel2(state){
		state.starSel2=true
	},
	hideStarSel2(state){
		state.starSel2=false
	}
}

export default{
	state,
	getters,
	mutations
}