<template>
	<view class="global-view">
		<view class="container">
			<view class="wrap" :class="{ 'dark-theme': darkTheme }">
				<view class="top"></view>
				<view class="content">
					<view class="title">{{translations.输入验证码}}</view>
					<view class="text">{{translations.请在下方输入您收到的验证码}}</view>
					<u-form ref="validateFormRef" :model="validateForm.user">
						<u-form-item :label="translations.邮箱" prop="mail" required>
							<u-input class="input-box" type="mail" v-model="validateForm.user.mail" placeholder="" />
						</u-form-item>
						<u-form-item :label="translations.验证码" style="font-size: 0.9em;" prop="verificationCode" required>
							<u-input class="input-box" v-model="validateForm.user.verificationCode" placeholder="" />
						</u-form-item>
					</u-form>
					<u-button type="primary" style="margin: 5rpx;" @click="handleVerify">
						{{translations.验证}}
					</u-button>
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
				translations: this.language === "en-US" ? English : Chinese,
				validateForm: {
					user: {
						mail: '',
						verificationCode: '',
					},
				},
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.translations.验证邮箱
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
		},
		methods: {
			handleVerify() {
				const userData = {
					authCode: this.validateForm.user.verificationCode,
					email: this.validateForm.user.mail,
				};

				// 发起网络请求，验证验证码
				fetch('/api/example/verifycode?authCode=' + userData.authCode + '&email=' + userData.email, {
						method: 'POST',
					})
					.then((response) => response.json())
					.then((data) => {
						console.log('Response data:', data);

						if (data.code === 200) {
							this.$u.toast('验证码验证成功');
							uni.navigateTo({
								url: "/pages/reset/reset"
							})
						} else if (data.code === 404) {
							this.$u.toast('网络错误');
						} else {
							this.$u.toast('验证码错误或超时');
						}
					})
					.catch((error) => {
						console.error('Network error:', error);
						this.$u.toast('网络请求错误');
					});
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

	@import "./verify.scss";
</style>