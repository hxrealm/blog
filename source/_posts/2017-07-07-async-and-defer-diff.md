---
layout: post
title: 再谈async和defer的区别
date: 2017-06-28 11:20
comments: true
categories: [前端开发]
---

我们常用的script标签有两个和性能、js脚本文件下载执行相关的属性:``async``和``defer``

async的含义【摘自[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)】

该布尔属性指示浏览器是否在允许的情况下异步执行该脚本。该属性对于内联脚本无作用 (即没有src属性的脚本）

defer的含义【摘自[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)】

这个布尔属性定义该脚本是否会延迟到文档解析完毕后才执行。

### async

对于async，相信前端开发的小伙伴们都非常熟悉，很容易让人想到异步处理、非阻塞I/O等场景。在这里async是HTML5 script标签中新增的属性，它的作用是能够异步的加载和执行脚本，不因加载脚本而阻塞页面的加载，一旦加载到就会立即执行。下面让我们一起先看看两个demo：

- [without async](/demo/js-without-async.html)
- [with async](/demo/js-with-async.html)

简单介绍一下这个demo，一共引用了3个js，1.js和2.js是两个正常的脚本文件，sleep.js是一个延迟5s后执行的阻塞脚本文件。现在我们假设一个场景，一个页面中同时按顺序引入以上3个js脚本文件(1.js、sleep.js、2.js)，现我们希望1.js脚本文件内容执行完后立即执行2.js脚本文件内容，最后执行sleep.js脚本文件内容，应该如何操作？

下面我们一起看看script标签未指定async属性和指定async属性的前后效果：

1. 未给script标签添加async属性时，正常引入3个js文件，脚本执行效果如下：

![js-without-async](/demo/pic/js-without-async.png)


2. 当给script标签中引入sleep.js文件行添加async属性后，页面的脚本执行效果如下：

![js-with-async](/demo/pic/js-with-async.png)

### defer

对于defer，估计“时尚”的前端小同伴可能已经不在使用喽，这个功能还未被所有主流浏览器支持，早期主要是IE内核版本支持，[查看详细](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)b了解更多。在这里defer是早期script标签中的属性，它的作用是延迟执行脚本直到文档解析完毕后才执行。下面让我们一起先看看两个demo:

- [without defer](/demo/js-without-defer.html)
- [with defer](/demo/js-with-defer.html)

效果同上。

注：可以通过打开浏览器调试工具，查看脚本加载和执行详细过程。

### 总结

1. 考虑到兼容性，针对低版本浏览器推荐script标签中同时添加async和defer属性
2. 不考虑兼容性，针对主流浏览器推荐script标签中使用async属性
3. 推荐脚本文件在文档的底部引入

### 参考

- [携程ued解读defer和async的区别](http://ued.ctrip.com/blog/script-defer-and-async.html)
- [MDN中文文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)

