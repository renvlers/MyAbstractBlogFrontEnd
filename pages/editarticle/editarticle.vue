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
			</uni-forms>
		</view>
		<view class="container" id="content">
			<span>{{translations.文章内容}}</span>
			<male-editor class="text-editor" v-model="formData.content"></male-editor>
		</view>
		<view class="container">
			<button class="green-button" @click="postArticle()">{{translations.修改}}</button>
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
					aid: 0,
					title: "",
					type: 0,
					tabloid: "",
					tags: "",
					content: "",
					cover: ""
				},
				types: [],
				translations: this.language === "en-US" ? English : Chinese

			}
		},
		methods: {
			postArticle() {
				console.log(this.formData);
				let postDto = {
					a_id: this.formData.aid,
					a_content: this.formData.content,
					a_cover_url: this.formData.cover,
					a_tabloid: this.formData.tabloid,
					a_tags: this.formData.tags,
					a_title: this.formData.title,
					cg_id: this.formData.type
				};
				console.log(postDto);
				if (postDto.a_title == "" || +postDto.cg_id == 0 || postDto.a_tabloid == "" || postDto.a_content.trim() ===
					"") {
					uni.showToast({
						title: "请填写完整信息",
						icon: "error"
					});
				} else {
					console.log(postDto);
					uni.request({
						url: "/api/article/update",
						method: "PUT",
						data: postDto,
						success: (response) => {
							console.log(response);
							uni.showToast({
								title: "修改成功",
								icon: "success",
								success: () => {
									let aid = this.formData.aid;
									this.formData.content = "";
									this.formData = {};
									setTimeout(() => {
										uni.redirectTo({
											url: `/pages/article/article?aid=${aid}`
										})
									}, 1500);
								}
							});
						},
						fail: (error) => {
							uni.showToast({
								title: "修改失败",
								icon: "error"
							});
						}
					});
				}
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
		onLoad(para) {
			uni.request({
				url: `/api/article/getarticle/${para.aid}`,
				success: (response) => {
					this.formData.aid = response.data.data.a_id;
					this.formData.title = response.data.data.a_title;
					this.formData.type = response.data.data.cg_id;
					this.formData.tabloid = response.data.data.a_tabloid;
					this.formData.tags = response.data.data.a_tags;
					this.formData.content = response.data.data.a_content;
					this.formData.cover = response.data.data.a_cover_url;
					if (this.formData.cover === "" || this.formData.cover === null)
						this.isCoverExists = false;
					else
						this.isCoverExists = true;
				},
				fail: (error) => {
					console.error(error);
					uni.showToast({
						title: "文章信息加载失败",
						icon: "error"
					});
				}
			});
			uni.setNavigationBarTitle({
				title: this.translations.修改文章
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
			} else {
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