<template>
	<div :class="['ui-loading-block','show']" v-if="show">
        <div class="ui-loading-cnt">
            <i class="logo"></i>
        </div>
    </div>
</template>

<script>
	export default {
		props: ['show']
	}
</script>

<style lang="less" scoped>
	.ui-loading-block {
		.logo{
			display: inline-block;
			width: 57px;
			height: 57px;
			background: url("../assets/images/loading.png") 0 0 no-repeat;
			background-size: 56px;
		}
		&.top {
			.ui-loading-cnt {
				margin-top: -200px;
			}
		}

		.ui-loading-cnt {
			width: 57px;
			height: 57px;

		}
	}
</style>
