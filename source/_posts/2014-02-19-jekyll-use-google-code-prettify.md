---
layout: post
title: Jekyll中使用google-code-prettify语法高亮
date: 2014-02-19 21:19
comments: true
categories: [工作与生活]
---

之前使用wordpress时，一直都是用的SyntaxHIghlighter代码高亮的工具，虽然SyntaxHIghlighter的代码高亮显示的很漂亮，无奈加载太慢，且对markdown写的文章支持的还不是很好，只能舍弃了。现在用的这个是google-code-prettfy，效果也相当不错。最重要的是，非常小，加载速度比SyntaxHighlighter快得多，而且，可以直接使用markdown的语法去写代码。

准备工作
Google Code Prettify下载
主题库
第一步：引用prettify.css和prettify.js
将下载后的Prettify压缩文件解压到指定文件文件夹,将prettify.css和prettify.js文件放到项目文件夹下（例如：assets/theme/prettify目录）,然后打开需要引用的页面，添加如下代码：

    <link href="/assets/themes/prettify/prettify.css" rel="stylesheet" type="text/css" media="all">
    <script type="text/javascript" src="/assets/themes/prettify/prettify.js"></script>

考虑到加载速度，最好将js写到文档末尾，body闭合标签之前，css写到头部

第二步：高亮代码块
添加以下代码，用于识别并高亮代码块

    <script type="text/javascript">
        // 需要引入jQuery
        $(document).ready(function() {
            $('pre').addClass('prettyprint linenums').attr('style', 'overflow:auto');
            prettyPrint();
        });
    </script>
    
第三步：显示全部行号
默认prettify只显示行号5,10,15...,可以给pre标签下的li设置以下样式

pre li{ list-style-type: decimal; }
第四步：选择喜欢的主题样式
打开主题库选择喜欢的主题，并复制或者下载主题样式文件，替换默认主题样式文件（prettify.css）,本文使用的主题是Desert

第五步：完成
到此Google Code Prettify已可以正常使用了，现在可以直接用markdown的前置4空格来写代码了。

另外，如果博客中的代码块存在滚动条可以通过如下代码实现自动换行

white-space:pre;white-space:pre-wrap;word-break:break-all;word-wrap:break-word;
如在操作过程中存在任何问题，请给我留言，谢谢！
