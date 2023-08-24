<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="container">
			<view style="margin: 20rpx auto;">{{translations.分类列表}}</view>
			<view class="categories-menu">
				<ul>
					<li v-for="(Categories,index) in Categorieslist" :item="Categories" :index="index" :key="Categories.cg_id" @click="toDetail(Categories.cg_id)">
						{{Categories.cg_name}}
					</li>
				</ul>
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
				Categorieslist:[],
				translations: this.language === "en-US" ? English : Chinese
			}
		},
		onLoad(){
			uni.setNavigationBarTitle({
				title: this.translations.分类
			});
			uni.setTabBarItem({
				index: 0,
				text: this.translations.首页
			});
			uni.setTabBarItem({
				index: 1,
				text: this.translations.分类
			});
			uni.setTabBarItem({
				index: 2,
				text: this.translations.投稿
			});
			uni.setTabBarItem({
				index: 3,
				text: this.translations.动态
			});
			uni.setTabBarItem({
				index: 4,
				text: this.translations.我的
			});
			//在页面加载的时候就会执行这个函数
			//发送请求去查询电影列表数据
			//uni.request({}) 这个属于uniapp中的请求方式
			//采用uview中的请求方式
			this.$u.get('/api/category/list').then(res =>{
				//请求成功执行的函数
				if(res.code==200){
					this.Categorieslist = res.data
				}
			}).catch(err =>{//请求失败执行的函数
				console.log(err)
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
		computed: {
		
		},
		methods: {
			toDetail:function(id){//跳转到文章详情页面
				uni.navigateTo({
					url:'/pages/article_detail/article_detail?cg_id='+id
				})
			}
			
		}
	}
</script>

<style>

</style>
