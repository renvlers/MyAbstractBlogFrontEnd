<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="container">
			<span class="label">动态正文</span>
			<textarea v-model="newDynamics.content" class="dynamics-content" name="dynamic-content" id="" cols="30" rows="10" maxlength="-1"></textarea>
		</view>
		<view v-if="false" class="container">
			<span class="label">添加图片（不超过4张）</span>
			<uni-file-picker :image-styles="gridStyle" file-mediatype="image" mode="grid"
				file-extname="png,jpg,bmp,gif,jpeg,tiff" :limit="4" :del-icon="true" />
		</view>
		<view class="container">
			<button class="green-button" @click="postDynamics">发布</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridStyle: {
					"height": "150rpx", // 边框高度
					"width": "150rpx", // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#ccc", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "10rpx" // 边框圆角，支持百分比
					},
				},
				newDynamics: {
					content: "",
					img1Url: null,
					img2Url: null,
					img3Url: null,
					img4Url: null
				}
			}
		},
		methods: {
			postDynamics(){
				console.log(this.newDynamics.content);
				if(this.newDynamics.content.trim() !== ""){
					uni.request({
						url: "/api/Dynamics/create",
						method: "POST",
						data: {
							d_content: this.newDynamics.content,
							d_image1: this.img1Url,
							d_image2: this.img2Url,
							d_image3: this.img3Url,
							d_image4: this.img4Url,
							u_id: uni.getStorageSync("user").u_id
						},
						success: (response) => {
							uni.showToast({
								title: "发布成功",
								success: () => {
									setTimeout(() => {uni.navigateBack({delta: 1})}, 1500);
								}
							});
						},
						fail: () => {
							uni.showToast({
								title: "发布失败",
								icon: "error"
							});
						}
					});
				} else {
					uni.showToast({
						title: "动态正文不能为空",
						icon: "error"
					});
				}
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
			if(!uni.getStorageSync("user")){
				uni.showToast({
					title: "请先登录账号",
					icon: "error",
					success: () => {
						setTimeout(() => {uni.redirectTo({url: "/pages/login/login"})}, 1500);
					}
				});
			}
		}
	}
</script>

<style>

</style>
