---
layout: post
title: 如何实现HTML标签的转义和反转义
date: 2016-09-12 15:20
comments: false
categories: [javascript]
---

## 背景

在进行web项目开发过程中可能都使用过js的转义和反转义的方法,在此就不再讨论，不清楚的朋友可以查看`参考资料`中的链接地址。今天主要是讨论如何实现HTML标签的转义和反转义。

还记得很早以前使用Dreamweaver开发网页时可以很容易对HTML标签进行转义，自带提示功能和可视化转义功能。常见的HTML字符转义有：`" "转义后&nbsp;`、`"<"转义后"&lt;"`、`">"转义后"&gt;"`等，对于已经习惯了纯代码编写的前端朋友来说，在不查询HTML字符转义对照表以及第三方工具时，有没有其他办法实现HTML字符的转义呢？

## 需求（场景）

1. 前端开发某些特定的功能时需要对用户的输入进行安全检测并对特殊字符进行转义

2. 多端（PC端、client端、移动端）数据来源统一接口时，需要对特殊数据进行字符转义

3. 对多端用户输入的内容进行前端检搜时需对特殊字符进行转义

## 实现

利用innerHTML和innerText对于内容获取和赋值的差异进行操作。innerHTML可以获取和赋值带有HTML标签的内容，而innerText仅能获取纯文本内容，忽略HTML节点标签。所以我们可以先将需要转义的内容赋值给innerText，然后再通过innerHTML获取其内容，这时获取的内容就是转义后的文本。代码如下：

HTML标签转义成特殊字符

```js
<script type="text/javascript">
	// HTML标签转义成特殊字符
	function encodeHTML(html){
		var output, elem = document.createElement('div');
		elem.textContent != null ? (elem.textContent = html) : (elem.innerText = html);
		output = elem.innerHTML;
		elem = null;
		return output;
	}

	var str1 = '<p>这里是一段有趣的内容，标签被转义了！</p>';
	// &lt;p&gt;这里是一段有趣的内容，标签被转义了！&lt;/p&gt;
	console.log(encodeHTML(str1));
</script>
```

特殊字符转义成HTML标签

```js
<script type="text/javascript"></script>
	// 特殊字符转义成HTML标签
	function decodeHTML(html){
		var output, elem = document.createElement('div');
		elem.innerHTML = html;
		output = elem.innerText || elem.textContent;
		elem = null;
		return output;
	}

	var str2 = '&lt;p&gt;这里是一段有趣的内容，标签还原了！&lt;/p&gt;';
	// <p>这里是一段有趣的内容，标签还原了！</p>
	console.log(decodeHTML(str2));

</script>
```

`注：火狐不支持innerText，需要使用textContent属性，而IE早期版本不支持此属性，为了同时兼容IE及火狐，需要进行判断操作，现主流浏览器支持innerText也支持textContent。`

## 参考资料：

- [innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)
- [innerText&textContent](http://deuka54.blogspot.jp/2009/05/javascript-innertext-textcontent.html)
- [escape](http://www.w3school.com.cn/jsref/jsref_escape.asp)
- [unescape](http://www.w3school.com.cn/jsref/jsref_unescape.asp)
- [encodeURI](http://www.w3school.com.cn/jsref/jsref_encodeuri.asp)
- [decodeURI](http://www.w3school.com.cn/jsref/jsref_decodeuri.asp)
- [encodeURIComponent](http://www.w3school.com.cn/jsref/jsref_encodeURIComponent.asp)
- [decodeURIComponent](http://www.w3school.com.cn/jsref/jsref_decodeURIComponent.asp)
