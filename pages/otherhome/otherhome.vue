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
						<button class="followBtn" @click="tapfollow">{{whetherfollow}}</button>
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
						<view class="item u-border-bottom" @click="redirectToDetail(item.id)">
							<image mode="aspectFill" :src="item.cover_url" />
							<view class="title-wrap">
								<text class="title u-line-2">{{ item.title }}</text>
							</view>
						</view>
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
					signature: ''
				},
				list1: [{
						name: '文章'
					},
					{
						name: '动态'
					},
				],
				list2: [],
				list3: [],
				current: 0,
				selectedIndex: 0,
				activeList: [],
				translations: this.language === "en-US" ? English : Chinese,
				uid: 0,
				whetherfollow: '',
				followcode: '',
				isLogin: false,
			};
		},
		async created() {
			const itemID = this.uid;
			this.activeList = this.list2; // 默认加载 list2

			if (itemID) {
				const u_id = itemID;

				try {
					const userDataResponse = await fetch(`api/user/getuser/${u_id}`);
					const userData = await userDataResponse.json();

					if (userData.code === 200) {
						this.userInfo.avatar = userData.data.u_avatar_url;
						this.userInfo.nickname = userData.data.u_nickname;
						this.userInfo.signature = userData.data.u_signature;
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
					}

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

					// 根据选择的索引设置 activeList
					if (this.selectedIndex === 0) {
						this.activeList = this.list2;
					} else if (this.selectedIndex === 1) {
						this.activeList = this.list3;
					}
				} catch (error) {
					console.error('获取用户信息或文章时出错：', error);
				}
			}
		},
		onLoad(para) {
			this.uid = para.u_id;
			uni.setNavigationBarTitle({
				title: this.translations.TA的主页
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
		},
		onPullDownRefresh() {
			console.log('refresh');
			let userid = this.uid;
			setTimeout(function() {
				uni.redirectTo({
					url: `/pages/otherhome/otherhome?u_id=${userid}`
				})
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			let user = uni.getStorageSync("user");

			if (user) {
				this.isLogin = true;
				this.user = user;

				const itemID = localStorage.getItem('selected_item_id');

				if (this.uid) {
					const u_id = user.u_id;
					const use_u_id = parseInt(this.uid);

					const requestData = {
						u_id: u_id,
						use_u_id: use_u_id
					};
					console.log(u_id, use_u_id);

					uni.request({
						url: '/api/user/isfollowed',
						data: requestData,
						method: 'get',
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
							const isFollowedData = res.data;


							if (isFollowedData.code == 200) {

								if (isFollowedData.data == false) {
									this.whetherfollow = this.translations.关注;
									this.followcode = 0;
								} else if (isFollowedData.data == true) {
									this.whetherfollow = this.translations.取关;
									this.followcode = 1;
								} else {
									console.error("Error: Unexpected response message");
									this.whetherfollow = "错误";
								}
							} else {
								console.error("Error:", isFollowedData.message);
								this.whetherfollow = "错误";
							}
						},
						fail: (err) => {
							console.error("Error:", err);
							this.whetherfollow = "错误";
						}
					});
				} else {
					this.whetherfollow = "错误";
				}
			} else {
				this.isLogin = false;
				this.whetherfollow = "未登录";
				this.followcode = null;
			}
		},
		methods: {
			async tapfollow() {
				if (!this.isLogin) {
					// 处理用户未登录情况
					console.log("用户未登录。");
					return;
				}

				const u_id = this.user.u_id;
				const use_u_id = parseInt(this.uid);

				if (this.followcode === 0) {
					// 关注用户
					try {
						const response = await fetch(`/api/user/follow`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								u_id: u_id,
								use_u_id: use_u_id
							})
						});

						const responseData = await response.json();

						if (responseData.code === 200) {
							// 成功关注
							this.whetherfollow = "取关";
							this.followcode = 1;
							this.$u.toast("关注成功");
						} else {
							// 处理关注失败情况
							this.$u.toast("关注失败");
						}
					} catch (error) {
						console.error("关注出错：", error);
					}
				} else if (this.followcode === 1) {
					// 取消关注用户
					const requestData = {
						u_id: u_id,
						use_u_id: use_u_id
					};

					console.log('Sending request with data:', requestData);

					fetch(`/api/user/unfollow/${use_u_id}?u_id=${u_id}`, {
							method: 'DELETE',
						})
						.then(response => response.json())
						.then(data => {
							if (data.code === 200) {
								this.whetherfollow = "关注";
								this.followcode = 1;
								this.$u.toast('取关成功');

							} else {
								this.$u.toast('取关失败');
							}
						})
						.catch(error => {
							console.error('取消关注时出错：', error);
							this.$u.toast('取关失败');
						});

				}
			},
			handleChange(index) {
				this.selectedIndex = index; // 保存选中的 index
				console.log("Current value after changing:", index);
				if (index === 0) {
					this.activeList = this.list2;
				} else if (index === 1) {
					this.activeList = this.list3;
				}
			},
			redirectToDetail(itemID) {
				console.log("Selected index before redirection:", this.selectedIndex);
				if (this.selectedIndex === 0) { // 文章
					uni.navigateTo({
						url: `/pages/article/article?aid=${itemID}`
					});
				} else if (this.selectedIndex === 1) { // 动态
					localStorage.setItem('selected_d_id', itemID);
					uni.navigateTo({
						url: `/pages/newdetails/newdetails?d_id=${itemID}`
					});
				}
			},
		},


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
		height: 300px;
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
		font-size: 16px;
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

	.followBtn {
		background-color: rgba(204, 204, 204, 0.95);
		width: 30%;
		height: 35px;
		font-size: 15px;
	}
</style>