<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			this.darkTheme = uni.getStorageSync("theme");
		},
		onShow: function() {
			console.log('App Show');
			this.darkTheme = uni.getStorageSync("theme");
		},
		onHide: function() {
			console.log('App Hide');
			this.darkTheme = uni.getStorageSync("theme");
		},
		onLoad(){
			this.darkTheme = uni.getStorageSync("theme");
		},
		onUnload(){
			this.darkTheme = uni.getStorageSync("theme");
		}
	}
</script>

<style lang="scss">
	@import url("/css/global-ui.css");
	@import url("/css/global-ui-dark.css");
	@import "uview-ui/index.scss";
</style>