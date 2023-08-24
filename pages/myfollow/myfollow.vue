<template>
	<view class="global-view">
		<view class="container">
			<view :class="{ 'dark-theme': darkTheme }">
				<u-divider style="margin-top: 4%;">向左滑动对用户使用更多操作</u-divider>
				<view>
					<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.use_u_id"
						@click="unfollow(index, item.use_u_id)" @open="open(index)" :options="options">
						<view class="item u-border-bottom" @click="redirectToDetail(item.use_u_id)">
							<image mode="aspectFill" :src="item.u_avatar_url" />
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap">
								<text class="title u-line-2">{{ item.u_nickname }}</text>
							</view>
						</view>
					</u-swipe-action>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [

				],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: '取消关注',
					style: {
						backgroundColor: '#28ff07'
					}
				}, ]
			};
		},
		created() {
			const userId = uni.getStorageSync("user").u_id; // 手动设置用户ID
			// 发起获取关注列表请求
			fetch(`/api/user/followlist/${userId}`)
				.then(response => response.json())
				.then(data => {
					if (data.code === 200) {
						this.list = data.data;
						console.log('Received follow list:', this.list);
					} else {
						this.$u.toast('加载我的关注失败');
					}
				})
				.catch(error => {
					console.error('获取关注列表时出错：', error);
					this.$u.toast('加载我的关注失败');
				});
		},
		onLoad() {
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


			unfollow(index, use_u_id) {
				const userId = uni.getStorageSync("user").u_id; // Set user ID manually

				const requestData = {
					u_id: userId,
					use_u_id: use_u_id
				};

				console.log('Sending request with data:', requestData);

				fetch(`/api/user/unfollow/${use_u_id}?u_id=${userId}`, {
						method: 'DELETE',
					})
					.then(response => response.json())
					.then(data => {
						if (data.code === 200) {
							this.$u.toast('取关成功');
							// Remove unfollowed user from the list
							this.list.splice(index, 1);
						} else {
							this.$u.toast('取关失败');
						}
					})
					.catch(error => {
						console.error('取消关注时出错：', error);
						this.$u.toast('取关失败');
					});
			},



			open(index) {
				// Close other swipe actions and open the selected one
				this.list.forEach((item, idx) => {
					if (idx !== index) {
						this.$set(item, 'show', false);
					}
				});
			},
			redirectToDetail(id) {
				localStorage.setItem('selected_item_id', id);
				// Navigate to the detail page
				uni.navigateTo({
					url: '/pages/otherhome/otherhome' // Replace with your detail page route
				});
			}
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