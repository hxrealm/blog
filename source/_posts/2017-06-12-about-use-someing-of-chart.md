---
layout: post
title: chartjs在项目应用中的一些总结
date: 2017-06-12 22:30
comments: true
categories: [前端开发]
---

[Chart.js](http://www.chartjs.org/)是一款流行的javascript图表库，基于HTML5 Canvas开发，具有简单、灵活、兼容主流浏览器等特性。

本文主要是对新版[Chart.js](http://www.chartjs.org/)(v2.0+)在项目应用中的一些小总结，请特别注意目前国内翻译的Chart.js中文版本相对比较旧，大家在使用过程中请注意，在此推荐查看[Chart.js](http://www.chartjs.org/)官网。

官方版本

- [Chart.js](http://www.chartjs.org/)

中文版本（仅供参考）

- [bootcss chart.js](http://www.bootcss.com/p/chart.js/)
- [chart.js 中文版](http://chartjs.cn/)

下面主要记录[Chart.js](http://www.chartjs.org/)在实际项目应用场景中的一些设置，主要以问答方式体现如下：

1、 如何设置线条大小、颜色？

```javascript
data: {
	labels: labels,
	datasets: [{
		label:'',
		data,
		borderWidth: 2, // 线条宽度
		borderColor:'rgba(255,255,255,.6)', // 线条颜色
		backgroundColor:'rgba(255,255,255,.2)', // 线条到坐标区域背景色
	}]
}
```

2、 如何隐藏线条的Tag（标签）？

在Chart配置参数options中设置legend的dispay的值为false

```javascript
options: {
	legend: {
		display: false // 隐藏线条的说明（Tag）
	}
}
```

3、 如何隐藏对应坐标线以及设置对应坐标线为虚线？

在Chart配置参数options中对坐标进行相关设置

```javascript
options: {
	scales: {
    	xAxes: [{
            gridLines:{
                display: false, // 隐藏x坐标网格
                drawBorder: false, // 不渲染坐标线
            }
        }],
        yAxes: [{
            gridLines:{
                display: true,
                drawBorder: false,
                drawOnChartArea: true, 
                drawTicks: false,
                borderDash: [7, 5], // 网络虚线间的空隙
                color: 'rgba(255,255,255,.4)', // 网络线颜色
                zeroLineBorderDash: [7,5], // 坐标轴上的网络虚线间的空隙
                zeroLineColor: 'rgba(255,255,255,.4)' // 线条颜色
            }
        }]
	}
}
```

4、 如何隐藏y坐标的对应值？

```javascript
options: {
	responsive: false,
	legend: {display: false},
	scales: {
	    yAxes: [{
	        ticks: {
	            display: false, // 隐藏对应坐标的值
	            min: 0,
	        },
	    }]
	}	
}
```

5、 如何设置y坐标的最小值？

默认不设置坐标轴最小值则坐标轴动态显示，可为正数、负数或对等的正负坐标轴，当设置最小值后则按最小值显示对应坐标轴

```javascript
options: {
	responsive: false,
	legend: {display: false},
	scales: {
	    yAxes: [{
	        ticks: {
	            min: 100, // 设置Y坐标轴最小值为100
	        },
	    }]
	}	
}
```

以下为完整的实例代码：

```javascript
Chart.defaults.global.defaultFontColor = '#fff';
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
	    	labels: labels,
	    	datasets: [{
	        	label:'',
	        	data,
	        	pointColor : "#fff",
				pointStrokeColor : "#fff",
				pointBackgroundColor: '#fff',
				borderWidth: 2,
				borderColor:'rgba(255,255,255,.6)',
				backgroundColor:'rgba(255,255,255,.2)',
	    	}]
		},
	   	options: {
	       	responsive: false,
	       	legend: {display: false},
	       	scales: {
	        	xAxes: [{
	                gridLines:{
	                    display: false,
	                    drawBorder: false,
	                }
	            }],
	            yAxes: [{
	                ticks: {
	                    display: false,
	                    min: 0,
	                },
	                gridLines:{
	                    display: true,
	                    drawBorder: false,
	                    drawOnChartArea: true,
	                    drawTicks: false,
	                    borderDash: [7, 5],
	                    color: 'rgba(255,255,255,.4)',
	                    zeroLineBorderDash: [7,5],
	                    zeroLineColor: 'rgba(255,255,255,.4)'
	                }
	            }]
	    	}
		}
	});
```





