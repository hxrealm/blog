---
title: 前端进阶系列（第4期）：JavaScript中一切皆为对象揭秘

tags:
  - javascript
categories:
  - 前端技术
date: 2019-02-15 11:12:00
---
## 写在前面

以前在阅读《JavaScript高级语言程序设计》中有提到“在JavaScript中，一切皆为对象”，当时并没有深入理解其真正的含义，现在想想其内含着很大的信息量，下面跟着我一步一步的揭开其神秘的面纱。

## 第一步：类型检测

在JavaScript中通过typeof进行数据类型检测。

运行以下代码：

```js
console.log(typeof undefined); // undefined
console.log(typeof ''); // string
console.log(typeof 123); // number
console.log(typeof true); // boolean
console.log(typeof Symbol()); // symbol
console.log(typeof function() {}); // function
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
console.log(typeof new Number(123)); // object
```

根据上面代码输出结果可知，除开```基本类型```，typeof输出的其它的都是function和object，即```引用类型```。

<!--more-->

## 第二步：函数是对象吗？

首先通过instanceof检验一下函数是不是Object的实例。

运行以下代码：

```js
const func = function(a, b) {
    return a + b;
}

console.log(func instanceof Object); // true
```

根据上面代码输出结果可知，**函数 function 也是对象**。

如果大家注意到的话，其实上面的代码等同于

运行以下代码：

```js
const func = new Function('a', 'b', 'return a + b');

console.log(func instanceof Function); // true
console.log(func instanceof Object); // true
```

根据上面代码输出结果可知，```函数 func``` 既是 Function 的实例又是 Object 的实例。

## 第三步：常见的内置对象

其实在JavaScript中有很多的内置对象，例如：Number、String、Boolean、Symbol、Array、Function、RegExp、Object、JSON、Date、Set、Map、Error、Math等等，了解更多请[点击这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)。

运行以下代码：

```js
// 实例化数字对象
const num = new Number(123);
console.log(typeof Number); // function
console.log(typeof num); // object

// 实例化字符串对象
const str = new String('hello world');
console.log(typeof String); // function
console.log(typeof str); // object

// Symbol是函数且不能被new 实例化
const smb = new Symbol('smb'); // TypeError Symbol 不能实例化
console.log(typeof Symbol); // function

// Math 内置对象
const max = Math.max(1,5); // 直接调用该类型的静态方法
console.log(typeof Math); // object

// 实例化数组对象
const arr = [1,2,3,4];
console.log(typeof Array); // function
console.log(typeof arr); // object

// 实例化对象
const obj = {name: '布一', wechat: 'hxrealm'};
console.log(typeof Object); // function
console.log(typeof obj); // object

// 自定义一个函数
const Func = function() {}
const func = new Func();

console.log(typeof Func); // function
console.log(typeof func); // object
```

根据上面代码输出结果可知，**对象是通过函数来创建的，而函数却又是一种对象。**

*注：实例化一个对象不一定非要new一个对象。*

### 对象格式

通常的对象（Object），一般是利用键值对表示的，例如下面这样：

```js
const obj = {
    name: '布一',
    age: 18,
    wechat: 'hxrealm',
    getName: function() {
        return this.name;
    }
}
```

那数组和函数不也是对象吗，它们也可以这样表示？

当然不可以，但它们可以采用另一种表示形式。如函数，可以这样：

```js
const func = function() {}

func.description = 'JavaScript function';
func.getName = function() {
    return this.description;
}
```

## 写在最后

总之，在javascript的世界里，一切皆为对象，且对象就是属性的集合。

**最后抛出一个问题，函数 function 为什么是对象 Object 的实例以及它们之间有什么关联？**

如果有发现任何问题或者有更好的建议，欢迎直接给我留言。

## 交流

更多精彩内容请关注[https://github.com/hxrealm/blog](https://github.com/hxrealm/blog),如果你觉得还不错请给个star，非常感谢。
