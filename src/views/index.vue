<template>
	<div class="page" v-if="!$loadingRouteData" transition="fade">
			<header-search></header-search>
			<div class="container" @scroll="scrollFn" v-el:container>
				<mt-loadmore :top-method="loadTop" :auto-fill="false">

					<div slot="top" class="mint-loadmore-top">
					    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"></span>
					    <span v-show="topStatus === 'loading'">Loading...</span>
					</div>

					<swipe class="my-swipe" :auto="5000">
						<swipe-item>
							<img src="https://img.alicdn.com/imgextra/i2/117/TB2yfr0b1nAQeBjSZFGXXazoFXa_!!117-0-yamato.jpg_760x760q30s0.jpg_.webp">
						</swipe-item>
						<swipe-item>
							<img src="https://img.alicdn.com/bao/uploaded/TB1lSN2NpXXXXaXXpXXSutbFXXX.jpg_760x760q30s0.jpg_.webp">
						</swipe-item>
						<swipe-item>
							<img src="https://img.alicdn.com/imgextra/i4/185/TB2XhswXTka61Bjy1zbXXcizVXa_!!185-0-yamato.jpg_760x760q30s0.jpg_.webp">
						</swipe-item>
						<swipe-item>
							<img src="https://img.alicdn.com/imgextra/i3/112/TB2xeiNXhQa61Bjy0FhXXaalFXa_!!112-0-yamato.jpg_760x760q30s0.jpg_.webp">
						</swipe-item>
					</swipe>

					<div class="product">
						<ul>
							<li v-for="item in items">
								<img :src="item.imageurl" />
								<!-- <p class="tips" v-if="item.tips">{{ item.tips }}</p> -->
								<p class="text">
									<span v-if="item.title">
										<label v-if="item.sale" class="sale">{{ item.sale }}折起</label>
										<i>{{ item.title }}</i>
									</span>
									<label class="right" v-if="item.over">剩{{ item.over }}小时</label>
								</p>
							</li>
						</ul>
					</div>
				</mt-loadmore>	
			</div>
			<Tab-bar :items="tabList"></Tab-bar>
		
	</div>

	<loading :show="$loadingRouteData"></loading>
</template>

<script>
	import { Swipe, SwipeItem } from 'vue-swipe';
	import { Loadmore } from 'mint-ui';
	export default{
		data() {
			return {
                dataList: [],
                page: 1,
                classify: [
	                {txt: '男装', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
	                {txt: '女装', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
	                {txt: '汽车', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
	                {txt: '电器', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
	                {txt: '水果', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
	                {txt: '男装', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
	                {txt: '女装', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
	                {txt: '汽车', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
	                {txt: '电器', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
	                {txt: '水果', img: 'https://img.alicdn.com/bao/uploaded/TB1wJubNpXXXXcqXFXXSutbFXXX.jpg'},
                ],
                items: [],
                tabList: [
					{
						txt: '首页',
						active: true,
						path: 'index',
						class: 'home'
					},
					{
						txt: '分类',
						active: false,
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
		ready() {

		},
		route: {
			data(transition) {
				this.$http.get('/mock/product.json').then((response) => {
					return response.json()
				}).then((json) => {
					this.items = json.result.infoList;
				})
				this.$loadingRouteData = false;
			}
		},
		methods: {
			loadTop(id) {
				this.$broadcast('onTopLoaded', id);
            },
            scrollFn() {
            	console.log(this.$els.container.scrollTop)
            }
		},
		components: {
			loading: require('../components/Loading.vue'),
			tabBar: require('../components/TabBar.vue'),
			swipe: Swipe,
			swipeItem: SwipeItem,
			'mt-loadmore': Loadmore,
			'headerSearch': require('../components/headerSearch.vue')
		}
	}
</script>

<style lang="less" scoped="">
	.page{
		-webkit-box-orient: vertical;
		display: -webkit-box;
		display: -webkit-box-flex;
		height: 100vh;
		position: relative;

		.container{
			-webkit-box-flex: 1;
			-webkit-overflow-scrolling: touch;
			overflow-y: scroll;
			margin-top: -25px;
		}
		.my-swipe {
		  color: #fff;
		  font-size: 30px;
		  text-align: center;
		  img{
		  	width: 100%;
		  }
		}
		.product{
			background: white;
			padding: 10px 0;
			li {
				overflow: hidden;
				.tips{
					position: relative;
					height: 20px;
					opacity: .7;
					background: yellow;
				}
				.sale{
					color: #ff2d55;
				}
				p.text{
					margin-bottom: 5px;
					font-size: 18px;
					display: -webkit-box;
					padding: 0 5px;
					span{
						webkit-box-flex: 1;
						flex: 1;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
					}
					.right{
						font-size: 14px;
						color: #999;
						width: 60px;
						display: inline-block;
					}
				}
				img{
					width: 100%;
				}
			}
		}
	}
	@media screen and (max-width:319px) {
		.my-swipe {
			height: 154px;
		}
	}

	@media screen and (min-width:320px) and (max-width:359px) {
		.my-swipe {
			height: 165px;
		}
	}

	@media screen and (min-width:360px) and (max-width:374px) {
		.my-swipe {
			height: 181px;
		}
	}
	@media screen and (min-width:360px) and (max-width:374px) {
		.my-swipe {
			height: 184px;
		}
	}
	@media screen and (min-width:375px) and (max-width:383px) {
		.my-swipe {
			height: 181px;
		}
	}

	@media screen and (min-width:384px) and (max-width:399px) {
		.my-swipe {
			height: 184px;
		}
	}

	@media screen and (min-width:400px) and (max-width:413px) {
		.my-swipe {
			height: 190px;
		}
	}

	@media screen and (min-width:414px) {
		.my-swipe {
			height: 200px;
		}
	}
</style>