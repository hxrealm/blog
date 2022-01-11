---
layout: post
title: 移动端浏览器的私有Meta属性的整理
date: 2015-05-03 12:05
comments: true
categories: [移动开发]
---

最近与浏览器客户端开发同学在探讨关于浏览器通用Web API实现方式，例如：横竖屏切换、日/夜间模式、全屏模式、页面模式等。
通过讨论并与欧朋（Opera）、QQ、UC等浏览器团队进行相关交流，得到的结论————无内核开发的版本，很难彻底解决渲染、网络操作、安全等所带来的问题，
但也是可以通过应用层的某些技巧方式满足部分的需求。

今天主要是整理一下移动端浏览器的私有Meta属性的使用场景以及相关注释，以便查阅：

强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览

    <meta content=”width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;” name=”viewport” />
    
iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览

    <meta content=”yes” name=”apple-mobile-web-app-capable” />
    
iphone的私有标签，它指定的iphone中safari顶端的状态条的样式

    <meta content=”black” name=”apple-mobile-web-app-status-bar-style” />
 
告诉设备忽略将页面中的数字识别为电话号码

    <meta content=”telephone=no” name=”format-detection” />


###UC浏览器和QQ浏览器私有Meta属性

目前国内浏览器内核开发团队主要有欧朋浏览器（oupeng）、UC浏览器、QQ浏览器，其中欧朋浏览器（oupeng）采用Presto内核（Opera 7）以及webkit内核（Opera 10），
UC浏览器与QQ浏览器分别采用[U3内核](http://www.uc.cn/business/developer/)（Webkit内核）和[X5内核](http://x5.tencent.com/)（webkit内核），
这里我们主要是介绍一下基于webkit内核定义的私有属性有哪些。

###UC浏览器

设置屏幕方向为横屏还是竖屏

    <meta name="screen-orientation" content="portrait|landscape">
    
设置是否全屏，yes表示强制浏览器全屏

    <meta name="full-screen" content="yes">
    
缩放不出滚动条

    <meta name="viewport" content="uc-fitscreen=no|yes"/>
    
设置no后用户缩放与标准浏览器缩放一直，设置为yes后，用户缩放金放到图片和文字，不出现横向滚动条。

排版

    <meta name="layoutmode" content="fitscreen|standard" />
    
fitscreen模式简化页面处理，适合页面阅读节省流量，standard模式和标准浏览器一致；一旦设置layoutmode meta后，用户使用浏览器提供的的排版模式选项将会无效。

夜间模式

    <meta name="nightmode" content="enable|disable"/>
    
nightmode的值设置为disable后，即使用户使用浏览器的夜间模式，页面的表现也仍然是非夜间模式。

强制图片显示

    <meta name="imagemode" content="force"/>
    
UC浏览器为了节省流量，为用户提供了无图模式，但是如果页面的图片是必不可少的，如验证码的，需要强制浏览器显示图片，可以设置imagemode， 不影响子页面。通过META设置图片加载方式会作用于整个页面，如果希望对单个图片进行设置，那么可以使用这个

    <img src="..." show="force">

应用模式

    <meta name="browsermode" content="application"/>

使用了application这种应用模式后，页面讲默认全屏，禁止长按菜单，禁止收拾，标准排版，以及强制图片显示。

###QQ浏览器

设置屏幕方向

    <meta name="x5-orientation" content="portrait|landscape" />
    
设置全屏

    <meta name="x5-fullscreen" content="auto|true" />
    
设置屏幕模式

    <meta name="x5-page-mode" content="default|app" />

app:网页应用模式（定制工具栏，全屏显示）





