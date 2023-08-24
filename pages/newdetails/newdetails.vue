<template>
	<view class="global-view">
		<view class="container">
			<view :class="{ 'dark-theme': darkTheme }">
				<!-- User Info Box -->
				<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-0">
					<view class="u-m-r-10">
						<u-avatar :src="u_avatar_url" size="140"></u-avatar>
					</view>
					<view class="u-flex-1">
						<view class="u-font-18 u-p-b-20">{{ u_nickname }}</view>
					</view>
				</view>

				<!-- Dynamic Content -->
				<view class="dynamic-content">
					<text>{{ d_content }}</text>
				</view>

				<!-- Dynamic Images -->
				<view class="dynamic-images u-flex">
					<image v-if="d_image1" :src="d_image1" class="dynamic-image"></image>
					<image v-if="d_image2" :src="d_image2" class="dynamic-image"></image>
					<image v-if="d_image3" :src="d_image3" class="dynamic-image"></image>
					<image v-if="d_image4" :src="d_image4" class="dynamic-image"></image>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				d_id: "",
				u_id: "",
				d_content: "",
				d_create_time: "",
				d_image1: "",
				d_image2: "",
				d_image3: "",
				d_image4: "",
				error: "",
				u_nickname: "",
				u_avatar_url: "",
			};
		},
		onLoad(para) {
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
			this.d_id = para.d_id;

			// Make GET request to fetch dynamic data
			this.fetchDynamicData().then(() => {
				// After dynamic data is fetched, fetch user data
				this.fetchUserData();
			});
		},
		methods: {
			fetchDynamicData() {
				// Make API GET request
				const apiUrl = `api/Dynamics/getdynamicbyd/${this.d_id}`;
				return fetch(apiUrl)
					.then((response) => response.json())
					.then((data) => {
						if (data.code === 200) {
							this.u_id = data.data.u_id;
							this.d_content = data.data.d_content;
							this.d_create_time = data.data.d_create_time;
							this.d_image1 = data.data.d_image1;
							this.d_image2 = data.data.d_image2;
							this.d_image3 = data.data.d_image3;
							this.d_image4 = data.data.d_image4;
						} else {
							// Handle error case
							this.error = "动态加载失败，请重试。";
						}
					})
					.catch((error) => {
						this.error = "动态加载失败，请重试。";
					});
			},
			fetchUserData() {
				// Make API GET request
				const apiUrl = `api/user/getuser/${this.u_id}`; // Use this.u_id
				fetch(apiUrl)
					.then((response) => response.json())
					.then((data) => {
						if (data.code === 200) {
							this.u_nickname = data.data.u_nickname;
							this.u_avatar_url = data.data.u_avatar_url;
						} else {
							// Handle error case
							this.error = "用户信息加载失败，请重试。";
						}
					})
					.catch((error) => {
						this.error = "用户信息加载失败，请重试。";
					});
			},
		},
	};
</script>

<style lang="scss">

	/* Your existing styles */
	.dynamic-content {
		padding: 20px;
	}

	.dynamic-images {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		/* Center images horizontally */
	}

	.dynamic-image {
		width: calc(40% - 5px);
		/* Two images per row with a little margin */
		margin: 5px;
		/* Add some margin between images */
	}

	/* Your existing styles */
</style>