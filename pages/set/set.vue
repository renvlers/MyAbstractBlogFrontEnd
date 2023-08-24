<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="container">
			<view class="categories-menu">
				<ul>
					<li @click="change_password()">{{translations.修改密码}}</li>
					<li @click="selectTheme()">{{translations.修改主题}}</li>
					<li @click="selectLanguage()">{{translations.修改语言}}</li>
					<li @click="selectFont()">{{translations.修改正文字体}}</li>
				</ul>
			</view>

		</view>
		<transition name="bgcolor" mode='out-in'>
			<view v-if="showThemeMenu || showLanguageMenu || showFontMenu" class="fixed-background"
				@click="closeMenu()">
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
			<view v-if="showLanguageMenu" ref="menu" class="menu">
				<ul>
					<li @click="changeLanguage('zh-CN')">简体中文</li>
					<li @click="changeLanguage('en-US')">English</li>
					<li @click="closeMenu()">取消</li>
				</ul>
			</view>
			<view v-if="showFontMenu" ref="menu" class="menu">
				<ul>
					<li @click="changeFont('')">{{translations.默认字体}}</li>
					<li @click="changeFont('宋体')" style="font-family: '宋体';">宋体</li>
					<li @click="changeFont('黑体')" style="font-family: '黑体';">黑体</li>
					<li @click="changeFont('楷体')" style="font-family: '楷体';">楷体</li>
					<li @click="changeFont('仿宋')" style="font-family: '仿宋';">仿宋</li>
					<li @click="closeMenu()">取消</li>
				</ul>
			</view>
		</transition>
	</view>
</template>

<script>
	import Chinese from '@/languages/zh-CN'
	import English from '@/languages/en-US'
	export default {
		data() {
			return {
				showThemeMenu: false,
				showLanguageMenu: false,
				showFontMenu: false,
				translations: this.language === "en-US" ? English : Chinese
			}
		},
		methods: {
			change_password: function() {
				uni.navigateTo({
					url: 'changepassword/changepassword'
				})
			},
			selectTheme() {
				this.showThemeMenu = true;
			},
			closeMenu() {
				this.showThemeMenu = false;
				this.showLanguageMenu = false;
				this.showFontMenu = false;
			},
			selectLanguage() {
				this.showLanguageMenu = true;
			},
			selectFont() {
				this.showFontMenu = true;
			},
			changeFont(font) {
				if (font !== '')
					uni.setStorageSync("font", font);
				else
					uni.removeStorageSync("font");
				this.closeMenu();
				if (this.language == "en-US") {
					uni.showToast({
						title: "Changed Successfully"
					});
				} else {
					uni.showToast({
						title: "修改成功"
					});
				}
			},
			changeTheme(theme) {
				if (theme === "dark") {
					uni.setStorageSync("theme", true);
				} else {
					uni.setStorageSync("theme", false);
				}
				this.closeMenu();
				if (this.language == "en-US") {
					uni.showToast({
						title: "Changed Successfully, please restart the App",
						success: () => {
							setTimeout(() => {
								uni.switchTab({
									url: "/pages/home/home"
								})
							}, 1500);
						}
					});
				} else {
					uni.showToast({
						title: "修改成功，重启后生效",
						success: () => {
							setTimeout(() => {
								uni.switchTab({
									url: "/pages/home/home"
								})
							}, 1500);
						}
					});
				}
			},

			changeLanguage(lang) {
				if (lang === "en-US") {
					this.language = "en-US";
					uni.setStorageSync("language", lang);
				} else {
					this.language = "zh-CN";
					uni.setStorageSync("language", lang);
				}
				this.closeMenu();
				if (lang == "en-US") {
					uni.showToast({
						title: "Changed Successfully, please restart the App",
						success: () => {
							setTimeout(() => {
								uni.switchTab({
									url: "/pages/home/home"
								})
							}, 1500);
						}
					});
				} else {
					uni.showToast({
						title: "修改成功，重启后生效",
						success: () => {
							setTimeout(() => {
								uni.switchTab({
									url: "/pages/home/home"
								})
							}, 1500);
						}
					});
				}
			}

		},
		mounted() {
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
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.translations.设置
			});
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