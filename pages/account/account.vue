<template>
	<view>
		<uni-nav-bar v-if="!isShowScan" fixed :status-bar="true" @clickLeft="openScan" @clickRight="goCloud">
			<!-- #ifdef APP-PLUS -->
				<block slot="left"><image class="top-img left" src="/static/account/a16.png" ></image></block>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
				<block slot="right"><image class="top-img" src="/static/mine/r.png" ></image></block>
			<!-- #endif -->
			<view class="tac">{{title}}</view>
		</uni-nav-bar>
		<scroll-view scroll-y="true" class="page-content" @scroll="scroll" :scroll-top="scrollTop">
			<view v-if="!userInfo.hasLogin" class="empty-user">
				<view>登录网易云音乐</view>
				<view>手机电脑多端同步，尽享海量高品质音乐</view>
				<navigator class="btn" url="/pages/subpages/account/login">
					立即登录
				</navigator>
			</view>
			<template v-if="userInfo.hasLogin">
				<view class="userinfo-box flex-box">
					<view class="avator">
						<image :src="userInfo.profile.avatarUrl" v-if="userInfo.profile.avatarUrl" class="img"></image>
						<view class="no-img" v-else>
							上传头像
						</view>
					</view>
					<view class="flex-item">
						<view class="fl">
							<view class="name">{{userInfo.profile.nickname}}</view>
							<view class="level">lv1</view>
						</view>
						<image src="/static/account/a_03.png" class="sign fr"></image>
					</view>
				</view>
				<view class="nav-bar flex-box">
					<view class="flex-item">
						0
						<view class="txt">动态</view>
					</view>
					<view class="flex-item">
						0
						<view class="txt">关注</view>
					</view><view class="flex-item">
						0
						<view class="txt">粉丝</view>
					</view><view class="flex-item">
						0
						<view class="txt">编辑资料</view>
					</view>
				</view>
			</template>
			<view class="ad-bar" :class="{bgf: !userInfo.hasLogin}">
				<image src="/static/account/a_07.png" class="img"></image>
			</view>
			<view class="mall-bar flex-box">
				<view class="flex-item">
					<image src="/static/account/a_m1.png" class="icon"></image>
					消息
				</view>
				<view class="flex-item">
					<image src="/static/account/a_m2.png" class="icon"></image>
					商城
					<view class="txt">现时29包邮</view>
				</view>
				<view class="flex-item">
					<image src="/static/account/a_m3.png" class="icon"></image>
					演出
					<view class="txt">天鹅湖</view>
				</view>
				<view class="flex-item">
					<image src="/static/account/a_m4.png" class="icon"></image>
					个性换肤
				</view>
			</view>
			<uni-list>
				<uni-list-item title="口袋彩铃" thumb="/static/account/a_16.png" size="mini" />
				<uni-list-item title="我的订单" thumb="/static/account/a_19.png" size="mini" border0 />
				<uni-list-item title="创作者中心" thumb="/static/account/a_09.png" size="mini" class="mt16" border0 />
				<uni-list-item title="设置" thumb="/static/account/a_21.png" size="mini" class="mt16" />
				<uni-list-item title="夜间模式" thumb="/static/account/a_23.png" size="mini" :show-switch="true" @switchChange="switchChange" />
				<uni-list-item title="定时开关" thumb="/static/account/13.png" size="mini" />
				<uni-list-item title="音乐闹钟" thumb="/static/account/13.png" size="mini" border0 />
				<uni-list-item title="在线听歌免流量" thumb="/static/account/14.png" size="mini" class="mt16" />
				<uni-list-item title="优惠券" thumb="/static/account/15.png" size="mini" border0 />
				<uni-list-item title="分享网易云音乐" thumb="/static/account/16.png" size="mini" class="mt16" />
				<uni-list-item title="关于" thumb="/static/account/17.png" size="mini" border0 />
			</uni-list>
			<view class="logout" v-if="userInfo.hasLogin" @click="confirmOut">
				退出登录
			</view>
		</scroll-view>
		<!-- 扫码组件 -->
		<!-- #ifdef APP-PLUS -->
			<view class="scan-box" :class="{active: isShowScan}">
				<!-- 扫码标题栏 -->
				<uni-nav-bar if="isShowScan" fixed :status-bar="true" title="扫一扫" left-icon="back" @clickLeft="closeScan"></uni-nav-bar>
				<!-- <scan ref="scan" @success="getScanCode"></scan> -->
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
