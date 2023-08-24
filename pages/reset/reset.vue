<template>
	<view class="global-view">
		<view class="container">
			<view class="wrap" :class="{ 'dark-theme': darkTheme }">
				<view class="top"></view>
				<view class="content">
					<view class="title">{{translations.重置密码}}</view>
					<view class="text">{{translations.请在下面输入信息完成重置}}</view>
					<u-form ref="validateFormRef" :model="validateForm.user">
						<u-form-item :label="translations.邮箱" prop="mail" required>
							<u-input class="input-box" type="mail" v-model="validateForm.user.mail" placeholder="" />
						</u-form-item>
						<u-form-item :label="translations.新密码" style="font-size: 0.9em;" prop="password" required>
							<u-input class="input-box" type="password" v-model="validateForm.user.password"
								placeholder="" />
						</u-form-item>
						<u-form-item :label="translations.确认密码" style="font-size: 0.7em;" prop="confirmPassword" required>
							<u-input class="input-box" type="password" v-model="confirmPassword" placeholder="" />
						</u-form-item>
					</u-form>
					<!-- 修改点：添加点击事件处理函数 -->
					<u-button type="success" style="margin: 5rpx;" @click="handleReset">{{translations.确认重置}}</u-button>
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
				confirmPassword: '',
				validateForm: {
					user: {
						mail: '',
						password: ''
					}
				},
				translations: this.language === "en-US" ? English : Chinese
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.translations.重置密码
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
			// 修改点：更改点击事件函数名称
			handleReset() {
				if (this.validateForm.user.password !== this.confirmPassword) {
					this.$u.toast('前后输入密码不匹配');
					return;
				}

				// 构造请求的数据
				const userData = {
					u_password: this.validateForm.user.password,
					u_email: this.validateForm.user.mail
				};

				// 发起网络请求
				this.$u.put(
						`api/user/updatepassword?u_email=${userData.u_email}&u_password=${userData.u_password}`
						) // 修改点：使用post方法并传递数据
					.then(res => {
						console.log(res);
						this.$u.toast('更改成功'); // 弹出提示信息
						uni.navigateBack({
							delta: 3
						})
					})
					.catch(err => {
						console.error(err);
						this.$u.toast('更改失败'); // 弹出删除失败的提示信息
					});
			}
		}
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

	@import "./reset.scss";
</style>