<template>
	<view>
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<uni-nav-bar fixed :status-bar="true" title="我的音乐" @clickLeft="goCloud" @clickRight="goCloud">
			<block slot="left"><image class="top-img" src="/static/mine/l.png"></image></block>
			<!-- #ifdef APP-PLUS -->
			<block slot="right"><image class="top-img" src="/static/mine/r.png"></image></block>
			<!-- #endif -->
		</uni-nav-bar>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<scroll-view scroll-y="true" class="page-content">
			<!-- #endif -->
			<scroll-view scroll-x :show-scrollbar="false" class="nav-list scroll-view">
				<view class="item" v-for="(item, index) in navList" :key="index" @click="goUrl(item.id, index)">
					<image class="img" :src="'/static/mine/' + item.imd + '.png'"></image>
					<view class="desc">{{ item.name }}</view>
				</view>
			</scroll-view>
			<navigator url="" class="line-item arrow clearfix mt16" hover-class="none">
				<image class="icon" src="/static/mine/m_15.png" mode="widthFix"></image>
				<view class="con"><text class="lab">本地音乐</text></view>
			</navigator>
			<navigator url="" class="line-item arrow clearfix mt16" hover-class="none">
				<image class="icon" src="/static/mine/m_17.png" mode="widthFix"></image>
				<view class="con"><text class="lab">最近播放</text></view>
			</navigator>
			<navigator url="" class="line-item arrow clearfix mt16" hover-class="none">
				<image class="icon" src="/static/mine/m_19.png" mode="widthFix"></image>
				<view class="con"><text class="lab">我的电台</text></view>
			</navigator>
			<navigator url="" class="line-item arrow clearfix mt16" hover-class="none">
				<image class="icon" src="/static/mine/m_21.png" mode="widthFix"></image>
				<view class="con"><text class="lab">我的收藏</text></view>
			</navigator>
			<view class="recommend-list">
				<!-- 歌单分类块 -->
				<song-list title="推荐歌单" :list="recommendSongs"></song-list>
			</view>
			<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
import { apiGetNavList } from '@/apis/mine.js';
import { apiGetRecommendSongs } from '@/apis/index.js';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import songList from '@/components/songList.vue';

export default {
	components: {
		uniNavBar,
		songList
	},
	data() {
		return {
			navList: [
				{ name: '私人FM', imd: 1 },
				{ name: '最嗨电音', imd: 2 },
				{ name: 'ACG专区', imd: 3 },
				{ name: 'Sati空间', imd: 4 },
				{ name: '私藏推荐', imd: 5 },
				{ name: '因乐交友', imd: 6 },
				{ name: '亲子频道', imd: 7 },
				{ name: '古典专区', imd: 8 }
			],
			recommendSongs: []
		};
	},
	onLoad() {
		this.getNavList();
		this.getRecommendSongs();
	},
	methods: {
		// 获取导航
		getNavList() {
			const params = {
				id: 124
			};
			// apiGetNavList(params).then(res => {
			// 	this.navList = res.mock.navList;

			// 	const tempId = this.navList[0].id;
			// });
		},
		goUrl() {},
		goCloud() {
			uni.showToast({
				icon: 'none',
				title: '功能未开发'
			});
		},
		// 获取推荐歌单
		getRecommendSongs() {
			const params = {
				limit: 6
			};
			apiGetRecommendSongs(params).then(res => {
				// 格式化播放量数据
				const formatCount = data => {
					let tempNum = data;
					if (data > 100000) {
						tempNum = parseInt(data / 10000) + '万';
					}
					return tempNum;
				};
				this.recommendSongs = res.result;

				this.recommendSongs.forEach(item => {
					item.playCount = formatCount(item.playCount);
				});
			});
		}
	}
};
</script>

<style lang="scss">
	.top-img {
		width: 50rpx;
		height: 40rpx;
		&.left {
			margin-left: 10rpx;
		}
	}
	
	.page-content {
		position: fixed;
		top: 44px;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.nav-list {
		height: 220rpx;
		padding-top: 70rpx;
		padding-bottom: 14rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 76rpx;
		color: #666;
		border-bottom: 1rpx solid #e6e6e6;
		font-size: 24rpx;
		background: #fff;
		.item {
			position: relative;
			display: inline-block;
			height: 210rpx;
			width: 166rpx;
		}
		.img {
			display: block;
			width: 70rpx;
			height: 70rpx;
			margin: 0 auto;
			border-radius: 50%;
		}
	}
.line-item {
	.icon {
		float: left;
		width: 70rpx;
		height: 70rpx;
		margin-top: 24rpx;
		margin-right: 36rpx;
	}
	.lab{
		font-size: 32rpx;
		color:#444;
	}
	.con{
		position:relative;
		height:100rpx;
		overflow: hidden;
		&:before{
			position:absolute;
			content:"";
			right:0;
			bottom:0;
			width:100%;
			border-bottom: 1rpx solid #e6e6e6;
		}
	}
}
	.recommend-list {
		border-top: 16rpx solid #F8F8F8;
	}
</style>
