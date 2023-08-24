<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="container">
			<span class="label">{{translations.动态正文}}</span>
			<textarea v-model="newDynamics.content" class="dynamics-content" name="dynamic-content" id="" cols="30"
				rows="10" maxlength="-1"></textarea>
		</view>
		<view v-if="true" class="container">
			<text class="label">{{translations.添加图片}}（{{translations.不超过}} 4 {{translations.张}}）</text>
			<view class="image-box">
				<image v-for="(imageSrc, index) of imageSet" :src="imageSrc" mode="" @click="delImg(index)"></image>
				<button v-if="imageSet.length<4" @click="addImg()">+</button>
			</view>
		</view>
		<view class="container">
			<button class="green-button" @click="postDynamics">{{translations.发布}}</button>
		</view>
	</view>
</template>

<script>
	import Chinese from '@/languages/zh-CN'
	import English from '@/languages/en-US'
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
				imageSet: [],
				newDynamics: {
					content: "",
					img1Url: null,
					img2Url: null,
					img3Url: null,
					img4Url: null
				},
				translations: this.language === "en-US" ? English : Chinese
			}
		},
		methods: {
			addImg() {
				uni.chooseImage({
					count: 4,
					success: (arr) => {
						for (let i of arr.tempFilePaths) {
							this.imageSet.push(i);
						}
					}
				})
			},
			delImg(index) {
				this.imageSet.splice(index, 1);
			},
			async uploadImage(filePath, index) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: "/api/file/upload",
						filePath: filePath,
						success: (response) => {
							let parsedData = JSON.parse(response.data).data;
							if (index == 0) this.newDynamics.img1Url = parsedData;
							else if (index == 1) this.newDynamics.img2Url = parsedData;
							else if (index == 2) this.newDynamics.img3Url = parsedData; // 注意此处的修复
							else if (index == 3) this.newDynamics.img4Url = parsedData;
							resolve();
						},
						fail: reject
					});
				});
			},
			async uploadAllImagesAndCreateDynamics() {
				try {
					for (let i = 0; i < this.imageSet.length; i++) {
						await this.uploadImage(this.imageSet[i], i);
					}

					// 所有图片上传完成，发布动态
					uni.request({
						url: "/api/Dynamics/create",
						method: "POST",
						data: {
							d_content: this.newDynamics.content,
							d_image1: this.newDynamics.img1Url,
							d_image2: this.newDynamics.img2Url,
							d_image3: this.newDynamics.img3Url,
							d_image4: this.newDynamics.img4Url,
							u_id: uni.getStorageSync("user").u_id
						},
						success: (response) => {
							uni.showToast({
								title: "发布成功",
								success: () => {
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										});
									}, 1500);
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

				} catch (error) {
					uni.showToast({
						title: "图片上传失败",
						icon: "error"
					});
				}
			},
			postDynamics() {
				console.log(this.newDynamics.content);
				if (this.newDynamics.content.trim() !== "") {
					this.uploadAllImagesAndCreateDynamics();
				} else {
					uni.showToast({
						title: "动态正文不能为空",
						icon: "error"
					});
				}
			}
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
			if (!uni.getStorageSync("user")) {
				uni.showToast({
					title: "请先登录账号",
					icon: "error",
					success: () => {
						setTimeout(() => {
							uni.redirectTo({
								url: "/pages/login/login"
							})
						}, 1500);
					}
				});
			}
		}
	}
</script>

<style>

</style>