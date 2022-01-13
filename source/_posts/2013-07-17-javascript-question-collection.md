---
layout: post
title: 前端系列Javascript“小题大做”
date: 2013-07-17 23:14
cover: /gallery/11.jpg
categories: [前端技术]
---

### 背景

在内部分享会上多次听到后端同学希望前端同学能分享一些 JS 的基础知识和技巧。一直以来都忙于各种事情，好久没有关注 Javascript 基础内容，借今天@valleykid(ICAT 作者)在群里发的一个 JS 小题来揭开 JavaScript 精典问题集的大门。

以后将持续收集和更新 JavaScript 各种代表性“小题”，并做出详细的解答。

<!--more-->

### 情节

1.运行下面的代码，输出的结果是？

```javascript
var a = 10;
sayHi();
function sayHi() {
  var a = a + 10;
  alert(a);
  return a;
}
alert(a);
alert(sayHi() + 10);
```

答案是 NaN, 10, NaN, NaN

分析：第一次的 NaN，是因为 var a 在函数内部声明，js 解析器遇到会提前解析，并把 a 的值设为 undefined，此时的 a 已经在内部的作用域里找到了，就不用沿着作用域链向上找了，所以全局 a 不会影响函数内部的 a，很自然的结果应该为：

第一次：undefined+10 //输出结果：NaN

第二次：因为局部的 a 在函数执行完销毁，在执行的时候也没对 a 造成影响，所以全局 a 保持其初值 10 //输出结果：10

以下类推......

持续更新中...

### 结局

由于个人能力有限，对问题的收集与解答不正确的地方在所难免，共同学习，共同进步，欢迎指正。
