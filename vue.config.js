module.exports = {
	devServer: {
		proxy:{
			'/api':{
				target: 'http://47.108.204.33:8888/',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
	}
};