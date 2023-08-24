<template>
	<view class="global-view">
		<view class="container">
			<view :class="{ 'dark-theme': darkTheme }">
				<u-divider style="margin-top: 4%;">{{translations.向左滑动对用户使用更多操作}}</u-divider>
				<view>
					<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id"
						@click="follow" @open="open" :options="options">
						<view class="item u-border-bottom" @click="redirectToDetail(item.id)">
							<image mode="aspectFill" :src="item.images" />
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap">
								<text class="title u-line-2">{{ item.name }}</text>
							</view>
						</view>
					</u-swipe-action>
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
				list: [],
				options: [{
					text: '回关',
					style: {
						backgroundColor: '#28ff07'
					}
				}, ],
				translations: this.language === "en-US" ? English : Chinese
			};
		},
		created() {
			const userId = uni.getStorageSync("user").u_id;;
			if (userId) {
				fetch(`api/user/followedlist/${userId}`)
					.then(response => response.json())
					.then(data => {
						if (data.code === 200) {
							this.list = data.data.map(item => ({
								id: item.u_id,
								name: item.u_nickname,
								images: item.u_avatar_url,
								show: false
							}));
						} else {
							console.error('获取关注列表失败：', data);
						}
					})
					.catch(error => {
						console.error('获取关注列表时出错：', error);
					});
			} else {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.translations.我的粉丝
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
			follow(index) {
				const item = this.list[index];
				if (item) {
					const u_id = uni.getStorageSync("user").u_id;;
					const use_u_id = item.id;

					console.log('即将发送给后端的数据：', {
						u_id,
						use_u_id
					});
					fetch('/api/user/follow', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								u_id,
								use_u_id
							}),
						})
						.then(response => response.json())

						.then(data => {
							console.log(data.status);
							if (data.status === 500) {
								this.$u.toast(this.translations.已经关注过了);
							} else {
								this.$u.toast(this.translations.关注成功);
							}
						})
						.catch(error => {
							console.error('关注操作出错：', error);
						});
				}
			},
			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			redirectToDetail(id) {
				localStorage.setItem('selected_item_id', id);
				uni.navigateTo({
					url: '/pages/otherhome/otherhome'
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		padding: 20rpx;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
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