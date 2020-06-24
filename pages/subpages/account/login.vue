<template>
	<view>
		<view class="login-form">
			<input class="input-row js-input-numer" v-model="account" type="number" maxlength="11" placeholder="输入手机号" />
			<input class="input-row" v-model="password" @confirm="bindLogin" type="password" maxlength="20" placeholder="输入密码" confirm-type="登录" />
			<button type="button" class="btn login-btn" @click="bindLogin">登录</button>
			<view class="bot flex-box">
				<navigator class="sign" hover-class="none">立即注册</navigator>
				<navigator class="forget" hover-class="none">忘记密码?</navigator>
			</view>
		</view>
		<view class="auth-row" v-if="hasProvider">
			<view class="auth-image" v-for="provider in providerList" :key="provider.value">
				<!-- #ifdef APP-PLUS -->
				<image class="img" :src="provider.image" @click="authLogin(provider.value)"></image>
				<!-- #endif -->
				<!-- 小程序处理 -->
				<!-- #ifdef MP-WEIXIN -->
				<button v-if="provider.value == 'value'" class="log-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
					<image class="img" :src="provider.image"></image>
				</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				hasProvider: false,
				providerList: [],
				account: '',
				password: ''
			};
		},
		onReady() {
			this.getProvider()
			// #ifdef H5
			this.$nextTick(function(){
				document.querySelector('.js-input-numer input').setAttribute("pattern", "[0-9]*")
			})
			// #endif
		},
		methods: {
			...mapMutations(['storeLogin']),
			// 微信授权
			getUserInfo(res) {
				if (!res.detail.iv) {
					uni.showToast({
						icon:'none',
						title: "您取消了授权，登录失败"
					});
					return false
				}
				// 用户授权
				setTimeout(() => {
					let profile = JSON.parse(res.detail.rawData)
					profile.nickname = profile.nickName
					
					const temp = {
						token: '',
						profile,
					}
					this.storeLogin(temp)
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 100)
			},
			// 获取服务供应商
			getProvider() {
				const providerList = ['weixin', 'qq', 'sinaweibo']
				// 判断是否用某种登录工具登录
				uni.getProvider({
					service: 'oauth',
					success: res => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								var tempProvider = res.provider[i]
								if (~providerList.indexOf(tempProvider)) {
									this.providerList.push({
										value: tempProvider,
										image: '/static/image/login/' + tempProvider + '.png'
									});
								}
							}
							this.hasProvider = true
						}
					},
					fail: err => {
						console.log('获取服务供应商失败：' + JSON.stringify(err))
					}
				})
			},
			// 账号登录
			bindLogin() {
				const account = this.account.trim()
				const password = this.password.trim()
				if (!account.length) {
					this.alert('请输入手机号')
					return false
				}
				if (!(/^1[3456789]\d{9}$/.test(account))) {
					this.alert('手机号码有误，请重填')
					return false
				}
				if (password.length < 6) {
					this.alert('密码最短为6个字符')
					return false
				}
				uni.showLoading({
					title: '登陆中'
				})
				
				const params = {
					phone: this.account,
					password: this.password
				}
				apiLogin(params).then(res => {
					if (res.code !== 200) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
						return false
					}
					
					const temp = {
						token: JSON.parse(res.bindings[1].tokenJsonStr).access_token,
						profile: res.profile
					}
					this.storeLogin(temp)
					
					uni.switchTab({
						url: '/pages/index/index'
					})
				})
			},
			// 第三方授权登录
			authLogin(value) {
				uni.login({
					provider: value,
					success: res => {
						console.log(res)
						uni.getUserInfo({
							provider: value,
							success: infoRes => {
								let profile = {}
								infoRes.userInfo.nickname = infoRes.userInfo.nickName
								profile = infoRes.userInfo
								
								const temp = {
									token: '',
									profile
								}
								
								this.storeLogin(temp)
								// 登录完之后到首页
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						})
					},
					fail: err => {
						console.log('授权失败：' + JSON.stringify(err))
					}
				})
			},
			// 验证报错
			alert(msg) {
				uni.showToast({
					icon: 'none',
					title: msg
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
