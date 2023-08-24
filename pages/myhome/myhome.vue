<template>
	<view class="global-view">
		<view class="container">
			<view :class="{ 'dark-theme': darkTheme }">
				<view class="header" :style="'background-image: url(' + backgroundImage + ')'">
					<image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
					<view class="info">
						<text class="nickname">{{ userInfo.nickname }}</text>
					</view>
					<view class="signature-container">
						<text class="signature">{{ userInfo.signature }}</text>
					</view>
				</view>
				<view>
					<u-gap height="10" bg-color="#ffffff"></u-gap>
				</view>
				<view>
					<u-subsection :list="list1" :current="current" @change="handleChange"></u-subsection>
				</view>
				<view>
					<u-divider style="margin-top: 4%;">{{translations.使用选择器可以更换浏览内容}}</u-divider>
					<view v-for="(item, index) in activeList" :key="item.id">
						<u-swipe-action :show="item.show" :index="index" @click="click(index)" @open="open(index)"
							:options="options">
							<view class="item u-border-bottom" @click="redirectToDetail(item.id)">
								<image mode="aspectFill" :src="item.cover_url" />
								<view class="title-wrap">
									<text class="title u-line-2">{{ item.title }}</text>
								</view>
							</view>
							<view slot="action">
								<text @click="deleteItem(index)" class="delete-text">{{translations.删除}}</text>
							</view>
						</u-swipe-action>
					</view>
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
				backgroundImage: 'https://img1.imgtp.com/2023/08/14/BWOKc0Nv.png',
				userInfo: {
					avatar: '',
					nickname: '',
					signature: '',
					u_id: null
				},
				list1: [{
						name: '文章'
					},
					{
						name: '动态'
					}, {
						name: "收藏"
					}
				],
				list2: [],
				list3: [{
						id: 1,
						title: '路人甲',
						cover_url: 'https://cdn.uviewui.com/uview/common/logo.png'
					},
					{
						id: 2,
						title: '土匪乙',
						cover_url: 'https://cdn.uviewui.com/uview/common/logo.png'
					}
				],
				list4: [],
				current: 0,
				selectedIndex: 0,
				activeList: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				translations: this.language === "en-US" ? English : Chinese
			};
		},
		async created() {
			this.activeList = this.list2;

			const u_id = uni.getStorageSync("user").u_id;

			try {
				const userDataResponse = await fetch(`api/user/getuser/${u_id}`);
				const userData = await userDataResponse.json();

				if (userData.code === 200) {
					this.userInfo.avatar = userData.data.u_avatar_url;
					this.userInfo.nickname = userData.data.u_nickname;
					this.userInfo.signature = userData.data.u_signature;
					this.userInfo.u_id = userData.data.u_id;
				}

				const articleDataResponse = await fetch(`api/article/getarticlebyuid/${u_id}`);
				const articleData = await articleDataResponse.json();

				if (articleData.code === 200) {
					this.list2 = articleData.data.map(article => {
						return {
							id: article.a_id,
							title: article.a_title,
							cover_url: article.a_cover_url,
						};
					});

					console.log("文章数据:", this.list2);
				}

				// Set the activeList after both data are loaded
				this.activeList = this.list2;

				// 请求动态数据
				const dynamicDataResponse = await fetch(`api/Dynamics/getdynamicbyu/${u_id}`);
				const dynamicData = await dynamicDataResponse.json();

				if (dynamicData.code === 200) {
					this.list3 = dynamicData.data.map(dynamic => {
						return {
							id: dynamic.d_id,
							title: dynamic.d_content,
							cover_url: dynamic.d_image1,
						};
					});
				}

				const collectDataResponse = await fetch(`api/article/getcollect/${u_id}`);
				const collectData = await collectDataResponse.json();
				if (collectData.code === 200) {
					this.list4 = collectData.data.map(collect => { // 使用 this.list4 存储收藏列表数据
						return {
							id: collect.a_id, // 收藏列表数据使用 collect.a_id
							title: collect.a_title,
							cover_url: collect.a_cover_url,
						};
					});

					console.log("收藏数据:", this.list4);
				}
			} catch (error) {
				console.error('获取用户信息或文章时出错：', error);
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.translations.我的主页
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


		methods: {
			handleChange(index) {
				this.selectedIndex = index; // 保存选中的 index
				console.log("Current value after changing:", index);
				if (index === 0) {
					this.activeList = this.list2;
				} else if (index === 1) {
					this.activeList = this.list3;
				} else if (index === 2) {
					this.activeList = this.list4;
				}
			},
			redirectToDetail(itemID) {
				console.log("Selected index before redirection:", this.selectedIndex);
				if (this.selectedIndex === 0) { // 文章
					uni.navigateTo({
						url: `/pages/article/article?aid=${itemID}`
					});
				} else if (this.selectedIndex === 1) { // 动态
					uni.navigateTo({
						url: `/pages/newdetails/newdetails?d_id=${itemID}`
					});
				} else if (this.selectedIndex === 2) { // 收藏
					uni.navigateTo({
						url: `/pages/article/article?aid=${itemID}`
					});

				}
			},
			async click(index) {
				const item = this.activeList[index];
				let endpoint = '';
				let requestData = {};

				if (this.selectedIndex === 0) {
					// 删除文章
					endpoint = `api/article/delete/${item.id}`;
					requestData = {
						a_id: item.id
					};
				} else if (this.selectedIndex === 1) {
					// 删除动态
					this.deleteDynamic(item.id);
				} else if (this.selectedIndex === 2) {
					// 删除收藏
					this.deleteCollect(item.id);
					return;
				}

				// 向后端发送 DELETE 请求
				try {
					const response = await fetch(endpoint, {
						method: 'DELETE',
						// 如果需要的话，添加请求头
						// body: JSON.stringify(requestData), // 如果需要发送请求体
					});
					const data = await response.json();

					if (data.code === 200) {
						// 显示成功消息并执行必要的操作
						this.$u.toast('删除成功');
						this.activeList.splice(index, 1); // 从列表中删除项目
					} else if (data.code === 404) {
						this.$u.toast('网络失败');
					} else {
						// 如果需要的话，显示删除错误消息
						this.$u.toast('删除错误');
					}
				} catch (error) {
					// 处理请求失败的错误
					console.error('删除请求出错：', error);
				}
			},
			deleteDynamic(d_id, index) {
				this.$u.delete(`api/Dynamics/delete/${d_id}`)
					.then(res => {
						console.log(res);
						// 删除收藏成功后的逻辑
						this.$u.toast('删除成功'); // 弹出提示信息
						this.activeList.splice(index, 1); // 从列表中删除项目
					})
					.catch(err => {
						console.error(err);
						this.$u.toast('删除失败'); // 弹出删除失败的提示信息
					});
			},
			deleteCollect(a_id, index) {
				this.$u.delete(`api/article/deletecollect/${this.userInfo.u_id}/${a_id}`)
					.then(res => {
						console.log(res);
						// 删除收藏成功后的逻辑
						this.$u.toast('删除成功'); // 弹出提示信息
						this.activeList.splice(index, 1); // 从列表中删除项目
					})
					.catch(err => {
						console.error(err);
						this.$u.toast('删除失败'); // 弹出删除失败的提示信息
					});
			},
			open(index) {
				this.activeList[index].show = true;
				this.activeList.forEach((val, idx) => {
					if (index !== idx) this.activeList[idx].show = false;
				});
			},

		}
	};
</script>

<style>
	.page {
		background-color: #f0f0f0;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
		background-size: cover;
		background-position: center;
		height: 250px;
		position: relative;
	}

	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 100%;
		border: 2px solid #fff;
	}

	.info {
		margin-top: 10px;
		text-align: center;
	}

	.nickname {
		font-size: 18px;
		font-weight: bold;
	}

	.signature-container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 10px;
		text-align: center;
	}

	.signature {
		color: #333;
		font-size: 14px;
	}

	.item {
		display: flex;
		padding: 20rpx;
	}

	image {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>