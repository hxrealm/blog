---
layout: post
title: 移动平台前端开发总结
date: 2013-10-14 20:21
comments: true
categories: [工作与生活]
---

移动平台前端开发主要是指针智能手机（iphone、android）做站点适配，并非是针对普通手机开发Wap 2.0，所以在阅读本篇文章以前，你需要对webkit内核的浏览器有一定的了解，需要对HTML5和CSS3有一定的了解。

1、移动前端开发webkit内核中的一些私有的meta标签

=> 强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览；

=> Iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览

=> Iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览

=> Iphone设备中的safari私有meta标签，它表示：

=> 告诉设备忽略将页面中的数字识别为电话号码

=> 告诉设备忽略将页面中的电子邮箱

(IOS) (Android)

=> 说明： 这个link就是设置web app的放置主屏幕上icon文件路径。图片尺寸可以设定为5757（px）或者Retina可以定为114114（px），ipad尺寸为72*72（px）

注：红色部分为H5模板页面通用设置项。

2、如何去除IOS和Android中的输入URL的控件条

=> setTimeout(scrollTo,0,0,10); 请注意，这句代码必须放在window.onload里才能够正常的工作，而且你的当前文档的内容高度必须是高于窗口的高度时，这句代码才能有效的执行。

3、如何关闭IOS中键盘自动大写

=> 我们知道在iOS中，当虚拟键盘弹出时，默认情况下键盘是开启首字母大写的功能的，根据某些业务场景，可能我们需要关闭这个功能，移动版本webkit为input元素提供了autocapitalize属性，通过指定autocapitalize=”off”来关闭键盘默认首字母大写。

4、IOS中如何彻底禁止用户在新窗口打开页面

=> 有时我们可能需要禁止用户在新窗口打开页面，我们可以使用a标签的target=”_self“来指定用户在新窗口打开，或者target属性保持空，但是你会发现iOS的用户在这个链接的上方长按3秒钟后，iOS会弹出一个列表按钮，用户通过这些按钮仍然可以在新窗口打开页面，这样的话，开发者指定的target属性就失效了，但是可以通过指定当前元素的-webkit-touch-callout样式属性为none来禁止iOS弹出这些按钮。这个技巧仅适用iOS对于Android平台则无效。

5、IOS中如何禁止用户保存图片＼复制图片

=> 我们可以为一个img标签指定-webkit-touch-callout为none也会禁止设备弹出列表按钮，这样用户就无法保存＼复制你的图片了。

6、IOS中如何禁止用户选中文字(Android同样有效)

=> 我们通过指定文字标签的-webkit-user-select属性为none便可以禁止iOS用户选中文字。

7、学会使用webkit-box

8、如何解决android平台中页面无法自适应

=> 虽然你的html和css都是完全自适应的，但有一天如果你发现你的页面在android中显示的并不是自适应的时候，首先请你确认你的head标签中是否包含以下meta标签：

如果有的话，那请你再仔细的看清楚有没有这个属性的值width=device-width，如果没有请立即加上吧！

9、如何解决iOS 4.3版本中safari对页面中5位数字的自动识别和自动添加样式

=> iOS4.3版本，升级后对safari造成了一个bug：即使你添加了如下的meta标签，safari仍然会对页面中的5位连续的数字进行自动识别，并且将其重新渲染样式，也就是说你的css对该标签是无效的。

如下改写：

12345.00元

10、如何解决Android 2.0以下平台中圆角的问题

=> 考虑到border-radius的兼容性问题，使用如下方式：

定义4个圆角 border:1px solid #F8F8F8; -webkit-border-radius:5px;

定义部分圆角 border:1px solid #F8F8F8; -webkit-border-radius:5px; -webkit-border-top-left-raduis:0; -webkit-border-bottom-left-radius:0;

11、如何解决Android浏览器中webapp中圆角后存在背景色的问题（针对特定生产商的Android浏览器）

=> 可以通过设置父层与子层元素都具有相同圆角，并设置父层元素的背景后与底色一致。

12、如何解决移动开发中字体适配问题

=> 我们推荐采用CSS3,新的长度单位REM(REM是相对长度单位。相对于根元素(即html元素)font-size计算值的倍数)。

/* * 1rem=20px for 320px(中低端分辨率). * 1rem=22.5px for 360px(高端分辨率). */

html{font-size:20px; -webkit-text-size-adjust:none;} @media all and (min-width:359px){.uc-hack{font-size:22.5px;}} @media all and (min-width:359px) and (-webkit-min-device-pixel-ratio:1.5){html{font-size:22.5px;}}

（持续更新......）

