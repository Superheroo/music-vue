/*
 *单页应用的入口文件 
 */
import "../scss/test.scss";
//引入api.js 包括请求地址，参数和方法
import api from "./api.js";
//请求首页链接
api.getRecommend().then((res) => {
	console.log(res)  
	//具体的逻辑操作
}); 
//api.getHotMenu().then((res) => {
//	console.log(res)  
//	//具体的逻辑操作
//}); 
//引入vue模块
import Vue from "vue";
//
import Index from "../view/index.vue";
//引入路由配置
import Router from "../router/router.js";
//引入mint-ui模块
import Mint from 'mint-ui';
//引用mint-ui的样式
import 'mint-ui/lib/style.css';
Vue.use(Mint);

new Vue({
	el: "#app",
	template: "<index/>",
	components: {
		index: Index
	},
	router: Router,

})