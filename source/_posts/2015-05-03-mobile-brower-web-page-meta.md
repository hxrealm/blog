---
layout: post
title: 移动端浏览器的私有 Meta 属性的整理
date: 2015-05-03 12:05
cover: /gallery/1.jpg
categories: [技术随记]
---

最近与浏览器客户端开发同学在探讨关于浏览器通用 Web API 实现方式，例如：横竖屏切换、日/夜间模式、全屏模式、页面模式等。
通过讨论并与欧朋（Opera）、QQ、UC 等浏览器团队进行相关交流，得到的结论————无内核开发的版本，很难彻底解决渲染、网络操作、安全等所带来的问题，
但也是可以通过应用层的某些技巧方式满足部分的需求。

今天主要是整理一下移动端浏览器的私有 Meta 属性的使用场景以及相关注释，以便查阅：

强制让文档的宽度与设备的宽度保持 1:1，并且文档最大的宽度比例是 1.0，且不允许用户点击屏幕放大浏览

```html
<meta
  content="”width"
  ="device-width,"
  initial-scale="1.0,"
  maximum-scale="1.0,"
  user-scalable="0;”"
  name="”viewport”"
/>
```

iphone 设备中的 safari 私有 meta 标签，它表示：允许全屏模式浏览

```html
<meta content="”yes”" name="”apple-mobile-web-app-capable”" />
```

iphone 的私有标签，它指定的 iphone 中 safari 顶端的状态条的样式

```html
<meta content="”black”" name="”apple-mobile-web-app-status-bar-style”" />
```

告诉设备忽略将页面中的数字识别为电话号码

```html
<meta content="”telephone" ="no”" name="”format-detection”" />
```

<!--more-->

### UC 浏览器和 QQ 浏览器私有 Meta 属性

目前国内浏览器内核开发团队主要有欧朋浏览器（oupeng）、UC 浏览器、QQ 浏览器，其中欧朋浏览器（oupeng）采用 Presto 内核（Opera 7）以及 webkit 内核（Opera 10），
UC 浏览器与 QQ 浏览器分别采用[U3 内核](http://www.uc.cn/business/developer/)（Webkit 内核）和[X5 内核](http://x5.tencent.com/)（webkit 内核），
这里我们主要是介绍一下基于 webkit 内核定义的私有属性有哪些。

### UC 浏览器

设置屏幕方向为横屏还是竖屏

```html
<meta name="screen-orientation" content="portrait|landscape" />
```

设置是否全屏，yes 表示强制浏览器全屏

```html
<meta name="full-screen" content="yes" />
```

缩放不出滚动条

```html
<meta name="viewport" content="uc-fitscreen=no|yes" />
```

设置 no 后用户缩放与标准浏览器缩放一直，设置为 yes 后，用户缩放金放到图片和文字，不出现横向滚动条。

排版

```html
<meta name="layoutmode" content="fitscreen|standard" />
```

fitscreen 模式简化页面处理，适合页面阅读节省流量，standard 模式和标准浏览器一致；一旦设置 layoutmode meta 后，用户使用浏览器提供的的排版模式选项将会无效。

夜间模式

```html
<meta name="nightmode" content="enable|disable" />
```

nightmode 的值设置为 disable 后，即使用户使用浏览器的夜间模式，页面的表现也仍然是非夜间模式。

强制图片显示

```html
<meta name="imagemode" content="force" />
```

UC 浏览器为了节省流量，为用户提供了无图模式，但是如果页面的图片是必不可少的，如验证码的，需要强制浏览器显示图片，可以设置 imagemode， 不影响子页面。通过 META 设置图片加载方式会作用于整个页面，如果希望对单个图片进行设置，那么可以使用这个

```html
<img src="..." show="force" />
```

应用模式

```html
<meta name="browsermode" content="application" />
```

使用了 application 这种应用模式后，页面讲默认全屏，禁止长按菜单，禁止收拾，标准排版，以及强制图片显示。

### QQ 浏览器

设置屏幕方向

```html
<meta name="x5-orientation" content="portrait|landscape" />
```

设置全屏

```html
<meta name="x5-fullscreen" content="auto|true" />
```

设置屏幕模式

```html
<meta name="x5-page-mode" content="default|app" />
```

APP 网页应用模式（定制工具栏，全屏显示）
