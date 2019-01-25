<template>
  <div class="toplist">
    <div class="songList_header">
      <img
        class="bg_img"
        src="http://img26.gz-lodihair.com/lyc.superheroo.com/images/musicBG.jpg"
        alt
      >
      <div class="explain">
        <div class="explain_left">
          <img class="logo" :src="info.topinfo.pic_album">
        </div>
        <div class="explain_right">
          <h3>{{info.topinfo.ListName}}</h3>
          <span>第{{info.day_of_year}}天</span>
          <p>{{info.update_time}}更新</p>
        </div>
      </div>
      <div class="playBtn">
        <button class="play" v-for="(songs,index) in songlist" @click="playMusic()">全部播放</button>
      </div>
    </div>
    <div class="song_title">
      <span>排行榜</span>
      <span class="count">共{{info.total_song_num}}首</span>
    </div>
    <ul>
      <li class="song_list" v-for="(songs,index) in songlist" @click="play(index)" :class="ind === index ? 'active':''">
        <!-- <button @click="play(index)">播放</button> -->
        <p class="song">{{songs.data.songname}}</p>
        <span class="btn" @click="play(index)">{{index+1}}</span>
        <span class="albumname">{{songs.data.singer[0].name}}&nbsp;&nbsp;·&nbsp;&nbsp;{{songs.data.albumdesc}}</span>
      </li>
    </ul>
    <!-- <div class="music_footer">
    </div> -->
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
    ind:''
    };
  },
  created: function() {
    let id = this.$route.query.id;
    console.log(id);
    api.getToplist_cp(id).then(res => {
      console.log(res);
      this.info = res;
      this.songlist = res.songlist;
      this.songId = res.songlist.map(function(item, index) {
        return item.data.songmid;
      });
      console.log(this.songId);
    });
    this.player = new QMplayer();
  },
  methods: {
    // 点击播放音乐事件
    play: function(num) {
      //play(歌曲id(字符串，数组)，下标)
      this.ind = num
      this.player.play(this.songId,{
				              index: num
				          });
      console.log('播放歌曲'+(num+1))
    },
    playMusic:function(){
      this.player.play(this.songId,{index:0});
      this.ind = 0
    },
    //上一首
    prev: function() {
      this.player.playPrev();
    },
    //下一首
    next: function() {
      this.player.playNext();
    }
  }
};
</script>
<style lang="scss">
.songList_header {
  width: 100% ;
  height: 200px ;
  margin-top: 110px ;
  position: relative ;
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
  background-color: #eeeeee;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  margin-top: 10px;
  padding: 5px;
  .count {
    display: inline-block;
    margin-left: 5px;
  }
}
.playBtn {
	height: 64px;
	line-height: 64px;
  position: relative;
	.play {
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    min-width: 130px;
    padding: 0 20px;
    height: 40px;
    overflow: hidden;
    text-align: center;
    font-size: 16px;
    color: #fff;
    border-radius: 20px;
    background: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
  }
}
.active{
  color: red  
}
.music_footer{
  width: 100%;
  height: 50px ;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5)
}
</style>