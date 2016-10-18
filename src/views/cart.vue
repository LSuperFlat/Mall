<template>
	<div class="page" v-if="!$loadingRouteData" transition="fade">

		<header-bar :title="title" :left="back"></header-bar>
		<div class="container">
			<mt-loadmore :top-method="loadTop">
				<div slot="top" class="mint-loadmore-top">
				    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"></span>
				    <span v-show="topStatus === 'loading'">Loading...</span>
				</div>

				<div class="products">
					<ul>
						<li v-for="item in proucts">
							<p class="head"></p>
							<div class="content">
								<div class="left">
									<input class="select-switch" type="checkbox" v-model="item.selected" />
									<img class="ui-border-radius" :src="item.imgurl" />
								</div>
								<div class="center">
									<p>{{ item.title }}</p>
									<p>{{ item.desc }}</p>

									<div class="price_warp">
										<span class="price">{{ item.price |currency '￥' 2 }}</span>
										<span class="old_price">{{ item.old_price | currency '￥' 2 }}</span>
										<span class="num">x{{ item.count }}</span>
									</div>
								</div>
								
							</div>
							<div class="bottom"></div>
						</li>
					</ul>
				</div>

				<div class="unlogin" v-show="!login">
					<div>
						<label class="ico"></label>
						<p class="tips">登录过期或尚未登录</p>
						<button class="login">立即登录</button>
					</div>
				</div>

				<div class="not_products" v-show="!proucts.length && login">
					<div>
						<label class="ico"></label>
						<p class="tips">没有商品，去挑选几件商品吧</p>
					</div>
				</div>
			</mt-loadmore>
		</div>
		<div class="count" v-show="proucts.length">
			<div class="handle">
				<div>
					<input class="select-switch" type="checkbox"  v-model="allSelected" />
					<label>全选</label>
				</div>
				<div>
					<span>
						<label>合计：{{ sum |currency '￥' 2 }}</label>
						<p class="tips">(不包含运费)</p>
					</span>
				</div>
			</div>
			<div class="calc" :class="{'active': canpay}">去支付</div>
		</div>
		<!-- <tab-bar></tab-bar> -->
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';

	export default{
		data() {
			return {
				title: '',
				count: 0,
				proucts: [],
				login: true,
				back: 'back'
			}
		},
		computed: {
			allSelected: {
				get: function() {
					for(var i = 0, length = this.proucts.length; i < length; i++) {
						if(! this.proucts[i].selected) {
							return false;
						}
					}
					return true;
				},
				set: function(val) {
					for(var i = 0, length = this.proucts.length; i < length; i++) {
						this.proucts[i].selected = val;
					}
				}
			},
			sum: function() {
				var totalAmount = 0;
				for(var i = 0, length = this.proucts.length; i < length; i++) {
					var item = this.proucts[i];
					if(item.selected == true) {
						totalAmount += item.price * item.count;
					}
				}
				return totalAmount;
			},
			canpay: function() {
				for(var i = 0, length = this.proucts.length; i < length; i++) {
					if(this.proucts[i].selected) {
						return true;
					}
				}
				return false;
			},
			random: function() {
				return Math.ceil(Math.random()*(3-1)) == 1;
			}
			
		},
		methods: {
			loadTop: function(id) {
				this.$broadcast('onTopLoaded', id)
			},
			fillIn: function(index, n) {
				this.items[index].count = n
			}
			
		},
		route: {
			data(transition) {
				this.title = '购物车';
				if(this.random) {
					this.$http.get('/mock/orders.json').then((response) => {
						return response.json()
					}).then((json) => {
						this.proucts = json.result;
					})
				}
				
				this.$loadingRouteData = false;
			}
		},
		components: {
			loading: require('../components/Loading.vue'),
			tabBar: require('../components/TabBar.vue'),
			headerBar: require('../components/HeaderBar.vue'),
			tabBar: require('../components/TabBar.vue'),
			'mt-loadmore': Loadmore
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
			padding-top: 45px;
			-webkit-box-orient: vertical;
			// 这里需要处理  有bug~~~
			// display: -webkit-box-flex;
			// display: -webkit-flex;
			&>div{
				width: 100%;
				-webkit-box-flex: 1;
			}
			.not_products{
				height: 100%;
				width: 100%;
				padding-top: 15%;
				color: #999;
				&>div{
					text-align: center;
				}
				label.ico:before{
					content: '\e614'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 158px; 
					color: #c8c8c8;
					position: relative;
				}
			}
			.unlogin{
				height: 100%;
				width: 100%;
				padding-top: 15%;
				color: #999;
				&>div{
					text-align: center;
				}
				label{
					background: white;
					border-radius: 50%;
					width: 150px;
					height: 150px;
					display: block;
					margin: 0 auto 20px;
					text-align: center;
					line-height: 150px;
				}
				button.login{
					background: #ff2d55;
					color: white;
					padding: 5px 15px;
					border-radius: 5px;
					margin-top: 10px;
				}
				button.login:active{
					background: #e82247;
				}
				label.ico:before{
					content: '\e616'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 68px; 
					color: #c8c8c8;
					position: relative;
				}
			}
			.products{
				margin-top: 15px;
				li{
					background: white;
					padding: 10px;
					margin-bottom: 15px;
					// overflow: hidden;
					.content{
						display: -webkit-box;
						display: -webkit-box-flex;
					}
					.left{
						width: 100px;
						display: -webkit-box;
						&>input:nth-child(1) {
							position: relative;
							top: -28px;
						}
						img{
							width: 74px;
							height: 74px;
							-webkit-box-flex: 1;
						}
					}
					.center{
						padding: 0 5px;
						.price_warp{
							display: -webkit-box;
							display: -webkit-box-flex;
							&>span:not(.old_price){
								display: -webkit-box;
								-webkit-box-flex: 1;
							}
							.price{
								color: #fb574d;
							}
							.old_price{
								color: #999;
								position: relative;
							}
							.num{
								display: -webkit-box;
								-webkit-box-pack: end;
							}
							.old_price:after{
								content: ''; 
								width: 100%;
								display: inline-block;
								height: 2px;
								background: #999;
								position: absolute;
								left: 0;
								bottom: 40%;
							}
						}
						p{
							word-break: break-all;
							word-wrap:break-word;
							color: #444; 
						}
						-webkit-box-flex: 1;
						font-size: 13px;
					}
				}
			}
		}
		.count{
			height: 50px;
			background: white;
			display: -webkit-box;
			box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
			-webkit-box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
			.handle{
				width: 70%;
				display: -webkit-box;
				
				&>div:first-child{
					width: 70px;
					text-align: center;
					line-height: 50px;
					&>input:nth-child(1) {
						position: relative;
						top: 2px;
					}
					label.active{
						color: #ff2d55;
					}
					label.active:before{
						color: #ff2d55;
					}
				}
				&>div:last-child{
					-webkit-box-flex: 1;
					span label{
						height: 30px;
						display: inline-block;
						color: red;
						line-height: 35px;
					}
					.tips{
						font-size: 10px;
						color: #c8c8c8;
					}
				}
			}
			.calc{
				width: 30%;
				background: #c8c8c8;
				color: white;
				line-height: 50px;
				text-align: center;
				font-size: 20px;
			}
			.calc.active{
				background: #ff2d55;
			}
		}

		.select-switch{
			-webkit-appearance: none;
			user-select: none;
			outline: none;
			position: relative;
		}
		.select-switch:before{
			display: inline-block;
        	content: '\e617'; 
			font-family: iconfont; 
			display: inline-block; 
			font-size: 20px;
			color: #c8c8c8;
			position: relative;
			top: 0px;
		}
		.select-switch:checked:before{
			display: inline-block;
        	content: '\e615'; 
			font-family: iconfont; 
			display: inline-block; 
			font-size: 20px;
			color: #ff2d55;
			position: relative;
			top: 0px;
		}
	}
</style>