<template>
	<div class="tab-bar ui-border-t">
		<button :class="{'active': item.active}" v-for="item in items" v-link="{name: item.path}">
			<i :class="item.class"></i>
			<label>{{item.txt}}</label>
		</button>
	</div>
</template>

<script>
	export default{
		props: ['items']
	}
</script>

<style lang="less" scoped>
	.tab-bar{
		display: -webkit-box;
		display: -webkit-box-flex;
		display: -webkit-flex;
		color: #666;
		opacity: .9;
		box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
		-webkit-box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
		button{
			height: 50px;
			-webkit-flex: 1;
			-webkit-box-flex: 1;
			background: #f6f4f4;
			label{
				display: -webkit-box;
				-webkit-box-align: center;
				-webkit-box-pack: center;
				font-size: 12px;
			}
		}
		button:active{
			background: #e2e2e2;
		}
		button.active{
			color: #ff2d55;
		}
		.home:after{
			content: '\e607'; 
			font-family: iconfont; 
			display: inline-block; 
			font-size: 23px; 
			color: #666;
			position: relative;
			top: 2px;
		}
		.products:after{
			content: '\e609'; 
			font-family: iconfont; 
			display: inline-block; 
			font-size: 23px; 
			color: #666;
			position: relative;
			top: 2px;
		}
		.cart:after{
			content: '\e604'; 
			font-family: iconfont; 
			display: inline-block; 
			font-size: 26px; 
			color: #666;
		}
		.usercenter:after{
			content: '\e603'; 
			font-family: iconfont; 
			display: inline-block; 
			font-size: 21px; 
			color: #666;
		}
		button.active .home:after{
			color: #ff2d55;
		}
		button.active .products:after{
			color: #ff2d55;
		}
		button.active .cart:after{
			color: #ff2d55;
		}
		button.active .usercenter:after{
			color: #ff2d55;
		}
	}
</style>