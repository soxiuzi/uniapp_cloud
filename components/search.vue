<template>
	<view class="search-page" :class="{show: isShow}" v-if="isShow">
		<uni-nav-bar fixed :isShowLeft="false" :status-bar="true" @clickLeft="goCloud" @clickRight="goCloud">
			<view class="search-box flex-box">
				<view class="top-search flex-box flex-item">
					<image src="/static/search/2.png" class="search-icon"></image>
					<input type="text" class="flex-item" :focus="isFocus" type="text" v-model="searchText" @confirm="addSearch" confirm-type="search" @input="inputSearch" />
				</view>
				<view class="cancel" @click="close">取消</view>
			</view>
			<!-- #ifdef APP-PLUS || H5 -->
			<block slot="right"><image src="/static/search/1.png" mode=""></image></block>
			<!-- #endif -->
		</uni-nav-bar>
		<scroll-view scroll-y="true" class="page-content" @click="blurSearch" >
			<template v-if="!searchTxt.trim().length">
				<image src="/static/search/s_03.png" class="top-ad"></image>
				<view class="history-list" v-if="historyList.length">
					<view class="title-bar flex-box">
						<view class="title">搜索历史</view>
						<image src="/static/search/3.png" class="icon" @click="clearSearch"></image>
					</view>
					<scroll-view scroll-x class="list scroll-view" :show-scrollbar="false">
						<view class="item" v-for="(item, index) in historyList" :key="index">
							<view class="desc">{{item}}</view>
						</view>
					</scroll-view>
				</view>
				<view class="hot-list">
					<view class="title-bar flex-box">
						<view class="title">热搜榜</view>
					</view>
					<view class="list">
						<view class="item flex-box" v-for="(item, index) in hotList" :key="index">
							<view class="num" :class="{on: index < 3}">{{index + 1}}</view>
							<view class="flex-item">
								<view class="flex-box con">
									<view class="tit">{{item.searchWord}}</view>
									<view class="count">{{item.score}}</view>
									<image :src="item.iconUrl" mode="aspectFit" class="icon"></image>
								</view>
								<view class="desc">
									{{item.content}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<view class="suggest-list" v-if="searchTxt.trim().length">
				<view class="suggest">搜索 {{ '"'+searchTxt.trim()+'"' }}</view>
				<view class="item flex-box" v-for="(item, index) in suggestList" :key="index">
					<view class="icon iconfont">&#xe613</view>
					<view class="word flex-item">{{item.keyword}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 防抖
	function debounce(fn, wait = 300) {
		var timer = null
		return function() {
			if (timer !== null) clearTimeout(timer)
			timer = setTimeout(fn, wait)
		}
	}
	
	var that = null
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	
	
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
