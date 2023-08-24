
<template>
	<view class="" :class="{ 'dark-theme': darkTheme }">
		<u-form ref="validateFormRef" :model="user" :label-width="150">
			<u-form-item label="个性签名:" prop="personality" placeholder="编辑你的个性签名">
				<u-input v-model="user.u_signature" />
			</u-form-item>
		</u-form>
		<u-button @click="submit()">保存</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					u_nickname: '',
					u_password: '',
					u_type:0,
					u_signature: '',
					u_email:'',
					u_id: 0,
				},
				rules: {
					u_nickname: [{
						required: false,
						message: '',
						trigger: 'blur'
					}]
				}
			}
		},
		onReady() {
			this.$refs.validateFormRef.setRules(this.rules);
		},
		onShow() { //在页面显示的时候调用这个周期函数
			//从storage中读取用户信息
			let user = uni.getStorageSync("user")
			   this.user = user
			console.log(this.user)
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
		},
		methods: {
			submit: function() {
				this.$refs.validateFormRef.validate(valid => {
					if (valid) {
						console.log(this.user)
						let user = this.user
						uni.request({
							url: '/api/user/update',
							method: 'PUT',
							data: this.user,
							timeout: 5000,
							success: function(res) {
								console.log(res)
								//修改成功，跳转到个人中心
								if (res.data.code == 200) {
									uni.setStorageSync("user",user)
									uni.reLaunch({
										url:'/pages/profile/profile'
									})
								}
							},
							fail: function() {
								console.log("修改失败")
							}
						})
					}

				}
				)
			}
		},
	}
</script>

<style>

</style>