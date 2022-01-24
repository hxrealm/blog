---
layout: post
title: 再谈 async 和 defer 的区别
cover: /gallery/12.jpg
date: 2017-07-07 11:20

categories: [前端技术]
---

我们常用的 script 标签有两个和性能、js 脚本文件下载执行相关的属性:`async`和`defer`

async 的含义【摘自[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)】

该布尔属性指示浏览器是否在允许的情况下异步执行该脚本。该属性对于内联脚本无作用 (即没有 src 属性的脚本）

defer 的含义【摘自[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)】

这个布尔属性定义该脚本是否会延迟到文档解析完毕后才执行。

### async

对于 async，相信前端开发的小伙伴们都非常熟悉，很容易让人想到异步处理、非阻塞 I/O 等场景。在这里 async 是 HTML5 script 标签中新增的属性，它的作用是能够异步的加载和执行脚本，不因加载脚本而阻塞页面的加载，一旦加载到就会立即执行。下面让我们一起先看看两个 demo：

- [without async](/demo/js-without-async.html)
- [with async](/demo/js-with-async.html)

<!--more-->

简单介绍一下这个 demo，一共引用了 3 个 js，1.js 和 2.js 是两个正常的脚本文件，sleep.js 是一个延迟 5s 后执行的阻塞脚本文件。现在我们假设一个场景，一个页面中同时按顺序引入以上 3 个 js 脚本文件(1.js、sleep.js、2.js)，现我们希望 1.js 脚本文件内容执行完后立即执行 2.js 脚本文件内容，最后执行 sleep.js 脚本文件内容，应该如何操作？

下面我们一起看看 script 标签未指定 async 属性和指定 async 属性的前后效果：

1. 未给 script 标签添加 async 属性时，正常引入 3 个 js 文件，脚本执行效果如下：

![js-without-async](/demo/pic/js-without-async.png)

2. 当给 script 标签中引入 sleep.js 文件行添加 async 属性后，页面的脚本执行效果如下：

![js-with-async](/demo/pic/js-with-async.png)

### defer

对于 defer，估计“时尚”的前端小同伴可能已经不在使用喽，这个功能还未被所有主流浏览器支持，早期主要是 IE 内核版本支持，[查看详细](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)b 了解更多。在这里 defer 是早期 script 标签中的属性，它的作用是延迟执行脚本直到文档解析完毕后才执行。下面让我们一起先看看两个 demo:

- [without defer](/demo/js-without-defer.html)
- [with defer](/demo/js-with-defer.html)

效果同上。

注：可以通过打开浏览器调试工具，查看脚本加载和执行详细过程。

### 总结

1. 考虑到兼容性，针对低版本浏览器推荐 script 标签中同时添加 async 和 defer 属性
2. 不考虑兼容性，针对主流浏览器推荐 script 标签中使用 async 属性
3. 推荐脚本文件在文档的底部引入

### 参考

- [携程 ued 解读 defer 和 async 的区别](http://ued.ctrip.com/blog/script-defer-and-async.html)
- [MDN 中文文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)
