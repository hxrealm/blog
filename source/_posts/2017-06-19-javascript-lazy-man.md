---
layout: post
title: LazyMan的实现
date: 2017-06-19 20:10
comments: true
categories: [前端开发]
---

LazyMan是一道javascript面试题，第一次听说LazyMan一词是与[ing70](http://www.ing70.com/)聊天中获得，本文主要是说说自己的实现思路和方法。

### 题目如下：

实现一个LazyMan，可以按照以下方式调用:

```
LazyMan("Hank")输出:
Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
```

以此类推。

### 分析思路

根据经验猜测此题可参考jQuery中[delay()](http://api.jquery.com/delay/)、PHP中[sleep()](http://www.php.net/manual/en/function.sleep.php)、[Express](http://www.expressjs.com.cn/4x/api.html)中next()中间件等方法的实现原理。也是典型的JavaScript流程控制，因此问题的关键是如何实现任务的顺序执行。

考查关键

- 链式调用
- _next()流程控制
- 定时器的使用(setTimeout)
- 数组常用方法的掌握(pop、push、shift、unshift)
- 代码的封装(类、构造函数、原型链等)

### 代码实现

```
(function(){
    function LazyMan(name){
        var that = this;
        this._func = []; // 函数执行任务队列
        this.name = name;
        this._add({info: 'Hi! This is ' + this.name + '!'});
        // 下一次事件循环时执行
        setTimeout(function(){
            that._next();
        },0);
    }
    
    // _next维持任务队列中函数的执行
    LazyMan.prototype._next = function(){
        var func = this._func.shift();
        func && func();
    }
    
    // 添加任务到队列
    LazyMan.prototype._add = function(obj){
        var that = this;
        var fn = function(){
            obj.info && console.log(obj.info);
            if(obj.time && obj.time > 0){
                setTimeout(function(){
                    that._next();
                }, obj.time * 1000);
            } else {
                that._next();
            }
        };
        // 添加到队列末端
        !!obj.special == false && this._func.push(fn);
        // 添加到队列前端
        !!obj.special == true && this._func.unshift(fn);
    }
    
    LazyMan.prototype.eat = function(shit){
        this._add({info: 'Eat ' + shit + '~'});
        return this;
    }

    LazyMan.prototype.sleep = function(time){
        this._add({info: 'Wake up after ' + time, time: time, special: false});
        return this;
    }

    LazyMan.prototype.sleepFirst = function(time){
        this._add({info: 'Wake up after ' + time, time: time, special: true});
        return this;
    }

    var _lazyMan = function(name){
        return new LazyMan(name);
    }

    window.LazyMan = _lazyMan;
})();
```

### 运行结果（在线运行）

请打开console控制台，查看运行结果。

<p data-height="265" data-theme-id="0" data-slug-hash="pwrrjY" data-default-tab="js" data-user="hankewins" data-embed-version="2" data-pen-title="pwrrjY" class="codepen">See the Pen <a href="https://codepen.io/hankewins/pen/pwrrjY/">pwrrjY</a> by hankewins (<a href="https://codepen.io/hankewins">@hankewins</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>



