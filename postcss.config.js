/**
 * Created by ouxiaobao on 2017/6/19.
 * postcss配置文件
 */
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: "last 20 versions",
        })
    ]
}