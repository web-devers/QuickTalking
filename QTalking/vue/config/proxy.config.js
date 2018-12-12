module.exports = {
  proxy: {
        '/qtserver': {    //将www.exaple.com印射为/apis
            // target: 'http://47.106.102.92:808',  // 接口域名
            target: 'http://172.18.41.14:808',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/qtserver': ''   //需要rewrite的,
            }              
        }
  }
}
