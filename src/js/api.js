//引入axios           --save--dev
import axios from "axios";
//引用jsonp模块
import jsonp from "jsonp";
/**
 *
 *  qq音乐接口地址和请求参数：
 *
 *  data结尾的是请求的参数，const声明的为固定的请求参数，let声明的需要再添加参数例如歌单id，榜单id等
 *
 *  req_API 里面的是对应的接口地址，含有qq.com的地址可以用jsonp请求，其他则需要跨域插件处理
 *
 *  jsonp可以使用jsonp插件实现请求，用法类似axios
 *
 * */

//首页请求参数
const recommend_data = {
    format: "jsonp",
    loginUin: 0,
    hostUin: 0,
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: "yqq",
    needNewCode: 0,
}
//歌单请求参数 需要disstid
let songList_data = {
    disstid: 2646688496,
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
}
//热门列表参数
const discList_data = {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json',
    inCharset: "utf-8",
    outCharset: "utf-8",
}
//歌手列表参数
const singer_data = {
    g_tk: 1928093487,
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    format: "jsonp",
    channel: "singer",
    page: "list",
    key: "all_all_all",
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: "yqq",
}
//歌手歌曲列表参数
const singerTrack_data = {
    g_tk: 1928093487,
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    format: "jsonp",
    hostUin: 0,
    needNewCode: 0,
    platform: "yqq",
    order: "listen",
    begin: 0,
    num: 80,
    songstatus: 1,
}
//排行榜
const topList_data = {
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    format: "jsonp",
    uin: 0,
    needNewCode: 1,
    platform: "h5",
}

//排行榜 榜单 需要加 topid
let topList_cp_data = {
    g_tk: 1928093487,
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    format: "jsonp",
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: "detail",
    type: "top",
    platform: "h5",
}

//请求地址
const req_API = {
    //首页
    recommend: "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
    //歌单
    songList: "http://ustbhuangyi.com/music/api/getCdInfo",
    //热门歌单
    discList: "http://ustbhuangyi.com/music/api/getDiscList",
    //歌手列表
    singerList: "https://c.y.qq.com/v8/fcg-bin/v8.fcg",
    //歌手歌曲列表
    singerTrackList: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",
    //排行榜
    topList: "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",
    //榜单
    toplist_cp: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",
}

//请求首页接口
function getRecommend() {
    //	jsonp( url,opts,fun )		链接地址，参数，回调
    //	把promise承诺对象返回到调用函数的外部
    return new Promise((resolve, reject) => {
        //执行异步操作（请求） 
        //prama函数用来拼接链接地址的（地址，json键值对）
        jsonp(
            param(req_API.recommend, recommend_data), //url
            {
                param: 'jsonpCallback',
                prefix: 'jp' //opts
            },
            function(err, res) { //回调
                //回调函数（错误，返回结果）
                console.log(res)
                //返回成功的结果（resolve）
                return resolve(res);
            }
        )
    })

}
//请求歌单接口
function getSongList(id) {
    //给请求参数添加字段，并且赋值
    songList_data.disstid = id;
    return new Promise((resolve, reject) => {
        axios.get(param(req_API.songList, songList_data)).then((res) => {
            console.log(res)
            return resolve(res.data)
        })
    })

}
//请求排行榜
function getTopList() {
//  topList_cp_data.topid = id;
    return new Promise((resolve, reject) => {
        jsonp(
            param(req_API.topList, topList_data), 
            {
                param: "jsonpCallback",
                prefix: "jp"
            },
            function(err, res) {
                console.log(res)
                return resolve(res);
            }
        )
    })

}
//请求榜单
function getToplist_cp(id){
	topList_cp_data.topid=id;
	return new Promise((resolve,reject)=>{
		jsonp(
			param(req_API.toplist_cp,topList_cp_data),
			{
				param:"jsonpCallback",
				prefix:"jp"
			},
			function(err,res){
				console.log(res)
				return resolve(res);
			}
		)
	})
}
//请求热歌榜
function getHotMenu() {
    return new Promise((resolve, reject) => {
        axios.get(param(req_API.discList, discList_data)).then((res) => {
            console.log(res)
            return resolve(res.data)
        })
    })
}
/**
 * 给url拼接参数
 * url     地址
 * data    参数，以json键值对形式
 */

function param(url, data) {
    url += (url.indexOf('?') < 0 ? '?' : '&');
    var p = "";
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        p += '&' + k + '=' + encodeURIComponent(value)
    }
    p ? p.substring(1) : ''
    return url + p;
}

//输出给其他文件使用的方法类
let api = {
    getRecommend: getRecommend,
    getSongList: getSongList,
    getHotMenu: getHotMenu,
    getTopList: getTopList,
    getToplist_cp:getToplist_cp
}
export default api;