<template>
	<div class="page" v-if="!$loadingRouteData" transition="fade">
		<div class="container">
			<mt-loadmore :top-method="loadTop" :auto-fill="false">
				<div slot="top" class="mint-loadmore-top">
				    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"></span>
				    <span v-show="topStatus === 'loading'">Loading...</span>
				</div>

				<div class="top">
					<div class="info">
						<img src="../assets/images/bg.jpg" />
						<div class="txt">
							<p class="username">欧阳娜娜</p>
							<p class="message">这个人很懒,什么也没留下...</p>
						</div>
						
					</div>
					<div class="blur"></div>
				</div>

				<div class="menu">
					<a @click="showPopup">
						<span>待付款</span>
						<label></label>
					</a>
					<a @click="showPopup">
						<span>待发货</span>
						<label></label>
					</a>
					<a @click="showPopup">
						<span>待签收</span>
						<label></label>
					</a>
					<a @click="showPopup">
						<span>待评价</span>
						<label></label>
					</a>
				</div>

				<div class="content">
					<ul>
						<li class="ui-border-b collect" @click="showPopup">
							<span>收藏商品</span>
						</li>
						<li class="ui-border-b notes" @click="showPopup">
							<span>浏览记录</span>
						</li>
					</ul>
					<ul>
						<li class="ui-border-b address" @click="showPopup">
							<span>管理我的收货地址</span>
						</li>
						<li class="ui-border-b service" @click="showPopup">
							<span>联系客服</span>
						</li>
						<li class="ui-border-b noarrow night">
							<span>夜间模式</span>
							<mt-switch :value.sync="value" class="switch"></mt-switch>
						</li>
						<li class="ui-border-b clean" @click="exit">
							<span>清理缓存</span>
						</li>
					</ul>

					<ul class="">
						<li class="ui-border-b exit noarrow" @click="exit">
							<span class="red">退出登录</span>
						</li>
					</ul>
				</div>
			</mt-loadmore>

			<mt-actionsheet
				  :actions="actions"
				  :visible.sync="sheetVisible">
			</mt-actionsheet>
		</div>

		<mt-popup :visible.sync="popupVisible" position="right">
			<div class="popupWarp">
				<button @click="showPopup" class="closePopup">返回</button>
			</div>
		</mt-popup>

		<Tab-bar :items="tabList"></Tab-bar>
	</div>
</template>

<script>
	import { Loadmore, Actionsheet, Popup, Switch } from 'mint-ui';

	export default{
		data() {
			return {
				sheetVisible: false,
				popupVisible: false,
				value: false,
				actions: [
					{
						name: '确定',
						method: function() {
							console.log("exit");
						}
					}
				],
				tabList: [
					{
						txt: '首页',
						active: false,
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
						active: true,
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
		methods: {
			loadTop: function(id) {
				this.$broadcast('onTopLoaded', id);
			},
			exit: function() {
				this.sheetVisible = true
			},
			showPopup: function() {
				this.popupVisible = !this.popupVisible
			}
		},
		components: {
			loading: require('../components/Loading.vue'),
			tabBar: require('../components/TabBar.vue'),
			'mt-loadmore': Loadmore,
			'mt-actionsheet': Actionsheet,
			'mt-popup': Popup,
			'mt-switch': Switch
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
			// display: -webkit-box-flex;
			// display: -webkit-flex;
			&>div{
				width: 100%;
			}
			.top{
				height: 200px;
				display: -webkit-box;
				-webkit-box-align: center;
				-webkit-box-pack: center;
				color: white;
				overflow: hidden;
				.info{
					width: 100%;
					height: 100%;
					position: relative;
					display: -webkit-box;
					-webkit-box-align: center;
					-webkit-box-pack: center;
					z-index: 100;
					p.username{
						color: white;
					}
					.txt{
						padding-left: 10px;
					}
				}
				img{
					border-radius: 50%;
					height: 100px;
					width: 100px;
					border: 2px solid #f1f1f1;
					position: relative;
					z-index: 10;
				}
				.blur {
					height: 220px;
					width: 120%;
					margin-left: -100%;
					margin-top: -20px;
					filter: blur(5px);
					background: url('../assets/images/bg.jpg');
					background-position: top;
					background-size: cover;
					position: relative;
				}
			}
			.menu{
				display: -webkit-box-flex;
				display: -webkit-flex;
				background: white;
				margin-top: 15px;
				&>a{
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					color: #444;
					-webkit-box-align: center;
					-webkit-box-pack: center;
					height: 60px;


					-webkit-box-orient: vertical;
					display: -webkit-box;
					display: -webkit-box-flex;
					&:active{
						background: #e2e2e2;
					}
					label{
						display: -webkit-box;
						-webkit-box-align: center;
						-webkit-box-pack: center;
						position: relative;
					}
				}
				&>a:nth-child(1) label:after{
					content: '\e610'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 18px; 
					color: #fb574d;
				}
				&>a:nth-child(2) label:after{
					content: '\e612'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 19px; 
					color: #55a8ee;
				}
				&>a:nth-child(3) label:after{
					content: '\e613'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 18px; 
					color: #f46c00;
				}
				&>a:nth-child(4) label:after{
					content: '\e611'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 18px; 
					color: #25b4b0;
				}
			}
			.content{
				-webkit-box-flex: 1;
				&>ul:last-child{
					margin-bottom: 15px;
				}
				&>ul{
					margin-top: 15px;
					background: white;
					li{
						padding: 0 10px;
						position: relative;
						&:not(.night):active{
							background: #e2e2e2;
						}
					}
					li>span{
						height: 2.875rem;
						line-height: 2.875rem;
					}
					.switch{
						position: absolute;
						right: 9px;
						top: 7px;
					}
				}
				.red{
					color: red;
				}
				ul li:not(.noarrow):after{
					content: '\e601'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 18px; 
					color: #999;
					position: absolute;
					right: 5px;
					top: 10px;
				}
				li.collect:before{
					content: '\e60b'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 20px; 
					color: #f4a61e; 
				}
				li.notes:before{
					content: '\e60c'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 20px; 
					color: #55a8ee;
				}
				li.address:before{
					content: '\e60d'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 20px; 
					color: #ff4d49;
				}
				li.service:before{
					content: '\e60e'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 20px; 
					color: #f46c00;
				}
				li.clean:before{
					content: '\e60f'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 20px; 
					color: #25b4b0;
				}
				li.night:before{
					content: '\e618'; 
					font-family: iconfont; 
					display: inline-block; 
					font-size: 20px; 
					color: #f4a61e;
				}
			}
		}

		.popupWarp{
			width: 100vw;
			height: 100vh;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			-webkit-box-orient: vertical;
			background: white;
			-webkit-box-align: center;
			-webkit-box-pack: center;
			display: -webkit-box;
			.closePopup{
				background: #2fb28a;
				color: white;
				padding: 10px 50px;
				border-radius: 5px;
				display: inline-block;
			}
		}
	}


</style>