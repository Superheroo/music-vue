
<template>
  <div id="new_music">
    <!-- <p>{{info.topinfo.ListName}}</p> -->
	<div class="songList_header">
			<img class="bg_img" src="http://img26.gz-lodihair.com/lyc.superheroo.com/images/musicBG.jpg" alt="">
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
  </div>
</template>
<script>
//引入api.js 包括请求地址，参数和方法1
import api from "../js/api.js";
//	import router from "vue-router";
//	Vue.use(router);
export default {
  data: function() {
    return {	
      info: []
    };
  },
  created: function() {
    // 请求最新音乐链接
    api.getNewMusic().then(res => {
      this.info = res;
    });
  },
  methods: {
// 
  }
};
</script>

<style lang="scss">
#new_music {
  margin-top: 110px;
}
</style>