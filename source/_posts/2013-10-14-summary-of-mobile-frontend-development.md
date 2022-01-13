---
layout: post
title: 移动平台前端开发总结
date: 2013-10-14 20:21
cover: /gallery/21.jpg
categories: [技术人生]
---

移动平台前端开发主要是指针智能手机（iphone、android）做站点适配，并非是针对普通手机开发 Wap 2.0，所以在阅读本篇文章以前，你需要对 webkit 内核的浏览器有一定的了解，需要对 HTML5 和 CSS3 有一定的了解。

1、移动前端开发 webkit 内核中的一些私有的 meta 标签

=> 强制让文档的宽度与设备的宽度保持 1:1，并且文档最大的宽度比例是 1.0，且不允许用户点击屏幕放大浏览；

=> Iphone 设备中的 safari 私有 meta 标签，它表示：允许全屏模式浏览

=> Iphone 设备中的 safari 私有 meta 标签，它表示：允许全屏模式浏览

=> Iphone 设备中的 safari 私有 meta 标签，它表示：

=> 告诉设备忽略将页面中的数字识别为电话号码

=> 告诉设备忽略将页面中的电子邮箱

<!--more-->

(IOS) (Android)

=> 说明： 这个 link 就是设置 web app 的放置主屏幕上 icon 文件路径。图片尺寸可以设定为 5757（px）或者 Retina 可以定为 114114（px），ipad 尺寸为 72\*72（px）

注：红色部分为 H5 模板页面通用设置项。

2、如何去除 IOS 和 Android 中的输入 URL 的控件条

=> setTimeout(scrollTo,0,0,10); 请注意，这句代码必须放在 window.onload 里才能够正常的工作，而且你的当前文档的内容高度必须是高于窗口的高度时，这句代码才能有效的执行。

3、如何关闭 IOS 中键盘自动大写

=> 我们知道在 iOS 中，当虚拟键盘弹出时，默认情况下键盘是开启首字母大写的功能的，根据某些业务场景，可能我们需要关闭这个功能，移动版本 webkit 为 input 元素提供了 autocapitalize 属性，通过指定 autocapitalize=”off”来关闭键盘默认首字母大写。

4、IOS 中如何彻底禁止用户在新窗口打开页面

=> 有时我们可能需要禁止用户在新窗口打开页面，我们可以使用 a 标签的 target=”\_self“来指定用户在新窗口打开，或者 target 属性保持空，但是你会发现 iOS 的用户在这个链接的上方长按 3 秒钟后，iOS 会弹出一个列表按钮，用户通过这些按钮仍然可以在新窗口打开页面，这样的话，开发者指定的 target 属性就失效了，但是可以通过指定当前元素的-webkit-touch-callout 样式属性为 none 来禁止 iOS 弹出这些按钮。这个技巧仅适用 iOS 对于 Android 平台则无效。

5、IOS 中如何禁止用户保存图片＼复制图片

=> 我们可以为一个 img 标签指定-webkit-touch-callout 为 none 也会禁止设备弹出列表按钮，这样用户就无法保存＼复制你的图片了。

6、IOS 中如何禁止用户选中文字(Android 同样有效)

=> 我们通过指定文字标签的-webkit-user-select 属性为 none 便可以禁止 iOS 用户选中文字。

7、学会使用 webkit-box

8、如何解决 android 平台中页面无法自适应

=> 虽然你的 html 和 css 都是完全自适应的，但有一天如果你发现你的页面在 android 中显示的并不是自适应的时候，首先请你确认你的 head 标签中是否包含以下 meta 标签：

如果有的话，那请你再仔细的看清楚有没有这个属性的值 width=device-width，如果没有请立即加上吧！

9、如何解决 iOS 4.3 版本中 safari 对页面中 5 位数字的自动识别和自动添加样式

=> iOS4.3 版本，升级后对 safari 造成了一个 bug：即使你添加了如下的 meta 标签，safari 仍然会对页面中的 5 位连续的数字进行自动识别，并且将其重新渲染样式，也就是说你的 css 对该标签是无效的。

如下改写：

12345.00 元

10、如何解决 Android 2.0 以下平台中圆角的问题

=> 考虑到 border-radius 的兼容性问题，使用如下方式：

定义 4 个圆角 border:1px solid #F8F8F8; -webkit-border-radius:5px;

定义部分圆角 border:1px solid #F8F8F8; -webkit-border-radius:5px; -webkit-border-top-left-raduis:0; -webkit-border-bottom-left-radius:0;

11、如何解决 Android 浏览器中 webapp 中圆角后存在背景色的问题（针对特定生产商的 Android 浏览器）

=> 可以通过设置父层与子层元素都具有相同圆角，并设置父层元素的背景后与底色一致。

12、如何解决移动开发中字体适配问题

=> 我们推荐采用 CSS3,新的长度单位 REM(REM 是相对长度单位。相对于根元素(即 html 元素)font-size 计算值的倍数)。

/\*_ 1rem=20px for 320px(中低端分辨率). _ 1rem = 22.5px for 360px(高端分辨率). \*/

html{font-size:20px; -webkit-text-size-adjust:none;} @media all and (min-width:359px){.uc-hack{font-size:22.5px;}} @media all and (min-width:359px) and (-webkit-min-device-pixel-ratio:1.5){html{font-size:22.5px;}}

（持续更新......）
