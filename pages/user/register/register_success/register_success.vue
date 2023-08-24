<template>
	<view :class="{ 'dark-theme': darkTheme }">
		<view 恭喜您，注册成功。 <button class="gotologinBtn" @click="gotologin()"></button>
		</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			gotologin: function() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>

</style>