<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="container">
			<uni-forms label-position="top" label-width="100%">
				<uni-forms-item :label="translations.标题" name="title" :required="true">
					<uni-easyinput v-model="formData.title" type="text" :maxlength="20"
						:placeholder="translations.请输入标题" />
				</uni-forms-item>
				<uni-forms-item :label="translations.分类" name="type" :required="true">
					<uni-data-select v-model="formData.type" style="background-color: white; border-radius: 10rpx;"
						:localdata="types" :placeholder="translations.请选择分类" :clear="true"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item :label="translations.简介" name="tabloid" :required="true">
					<uni-easyinput type="text" v-model="formData.tabloid" :placeholder="translations.请输入简介" />
				</uni-forms-item>
				<uni-forms-item :label="translations.标签" name="tags" :required="false">
					<uni-easyinput type="text" v-model="formData.tags" :placeholder="translations.请输入标签" />
				</uni-forms-item>
				<uni-forms-item :label="translations.封面" name="cover" :required="false">
					<image v-if=isCoverExists :src="formData.cover" alt="上传封面">
						<button v-if="isCoverExists" class="red-button"
							@click="cancelUploadCover()">{{translations.取消上传}}</button>
						<button v-else class="green-button" @click="uploadCover()">{{translations.上传封面}}</button>
				</uni-forms-item>
				<uni-forms-item :label="translations.定时发布" name="intime" :required="false">
					<label style="color: dimgray">
						<checkbox-group @change="changeCheckboxValue">
							<checkbox value="enabled" /><text>{{translations.启用定时发布}}</text>
						</checkbox-group>
					</label>
					<uni-datetime-picker v-model="formData.time" :disabled="!inTimeCheckBox.isEnabled"
						style="margin-top: 30rpx;" :start="Date.now()"
						:placeholder="translations.请选择定时发布时间"></uni-datetime-picker>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="container" id="content">
			<span>{{translations.文章内容}}</span>
			<male-editor class="text-editor" v-model="formData.content"></male-editor>
		</view>
		<view class="container">
			<button class="green-button" @click="postArticle()">{{translations.发布}}</button>
		</view>
	</view>
</template>

<script>
	import Chinese from '@/languages/zh-CN'
	import English from '@/languages/en-US'
	export default {
		data() {
			return {
				isCoverExists: false,
				inTimeCheckBox: {
					isEnabled: false
				},
				gridStyle: {
					"height": "400rpx", // 边框高度
					"width": "100%", // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#ccc", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "10rpx" // 边框圆角，支持百分比
					}
				},
				formData: {
					title: "",
					type: 0,
					tabloid: "",
					tags: "",
					isTiming: false,
					time: null,
					content: "",
					cover: ""
				},
				types: [],
				translations: this.language === "en-US" ? English : Chinese

			}
		},
		methods: {
			postArticle() {
				if (!uni.getStorageSync("user")) {
					uni.showToast({
						title: "请先登录账号",
						icon: "error",
						success: () => {
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/login/login",
								})
							}, 1500);
						}
					});
				} else {
					console.log(this.formData);
					console.log(this.inTimeCheckBox);
					let postDto = {
						a_content: this.formData.content,
						a_cover_url: this.formData.cover === "" ? null : this.formData.cover,
						a_deliver_time: this.formData.isTiming && this.formData.isTiming !== "" ? this.formData.time
							.split(
								" ").join("T") : null,
						a_tabloid: this.formData.tabloid,
						a_tags: this.formData.tags,
						a_title: this.formData.title,
						cg_id: this.formData.type,
						u_id: uni.getStorageSync('user').u_id
					};
					if (postDto.a_title == "" || +postDto.cg_id == 0 || postDto.a_tabloid == "" || postDto.a_content
					.trim() ===
						"") {
						uni.showToast({
							title: "请填写完整信息",
							icon: "error"
						});
					} else if (this.formData.isTiming && postDto.a_deliver_time === null) {
						uni.showToast({
							title: "请设置定时发布时间",
						});
					} else {
						console.log(postDto);
						uni.request({
							url: "/api/article/create",
							method: "POST",
							data: postDto,
							success: (response) => {
								uni.showToast({
									title: "投稿成功",
									icon: "success",
									success: () => {
										this.formData.content = "";
										this.formData = {};
										setTimeout(() => {
											uni.reLaunch({
												url: "/pages/home/home"
											})
										}, 1500);
									}
								});
							},
							fail: (error) => {
								uni.showToast({
									title: "投稿失败",
									icon: "error"
								});
							}
						});
					}
				}
			},
			changeCheckboxValue(detail) {
				this.inTimeCheckBox.isEnabled = detail.detail.value[0] === 'enabled' ? true : false;
				this.formData.isTiming = this.inTimeCheckBox.isEnabled;
			},
			uploadCover() {
				uni.chooseImage({
					count: 1,
					success: (imgResponse) => {
						uni.uploadFile({
							url: "/api/file/upload",
							filePath: imgResponse.tempFilePaths[0],
							success: (response) => {
								console.log(response.data);
								this.formData.cover = JSON.parse(response.data).data;
								this.isCoverExists = true;
							},
							fail: () => {
								uni.showToast({
									title: "封面上传失败",
									icon: "error"
								})
							}
						});
					}
				});
			},
			cancelUploadCover() {
				this.formData.cover = "",
					this.isCoverExists = false;
			}
		},
		created() {
			this.formData.isTiming = this.inTimeCheckBox.isEnabled;
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.translations.投稿
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
			uni.request({
				url: "/api/category/list",
				success: (res) => {
					for (let i of res.data.data) {
						this.types.push({
							text: i.cg_name,
							value: i.cg_id,
							disable: false
						});
					}
				},
				fail: () => {
					uni.showToast({
						title: "分类信息查询失败",
						icon: "error"
					});
				}
			});
		}
	}
</script>

<style>
	#content {
		padding: 10rpx;
		width: calc(100% - 60rpx);
	}

	#content span {
		margin: 20rpx 0 0 20rpx;
	}

	.text-editor {
		width: 100%;
		height: auto;
		margin: 0;
		padding: 0;
		box-shadow: none;
		background-color: none;
	}
</style>