<template>
		<view class="global-view">
			<view class="u-avatar-wrap">
				<image style="width: 100px; height: 100px" class="u-avatar-demo" alt="头像无法正常加载" :src="user.u_avatar_url"
					mode="aspectFill" @click="chooseAvatar"></image>
			</view>
			<!-- <u-button @click="upload">上传头像</u-button> -->
			<view class="container">
				<u-form-item label="昵称">
					<u-input border="border" v-model="user.u_nickname" class="input-box"/>
				</u-form-item>
				<u-form-item label="账号">
					<u-input border="border" v-model="user.u_id" disabled class="input-box"/>
				</u-form-item>
				<u-form-item label="性别">
					<u-input v-model="user.u_gender" :type="type" :border="border" @click="show = true" class="input-box"/>
					<u-action-sheet :list="actionSheetList" v-model="show"
						@click="actionSheetCallback"></u-action-sheet>
				</u-form-item>
				<u-form-item label="生日">
					<u-input border="border" v-model="user.u_birth_date" class="input-box"/>
					<u-calendar v-model="show_calendar" :mode="mode" @change="change"></u-calendar>
					<u-button style="margin: 0 0 0 20rpx; height: 5.5vh" @click="choose()">选择</u-button>
				</u-form-item>
				<u-form-item label="邮箱">
					<u-input border="border" v-model="user.u_email" disabled class="input-box"/>
				</u-form-item>
			</view>

			<button class="green-button" style="width: 92%; margin-top: 40rpx" @click="save()" type="primary">保存</button>
		</view>

</template>

<script>
	export default {
		data() {
			return {
				avatar: '',
				user: {
					u_id: 0,
					u_nickname: '',
					u_type: 0,
					u_signature: '',
					u_email: '',
					u_password: '',
					u_gender: '',
					u_avatar_url: '',
					u_birth_date: ''
				},
				type: 'select',
				show: false,
				show_calendar: false,
				mode: 'date',
				border: true,
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					},
				],
			}
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				// 可以在此上传到服务端
				this.upload()
			})
		},
		onShow() { //在页面显示的时候调用这个周期函数
			//从storage中读取用户信息
			let user = uni.getStorageSync("user")
			console.log("user:", user)
			if (user) {
				this.user = user
			}
		},
		methods: {
			async upload() {
				await uni.uploadFile({
					url: '/api/file/upload',
					filePath: this.avatar,
					name: 'file',
					success: (res) => {
						let testData = JSON.parse(res.data)
						console.log("upload-res:", testData.code)
						if (testData.code === 200) {
							this.user.u_avatar_url = testData.data
							console.log("xxxx:", this.user)
							/* this.save()*/
						}
					}
				});
			},

			change(e) {
				console.log("e:", e.result);
				this.user.u_birth_date = e.result
			},
			choose: function() {
				this.show_calendar = true //隐藏日历
			},
			actionSheetCallback(index) {
				this.user.u_gender = this.actionSheetList[index].text;
			},
			chooseAvatar() {
				this.$u.route({
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			save: function() {
				uni.request({
					url: '/api/user/update',
					method: 'PUT',
					data: this.user,
					timeout: 5000,
					success: (res) => {
						console.log("birthday", this.user.u_birth_date)
						//修改成功，跳转到个人中心
						if (res.data.code === 200) {
							uni.request({
								url: `/api/user/getuser/${this.user.u_id}`,
								method: 'GET',
								timeout: 5000,
								success: function(res) {
									//修改成功，跳转到个人中心
									if (res.data.code == 200) {
										console.log('查询成功')
										console.log("birthday1", res.data.data.u_birth_date)
										uni.setStorageSync('user', res.data.data)
										uni.reLaunch({
											url: '/pages/profile/profile',
										})
									}
								},
								fail: function() {
									console.log("修改失败")
								}
							})
						}
					},
					fail: function() {
						console.log("修改失败")
					}
				})
			}

		}

	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}

	.u-avatar-wrap {
		margin-top: 80rpx;
		overflow: hidden;
		margin-bottom: 80rpx;
		text-align: center;
	}

	.u-avatar-demo {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100rpx;
	}
	.input-box {
		background-color: white;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.1);
	}
</style>