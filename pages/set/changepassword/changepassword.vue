<template>
	<view class="global-view">
		<view class="container">
			<view style="padding: 15px;" :class="{ 'dark-theme': darkTheme }">
				<u-form ref="validateFormRef" :model="user" :label-width="150">
					<u-form-item label="原密码" prop="inputPassword" required>
						<u-input class="input-box" v-model="user.inputPassword" placeholder="" />
					</u-form-item>
					<u-form-item label="新密码" prop="newPassword" required>
						<u-input class="input-box" type="password" v-model="user.newPassword" placeholder="" />
					</u-form-item>
					<u-form-item label="确认新密码" prop="confirmNewPassword" required>
						<u-input class="input-box" type="password" v-model="user.confirmNewPassword" placeholder="" />
					</u-form-item>
				</u-form>
				<button class="green-button" @click="submit()">修改</button>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				user: {
					inputPassword: '',
					u_id: 0,
					u_nickname: '',
					u_type: 0,
					u_personality: '',
					u_email: '',
					u_password: '',
					u_newPassword: '',
					confirmNewPassword: ''
				},
				rules: { //规则
					inputPassword: [{
						required: true,
						message: '请输入原密码!',
						trigger: 'blur'
					}],
					newPassword: [{
						required: true,
						message: '请输入新密码!',
						trigger: 'blur'
					}],
					confirmNewPassword: [{
						required: true,
						message: '请确认新密码！',
						trigger: 'blur'
					}]
				}
			};
		},
		onShow() { //在页面显示的时候调用这个周期函数
			//从storage中读取用户信息
			let user = uni.getStorageSync("user")
			this.user = user
		},
		onReady() {
			this.$refs.validateFormRef.setRules(this.rules);
		},
		onLoad() {
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
			submit: function() {
				this.$refs.validateFormRef.validate(valid => {
					if (valid) {
						console.log('表单通过验证')
						console.log(this.user)
						if (this.user.u_password == this.user.inputPassword) {
							console.log('输入的原密码和原密码一致')
							if (this.newPassword != this.user.u_password) {
								if (this.user.newPassword == this.user.confirmNewPassword) {
									console.log('原密码与新密码一致')
									this.user.u_password = this.user.confirmNewPassword
									uni.request({
										url: '/api/user/update',
										method: 'PUT',
										data: this.user,
										timeout: 5000,
										success: function(res) {
											//修改成功，跳转到个人中心
											console.log(res)
											if (res.data.code == 200) {
												uni.reLaunch({
													url: '/pages/profile/profile'
												})
											}
										},
										fail: function() {
											console.log("注册失败")
										}
									})
								} else {
									this.$u.toast("两次密码输入不一致，请重新输入")
								}
							} else {
								this.$u.toast("新密码不能与原密码相同，请重新输入")
							}
						} else {
							this.$u.toast("原密码错误")
						}
					}
				}, )
			},
		},
	};
</script>

<style>
	.content {
		padding: 20px;
	}

	.card {
		background-color: #ffffff;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 10px;
		margin-bottom: 10px;
	}

	button:disabled {
		background-color: #b0b0b0;
		cursor: not-allowed;
	}
	
	.input-box {
		background-color: white;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.1);
	
	}
</style>