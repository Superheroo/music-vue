<template>
	<div id="recommend_music">

		<div id="Carousel">
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="item in carousel">
					<img :src="item.picUrl"/>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<p>电台</p>
		<ul>
			<li class="home_li" v-for="(item,index) in radioList">
				<img :src="item.picUrl"/>
				<i class="play">&#xe624;</i>
				<p>{{item.Ftitle}}</p>
			</li>
		</ul>

		<p>推荐歌单</p>
		<ul>
			<li class="home_li" v-for="(item,index) in songList" @click="goToList(item.id)">
				<span class="play_count">
					<i class="headset">&#xe60a;</i>
					<span>{{(item.accessnum/10000).toFixed(1)}}万</span>
				</span>
				<img :src="item.picUrl"/>
				<i class="play">&#xe624;</i>
				<p>{{item.songListDesc}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	//引入api.js 包括请求地址，参数和方法
	import api from "../js/api.js";
	//	import router from "vue-router";
	//	Vue.use(router);
	export default {
		data: function() {
			return {
				songList: [],//歌单
				carousel: [],//轮播图
				radioList: [],//电台
			}
		},
		created: function() {
			//请求首页链接
			api.getRecommend().then((res) => {
				console.log(res.data)
				//具体的逻辑操作
				this.songList = res.data.songList;
				this.carousel = res.data.slider;
				this.radioList = res.data.radioList;
			});
		},
		methods: {
			goToList: function(id) {
				console.log(id)
				this.$router.push({
					path: "/list",//跳转的目标路径
					query: {
						id: id
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: 'iconfont';
		/* project id 555423 */
		src: url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.eot');
		src: url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.woff') format('woff'), url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.ttf') format('truetype'), url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.svg#iconfont') format('svg');
	}
	
	body {
		background-color: #EEEEEE;
	}
	
	#Carousel {
		width: 100%;
		height: 45vw;
		margin-top: 110px;
		margin-bottom: 5px;
		img {
			width: 100%;
			height: 100%;
			margin: 0;
		}
	}
	.title{
		width: 100%;
		height: 20px;
	}
	body img,
	body h1 {
		margin-top: 20px;
	}
	
	.home_li {
		/*background-color: white;*/
		/*height: 212px;*/
		text-align: left;
		font-size: 14px;
		color: gray;
		float: left;
		width: 50%;
		-webkit-box-sizing: border-box;
		padding-right: 8px;
		margin-bottom: 10px;
		overflow: hidden;
		position: relative;
		p{
			height: 41px;
			padding: 5px;
			background-color: #EEEEEE;
		}
		img {
			width: 100%;
			height: 100%;
		}
		span{
			color: white;
		}
		.play {
			font-family: "iconfont";
			font-size: 22px;
			color: white;
			font-style: normal;
			position: absolute;
			bottom: 58px;
			right: 13px
			
		}
		.play_count{
			position: absolute;
			bottom: 56px;
			left: 8px;
			.headset{
				font-family: "iconfont";
				font-size: 22px;
				color: white;
				font-style: normal;
			}
		}
	}
</style>