<template>
    <div id="hot_music">
        <div class="info" v-for="(item,index) in topList" @click="gotoToplist(item.id)">
            <div class="info_left">
                <img :src="item.picUrl" alt="">
                <i class="headset">&#xe60a;<span>{{(item.listenCount/10000).toFixed(1)}}万</span></i>
            </div>
            <div class="info_right">
                <p class="text_title">{{(item,index).topTitle}}</p>
                <div class="song_singer">
                    <span>1.{{item.songList[0].songname}}-</span><span class="singer">{{item.songList[0].singername}}</span>
                </div>
                <div class="song_singer">
                    <span>2.{{item.songList[1].songname}}-</span><span class="singer">{{item.songList[1].singername}}</span>
                </div>
                <div class="song_singer">
                    <span>3.{{item.songList[2].songname}}-</span><span class="singer">{{item.songList[2].singername}}</span>
                </div>
                <i class="right_rocket">&#xe628;</i>
            </div>
        </div>
    </div>
</template>
<script>
import api from "../js/api.js";
export default {
    data: function() {
        return {
            topList: []
        }

    },
    created: function() {
        api.getTopList().then((res) => {
            console.log(res)
            this.topList = res.data.topList;
        })
    },
    methods: {
        gotoToplist: function(id) {
            console.log(id)
            this.$router.push({
            	path:"/topList",
            	query:{
            		id:id
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
    src: url('//at.alicdn.com/t/font_555423_x5uzzl6f8gehr529.eot');
    src: url('//at.alicdn.com/t/font_555423_x5uzzl6f8gehr529.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_555423_x5uzzl6f8gehr529.woff') format('woff'),
    url('//at.alicdn.com/t/font_555423_x5uzzl6f8gehr529.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_555423_x5uzzl6f8gehr529.svg#iconfont') format('svg');
}

#hot_music {
    margin-top: 110px;
    .info {
        width: 100%;
        height: 120px;
        clear: both;
        margin-bottom: 10px;
        .info_left {
            width: 30%;
            height: 100%;
            float: left;
            position: relative;
            img {
                margin-top: 0;
                padding: 5px;
                width: 90%;
                height: 90%;
            }
            .headset {
                font-family: iconfont;
                font-style: normal;
                color: white;
                position: absolute;
                bottom: 10px;
                left: 8px;
            }
        }
        .info_right {
            width: 67%;
            height: 100%;
            float: left;
            background-color: white;
            position: relative;
            .song_singer {
                width: 100%;
                font-size: 14px;
                text-align: left;
                padding: 5px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                .singer {
                    color: rgba(0, 0, 0, .5);
                }
            }
            .text_title {
                text-align: left;
                padding: 5px;
            }
            .right_rocket {
                font-family: iconfont;
                font-style: normal;
                color: rgba(0, 0, 0, .5);
                position: absolute;
                top: 36%;
                right: 0;
            }
        }
    }
}
</style>