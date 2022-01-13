console.log('开始执行：sleep.js');

function sleep(ms){
	var start = Date.now();
	var expire = start + ms;
	while(Date.now() < expire);

	var end = Date.now();

	console.log('差值：', end - start + '毫秒');

}

sleep(5000);


console.log('完成执行：sleep.js');


