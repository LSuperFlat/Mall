<template>
	<div class="classify">
		<a v-for=" item in classifys">
			<label>{{ item.txt }}</label>
		</a>
	</div>
</template>

<script>
	export default{
		props: ['classifys']
	}
</script>

<style lang="less" scoped>
	.classify{
		overflow: hidden;
		padding: 10px 10px 0;
		background: white;
		margin: 10px auto;
		a{
			display: -webkit-inline-box;
			-webkit-box-align: center;
			-webkit-box-pack: center;
			width: 20%;
			color: white;
			margin-bottom: 10px;
			label{
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background: #27cbb3;
				display: inline-block;
				font-size: 12px;
				line-height: 40px;
				text-align: center;
			}
			
		}
	}
</style>