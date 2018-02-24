<template>
	<div class="toplist">
		<div class="songList_header">
			<img class="bg_img" src="http://i04.pictn.sogoucdn.com/efa75ba982cc7f6a" alt="">
			<div class="explain">
				<div class="explain_left">
					<img class="logo" :src=info.topinfo.pic_album>
				</div>
				<div class="explain_right">
					<h3>{{info.topinfo.ListName}}</h3>
					<span>第{{info.day_of_year}}天</span>
					<p>{{info.update_time}}更新</p>
				</div>
			</div>
		</div>
		<div class="song_title">
			<span>排行榜</span>
			<span class="count">共{{info.total_song_num}}首</span>
		</div>
		<ul>
			<li class="song_list" v-for="(songs,index) in songlist">
				<button @click="play(index)">播放</button>
				<p class="song">{{index+1}}&nbsp;&nbsp;{{songs.data.songname}}</p>
				<!--<button class="btn" @click="play(index)">播放</button>-->
				<span class="albumname">{{songs.data.singer[0].name}}&nbsp;&nbsp;·&nbsp;&nbsp;{{songs.data.albumdesc}}</span>
			</li>
		</ul>
	</div>
</template>
<!-- <script src="//y.gtimg.cn/music/h5/player/player.js?max_age=2592000"></script> -->
<script>
	import api from "../js/api.js";
	export default {

		data: function() {
			return {
				info: {},
				player: {},
			}
		},
		created: function() {
			let id = this.$route.query.id;
			console.log(id)
			api.getToplist_cp(id).then((res) => {
				console.log(res)
				this.info = res;
				this.songlist = res.songlist;
				this.songId = res.songlist.map(function(item, index) {
					return item.data.songmid;
				})
				console.log(this.songId)
			});
			this.player = new QMplayer();
		},
		methods: {
			play: function(num) {
				//play(歌曲id(字符串，数组)，下标)
				          this.player.play(this.songId, {
				              index: num
				          });
//				this.player.play("001L91KR08XlnP");
			},
			//上一首
			prev: function() {
				this.player.playPrev();
			},
			//下一首
			next: function() {
				this.player.playNext();
			},
		}
	}
</script>
<style lang="scss">
	.songList_header {
		width: 100%;
		height: 200px;
		margin-top: 110px;
		position: relative;
		.bg_img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			margin-top: 0;
			z-index: -1;
		}
		.explain {
			width: 100%;
			height: 70%;
			clear: both;
			.explain_left {
				width: 40%;
				height: 100%;
				float: left;
				.logo {
					margin-top: 0;
					width: 80%;
					height: 90%;
					padding-top: 10px;
				}
			}
			.explain_right {
				padding: 10px 0;
				text-align: left;
				float: left;
				width: 57%;
				height: 100%;
				h3 {
					color: white;
					margin: 25px 0 10px;
				}
				span {
					color: white;
					font-size: 12px;
				}
				p {
					font-size: 12px;
					color: white;
					margin: 10px 0;
				}
			}
		}
	}
	
	.song_title {
		text-align: left;
		background-color: #EEEEEE;
		color: rgba(0, 0, 0, .5);
		font-size: 14px;
		margin-top: 10px;
		padding: 5px;
		.count {
			display: inline-block;
			margin-left: 5px;
		}
	}
</style>