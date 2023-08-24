<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="container"><u-button class="green-button" style="background-color: #37d11c; color: white"@click="newDynamics()">{{translations.发表动态}}</u-button></view>
		<view class="container"><u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index"
						@click="navigateToDetail(item.d_id)">
						<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.d_image1"
							:index="index"></u-lazy-load>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="demo-img-wrap">
							<image class="demo-image" :src="item.d_image1" mode="widthFix"></image>
						</view>
						<!-- #endif -->
						<view class="demo-title">
							{{item.d_content}}
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index"
						@click="navigateToDetail(item.d_id)">
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.d_image1"
							:index="index"></u-lazy-load>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="demo-img-wrap">
							<image class="demo-image" :src="item.d_image1" mode="widthFix"></image>
						</view>
						<!-- #endif -->
						<view class="demo-title">
							{{item.d_content}}
						</view>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>
	</view>

</template>

<script>
	import Chinese from '@/languages/zh-CN'
	import English from '@/languages/en-US'
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				scrollTop: 0,
				flowList: [],
				list: [],
				translations: this.language === "en-US" ? English : Chinese
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.translations.动态
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
			fetch('/api/Dynamics/list', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(response => response.json())
				.then(data => {
					if (data.code === 200) {
						this.list = data.data.map(item => ({
							d_content: item.d_content,
							d_image1: item.d_image1,
							d_id: item.d_id
						}));

						// 打印返回的数据到控制台
						console.log('返回的数据:', this.list);

						// 在初始数据加载完成后调用 addRandomData
						this.addRandomData();
					} else {
						console.error('从后端获取数据时出错:', data.message);
					}
				})
				.catch(error => {
					console.error('从后端获取数据时出错:', error);
				});
		},




		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			newDynamics() {
				uni.navigateTo({
					url: "/pages/new-dynamics/new-dynamics"
				})
			},
			navigateToDetail(d_id) {
				localStorage.setItem('selected_d_id', d_id);
				uni.navigateTo({
					url: `/pages/newdetails/newdetails?d_id=${d_id}`
				})
			},
			addRandomData() {
				for (let i = 0; i < 10; i++) {
					let index = this.$u.random(0, this.list.length - 1);
					let newItem = Object.assign({}, this.list[index], {
						id: this.$u.guid()
					});
					this.flowList.push(newItem);
				}
			},


			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			clear() {
				this.$refs.uWaterfall.clear();
			}
		}
	}
</script>

<style>
</style>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>