<template>
	<view class="global-view" :class="{ 'dark-theme': darkTheme }">
		<view class="cover-box" v-if="article.cover != '/static/svg/default-cover.svg'">
			<image :src="article.cover" alt="" srcset="">
		</view>
		<view class="container" id="the-article">
			<view class="title-author-and-time">
				<h1 class="article-details-title">{{article.title}}</h1>
				<view class="author-and-time">
					<span class="icon-with-text" @click="toProfile(article.author)">
						<image src="/static/svg/author.svg" alt="" class="small-icon">
							{{article.author}}
					</span>
					<span class="icon-with-text">
						<image src="/static/svg/time.svg" alt="" class="small-icon">
							{{article.createTime}}
					</span>
				</view>
			</view>
			<hr class="article-horizonal-line">
			<view class="views-likes-favorites">
				<span id="views" class="icon-with-text">
					<image src="/static/svg/views.svg" alt="" class="small-icon">
						{{article.views}}
				</span>
				<span id="likes" class="icon-with-text">
					<image src="/static/svg/like.svg" alt="" class="small-icon">
						{{article.likes}}
				</span>
				<span id="favorites" class="icon-with-text">
					<image src="/static/svg/favorites.svg" alt="" class="small-icon">
						{{article.favorites}}
				</span>
			</view>
			<hr class="article-horizonal-line">
			<view class="article-content">
				<zero-markdown-view :style="articleFont" :themeColor="darkTheme? 'white' : 'black'" :markdown="article.content">

				</zero-markdown-view>
			</view>
		</view>
		<view v-if="article.tags.length!=0 && !(article.tags.length==1 && article.tags[0]==='')" class="container" id="tags">
			<span v-for="items of article.tags">{{items}}</span>
		</view>
		<view class="container" id="button-likes-and-favorties">
			<button @click="sendLike" class="likes-button">{{!isLiked?translations.点赞:translations.已点赞}}</button>
			<button @click="sendFav" class="favorites-button">{{!isFavorite?translations.收藏:translations.已收藏}}</button>
		</view>
		<view class="container" id="comments">
			<span>
				<p>{{translations.评论}}({{comments.length}})</p>
				<button class="new-comment-button" @click="toggleCommentTextBox()">{{translations.发表评论}}</button>
			</span>
			<hr class="article-horizonal-line">
			<view class="comment-box" v-for="(item, index) of comments" :key="-item.cid">
				<view class="comment-user-avatar-and-nickname">
					<image :src="item.avatar===null ? '/static/svg/default-avatar.svg' : item.avatar" alt="">
						<view class="user-and-date">
							<span>{{item.nickname}}</span>
							<span>{{item.ctime}}</span>
						</view>
				</view>
				<view class="more-info">
					<button class="icon-button" ref="moreInfo" @click="toggleMenu(item)">
						<image src="/static/svg/more.svg" alt="" srcset="">
					</button>
				</view>

				<view class="comment-content">
					{{item.ctext}}
				</view>

			</view>

		</view>
		<transition name="menu-slide-up">
			<view v-if="showMenu" ref="menu" class="menu">
				<ul>
					<li ref="copy" @click="copyContent()">{{translations.复制}}</li>
					<li v-if="isMine" @click="toggleEditTextBox()">{{translations.修改}}</li>
					<li v-if="isMine" style="color: red;" @click="deleteComment()">{{translations.删除}}</li>
					<li ref="cancel" @click="closeAllMenu()">{{translations.删除}}</li>
				</ul>
			</view>
		</transition>
		<transition name="bgcolor" mode='out-in'>
			<view v-if="showMenu || showTextBox || showEditTextBox" class="fixed-background" @click="closeAllMenu()">
			</view>
		</transition>
		<transition name="comment-box-slide-down">
			<view class="text-box" v-if="showTextBox">
				<textarea v-model="newComments.content" name="comment" maxlength="-1"></textarea>
				<view class="text-box-buttons">
					<button class="new-comment-button" @click="sendNewComment()">{{translations.发送}}</button>
					<button class="new-comment-button" @click="closeAllMenu()">{{translations.取消}}</button>
				</view>
			</view>
			<view class="text-box" v-if="showEditTextBox">
				<textarea v-model="editComments.content" name="edit-comment" maxlength="-1"></textarea>
				<view class="text-box-buttons">
					<button class="new-comment-button" @click="editComment()">{{translations.修改}}</button>
					<button class="new-comment-button" @click="closeAllMenu()">{{translations.取消}}</button>
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
	import Chinese from '@/languages/zh-CN'
	import English from '@/languages/en-US'
	export default {
		data() {
			return {
				articleFont: {
					fontFamily: uni.getStorageSync("font")
				},
				currComment: null,
				isMine: false,
				isLiked: false,
				isFavorite: false,
				showTextBox: false,
				showEditTextBox: false,
				showMenu: false,
				themeColor: "#000000",
				article: {
					aid: 0,
					title: "",
					author: "",
					createTime: "",
					tabloid: "",
					views: 0,
					likes: 0,
					favorites: 0,
					cover: "",
					content: "",
					tags: ""
				},
				newComments: {
					content: ""
				},
				editComments: {
					content: ""
				},
				comments: [],
				translations: this.language === "en-US" ? English : Chinese
			}
		},
		onLoad(para) {
			this.loadArticle(para);
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
			toProfile(user) {
				if(uni.getStorageSync("user").u_id === this.article.authorid){
					uni.navigateTo({
						url: "/pages/myhome/myhome"
					});
				} else {
					uni.navigateTo({
						url: "/pages/otherhome/otherhome"
					});
				}
			},
			loadArticle(para) {
				uni.request({
					url: `/api/article/getarticle/${para.aid}`,
					method: "GET",
					success: (response) => {
						this.article.aid = response.data.data.a_id;
						this.article.title = response.data.data.a_title;
						this.article.createTime = response.data.data.a_create_time;
						this.article.tabloid = response.data.data.a_tabloid;
						this.article.cover = response.data.data.a_cover_url === null ?
							"/static/svg/default-cover.svg" : response.data.data.a_cover_url;
						this.article.content = response.data.data.a_content;
						this.article.tags = response.data.data.a_tags.split(",").map((item) => item.trim());
						this.article.authorid = response.data.data.u_id;
						uni.request({
							url: `/api/user/getuser/${this.article.authorid}`,
							method: "GET",
							success: (response) => {
								this.article.author = response.data.data.u_nickname;
							}
						});
						uni.setNavigationBarTitle({
							title: this.article.title
						});
						uni.request({
							url: `/api/article/addviews?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
							method: "PUT",
							fail: () => {
								uni.showToast({
									title: this.translations.阅读量增加出现错误,
									icon: "error"
								});
							}
						});
						uni.request({
							url: `/api/article/getviews/${this.article.aid}`,
							method: "GET",
							success: (response) => {
								this.article.views = response.data.data;
							}
						});
						uni.request({
							url: `/api/article/getlikenum/${this.article.aid}`,
							method: "GET",
							success: (response) => {
								this.article.likes = response.data.data;
							}
						});
						uni.request({
							url: `/api/article/getcollectnum/${this.article.aid}`,
							method: "GET",
							success: (response) => {
								this.article.favorites = response.data.data;
							}
						});
						uni.request({
							url: `/api/comment/getcommentbyarticle/${this.article.aid}`,
							method: "GET",
							success: (response) => {
								for (let i of response.data.data) {
									let nick = null;
									let avatar = null;
									uni.request({
										url: `api/user/getuser/${i.u_id}`,
										success: (res) => {
											nick = res.data.data.u_nickname;
											avatar = res.data.data.u_avatar_url;
											this.comments.push({
												cid: i.c_id,
												ctext: i.c_content,
												uid: i.u_id,
												ctime: i.c_time,
												nickname: nick,
												avatar: avatar
											});
										}
									});
								}
							},
							fail: () => {
								uni.showToast({
									title: this.translations.评论获取失败,
									icon: "error"
								})
							}
						});
						uni.request({
							url: `/api/article/iscollected?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
							method: "GET",
							success: (response) => {
								if (response.data.message === "未收藏")
									this.isFavorite = false;
								else
									this.isFavorite = true;
							},
							fail: (error) => {
								uni.showToast({
									title: this.translations.信息获取存在错误,
									icon: "error"
								})
							}
						});
						uni.request({
							url: `/api/article/isliked?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
							method: "GET",
							success: (response) => {
								if (response.data.message === "未点赞")
									this.isLiked = false;
								else
									this.isLiked = true;
							},
							fail: (error) => {
								uni.showToast({
									title: this.translations.信息获取存在错误,
									icon: "error"
								})
							}
						});
					},
					fail: function(response) {
						uni.showToast({
							title: this.translations.文章加载失败,
							icon: "error"
						});
					}
				});
			},
			closeAllMenu() {
				this.showMenu = false;
				this.showTextBox = false;
				this.showEditTextBox = false;
			},
			toggleMenu(cmt) {
				this.showMenu = !this.showMenu;
				if (this.showMenu) {
					if (uni.getStorageSync("user").u_id === cmt.uid) {
						this.isMine = true;
					} else {
						this.isMine = false;
					}
					this.currComment = cmt;
				}
				if (!this.showMenu) {
					this.showEditTextBox = false;
					console.log(this.showEditTextBox);
				}
			},
			toggleCommentTextBox() {
				if (uni.getStorageSync("user"))
					this.showTextBox = !this.showTextBox;
				else{
					uni.showToast({
						title: this.translations.请先登录账号,
						icon: "error",
						success: () => {
							setTimeout(() => {uni.navigateTo({url: "/pages/login/login"})}, 1500);
						}
					});
				}
			},
			toggleEditTextBox() {
				if (uni.getStorageSync("user")) {
					this.editComments.content = this.currComment.ctext;
					this.showEditTextBox = !this.showEditTextBox;
				} else
					uni.navigateTo({
						url: "/pages/login/login"
					});
			},
			sendNewComment() {
				uni.request({
					url: "/api/comment/create",
					method: "POST",
					data: {
						a_id: this.article.aid,
						c_content: this.newComments.content,
						u_id: uni.getStorageSync('user').u_id
					},
					success: (response) => {
						uni.showToast({
							title: this.translations.发表成功,
							icon: "success"
						});
						this.toggleCommentTextBox();
						uni.request({
							url: `/api/comment/getcommentbyarticle/${this.article.aid}`,
							method: "GET",
							success: (response) => {
								this.comments = [];
								for (let i of response.data.data) {
									let nick = null;
									let avatar = null;
									uni.request({
										url: `api/user/getuser/${i.u_id}`,
										success: (res) => {
											nick = res.data.data.u_nickname;
											avatar = res.data.u_avatar_url;
											this.comments.push({
												cid: i.c_id,
												ctext: i.c_content,
												uid: i.u_id,
												ctime: i.c_time,
												nickname: nick,
												avatar: avatar
											});
										}
									});
								}
							},
							fail: () => {
								uni.showToast({
									title: this.translations.评论获取失败,
									icon: "error"
								})
							}
						});
					},
					fail: () => {
						uni.showToast({
							title: this.translations.发表失败,
							icon: "error"
						});
					}
				});
			},
			editComment() {
				uni.request({
					url: `/api/comment/update?a_id=${this.article.aid}&c_content=${encodeURIComponent(this.editComments.content)}&c_id=${this.currComment.cid}&u_id=${uni.getStorageSync('user').u_id}`,
					method: "PUT",
					success: (response) => {
						uni.showToast({
							title: this.translations.修改成功,
							icon: "success"
						});
						this.closeAllMenu();
						uni.request({
							url: `/api/comment/getcommentbyarticle/${this.article.aid}`,
							method: "GET",
							success: (response) => {
								this.comments = [];
								for (let i of response.data.data) {
									let nick = null;
									let avatar = null;
									uni.request({
										url: `api/user/getuser/${i.u_id}`,
										success: (res) => {
											nick = res.data.data.u_nickname;
											avatar = res.data.data.u_avatar_url;
											this.comments.push({
												cid: i.c_id,
												ctext: i.c_content,
												uid: i.u_id,
												ctime: i.c_time,
												nickname: nick,
												avatar: avatar
											});
										}
									});
								}
							},
							fail: () => {
								uni.showToast({
									title: this.translations.评论获取失败,
									icon: "error"
								})
							}
						});
					},
					fail: () => {
						uni.showToast({
							title: this.translations.修改失败,
							icon: "error"
						});
					}
				});
			},
			deleteComment() {
				uni.request({
					url: `/api/comment/delete/${this.currComment.cid}`,
					method: "DELETE",
					success: (response) => {
						uni.showToast({
							title: this.translations.删除成功,
							icon: "success"
						});
						this.toggleMenu(this.currComment.cid);
						uni.request({
							url: `/api/comment/getcommentbyarticle/${this.article.aid}`,
							method: "GET",
							success: (response) => {
								this.comments = [];
								for (let i of response.data.data) {
									let nick = null;
									let avatar = null;
									uni.request({
										url: `api/user/getuser/${i.u_id}`,
										success: (res) => {
											nick = res.data.data.u_nickname;
											avatar = res.data.data.u_avatar_url;
											this.comments.push({
												cid: i.c_id,
												ctext: i.c_content,
												uid: i.u_id,
												ctime: i.c_time,
												nickname: nick,
												avatar: avatar
											});
										}
									});
								}
							},
							fail: () => {
								uni.showToast({
									title: this.translations.评论获取失败,
									icon: "error"
								})
							}
						});
					},
					fail: () => {
						uni.showToast({
							title: this.translations.删除失败,
							icon: "error"
						});
					}
				});
			},
			copyContent() {
				uni.setClipboardData({
					data: this.currComment.ctext,
					success: () => {
						uni.showToast({
							title: this.translations.评论已复制
						});
					}
				});
				this.toggleMenu(this.currCid);
			},
			sendLike() {
				if (!uni.getStorageSync("user")) {
					uni.showToast({
						title: this.translations.请先登录账号,
						icon: "error",
						success: () => {
							setTimeout(() => {uni.navigateTo({url: "/pages/login/login"})}, 1500);
						}
					});
				} else {
					if (!this.isLiked) {
						uni.request({
							url: `/api/article/addlike?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
							method: "POST",
							success: (response) => {
								uni.showToast({
									title: this.translations.点赞成功,
									icon: "success"
								});
								uni.request({
									url: `/api/article/isliked?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
									method: "GET",
									success: (response) => {
										console.log(response);
										if (response.data.message === "未点赞")
											this.isLiked = false;
										else
											this.isLiked = true;
										uni.request({
											url: `/api/article/getlikenum/${this.article.aid}`,
											method: "GET",
											success: (response) => {
												this.article.likes = response.data
													.data;
											}
										});
									},
									fail: (error) => {
										uni.showToast({
											title: this.translations.信息获取存在错误,
											icon: "error"
										})
									}
								});
							},
							fail: (error) => {
								uni.showToast({
									title: this.translations.点赞失败,
									icon: "error"
								});
							}
						});
					} else {
						uni.request({
							url: `/api/article/deletelike?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
							method: "DELETE",
							header: {
								'content-type': 'application/json' // 默认值
							},
							success: (response) => {
								uni.showToast({
									title: this.translations.已取消点赞,
									icon: "success"
								});
								uni.request({
									url: `/api/article/isliked?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
									method: "GET",
									success: (response) => {
										console.log(response);
										if (response.data.message === "未点赞")
											this.isLiked = false;
										else
											this.isLiked = true;
										uni.request({
											url: `/api/article/getlikenum/${this.article.aid}`,
											method: "GET",
											success: (response) => {
												this.article.likes = response.data
													.data;
											}
										});
									},
									fail: (error) => {
										uni.showToast({
											title: this.translations.信息获取存在错误,
											icon: "error"
										})
									}
								});
							},
							fail: (error) => {
								uni.showToast({
									title: this.translations.取消点赞失败,
									icon: "error"
								});
							}
						});
					}
				}
			},
			sendFav() {
				if (!uni.getStorageSync("user")) {
					uni.showToast({
						title: this.translations.请先登录账号,
						icon: "error",
						success: () => {
							setTimeout(() => {uni.navigateTo({url: "/pages/login/login"})}, 1500);
						}
					});
				} else {
					if (!this.isFavorite) {
						uni.request({
							url: `/api/article/addcollect?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
							method: "POST",
							success: (response) => {
								uni.showToast({
									title: this.translations.收藏成功,
									icon: "success"
								});
								uni.request({
									url: `/api/article/iscollected?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
									method: "GET",
									success: (response) => {
										console.log(response);
										if (response.data.message === "未收藏")
											this.isFavorite = false;
										else
											this.isFavorite = true;
										uni.request({
											url: `/api/article/getcollectnum/${this.article.aid}`,
											method: "GET",
											success: (response) => {
												this.article.favorites = response.data
													.data;
											}
										});
									},
									fail: (error) => {
										uni.showToast({
											title: this.translations.信息获取存在错误,
											icon: "error"
										})
									}
								});
							},
							fail: (error) => {
								uni.showToast({
									title: this.translations.收藏失败,
									icon: "error"
								});
							}
						});
					} else {
						uni.request({
							url: `/api/article/deletecollect/${uni.getStorageSync('user').u_id}/${this.article.aid}`,
							method: "DELETE",
							header: {
								'content-type': 'application/json' // 默认值
							},
							success: (response) => {
								uni.showToast({
									title: this.translations.已取消收藏,
									icon: "success"
								});
								uni.request({
									url: `/api/article/iscollected?a_id=${this.article.aid}&u_id=${uni.getStorageSync('user').u_id}`,
									method: "GET",
									success: (response) => {
										console.log(response);
										if (response.data.message === "未收藏")
											this.isFavorite = false;
										else
											this.isFavorite = true;
										uni.request({
											url: `/api/article/getcollectnum/${this.article.aid}`,
											method: "GET",
											success: (response) => {
												this.article.favorites = response.data
													.data;
											}
										});
									},
									fail: (error) => {
										uni.showToast({
											title: this.translations.信息获取存在错误,
											icon: "error"
										})
									}
								});
							},
							fail: (error) => {
								uni.showToast({
									title: this.translations.取消收藏失败,
									icon: "error"
								});
							}
						});
					}
				}
			}
		}
	}
</script>

<style>
</style>