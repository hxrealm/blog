---
title: 【系列】如何正确的理解 JavaScript 数据类型
cover: /gallery/4.jpg
thumbnail: /gallery/4.jpg
tags:
  - javaScript
categories:
  [技术随记]
date: 2019-01-27 18:31:00
---

## 写在前面

前端进阶系列本着“好好干前端”的心态，一步一个脚印认真练好前端的基本功，为在前端的发展道路上做好铺垫。

本周正式开始前端进阶的第 1 期，本周的主题是`理解JavaScript数据类型`。

## 数据类型

最新的 ECMAScript 标准定义了 7 种数据类型，主要分为两大类`基本类型`和`引用类型`。

### 基本类型

`基本类型`有时也被称为`值类型`或`原始类型`。其中包括 6 种数据类型，分别是：`字符串类型（String）`、`数字类型（Number）`、`布尔类型（Boolean）`、`对空类型（Null）`、`未定义类型（Undefined）`、`符号类型（Symbol）`。

### 字符串类型

JavaScript 的字符串类型用于表示文本数据。它是一组 16 位的无符号整数值的“元素”。在字符串中的每个元素占据了字符串的位置。第一个元素的索引为 0，下一个是索引 1，依此类推。字符串的长度是它的元素的数量。

<!--more-->

### 数字类型

根据 ECMAScript 标准，JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值（-(263 -1) 到 263 -1）。它并没有为整数给出一种特定的类型。除了能够表示浮点数外，还有一些带符号的值：+Infinity，-Infinity 和 NaN (非数值，Not-a-Number)。

```js
123; // 正整数
-123; // 负整数
520.1314; // 浮点数
0; // 零
Infinity; // 正无穷
-Infinity; // 负无穷
typeof Infinity; // number
```

### 布尔类型

布尔表示一个逻辑实体，可以有两个值：true 和 false。

```js
2 > 1; // true
[] == []; // false
[] == ![]; // true 这是为什么？
null == undefined; // true
"10" > "3"; // flase 这个啥？
typeof true; // boolean
```

### Null 类型

Null 类型只有一个值： null。

```js
null === null; // true
typeof null; // object 为什么不是 null呢？
```

### Undefined 类型

一个没有被赋值的变量会有个默认值 undefined。

```js
let a; // 我申明我是一个变量 a
typeof a; // undefined 申明未赋值
undefined == undefined; // true
undefined == 0; // false
undefined == null; // true
undefined == ""; // false
```

### 符号类型

符号(Symbols)是 ECMAScript 第 6 版新定义的。符号类型是唯一的并且是不可修改的, 并且也可以用来作为 Object 的 key 的值。

```js
let obj = {};
let symbol1 = Symbol();
let symbol2 = Symbol();

typeof symbol1; // symbol
typeof symbol2; // symbol

symbol1 == symbol2; // false

obj.symbol1 = "hello";
obj[symbol1] = "world";

console.log(obj.symbol1 + " " + obj[symbol1]); // hello world
```

## 引用类型

`引用类型`主是指`Object类型`。

### Object 对象

在计算机科学中, 对象是指内存中的可以被 `标识符`引用的一块区域。

```js
let obj1 = {}; // 对象字面量
let obj2 = new Object(); // 实例化一个对象

typeof obj1; // object
typeof obj2; // object

const person = { author: { name: "布一", wechat: "hxrealm" }, 1: "No.1" };

console.log(person.author.name); // 布一
console.log(person.author.wechat); // hxrealm
console.log(person[1]); // No.1
```

## 类型对比

我们都知道 JavaScript 中有两大数据类型：`基本类型`和`引用类型`，其中`基本类型`主要是把值存储在`栈内存`中，而`引用类型`却是把地址存储在`栈内存`中，把值存储在`堆内存`中，然后将`栈内存`中存储的地址指向`堆内存`中存储的值。

| 基本类型 | 数据结构                                    | 存储位置 |
| -------- | ------------------------------------------- | -------- |
| 基本类型 | 数字、字符串、布尔、Null、Undefined、Symbol | 栈       |
| 引用类型 | 数组、对象、函数                            | 栈、堆   |

### 什么是堆栈？

堆栈是两种数据结构，是一种数据项按序排列的数据结构，只能在一端进行插入和删除操作。堆为队列优先，先进先出（FIFO）。栈为先进后出（FILO）。

### 堆和栈有啥区别？

1. 空间分配

- 堆（操作系统）：一般由程序员分配释放，若程序员不释放，程序结束时可能由 OS 回收，分配方式类似于链表。PS：java 中都是系统 GC，程序员无法进行 GC。
- 栈（操作系统）：由操作系统自动分配释放，存放函数的参数值，局部变量值等。操作方式与数据结构中的栈相类似。

2. 缓存方式

- 堆：使用二级缓存，生命周期与虚拟机的 GC 算法有关（并不是引用为空就立即被 GC），调用速度相对较低。
- 栈：使用一级缓存，被调用时通常处于存储空间中，调用后被立即释放。

3. 数据结构

- 堆（数据结构）：类似于树结构，可以类比于堆排序
- 栈（数据结构）：先进后出（FILO）

## 总结

本篇文章内容主要告诉我们以下几个基本知识点：

1. JavaScript 中有 7 种数据类型，分为两大类：`基本类型`和`引用类型`。
2. 堆和栈的概念和区别，以及 JavaScript 中两大数据类型的存储方式。
3. 抛出了一些数据类型转换时遇到的“奇葩”问题。

针对第 3 点我们将在下一章节中重点讲解。

## 参考资料

- [JavaScript 数据类型和数据结构
  ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
- [操作系统中堆（heap）与栈（stack）的区别](https://www.jianshu.com/p/4cc13cb3aa9a)
