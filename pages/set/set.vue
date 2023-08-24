<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="container">
			<view class="categories-menu">
				<ul>
					<li @click="change_password()">修改密码</li>
					<li @click="selectTheme()">修改主题</li>
				</ul>
			</view>
			
		</view>
		<transition name="bgcolor" mode='out-in'>
			<view v-if="showThemeMenu" class="fixed-background" @click="closeMenu()">
			</view>
		</transition>
		<transition name="menu-slide-up">
			<view v-if="showThemeMenu" ref="menu" class="menu">
				<ul>
					<li @click="changeTheme('light')">浅色主题</li>
					<li @click="changeTheme('dark')">深色主题</li>
					<li @click="closeMenu()">取消</li>
				</ul>
			</view>
		</transition>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showThemeMenu: false,
			}
		},
		methods: {
			change_password:function()
			{
				uni.navigateTo({
					url:'changepassword/changepassword'
				})
			},
			selectTheme() {
				this.showThemeMenu = true;
			},
			closeMenu() {
				this.showThemeMenu = false;
			},
			changeTheme(theme) {
				if(theme === "dark"){
					this.darkTheme = true;
					uni.setStorageSync("theme", true);
				}else{
					this.darkTheme = false;
					uni.setStorageSync("theme", false);
				}
				this.closeMenu();
				uni.switchTab({
					url: "/pages/home/home"
				});
			}
			
		},
		mounted(){
			if (this.darkTheme) {
				uni.setNavigationBarColor({
					frontColor: '#ffffff', // 这是文字颜色，设置为白色
					backgroundColor: '#2a2a2a', // 这是背景颜色，设置为深色
				});
			} else {
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#f8f8f8'
				});
			}
		},
		onLoad(){
			if (this.darkTheme) {
				uni.setNavigationBarColor({
					frontColor: '#ffffff', // 这是文字颜色，设置为白色
					backgroundColor: '#2a2a2a', // 这是背景颜色，设置为深色
				});
			} else {
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#f8f8f8'
				});
			}
		}
	}
</script>

<style>
</style>
