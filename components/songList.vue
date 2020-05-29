<template>
	<view class="song-list-item">
		<view class="tit-bar">
			{{title}}
			<navigator :url="link" class="more fr">歌单广场</navigator>
		</view>
		<view class="clearfix">
			<view class="item" v-for="(item, index) in list" :key="index">
				<image :src="item.picUrl + $imgSuffix" class="img"></image>
				<view class="des">{{item.name}}</view>
				<view class="count">{{item.playCount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			link: {
				type: String,
				default: ''
			},
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.song-list-item {
		padding-left: 32rpx;
		margin-top: 10rpx;
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
			font-weight: 400;
			font-size: 24rpx;
			border: 2rpx solid #e6e6e6;
			border-radius: 50rpx;
		}
		.item {
			float: left;
			position: relative;
			width: 216rpx;
			padding-bottom: 16rpx;
			margin-right: 16rpx;
			line-height: 34rpx;
			&.video {
				width: 450rpx;
			}
			.img {
				display: block;
				width: 100%;
				height: 216rpx;
				margin-bottom: 16rpx;
				background-color: #eee;
				border-radius: 10rpx;
			}
			.desc {
				height: 64rpx;
				margin-top: 12rpx;
				line-height: 30rpx;
				overflow: hidden;
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
	}
</style>
