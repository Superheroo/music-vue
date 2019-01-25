<template>
    <div id="index">
        <div class="header">
            <div class="search">
                <form action="" method="post">
                    <input type="text" name="" placeholder="搜索音乐" />
                    <button>
                        <i class="iconfont">&#xe6dd;</i>
                    </button>
                </form>
            </div>
            <div class="navbar">
                <router-link to="/new_music">最新音乐
                </router-link>
                <router-link to="/hot_music">排行榜
                </router-link>
                <router-link to="/song_menu">歌单
                </router-link>
            </div>
        </div>
        <!-- <transition name="left"> -->
            <router-view></router-view>
        <!-- </transition> -->
    </div>
</template>
<script>
export default {
    data: function() {
        return {
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss">
.left-enter {
    transform: translateX(100%);
}

.left-enter-to {
    transform: translateX(0);
}

.left-enter-active {
    transition: 1s;
}

.left-leave {
    transform: translateX(0);
}

.left-leave-to {
    transform: translateX(-100%);
}

.left-leave-active {
    transition: 1s;
}

@font-face {
    font-family: 'iconfont';
    /* project id 555423 */
    src: url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.eot');
    src: url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.woff') format('woff'),
    url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_555423_he18krtd7bqsq0k9.svg#iconfont') format('svg');
}

.header {
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .search {
        width: 100%;
        height: 65%;
        padding-top: 10px;
        background: red;
        form {
            background-color: white;
            margin: 0 60px;
            width: 70%;
            height: 40px;
            color: gray;
            border-radius: 30px;
            border: none;
            position: relative;
            input {
                background-color: white;
                width: 90%;
                height: 36px;
                font-size: 18px;
                border-radius: 30px;
                border: none;
            }
            button {
                height: 100%;
                width: 36px;
                position: absolute;
                border-radius: 30px;
                top: 0px;
                right: 0px;
                background-color: transparent;
                .iconfont {
                    font-family: "iconfont";
                    font-size: 22px;
                    color: black;
                    font-style: normal;
                }
            }
        }
    }
    .navbar {
        width: 100%;
        height: 50%;
        text-align: center;
        line-height: 40px;
        border-bottom: 1px solid #EEEEEE;
        background-color: white;
        a{
            display: inline-block;
            width: 30%;
            height: 100%;
        }
        .router-link-active {
            border-bottom: 3px solid red;
        }
    }
}
</style>