<template>
	<view class="global-view">
		<view class="container">
			<view class="wrap" :class="{ 'dark-theme': darkTheme }">
				<view class="content">
					<view class="title">{{translations.验证邮箱}}</view>
					<view class="text">{{translations.请完成邮箱验证进行重置密码}}</view>
					<u-form ref="validateFormRef" :model="validateForm.user">
						<u-form-item :label="translations.邮箱" prop="mail" required>
							<u-input class="input-box" type="mail" v-model="validateForm.user.mail" placeholder="" />
						</u-form-item>
					</u-form>
					<u-button type="primary" style="margin: 5rpx;" @click="sendRequest">{{translations.发送验证码}}</u-button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import Chinese from '@/languages/zh-CN'
	import English from '@/languages/en-US'
	export default {
		data() {
			return {
				validateForm: {
					user: {
						mail: '',
					},
				},
				translations: this.language === "en-US" ? English : Chinese
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.translations.忘记密码
			})
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
		methods: {
			async sendRequest() {
				try {
					const email = this.validateForm.user.mail;

					const response = await fetch(`/api/example/sendEmail?email=${email}`, {
						method: 'POST', // Note: This should be GET if the backend is expecting a GET request
					});

					if (response.status === 200) {
						localStorage.setItem('userEmail', email);
						uni.navigateTo({
							url: '/pages/verify/verify',
						});
					} else if (response.status === 404) {
						this.$u.toast(this.translations.网络错误);
					} else if (response.status === 500) {
						this.$u.toast(this.translations.服务器错误);
					} else {
						this.$u.toast(this.translations.未知错误);
					}

				} catch (error) {
					console.error('请求错误:', error);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: white;
	}

	.input-box {
		background-color: white;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.1);

	}

	@import "./forget.scss";
</style>