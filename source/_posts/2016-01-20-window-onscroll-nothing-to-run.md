---
layout: post
title: Javascript给window.onscroll事件不执行
date: 2016-01-20 17:10
comments: true
categories: [javascript]
---

今天突然收到测试反馈线上网页滚动加载不成功。当时还有点奇怪，之前测试的时候是可以正常加载数据呢！因此决定好好排查一下原因，点击这里查看[demo](/demo/window-onscroll-nothing-to-run.html)，排查步骤如下：
    
    // window.onscroll不能正常执行
    window.onscroll = function(){
        console.log('running');
    }

1. chrome开发者调试工具下进行断点检测，发现在window.onscroll方法不执行

2. 去除页面上所有脚本，直接执行window.onscroll方法，结果没有输出log

3. 去除页面上所有脚本（js）和样式表（css），直接执行window.onscroll方法，结果可以正确输出log

4. 通过以上排查可以确认样式表对window.onscroll方法执行有影响

最终对样式表进行排查发现当页面最外层元素采用(``position:absolute; left:0; right:0; top:0; bottom:0; width:100%;``)时且设置样式(``overflow:hidden; overflow-x:hidden;``)，chrome浏览器window.onscroll会失效，safari浏览器下却可以正常执行。

测试浏览器UA信息如下：

    // chrome 48.0.2564.97 window.onscroll失效
    Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36

    // safari 9.0.2 window.onscroll可以正常执行
    Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9

此现象暂时不清楚具体原因，后续补充....

