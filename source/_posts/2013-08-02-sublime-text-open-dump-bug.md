---
layout: post
title: ST2打开.scss文件时自动生成并打开.dump文件的BUG
date: 2013-08-02 21:50
comments: true
categories: [前端开发]
---

今天同事用ST2打开.scss项目文件时，出现自动生成并打开一个.dump文件，而且文件中的代码不再高度显示，分析如下：

1..dump是什么文件？（系统内存中存储的临时文件）。

2.打开.scss文件时生成.dump文件，这是为什么？（.scss需要编译成.css文件，同时存在编码问题）。

3.什么影响打开.scss文件时才会生成.dump文件？（ST2安装的插件、插件文件损毁）。

通过以上分析，我们开始Remove Package中可能引起问题的插件例如SublimeOnSaveBuild、PyV8,重启ST2发现问题依然存在，后面通过搜索相关资料发现有类似问题的答案，重新查看了ST2中安装的插件发现安装了GBK Encoding Support，移除该插件后，重新打开.scss文件，代码正常高度显示。

疑问：GBK Encoding Support一直都在使用，为什么之前没有出现这样的问题呢？

1.GBK Encoding Support 插件对GBK存在不稳定。

2.通过SVN版本管理，某一方没有安装GBK Encoding Support插件，而已一方安装了GBK Encoding Support插件。

感谢 [凌毅] 提供修改版的 GBK Encoding Support，支持语法高亮。

下载地址：[http://pan.baidu.com/share/link?shareid=174741&uk=2534294120](http://pan.baidu.com/share/link?shareid=174741&uk=2534294120)

使用方法：下载 GBK Encoding Support.sublime-package 文件 替换 SublimeText2\Pristine Packages 下的GBK Encoding Support.sublime-package 文件，重启ST2就可以了。