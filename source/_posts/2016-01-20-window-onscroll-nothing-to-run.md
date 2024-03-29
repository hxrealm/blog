---
layout: post
title: Javascript 给 window.onscroll 事件不执行
cover: /gallery/33.jpg
date: 2016-01-20 17:10
categories: [技术随记]
---

今天突然收到测试反馈线上网页滚动加载不成功。当时还有点奇怪，之前测试的时候是可以正常加载数据呢！因此决定好好排查一下原因，点击这里查看[demo](/demo/window-onscroll-nothing-to-run.html)，排查步骤如下：

```javascript
// window.onscroll不能正常执行
window.onscroll = function () {
  console.log("running");
};
```

<!--more-->

1. chrome 开发者调试工具下进行断点检测，发现在 window.onscroll 方法不执行

2. 去除页面上所有脚本，直接执行 window.onscroll 方法，结果没有输出 log

3. 去除页面上所有脚本（js）和样式表（css），直接执行 window.onscroll 方法，结果可以正确输出 log

4. 通过以上排查可以确认样式表对 window.onscroll 方法执行有影响

最终对样式表进行排查发现当页面最外层元素采用(`position:absolute; left:0; right:0; top:0; bottom:0; width:100%;`)时且设置样式(`overflow:hidden; overflow-x:hidden;`)，chrome 浏览器 window.onscroll 会失效，safari 浏览器下却可以正常执行。

测试浏览器 UA 信息如下：

```text
    // chrome 48.0.2564.97 window.onscroll失效
    Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36

    // safari 9.0.2 window.onscroll可以正常执行
    Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9
```

此现象暂时不清楚具体原因，后续补充....
