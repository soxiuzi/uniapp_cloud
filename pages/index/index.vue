<template>
	<view>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper class="swiper" :indicator-dots="true" indicator-color="rgba(255, 255, 255, .5)" indicator-active-color="#ff372b" :autoplay="true" :duration="500" :circular="true">
				<swiper-item v-for="(item, index) in swiper" :key="index">
					<view class="item">
						<image :src="item.imageUrl" class="img"></image>
						<view class="tag">{{ item.typeTitle }}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 主入口 -->
		<view class="main-bar flex-box">
			<view class="flex-item" v-for="(item, index) in contentBar" :key="index">
				<image class="img" :src="'/static/index/t_' + (index + 1) + '.png'"></image>
				<view>{{ item.name }}</view>
				<view class="date" v-if="index == 0">{{ curDate }}</view>
			</view>
		</view>
		<!-- 歌单分类块 -->
		<songList title="推荐歌单" link="/pages/songSquare/index?limit=30" :list="recommendSongs" />
		<!-- 歌单分类块 -->
		<view class="song-list">
			<view class="tit-bar">
				推荐歌单
				<view class="more fr">歌单广场</view>
			</view>
			<scroll-view scroll-x class="scroll-view">
				<view class="item" v-for="(item, index) in recommendSongs" :key="index">
					<image class="img" :src="item.picUrl + $imgSuffix"></image>
					<view class="desc ellipsis">{{item.name}}</view>
					<view class="count">{{item.playCount}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 歌单分类块 -->
		<view class="song-list">
			<view class="switch-line flex-box">
				<view class="flex-box">
					<view class="switch-item" :class="{on : newType == 1}" @click="switchTab(1)">新碟</view>|
					<view class="switch-item" :class="{on : newType == 2}" @click="switchTab(2)">新歌</view>
				</view>
				<template v-if="newType == 1">
					<view class="more">更多新碟</view>
				</template>
				<template v-if="newType == 2">
					<view class="more">更多新歌</view>
				</template>
			</view>
			<scroll-view scroll-x class="scroll-view">
				<view class="item" v-for="(item, index) in latestAlbum" :key="index">
					<image class="img" :src="item.picUrl + $imgSuffix"></image>
					<view class="desc ellipsis">{{item.name}}</view>
					<view class="desc ellipsis c9">{{item.artist.name}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 歌单分类块 -->
		<view class="video-list song-list">
			<view class="tit-bar">
				精选视频
				<view class="more fr">更多></view>
			</view>
			<view class="video-item" v-for="(item, index) in relatedVideo" :key="index">
					<image :src="item.coverUrl + $imgSuffix"></image>
					<view class="desc ellipsis">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { apiGetBanner, apiGetRecommendSongs, apiGetTopAlbum, apiGetRelatedVideo } from '../../apis/index.js'
import songList from '../../components/songList.vue'	

export default {
	components: {
		songList
	},
	data() {
		return {
			swiper: [],
			curDate: '',
			contentBar: [
				{ name: "每日推荐" },
				{ name: "歌单" },
				{ name: "排行榜" },
				{ name: "电台" },
				{ name: "直播" },
			],
			recommendSongs: [],
			newType: 1,
			latestTempAlbum: [],
			latestAlbum: [],
			relatedVideo: [],
			hotList: []
		};
	},
	onLoad() {
		this.getBanner()
		this.getRecommendList()
		this.getLatestAlbum()
		this.getRelatedVideo()
		
		this.curDate = new Date().getDate()
	},
	methods: {
		// 获取轮播图
		getBanner() {
			apiGetBanner().then(res => {
				this.swiper = res.banners
			})
		},
		// 获取推荐歌单列表
		getRecommendList() {
			const params = {
				limit: 6
			}
			apiGetRecommendSongs(params).then(res => {
				// 格式化播放量数据
				const formatCount = data => {
					let tempNum = data
					if (data > 100000) {
						tempNum = (parseInt(data / 10000) + '万')
					}
					return tempNum
				}
				
				this.recommendSongs = res.result
				
				this.recommendSongs.forEach(item => {
					item.playCount = formatCount(item.playCount)
				})
			})
		},	
		// 切换新碟新歌
		switchTab (type) {
			this.newType = type
			let temp = {
				s: type == 1 ? 0 : 3,
				e: type == 1 ? 3 : 6
			}
			this.latestAlbum = this.latestTempAlbum.slice(temp.s, temp.e)
		},
		// 获取新碟
		getLatestAlbum() {
			apiGetTopAlbum().then(res => {
				this.latestTempAlbum = res.albums
				this.latestAlbum = res.albums.slice(0, 3)
			})
		},
		// 获取相关视频
		getRelatedVideo() {
			const params = {
				id: 32154
			}
			apiGetRelatedVideo(params).then(res => {
				console.log('相关视频：', res)
			})
		}
	}
};
</script>

<style lang="scss">
page {
	color: #1a1a1a;
	font-size: 24rpx;
}

.banner {
	width: 100%;
	height: 268rpx;
	margin: 30rpx auto 44rpx;
	.swiper {
		height: 268rpx;
	}
	.item {
		position: relative;
		display: block;
		width: 686rpx;
		height: 268rpx;
		margin: 0 auto;
		border-radius: 14rpx;
		overflow: hidden;
	}
	.img {
		display: block;
		width: 100%;
		height: 100%;
	}
	.tag {
		position: absolute;
		bottom: 0;
		right: 0;
		height: 34rpx;
		padding: 0 14rpx;
		line-height: 34rpx;
		color: #fff;
		background-color: #43a5f0;
		z-index: 10;
		border-top-left-radius: 14rpx;
	}
}

.main-bar {
	padding-bottom: 22rpx;
	text-align: center;
	line-height: 70rpx;
	color: #666666;
	border-bottom: 1rpx solid #e6e6e6;
	.img {
		display: block;
		width: 92rpx;
		height: 92rpx;
		margin: 0 auto;
	}
	.flex-item {
		position: relative;
		.date {
			position: absolute;
			left: 60rpx;
			top: 40rpx;
			line-height: 1;
			font-size: 24rpx;
			color: #ff392d;
			transform: scale(0.8);
		}
	}
}
.song-list {
	padding-left: 32rpx;
	.tit-bar {
		font-size: 34rpx;
		font-weight: 600;
		line-height: 110rpx;
	}
	.more {
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin-top: 30rpx;
		margin-right: 32rpx;
		color: #333;
		font-weight: 400;
		font-size: 24rpx;
		border: 2rpx solid #e6e6e6;
		border-radius: 50rpx;
	}
	.switch-line {
		justify-content: space-between;
		color: #999;
		.flex-box {
			line-height: 110rpx;
			width: 300rpx;
		}
		.switch-item {
			font-weight: 600;
			&:first-child {
				width: 80rpx;
			}
			&:last-child {
				padding-left: 22rpx;
			}
			&.on {
				color: #333;
				font-size: 34rpx;
			}
		}
	}
	.scroll-view {
		width: 100%;
		white-space: nowrap;
	}
	
	.item {
		position: relative;
		display: inline-block;
		width: 218rpx;
		padding-bottom: 16rpx;
		margin-right: 16rpx;
		line-height: 34rpx;
		&:before {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 40rpx;
			z-index: 2;
			background-image: linear-gradient(180deg, rgba(0,0,0,.2), transparent);
		}
		&.video {
			width: 450rpx;
		}
		.img {
			display: block;
			width: 100%;
			height: 218rpx;
			margin-bottom: 16rpx;
			background: #eee;
			border-radius: 10rpx;
		}
	}
	.count {
		position: absolute;
		top: 0;
		right: 0;
		padding-left: 25rpx;
		line-height: 34rpx;
		color: #fff;
		font-size: 24rpx;
		z-index: 10;
		background-size: 25rpx 25rpx;
		transform: scale(0.8);
	}
}
.video-list {
	padding-left: 0;
	.tit-bar {
		padding-left: 32rpx;
	}
	.video-item {
		width: 686rpx;
		height: 490rpx;
		margin: 0 auto;
		background: #F8F8F8;
		border-radius: 10rpx;
		overflow: hidden;
		margin-bottom: 24rpx;
	}
	.img {
		display: block;
		width: 686rpx;
		height: 390rpx;
		background: #eee;
	}
	.desc {
		padding-left: 40rpx;
		font-size: 30rpx;
		font-weight: 600;
		line-height: 100rpx;
	}
}

/* #ifdef MP-WEIXIN */
.banner {
	margin-top: 60rpx;
}
/* #endif */
</style>
