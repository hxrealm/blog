---
layout: post
title: ST2 打开 .scss 文件时自动生成并打开 .dump 文件的 BUG
date: 2013-08-02 21:50
cover: /gallery/12.jpg
categories: [技术随记]
tags: 
  - Sublime Text
---

今天同事用 ST2 打开.scss 项目文件时，出现自动生成并打开一个.dump 文件，而且文件中的代码不再高度显示，分析如下：

1..dump 是什么文件？（系统内存中存储的临时文件）。

2.打开.scss 文件时生成.dump 文件，这是为什么？（.scss 需要编译成.css 文件，同时存在编码问题）。

3.什么影响打开.scss 文件时才会生成.dump 文件？（ST2 安装的插件、插件文件损毁）。

通过以上分析，我们开始 Remove Package 中可能引起问题的插件例如 SublimeOnSaveBuild、PyV8,重启 ST2 发现问题依然存在，后面通过搜索相关资料发现有类似问题的答案，重新查看了 ST2 中安装的插件发现安装了 GBK Encoding Support，移除该插件后，重新打开.scss 文件，代码正常高度显示。

<!--more-->

疑问：GBK Encoding Support 一直都在使用，为什么之前没有出现这样的问题呢？

1.GBK Encoding Support 插件对 GBK 存在不稳定。

2.通过 SVN 版本管理，某一方没有安装 GBK Encoding Support 插件，而已一方安装了 GBK Encoding Support 插件。

感谢 [凌毅] 提供修改版的 GBK Encoding Support，支持语法高亮。

下载地址：[http://pan.baidu.com/share/link?shareid=174741&uk=2534294120](http://pan.baidu.com/share/link?shareid=174741&uk=2534294120)

使用方法：下载 GBK Encoding Support.sublime-package 文件 替换 SublimeText2\Pristine Packages 下的 GBK Encoding Support.sublime-package 文件，重启 ST2 就可以了。
