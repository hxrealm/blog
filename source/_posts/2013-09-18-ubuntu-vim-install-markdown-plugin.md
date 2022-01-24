---
layout: post
title: Ubuntu 下 Vim 安装 Markdown 插件
date: 2013-09-18 19:38
cover: /gallery/18.jpg
categories: [技术随记]
tags: 
  - Ubuntu
  - Vim
  - Markdown
---

Markdown 出来也有很长时间了，网上也有很多关于 Markdown 的语法介绍以及使用说明，如果还不知道什么是 Markdown,可以查看这篇文章。写这篇文章的初衷只为了记录在 Windows 系统与 Ubuntu 系统下使用 markdown 的一些个人感受。

Markdown in windows
Sublime text 2
由于个人偏爱使用 Sublime text 2（以下简写为 ST2）进行编码,所以一般都偏向安装 ST2 的插件，在这里选择的是 Markdown 和 Markdown Preview，Markdown 主要是 markdown 的语法高度，Markdown Preview 主要是文档预览（非实时的预览）。也许是更加喜爱像 Dreamweaver 那样的可视化操作，因此搜索后发现了 MarkdownPad。

MarkdownPad
相比使用 ST2 来讲，MarkdownPad 可以实时预览，多文件切换也很流畅，但不喜爱它默认的 markdown 语法高度的颜色以及有限的免费版功能，因此尝试了使用 MdCharm。

<!--more-->

MdCharm
相比 ST2 与 MarkdownPad 来讲，MdCharm 是我个人比较喜爱的一款 Markdown 编辑器，不仅启动速度快、语法高亮的颜色以及渲染的文档都不错，所以在写 Blog 的时候使用非常的方便。

由于开发环境切换到 Ubuntu 后,一般都是使用 gedit 和 vim 进行文件的查看与编写，所以在此记录 vim 下配置 markdown 以及 markdown to wordpress。

Markdown in ubuntu
在这里我也不需要重复造轮子，可以查看以下链接：

在 vim 中设置 markdown 语法高亮

使用 vim 和 markdown 撰写 blog 并发布到 wordpress

注意：操作完成后，重新打开 vim。

参考文档：

[http://wowubuntu.com/markdown/](http://wowubuntu.com/markdown/)

[http://daringfireball.net/projects/markdown/basics](http://daringfireball.net/projects/markdown/basics)

[http://zh.wikipedia.org/wiki/Markdown](http://zh.wikipedia.org/wiki/Markdown)
