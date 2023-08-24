<template>
	<view class="global-view wrap" :class="{ 'dark-theme': darkTheme }">
		<view class="container">
			<view class="content">
				<view class="title">{{translations.登录}} BLOG</view>
				<u-form ref="validateFormRef" :model="validateForm.user">
					<u-form-item :label="translations.邮箱" prop="mail" :border-bottom="false">
						<u-input class="input-box" v-model="validateForm.user.mail" placeholder="" />
					</u-form-item>
					<u-form-item :label="translations.密码" prop="password" :border-bottom="false">
						<u-input type="password" class="input-box" v-model="validateForm.user.password"
							placeholder="" />
					</u-form-item>
				</u-form>
				<button class="green-button" style="margin-top: 20rpx;" @click="login()">{{translations.登录}}</button>
				<view class="alternative">
					<view class="password" @click="toRegister()">{{translations.注册}}</view>
					<view class="issue" @click="forget()">{{translations.忘记密码}}</view>
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
				show: false,
				validateForm: {
					user: {
						mail: '',
						password: ''
					},
				},
				rules: { //规则
					mail: [ //trigger表示触发验证的事件,blur：失去焦点,focus:获得焦点
						{
							required: true,
							message: '请输入邮箱!',
							trigger: 'blur'
						},
					],
					password: [{
							required: true,
							message: '请输入密码!',
							trigger: 'blur'
						},
						//pattern:正则表达式的规则
						/* {pattern: /^(?=.*\S).+$/, message: '请输入密码!', trigger: 'blur'} */
					]
				},
				translations: this.language === "en-US" ? English : Chinese
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.validateForm.user.mail) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		onReady() {
			this.$refs.validateFormRef.setRules(this.rules);
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.translations.登录
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
		onShow() {},
		methods: {
			toRegister: function() {
				uni.navigateTo({
					url: "/pages/user/register/register"
				})
			},
			login: function() {
				this.$refs.validateFormRef.validate(valid => {
					if (valid) {
						uni.request({
							url: '/api/user/login',
							data: {
								email: this.validateForm.user.mail, // 使用重命名后的 email
								password: this.validateForm.user.password
							},
							method: 'GET',
							timeout: 5000,
							success: res => {
								console.log('res:', res);
								if (res.data.message == "登录成功" && res.data.code === 200) {
									uni.setStorageSync('user', res.data.data);
									uni.switchTab({
										url: '/pages/profile/profile',
										success: (res) => {
											uni.$emit('loginSuccess', res.data.data);
										},
										fail: err => {
											console.error('导航错误:', err);
										}
									});
								} else if (res.data.message === "用户不存在" || res.data.message ===
									"密码错误") {
									this.$u.toast('用户名或密码错误');
								} else {
									this.$u.toast('网络错误');
								}
							},
							fail: err => {
								console.log(err);
								this.$u.toast('网络错误');
							}
						});
					}
				});
			},
			forget: function() {
				uni.navigateTo({
					url: "/pages/forget/forget"
				})
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

	@import "./login.scss";
</style>