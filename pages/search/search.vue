<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view v-if="articles.length" class="container">
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
		<view v-else class="container">
			<span>{{translations.未搜索到任何结果}}</span>
		</view>
	</view>
</template>

<script>
	import Chinese from '@/languages/zh-CN'
	import English from '@/languages/en-US'
	export default {
		data() {
			return {
				articles: [],
				translations: this.language === "en-US" ? English : Chinese
			}
		},
		methods: {
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
			searchArticle(key){
				this.articles = [];
				uni.request({
					url: `/api/article/search?keyword=${key}`,
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
				});
			}
		},
		onLoad(para){
			uni.setNavigationBarTitle({
				title: this.translations.搜索结果
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
			this.searchArticle(para.key);
		}
	}
</script>

<style>

</style>