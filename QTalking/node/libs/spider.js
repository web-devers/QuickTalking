var request = require('request');
var cheerio = require('cheerio');

var getImgs=function (word,callback) {
	var url='https://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word='+word;
    // console.log(encodeURI(url));//encodeURIComponent()
    var titleList=[];
    var imgList =[];
    request(encodeURI(url), function (err,res) {
        var pics = new Array();
        if (err) return console.error(err);
        // var $ = cheerio.load(res.body.toString());
        var html = res.body.toString();

        // console.log(typeof(res.body.toString().match(/"fromPageTitle":"(.*?)"/g)));
        // console.log(res.body.toString().match(/"objURL":"(.*?)"/g));
        // console.log(res.body.toString().match(`"objURL":"(.*?)"`));
        // $('.imglist').children('li').each(function () {
        // 	var pic=$(this);
        //     if($(this).attr('data-objurl').length>1) {
        //         var pic_addr = $(this).attr('data-objurl');
        //         var pic_disp = pic_addr.toString().substring(25);
        //         var pic_name = $(this).attr('data-objurl');
        //         imgList.push({"picName": pic_name, "picAddr": pic_addr});
        //         // console.log(pic_disp);
        //     }
        // });
        titlelist=html.match(/"fromPageTitle":"(.*?)"/g);
        imgList=html.match(/"objURL":"(.*?)"/g);
        console.log(titlelist,imgList);
        callback(titleList,imgList)
    }); 
};

module.exports={
	getImgs
}
//getNewsList();
// getNewsDetail("美女");

//"fromPageTitle":"私房<strong>写真<\\/strong>更新一组-修图蚂蚱-摄影李姣", 
// "objURL":"http://img1.gtimg.com/8/895/89519/8951985_550x550_0.jpg",  