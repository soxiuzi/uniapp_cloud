<template>
	<view>
		<view class="topbar">
			<view class="h86">
				<scroll-view scroll-x class="scroll-view" :show-scrollbar="false" >
					<view class="rel">
						<view class="item" v-for="(item, index) in navList" :class="{active: curNav == item.id}" :key="index" @click="switchNav(item.id, index)">
							<view class="desc">{{item.name}}</view>
						</view>
						<view class="slide" :style="'width: ' + sliderWidth + 'rpx;transform: translateX(' + sliderOffset + 'rpx)'"></view>
					</view>
				</scroll-view>
			</view>
			<mescroll-uni ref="mescroll" top="86" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
				<view class="video-list">
					<view class="video-item" v-for="(item, index) in relatedVideo" :key="index">
						<view class="video-wrap">
							<image class="img" :src="item.coverUrl"></image>
							<view class="desc ellipsis">{{item.title}}</view>
							<view class="creater-bar flex-box">
								<view class="avactor-box flex-box">
									<image class="avactor" src="" ></image>
									<view class="name">{{item.creator[0].userName}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import { apiGetNavList } from '@/apis/videos.js'
	import { apiGetRelatedVideo } from '@/apis/index.js'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				// 下拉刷新的常用配置
				downOption: {
					auto: false // 是否再初始化后，自动执行下拉回调callback，默认true
				},
				// 上拉加载的常用配置
				upOption: {
					auto: false,
					page: {
						num: 0,
						size: 10
					},
				},
				navList: [
					{ name: '推荐', id: 34573 },
					{ name: 'LOCK直播', id: 23472 },
					{ name: '翻唱', id: 33485},
					{ name: '广场', id: 4652 },
					{ name: '舞蹈', id: 658785 },
					{ name: '游戏', id: 62689 },
					{ name: '现场', id: 7456345 },
				],
				curNav: '',
				sliderOffset: 0,
				sliderWidth: 60,
				relatedVideo: [],
				refreshing: false
			};
		},
		onLoad() {
			this.getNavList()
		},
		methods: {
			// 获取导航
			getNavList() {
				const params = {
					id: 124,
				}
				apiGetNavList(params).then(res => {
					this.navList = res.mock.navList
					console.log('navList:', res.mock.navList)
					this.curNav = this.navList[0].id
					this.switchNav(this.curNav, 0)
				})
			},
			// 导航切换
			switchNav(id, index) {
				this.curNav = id
				this.sliderWidth = index == 1 ? 140 : 60;
				this.sliderOffset = 126 * index + (index > 1 ? 80 : 16) + (index == 0 & 16);
				
				this.getList(1, 1, res => {
					this.relatedVideo = res
					console.log('relatedVide:', res)
				})
			},
			// 获取相关视频
			getList(pageNum, pageSize, successCallback, errorCallback) {
				const params = {
					id: this.curNav,
					pageNum,
					pageSize
				}
				apiGetRelatedVideo(params).then(res => {
					successCallback && successCallback(res.data)
				}, res => {
					errorCallback && errorCallback();
				})
			},
			// 下拉刷新
			downCallback(mescroll) {
				mescroll.resetUpScroll();
			},
			// 上拉加载
			upCallback(mescroll) {
				this.getList(mescroll.num, mescroll.size, res => {
					if (mescroll.num == 1) this.relatedVideo = [];
					this.relatedVideo = this.relatedVideo.concat(res)
					
					mescroll.endSuccess()
				}, () => {
					mescroll.endErr();
				})
			}
		}
	}
</script>

<style lang="scss">
	.topbar {
		.h86 {
			height: 86rpx;
		}
	}
	
	.scroll-view {
		position: fixed;
		top: 0;
		width: 100%;
		height: 86rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 86rpx;
		color: #333;
		font-weight: 600;
		border-bottom: 1rpx solid #e6e6e6;
		z-index: 10;
		background: #fff;
		.item {
			position: relative;
			display: inline-block;
			min-width: 126rpx;
			height: 86rpx;
			line-height: 86rpx;
			padding: 0 20rpx;
			&.active {
				color: #f32628;
			}
		}
	}
	.slide {
		position: absolute;
		width: 60rpx;
		height: 4rpx;
		left: 0;
		bottom: 0rpx;
		background: #f32628;
		transition: transform 0.3s;
		z-index: 2;
		/* #ifdef MP-WEIXIN */
		bottom: 2rpx;
		/* #endif */
	}
	.video-list {
		color: #333;
		background: #F8F8F8;
		.tit-bar {
			padding-left: 32rpx;
		}
		.video-item {
			padding-top: 32rpx;
			background: #fff;
			border-bottom: 24rpx solid #F8F8F8;
		}
		
		.video-wrap {
			width: 686rpx;
			margin: 0 auto;
		}
		
		.img {
			display: block;
			width: 686rpx;
			height: 390rpx;
			border-radius: 10rpx;
			background: #eee;
		}
		
		.desc {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 84rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}
	}
	.creater-bar {
		height: 100rpx;
		justify-content: space-between;
		align-items: center;
		.avactor-box {
			align-items: center;
		}
		.avactor {
			width: 66rpx;
			height: 66rpx;
			margin-right: 10rpx;
			border-radius: 66rpx;
			background: #eee;
		}
		
		.name {
			line-height: 100rpx;
		}
	}
</style>
