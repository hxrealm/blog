---
layout: post
title: 移动开发总结（转）
date: 2013-11-20 20:56
comments: true
categories: [引用]
---

1、低版本Android下input有CSS3动画会让输入框失去焦点，解决办法是低版本Android下去掉所有CSS3动画。 .ua-ios .ipt{-webkit-transition:all .5s;-moz-transition:all .5s;-o-transition:all .5s;-ms-transition:all .5s;transition:all .5s} .ua-oldAndroid .ipt {-webkit-transition:none;-moz-transition:none;-o-transition:none;-ms-transition:none;transition:none;}

2、-webkit-user-modify: read-write-plaintext-only; 作用是去掉输入框聚焦时候的白色背景 ； 但是这里有一个问题，Android4.0以上的系统，当软键盘激活出来的时候read-write-plaintext-only的输入框不会居中在屏幕中间，这里需要根据实际情况进行取舍。

3、translate3d可以让IOS启用硬件渲染，动画效果会更加流畅，基本上能解决所有抖动；但在Android下带来新的问题——只要页面里面有节点拥有transform属性，输入框都会不正常（聚焦不正常、输入时上下抖动等），此外还会导致节点渲染变慢（如点击出下啦菜单渲染缓慢）。 再次强调CSS3的动画、投影在Android下尽量避免。 .ua-ios .mail-list .list-item, .ua-ios .menu-item, .ua-ios .menu-split{ -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); }

4、Android 2.3.7 下不加透明border，会导致溢出隐藏失效。 .atts .att-preview{overflow:hidden;width:50px;height:50px;border:1px solid transparent;}

5、IOS下fixed定位（比如框架顶部提示信息），当键盘收起的时候会有残影：fixed元素不会随着键盘收起而移动到页面顶部，而是保持在页面中间，需要hack改成绝对定位。 .frame-tips{position:fixed;z-index:30;left:0;top:0} .ua-ios .frame-tips{position: absolute}

6、在iPad1等低版ios下，opacity和其他属性一起改变，会导致transition中重复执行三次，所以要么只改变opacity实现淡入淡出，要么只改变非opacity属性。 .mRead-reply .btn{position:absolute;right:0;top:0;/opacity:0;/overflow:hidden;display:block;width:64px}

7、在Android4.1下，如果textarea聚焦的时候，其高度或者其兄弟节点的高度产生变化，那么textarea就会被软键盘挡住而不会自动调整位置，这里需要去掉所有效果，默认显示输入框展开状态。所以Android下尽量不要在textarea和input上做动画。

8、Android下div的高度设置成100%，同时设置其overflow:auto;那么滚动条就会出现在这个div上面。 这个时候会出现抖动，所以建议Android下页面的滚动能且只能出现在body节点上面！

原文章地址：[http://ntesmailfetc.blog.163.com/blog/static/20628706120139184457401/](http://ntesmailfetc.blog.163.com/blog/static/20628706120139184457401/)
