<template>
	<view class="global-view">
		<view class="container">
			<text style="font-size: 1.25em">发送您的问题：</text>
			<input style="background-color: white; font-size: 1em; margin: 20rpx 0 0; border-radius: 10rpx; padding: 10rpx" v-model="TEXT"/>
		</view>
		<button class="green-button" style="margin: 30rpx; width: calc(100% - 60rpx);" @click="sendToSpark()">发送</button>
		<view class="container">
			<text style="font-size: 1.25em">回复：</text>
			<text style="width: 100%;flex-wrap:wrap;font-size: 1em; margin:20rpx 0 0;">{{sparkResult}}</text>
		</view>
	</view>
</template>

<script>
	import * as base64 from "base-64"
	import CryptoJS from '../../static/crypto-js/crypto-js.js'
	import parser from '../../static/fast-xml-parser/src/parser'
	import * as utf8 from "utf8"
	export default {
		data() {
			return {
				TEXT: '',
				APPID: '625a2d35', // 控制台获取填写
				APISecret: 'NDY1NDJiZGZmYzNjYWJiYmRlMTkxYmJm',
				APIKey: '181ae46996eff260d5d4334f3311c4bb',
				sparkResult: '',
			}
		},
		methods: {
			async sendToSpark() {
				let myUrl = await this.getWebSocketUrl();
				this.sparkResult="";
				let realThis = this;
				this.socketTask = uni.connectSocket({
					//url: encodeURI(encodeURI(myUrl).replace(/\+/g, '%2B')),
					url: myUrl,
					method: 'GET',
					success: res => {
						console.log(res, "ws成功连接...", myUrl)
						realThis.wsLiveFlag = true;
					}
				})
				realThis.socketTask.onError((res) => {
					console.log("连接发生错误", res)
				})
				realThis.socketTask.onOpen((res) => {
					console.info("wss的onOpen成功执行...", res)
					// 第一帧..........................................
					console.log('open成功...')
					let params = {
						"header": {
							"app_id": this.APPID,
							"uid": "aef9f963-7"
						},
						"parameter": {
							"chat": {
								"domain": "general",
								"temperature": 0.5,
								"max_tokens": 1024
							}
						},
						"payload": {
							"message": {
								"text": [{
										"role": "user",
										"content": "我叫大王，请记住我的名字"
									},
									{
										"role": "assistant",
										"content": "好的，大王。我会记住您的名字。"
									},
									{
										"role": "user",
										"content": this.TEXT
									}
								]
							}
						}
					};
					console.log("发送第一帧...", params)
					realThis.socketTask.send({ // 发送消息，，都用uni的官方版本
						data: JSON.stringify(params),
						success() {
							console.log('第一帧发送成功')
						}
					});
				});

				// 接受到消息时
				realThis.socketTask.onMessage((res) => {
					console.log('收到API返回的内容：', res.data);
					let obj=JSON.parse(res.data)
					// console.log("我打印的"+obj.payload);
					let dataArray= obj.payload.choices.text;
					for(let i=0;i<dataArray.length;i++){
						realThis.sparkResult =realThis.sparkResult+ dataArray[i].content
					}
					// realThis.sparkResult =realThis.sparkResult+ 
					let temp = JSON.parse(res.data)
					// console.log("0726",temp.header.code)
					if (temp.header.code !== 0) {
						console.log(`${temp.header.code}:${temp.message}`);
						realThis.socketTask.close({
							success(res) {
								console.log('关闭成功', res)
								realThis.wsLiveFlag = false;
							},
							fail(err) {
								  console.log('关闭失败', err)
							}
						})
					}
					if (temp.header.code === 0) {
						if (res.data && temp.header.status === 2) {
							/* let dataArray= obj.payload.choices.text;
							for(let i=0;i<dataArray.length;i++){
								realThis.sparkResult =realThis.sparkResult+ dataArray[i].content
							} */
							setTimeout(() => {
								realThis.socketTask.close({
									success(res) {
										console.log('关闭成功', res)
									},
									fail(err) {
										// console.log('关闭失败', err)
									}
								})
							}, 1000)
						}
					}
				})
			},
			// 鉴权
			getWebSocketUrl() {
				return new Promise((resolve, reject) => {
					// 请求地址根据语种不同变化 https://spark-api.xf-yun.com/v1.1/chat
					var url = "wss://spark-api.xf-yun.com/v1.1/chat";
					var host = "spark-api.xf-yun.com";
					var apiKeyName = "api_key";
					var date = new Date().toGMTString();
					var algorithm = "hmac-sha256";
					var headers = "host date request-line";
					var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
					var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.APISecret);
					var signature = CryptoJS.enc.Base64.stringify(signatureSha);
					var authorizationOrigin =
						`${apiKeyName}="${this.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
					var authorization = base64.encode(authorizationOrigin);
					url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

					// console.log(url)
					resolve(url); // 主要是返回地址
				});
			},
		}
	}
</script>

<style>

</style>