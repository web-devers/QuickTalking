var sd = require('silly-datetime');

function getTime(){
	var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
	return time
}

function getkey(){
	var arr=[];
	for (var i = 0; i < 100000; i++) {
	    arr.push('key_'+Math.random());
	}
	return arr;
}

module.exports={
	getTime,
	getkey
}