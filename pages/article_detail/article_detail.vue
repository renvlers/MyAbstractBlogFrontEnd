<template>
	<!-- <u-card :title="title" :sub-title="subTitle" :thumb="thumb" :class="{ 'dark-theme': darkTheme }">
		<view class="" slot="body">
			<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0"
				v-for="(articles,index) in articleslist" :item="articles" :index="index" :key="articles.a_id"
				@click="toDetail(articles.a_id)">
				<view class="u-body-item-title u-line-2">{{articles.a_title}}</view>
				<image mode="aspectFill" :src="articles.ç"></image>
			</view>
		</view>
	</u-card> -->
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="container">
			<view class="article-box" v-for="item of articleslist" :key="item.a_id" @click="toDetail(item.a_id)">
				<image :src="item.a_cover_url ? item.a_cover_url : '/static/svg/default-cover.svg'" :alt="translations.文章封面图"
					class="article-cover">
					<view class="article-info">
						<h1 class="title">{{item.a_title}}</h1>
						<p class="tabloid" style="font-size: 1em;">{{translations.简介}}：{{item.a_tabloid}}</p>
					</view>
					<image src="/static/svg/arrow.svg" alt="" class="right-arrow">
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
				articleslist: [],
				title: '',
				subTitle: '',
				thumb: '',
				translations: this.language === "en-US" ? English : Chinese
			}
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: this.translations.分类详情
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
			console.log("option.id", option.cg_id)
			this.$u.get('/api/category/getcategory/' + option.cg_id).then(res => {
				console.log("detail:", res)
				//请求成功执行的函数
				if (res.code == 200) {
					this.articleslist = res.data
				}

			}).catch(err => { //请求失败执行的函数
				console.log(err)
			})
		},
		methods: {
			toDetail(aid) {
				console.log("" + aid);
				uni.navigateTo({
					url: `/pages/article/article?aid=${aid}`
				});
			}
		}
	}
</script>

<style lang="scss">
</style>