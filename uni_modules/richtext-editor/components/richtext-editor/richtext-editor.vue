<template>
	<view class="container">
		<view class="mode">
			<image @click="addDivider" src="../../static/halvingline.png" mode=""></image>
			<!-- <image @click="addDivider" src="../../static/halvinglineSelect.png" v-show="halvingline" mode=""></image> -->

			<image @click="whiteBig" src="../../static/title.png" v-show="!title" mode=""></image>
			<image @click="whiteBig" src="../../static/titleSelect.png" v-show="title" mode=""></image>

			<image @click="addBold" src="../../static/bold.png" v-show="!titleBold" mode=""></image>
			<image @click="addBold" src="../../static/boldSelect.png" v-show="titleBold" mode=""></image>

			<image @click="bias" src="../../static/incline.png" v-show="!slash" mode=""></image>
			<image @click="bias" src="../../static/inclineSelect.png" v-show="slash" mode=""></image>

			<image @click="insertImg" src="../../static/img.png" mode=""></image>


			<image @click="alignCenter" src="../../static/center.png" v-show="!center" mode=""></image>
			<image @click="alignCenter" src="../../static/centerSelect.png" v-show="center" mode=""></image>

			<image @click="alignLeft" src="../../static/leftcenter.png" v-show="!leftcenter" mode=""></image>
			<image @click="alignLeft" src="../../static/leftcenterSelect.png" v-show="leftcenter" mode=""></image>

			<image @click="alignright" src="../../static/rightcenter.png" v-show="!rightcenter" mode=""></image>
			<image @click="alignright" src="../../static/rightSelect.png" v-show="rightcenter" mode=""></image>

			<image @click="sort" src="../../static/underline.png" v-show="!underline" mode=""></image>
			<image @click="sort" src="../../static/underlineSelect.png" v-show="underline" mode=""></image>
		</view>

		<view class="two">
			<editor @statuschange="selected" class="myEditor" placeholder="写点什么儿~" show-img-size show-img-toolbar
				show-img-resize @ready="onEditorReady"></editor>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				Height: 0,
				halvingline: false,
				title: false,
				slash: false,
				titleBold: false, //变量
				center: false,
				leftcenter: false,
				rightcenter: false,
				underline: false,
				editorCtx: {}
			}
		},
		methods: {
			onEditorReady() { //初始化
				uni.createSelectorQuery().in(this).select('.myEditor').fields({
					context: true
				}, res => {
					console.log(res.context);
					this.editorCtx = res.context
				}).exec()
			},
			addDivider() { //插入分割线 halvingline
				this.halvingline = !this.halvingline //改变图标颜色
				this.editorCtx.insertDivider()
				this.editorCtx.getContents()
			},
			repeal() { //撤销
				this.editorCtx.undo()
			},
			recover() { //恢复
				this.editorCtx.redo()
			},
			addBold() { //字体加粗
				this.titleBold = !this.titleBold //变量
				this.editorCtx.format('bold', 'bold')
			},
			bias() { //字体倾斜
				this.slash = !this.slash //改变图标颜色
				this.editorCtx.format('italic')
			},
			alignCenter() { //居中对齐
				this.center = !this.center //改变图标颜色
				this.leftcenter = false //改变图标颜色
				this.rightcenter = false //改变图标颜色
				this.editorCtx.format('align', 'center') //属性，值
			},
			alignLeft() { //居左对齐
				this.leftcenter = !this.leftcenter //改变图标颜色
				this.center = false //改变图标颜色
				this.rightcenter = false //改变图标颜色
				this.editorCtx.format('align', 'left') //属性，值
			},
			alignright() { //居右对齐
				this.rightcenter = !this.rightcenter //改变图标颜色
				this.center = false //改变图标颜色
				this.leftcenter = false //改变图标颜色
				this.editorCtx.format('align', 'right') //属性，值
			},
			sort() { //排序
				this.underline = !this.underline //改变图标颜色
				this.editorCtx.format('list', 'ordered') //属性，值 ordered 排序 bullet 点 check 方格
			},
			whiteBig() { //标题字体变大
				this.title = !this.title
				if (this.title) {
					this.editorCtx.format('header', 'H2')
				} else if (!this.title) {
					this.editorCtx.format('header', '0')
				}
			},
			selected() { //选中内容
				this.editorCtx.getSelectionText()
			},
			insertImg() { //插入图片
				uni.chooseImage({
					success: res => {
						uni.showLoading({
							title: 'loading...'
						})
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							this.editorCtx.insertImage({
								src: res.tempFilePaths[i], //图片路径
							})
						}
						uni.hideLoading()
					}
				})
			},
			// 获取编辑器内容 
			getCtx() {
				var that = this
				that.editorCtx.getContents({
					success: function(data) {
						console.log(data)
					}
				})
			},



		}
	}
</script>

<style>
	.two {
		width: 100%;
		min-height: 800upx;
		height: max-content;
	}

	.myEditor {
		min-height: 800upx;
		height: max-content;
		padding: 0 20upx;
	}



	.mode {
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-top: 1upx solid #eeeeee;
		border-bottom: 1upx solid #eeeeee;
		background-color: #eeeeee;
		margin: 100upx 0 10upx 0;
	}

	.mode>image {
		width: 50upx;
		height: 50upx;
	}
</style>