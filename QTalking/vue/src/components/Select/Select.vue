<template>
	<div class="select">
		<ul>
			<li v-for='item in list' @click='choose'>
				{{item}}
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	   export default{
	   		props:{
	   			list:Array
	   		},
			data(){
				return{
					select:false,
				}
			},
			methods:{
				choose(e){
					// console.log(e.target.innerText)
					this.$emit('choose',e.target.innerText);
				}
			}
		}
</script>
<style scoped lang="scss">
$rem:414/6.4rem;
	.select{
		width:108/$rem;
		height:24*12/$rem;
		border:1px solid #26a2ff;
		border-radius:2px;
		box-sizing:border-box;
		z-index:10;
		overflow:hidden;
		background:#fff;
		ul{
			width:110/$rem;
			li{
				height:24/$rem;
				line-height:24/$rem;
				box-sizing:border-box;
				text-align:left;
				padding:2px 5px;
				font-size:10px;
				box-shadow:none;
				&:hover{
					background:#26a2ff;
					color:#fff;
				}
			}
		}
	}
</style>