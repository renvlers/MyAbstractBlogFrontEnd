<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="top-button-box">
			<button ref="recommended" id="recommended" @click="switchPageState('recommended')"
				:disabled="isDisabledRecommended">推荐</button>
			<button ref="following" id="following" @click="switchPageState('following')"
				:disabled="isDisabledFollowing">关注</button>
		</view>
		<view class="container" id="homepage-container">
			<uni-search-bar v-model="searchKey" @confirm="toSearch(searchKey)" :bgColor="darkTheme? 'black' : 'white'" placeholder="搜索文章" />
		</view>
		<view class="container">
			<view class="article-box" v-for="item of articles" :key="item.aid" @click="navigateToDetails(item.aid)">
				<image :src="item.coverUrl ? item.coverUrl : '/static/svg/default-cover.svg'" alt="文章封面图"
					class="article-cover">
					<view class="article-info">
						<h1 class="title">{{item.title}}</h1>
						<p class="author">作者：{{item.author}}</p>
						<p class="tabloid">简介：{{item.tabloid}}</p>
					</view>
					<image src="/static/svg/arrow.svg" alt="" class="right-arrow">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: "",
				pageState: "recommended",
				isDisabledRecommended: true,
				isDisabledFollowing: false,
				articles: []
			}
		},
		methods: {
			switchPageState(target) {
				if (target === "recommended") {
					this.isDisabledFollowing = false;
					this.isDisabledRecommended = true;
					this.getAllArticles();
					this.pageState = "recommended";
				} else if (target === "following") {
					if (uni.getStorageSync('user')) {
						this.isDisabledFollowing = true;
						this.isDisabledRecommended = false;
						this.getFollowingArticles();
						this.pageState = "following";
					} else {
						uni.showToast({
							title: "请先登录账号",
							icon: "error",
							success: () => {
								setTimeout(() => {uni.navigateTo({url: "/pages/login/login"})}, 1500);
							}
						});
					}
				}
			},
			getFollowingArticles() {
				this.articles = [];
				uni.request({
					url: `/api/article/getmessage/${uni.getStorageSync('user').u_id}`,
					method: "GET",
					success: async (response) => {
						console.log(response);
						for (let i of response.data.data) {
							let author = await this.getNicknameByUid(i.u_id);
							this.articles.push({
								aid: i.a_id,
								title: i.a_title,
								author: author,
								tabloid: i.a_tabloid,
								coverUrl: i.a_cover_url,
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: "文章获取失败",
							icon: "error"
						});
					}
				});
			},
			navigateToDetails(aid) {
				uni.navigateTo({
					url: `/pages/article/article?aid=${aid}`
				});
			},
			getNicknameByUid(uid) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: `/api/user/getuser/${uid}`,
						method: "GET",
						success: (response) => {
							resolve(response.data.data.u_nickname);
						},
						fail: (error) => {
							reject(error);
						}
					});
				});
			},
			getAllArticles() {
				this.articles = [];
				uni.request({
					url: "/api/article/list",
					method: "GET",
					success: async (response) => {
						console.log(response);
						for (let i of response.data.data) {
							let author = await this.getNicknameByUid(i.u_id);
							this.articles.push({
								aid: i.a_id,
								title: i.a_title,
								author: author,
								tabloid: i.a_tabloid,
								coverUrl: i.a_cover_url,
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: "文章获取失败",
							icon: "error"
						});
					}
				});
			},
			toSearch(key) {
				uni.navigateTo({
					url: `/pages/search/search?key=${key}`
				});
			}
		},
		onLoad() {
			this.pageState = 'recommended';
			this.getAllArticles();
			if (this.darkTheme) {
				uni.setNavigationBarColor({
					frontColor: '#ffffff', // 这是文字颜色，设置为白色
					backgroundColor: '#2a2a2a', // 这是背景颜色，设置为深色
				});
				uni.setTabBarStyle({
					backgroundColor: '#2a2a2a'
				});
			} else {
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#f8f8f8'
				});
				uni.setTabBarStyle({
					backgroundColor: '#f8f8f8'
				});
			}
		},
		onPullDownRefresh() {
			if (this.isDisabledRecommended)
				this.getAllArticles();
			else if (this.isDisabledFollowing)
				this.getFollowingArticles();
			setTimeout(uni.stopPullDownRefresh, 1000);
		}
	}
</script>

<style>
</style>