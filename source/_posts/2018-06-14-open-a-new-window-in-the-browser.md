---
title: 在浏览器新窗口中打开的几种方式
cover: /gallery/6.jpg
categories: [技术随记]
tags:
  - 经验之谈
date: 2018-06-14 22:03:00
---

## 场景

在前端业务开发过程中，需要从浏览器新窗口中打开的场景其实也有很多，下面一起来看看，实际应用场景，如下：

1、访问网站内部链接在本窗口打开，访问网站外部链接在新窗口打开

html:

```html
// 内部链接地址，本窗口跳转 <a href="//www.hanyi.pro/blog/about">关于我</a>
```

```html
// 外部链接地址，新窗口打开
<a href="https://github.com/hxrealm" target="_blank">Github</a>
```

2、站内搜索，将表单数据提交到新窗口中查询

html:

```html
<form method="GET" action="http://www.baidu.com/s" target="_blank">
  <input type="text" name="wd" value="hxrealm" />
  <input type="submit" name="search" value="submit" />
</form>
```

<!--more-->

3、点击操作，弹出一个固定窗口

html:

```html
<button id="btn" type="button">打开新窗口</button>
```

javascript:

```html
<script type="text/javascript">
  var btn = document.getElementById("btn");
  btn.onclick = function () {
    window.open(
      "http://www.baidu.com/",
      "_blank",
      "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400"
    );
  };
</script>
```

4、事件模拟，自动触发

html:

```html
<button id="btn" type="button">打开新窗口</button>
<a id="link" href="http://www.baidu.com/" _target="block"></a>
```

javascript:

```html
<script type="text/javascript">
  var link = document.getElementById("link");
  var btn = document.getElementById("btn");
  btn.onclick = function () {
    link.click();
  };
</script>
```

或者

```html
<script type="text/javascript">
  var link = document.getElementById("link");
  var evt = document.createEvent("MouseEvents");
  evt.initEvent("click", true, true);
  link.dispatchEvent(evt);
</script>
```

5、右键点击链接，选择新窗口中打开

## 写在最后

以上都是常见的在浏览器中打开新窗口的方式，其中针对 js 事件打开新窗口的方法还存在很多种组合方式，在此没有一一列举。

在实际的业务场景中，还有一种情况经常会遇到，那就是弹窗被浏览器阻止了，需要通过设置弹窗不被阻止放后正常打开。

那么其中的原理和发生的场景是什么以及如何绕过浏览器（chrome）的弹窗拦截机制，请看下篇文章《浏览器弹窗拦截机制解剖》。
