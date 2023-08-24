<template>
	<view class="global-view">
		<view class="container">
			<view class="title">{{translations.注册}} BLOG</view>
			<u-form ref="validateFormRef" :model="user" :label-width="150">
			<u-form-item :label="translations.登录昵称" prop="u_nickname" required>
				<u-input class="input-box" v-model="user.u_nickname" placeholder="" />
			</u-form-item>
			<u-form-item :label="translations.邮箱" prop="u_email" required>
				<u-input class="input-box" v-model="user.u_email" placeholder="" />
			</u-form-item>
			<button class="green-button" @click="getCode()">{{translations.获取验证码}}</button>
			<u-form-item :label="translations.验证码" prop="u_code" required>
				<u-input class="input-box" type="" v-model="user.u_code" placeholder="" />
			</u-form-item>
			<u-form-item :label="translations.登录密码" prop="u_password" required>
				<u-input class="input-box" type="password" v-model="user.u_password" placeholder="" />
			</u-form-item>
			<u-form-item :label="translations.确认密码" prop="u_confirPassword" required>
				<u-input class="input-box" type="password" v-model="user.u_confirPassword" placeholder="" />
			</u-form-item>
		</u-form>
		<button class="green-button" @click="submit()">{{translations.提交}}</button>
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
				user: {
					u_avatar_url: '',
					u_signature: '',
					u_birth_date: '2022-11-03',
					u_nickname: '',
					u_password: '',
					u_confirPassword: '',
					u_type: 1,
					u_email: '',
					u_gender: '男',
					u_code: ''
				},
				code_ok: false,
				rules: { //规则
					u_nickname: [ //trigger表示触发验证的事件,blur：失去焦点,focus:获得焦点
						{
							required: true,
							message: '请输入登录用户名!',
							trigger: 'blur'
						},
					],
					u_email: [{
						required: true,
						message: '请输入邮箱!',
						trigger: 'blur'
					}],
					u_code: [{
						required: true,
						message: '请输入验证码!',
						trigger: 'blur'
					}],
					u_password: [{
						required: true,
						message: '请输入登录密码!',
						trigger: 'blur'
					}, ],
					u_confirPassword: [{
						required: true,
						message: '请再次输入密码！',
						trigger: 'blur'

					}]
				}
			}
		},
		onLoad(){
			uni.setNavigationBarTitle({
				title: this.translations.注册
			});
		},
		onReady() {
			this.$refs.validateFormRef.setRules(this.rules);
		},
		methods: {
			//注册的方法
			submit: function() {
				this.$refs.validateFormRef.validate(valid => {
						if (valid) {
							if (this.user.u_password == this.user.u_confirPassword){
							uni.request({
								url: `/api/example/verifycode?authCode=` + this.user.u_code + '&email=' +
									this.user.u_email,
								method: 'POST',
								timeout: 5000,
								success: (res) => {
									console.log('res1', res)
									if (res.data.code == 200) {
										console.log('code_ok1', this.code_ok)
										this.code_ok = true
										console.log('code_ok2', this.code_ok);
										this.$refs.validateFormRef.validate(valid => {
											if (valid) {
												console.log("code_ok", this.code_ok) 
													if(this.code_ok){
													uni.request({
														url: '/api/user/create',
														method: 'POST',
														data: this.user,
														timeout: 5000,
														success: function(res) {
															//注册成功，跳转到登录
															console.log(res)
															if (res.data.code == 200) {
																uni.navigateTo({
																	url: '/pages/user/register/register_success/register_success'
																})
															}
														},
														fail: function() {
															console.log("注册失败")
														}
													})
													}
													else
													{
														this.$u.toast("验证码输入错误")
													}
											}
										}, )
									}
									else{
										this.$u.toast("验证码输入错误")
									}
									

								}
							})
							}
							else{
								this.$u.toast("两次密码输入不一致")
							}
						}
					});
					
			},
			getCode: function() {
				//1.向邮箱发送验证码
				//2.核对验证码的正确性
				console.log('email',this.user.u_email)
				uni.request({
					url:`/api/user/getuserbyemail?email=${this.user.u_email}`,
					data:{u_email:this.user.u_email},
					method:'GET',
					timeout:5000,
					success: (res) => {
						if (res.data.code == 200 && res.data.message == "用户不存在") 
						{
							uni.request({
								url: `/api/example/sendEmail?email=${this.user.u_email}`,
								method: 'POST',
								timeout: 5000,
								success: (res) => {
									console.log("email", this.user.u_email)
									console.log("res", res)
									if (res.data.code == 200) {
										console.log("发送成功")
									}
									else{
										this.$u.toast("发送失败")
									}
							
								}
							})
						}
						else if(res.data.code == 200 && res.data.message == "用户存在"){
							this.$u.toast("用户已存在，无需重复注册")
						}
						else{
							this.$u.toast("其他错误")
						}
					}
				})
			}
		},


	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
	.input-box {
		background-color: white;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.1);
	}
	.title {
	  text-align: center;
	  font-size: 60rpx;
	  font-weight: 400;
	  margin-bottom: 40rpx;
	}
</style>