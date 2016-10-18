<template>
	<div class="page" v-if="!$loadingRouteData" transition="fade">
		<div class="container">
		</div>
		<Tab-bar :items="tabList"></Tab-bar>
	</div>
	<loading :show="$loadingRouteData"></loading>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [
					{
						txt: '首页',
						active: false,
						path: 'index',
						class: 'home'
					},
					{
						txt: '分类',
						active: true,
						path: 'classify',
						class: "products"
					},
					{
						txt: '购物车',
						active: false,
						path: 'cart',
						class: "cart"
					},
					{
						txt: '个人中心',
						active: false,
						path: 'uc',
						class: 'usercenter'
					}
				]
			}
		},
		route: {
			data(transition) {
				this.$loadingRouteData = false;
			}
		},
		components: {
			loading: require('../components/Loading.vue'),
			tabBar: require('../components/TabBar.vue')
		}
	}
</script>

<style lang="less" scoped>
	.page{
		-webkit-box-orient: vertical;
		display: -webkit-box;
		display: -webkit-box-flex;
		height: 100vh;
		position: relative;
		.container{
			-webkit-box-flex: 1;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			-webkit-box-orient: vertical;
		}
	}
</style>