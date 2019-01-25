<template>
    <div id="id">
        <div class="songList_header">
        	<img class="bg_img" src="http://i04.pictn.sogoucdn.com/efa75ba982cc7f6a" alt="">
            <div class="explain">
                <div class="explain_left">
                    <img class="logo" :src=cdlist.logo>
                </div>
                <div class="explain_right">
                    <h3>{{cdlist.dissname}}</h3>
                    <div class="xiaoyuan">
                        <img :src=cdlist.headurl>
                        <span>{{cdlist.nick}}</span>
                    </div>
                    <p>播放量:{{(cdlist.visitnum/10000).toFixed(1)}}万</p>
                </div>
            </div>
        </div>
        <div class="song_title">歌曲列表</div>
        <ul>
            <li class="song_list" v-for="(songs,index) in cdlist.songlist">
                <p class="song">{{songs.songname}}</p>
                <button class="btn" @click="play(index)">播放</button>
                <!--<audio controls @click="play(index)">播放</audio>-->
                <span class="albumname">{{songs.singer[0].name}}&nbsp;&nbsp;·&nbsp;&nbsp;{{songs.albumname}}</span>
                <!--<button @click="prev(songs.songid)">上一首</button>
				<button @click="next(songs.songid)">下一首</button>-->
            </li>
        </ul>
    </div>
</template>
<script>
var albmMid = "001wUwND10osKJ"
var albmPic = "https://y.gtimg.cn/music/photo_new/T002R300x300M000 " + albmMid + ".jpg ? max_age = 2592000 "

import api from "../js/api.js";

export default {
    data: function() {
        return {
            cdlist: {},
            player: {},
            songIdList:[]
        }
    },
    created: function() {
        let id = this.$route.query.id;
        console.log(id)
        api.getSongList(id).then((res) => {
            var resObj=jQuery.parseJSON(result);
            console.log(resObj)
            this.cdlist = res.cdlist[0];
            //把歌曲id存到一个数组内
            this.songIdList = res.cdlist[0].songlist.map(function(item, index) {
                return item.songmid
            })
            console.log(this.songIdList)
        });
        this.player = new QMplayer();
    },
    methods: {
        play: function(num) {
            //play(歌曲id(字符串，数组)，下标)
            this.player.play(this.songIdList, {
                index: num
            });
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
body {
    background-color: white;
}

.songList_header {
    width: 100%;
    height: 200px;
    margin-top: 110px;
    position: relative;
    .bg_img{
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
            h3{
            	color: white;
            }
            .xiaoyuan {
                margin: 10px 0;
                width: 90%;
                height: 24px;
                line-height: 24px;
                position: relative;
                img {
                    margin-top: 0;
                    width: 25px;
                    height: 100%;
                    border-radius: 50%;
                }
                span{
                	position: absolute;
                	color: white;
                	top: 0;
                	left: 30px;
                }
            }
            p{
            	color: white;
            }
        }
    }
}

.song_title {
    text-align: left;
    background-color: #EEEEEE;
    font-size: 14px;
    margin-top: 10px;
    padding: 5px;
}

.song_list {
    width: 90%;
    height: 50px;
    float: right;
    text-align: left;
    border-bottom: 1px solid #eee;
    position: relative;
    .btn {
        position: absolute;
        top: 20px;
        left: -10%;
    }
    .song {
        padding: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .albumname {
        display: inline-block;
        width: 100%;
        font-size: 12px;
        color: gray;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>