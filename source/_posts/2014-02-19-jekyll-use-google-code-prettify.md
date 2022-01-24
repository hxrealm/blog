---
layout: post
title: Jekyll中使用 google-code-prettify 语法高亮
date: 2014-02-19 21:19
cover: /gallery/29.jpg
categories: [工作随记]
tags: 
  - Jekyll
---

之前使用 wordpress 时，一直都是用的 SyntaxHIghlighter 代码高亮的工具，虽然 SyntaxHIghlighter 的代码高亮显示的很漂亮，无奈加载太慢，且对 markdown 写的文章支持的还不是很好，只能舍弃了。现在用的这个是 google-code-prettify，效果也相当不错。最重要的是，非常小，加载速度比 SyntaxHighlighter 快得多，而且，可以直接使用 markdown 的语法去写代码。

### 准备工作

Google Code Prettify 下载

### 主题库

第一步：引用 prettify.css 和 prettify.js
将下载后的 Prettify 压缩文件解压到指定文件文件夹,将 prettify.css 和 prettify.js 文件放到项目文件夹下（例如：assets/theme/prettify 目录）,然后打开需要引用的页面，添加如下代码：

    <link href="/assets/themes/prettify/prettify.css" rel="stylesheet" type="text/css" media="all">
    <script type="text/javascript" src="/assets/themes/prettify/prettify.js"></script>

考虑到加载速度，最好将 js 写到文档末尾，body 闭合标签之前，css 写到头部。

<!--more-->

第二步：高亮代码块

添加以下代码，用于识别并高亮代码块

```js
// 需要引入jQuery
$(document).ready(function () {
  $("pre").addClass("prettyprint linenums").attr("style", "overflow:auto");
  prettyPrint();
});
```

第三步：显示全部行号
默认 prettify 只显示行号 5,10,15...,可以给 pre 标签下的 li 设置以下样式

```css
pre li {
  list-style-type: decimal;
}
```

第四步：选择喜欢的主题样式
打开主题库选择喜欢的主题，并复制或者下载主题样式文件，替换默认主题样式文件（prettify.css）,本文使用的主题是 Desert

第五步：完成
到此 Google Code Prettify 已可以正常使用了，现在可以直接用 markdown 的前置 4 空格来写代码了。

注：如果博客中的代码块存在滚动条可以通过如下代码实现自动换行 `white-space:pre;white-space:pre-wrap;word-break:break-all;word-wrap:break-word;`。
