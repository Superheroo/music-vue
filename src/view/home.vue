<!--<template>
	<div id="home">
		<div id="Carousel">
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="item in carousel">
					<img :src="item.picUrl"/>
				</mt-swipe-item>
			</mt-swipe>
		</div>
<div class="recommend">推荐歌单</div>
		<ul>
			<li class="home_li" v-for="(item,index) in songList" @click="goToList(item.id)">
				<img :src="item.picUrl" />
				<p>{{item.songListDesc}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	//引入api.js 包括请求地址，参数和方法
	import api from "../js/api.js";
	export default {
		data: function() {
			return {
				songList: [],
				carousel:[],
			}
		},
		created: function() {
			//请求首页链接
			api.getRecommend().then((res) => {
				console.log(res.data)
				//具体的逻辑操作
				this.songList = res.data.songList;
				this.carousel=res.data.slider;
			});
		},
		methods: {
			goToList: function(id) {
				console.log(id)
				this.$router.push({
					path:"/list",
					query:{id:id}
				})
			}
		}
	}
</script>

<style lang="scss">
	#Carousel {
			margin-top: 50px;
			width: 100%;
			height: 45vw;
			margin-top: 110px;
			img{
				width: 100%;
				height: 100%;
				margin: 0;
			}
		}
	body img, body h1{
		margin-top: 20px;
	}
	.recommend{
		widows: 100%;
		height: 20px;
		border-left: 2px solid red;		margin-top: 10px;
		text-align: left;
		padding-left:10px ;
	}
	.home_li {
		text-align: left;
		font-size: 14px;
		color: gray;
		float: left;
		width: 50%;
		-webkit-box-sizing: border-box;
		padding-right: 8px;
		margin-bottom: 10px;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
		}
	}
</style>-->