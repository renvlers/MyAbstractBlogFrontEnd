import {
	defineConfig
} from "vite"
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		proxy: {
			'/api': {
				target: 'http://47.108.204.33:8888/',
				changeOrigin: true,
				rewrite: path => {
					return path.replace(/^\/api/, "");
				}
			},

		}
	}
})