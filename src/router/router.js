import Vue from "vue";

import Router from "vue-router";

Vue.use(Router);
//引入页面模板
//import home from "../view/home.vue";
import index from "../view/index.vue";
import List from "../view/list.vue";
import cover from "../view/cover.vue";
import new_music from "../view/new_music.vue";
import hot_music from "../view/hot_music.vue";
import song_menu from "../view/song_menu.vue";
import toplist from "../view/toplist.vue";
//
let routes = [{
        path: "/",
        component: cover
    },
    {
        path: "/new_music",
        component: new_music
    },
    {
        path: "/hot_music",
        component: hot_music
    },
    {
        path: "/song_menu",
        component: song_menu
    },
    {
        path: "/list",
        component: List,
        name: "list"
    },
    {
    	path:"/toplist",
    	component:toplist
    }
];
let r = new Router({
    routes: routes
})
export default r;