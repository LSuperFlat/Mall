<template>
	<div class="tm-mobile-header">
		<div class="header-content mui-flex" id="J_HeaderContent">
	        <div class="category-menu cell fixed">
	            <a href="javascript:void(0);" target="_self" id="J_CategoryTrigger" class="category-trigger">×</a>
	        </div>
	    </div>
    </div>
</template>

<script type="text/javascript">
	
</script>

<style lang="less">
	.tm-mobile-header {
		position: fixed;
		top: -1px;
		left: 0;
		width: 100%;
		z-index: 9998;
	}
	.tm-mobile-header .header-content {
		position: relative;
		background: -webkit-linear-gradient(top,rgba(0,0,0,.7),rgba(0,0,0,0));
		background: linear-gradient(top,rgba(0,0,0,.7),rgba(0,0,0,0));
		-webkit-transition: background-color .2s linear;
		-moz-transition: background-color .2s linear;
		-o-transition: background-color .2s linear;
		transition: background-color .2s linear;
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
	}
	.mui-flex>.cell {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		width: 0;
		-webkit-flex-basis: 0;
		-ms-flex-preferred-size: 0;
		flex-basis: 0;
		max-width: 100%;
		display: block;
		padding: 0!important;
		position: relative;
	}
</style>