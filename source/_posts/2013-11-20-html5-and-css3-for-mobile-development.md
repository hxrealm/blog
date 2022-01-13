---
layout: post
title: 移动开发总结（转）
date: 2013-11-20 20:56
cover: /gallery/24.jpg
categories: [技术人生]
---

1、低版本 Android 下 input 有 CSS3 动画会让输入框失去焦点，解决办法是低版本 Android 下去掉所有 CSS3 动画。

```css
.ua-ios .ipt {
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  -ms-transition: all 0.5s;
  transition: all 0.5s;
}

.ua-oldAndroid .ipt {
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  -ms-transition: none;
  transition: none;
}
```

<!--more-->

2、`-webkit-user-modify: read-write-plaintext-only;`作用是去掉输入框聚焦时候的白色背景 ； 但是这里有一个问题，Android4.0 以上的系统，当软键盘激活出来的时候 read-write-plaintext-only 的输入框不会居中在屏幕中间，这里需要根据实际情况进行取舍。

3、translate3d 可以让 IOS 启用硬件渲染，动画效果会更加流畅，基本上能解决所有抖动；但在 Android 下带来新的问题——只要页面里面有节点拥有 transform 属性，输入框都会不正常（聚焦不正常、输入时上下抖动等），此外还会导致节点渲染变慢（如点击出下啦菜单渲染缓慢）。 再次强调 CSS3 的动画、投影在 Android 下尽量避免。

```css
.ua-ios .mail-list .list-item,
.ua-ios .menu-item,
.ua-ios .menu-split {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
```

4、Android 2.3.7 下不加透明 border，会导致溢出隐藏失效。

```css
.atts .att-preview {
  overflow: hidden;
  width: 50px;
  height: 50px;
  border: 1px solid transparent;
}
```

5、IOS 下 fixed 定位（比如框架顶部提示信息），当键盘收起的时候会有残影：fixed 元素不会随着键盘收起而移动到页面顶部，而是保持在页面中间，需要 hack 改成绝对定位。

```css
.frame-tips {
  position: fixed;
  z-index: 30;
  left: 0;
  top: 0;
}

.ua-ios .frame-tips {
  position: absolute;
}
```

6、在 iPad1 等低版 ios 下，opacity 和其他属性一起改变，会导致 transition 中重复执行三次，所以要么只改变 opacity 实现淡入淡出，要么只改变非 opacity 属性。

```css
.mRead-reply .btn {
  position: absolute;
  right: 0;
  top: 0;
  /opacity: 0;
  /overflow: hidden;
  display: block;
  width: 64px;
}
```

7、在 Android4.1 下，如果 textarea 聚焦的时候，其高度或者其兄弟节点的高度产生变化，那么 textarea 就会被软键盘挡住而不会自动调整位置，这里需要去掉所有效果，默认显示输入框展开状态。所以 Android 下尽量不要在 textarea 和 input 上做动画。

8、Android 下 div 的高度设置成 100%，同时设置其 overflow:auto;那么滚动条就会出现在这个 div 上面。 这个时候会出现抖动，所以建议 Android 下页面的滚动能且只能出现在 body 节点上面！

原文章地址：[http://ntesmailfetc.blog.163.com/blog/static/20628706120139184457401/](http://ntesmailfetc.blog.163.com/blog/static/20628706120139184457401/)
