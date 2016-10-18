export default (route) => {
	route.map({
		'/': {
			name: 'index',
			component: (reslove) => {
				require(['./views/index.vue'], reslove)
			}
		},
		'/classify': {
			name: 'classify',
			component: (reslove) => {
				require(['./views/classify.vue'], reslove)
			}
		},
		'/uc': {
			name: 'uc',
			component: (reslove) => {
				require(['./views/uc.vue'], reslove)
			}
		},
		'/cart': {
			name: 'cart',
			component: (reslove) => {
				require(['./views/cart.vue'], reslove)
			}
		}
	})
}	