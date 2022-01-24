---
title: 【系列】JavaScript 面试中常见的隐式类型转换
cover: /gallery/2.jpg
thumbnail: /gallery/2.jpg
tags:
  - javascript
categories:
  - 前端技术
date: 2019-02-11 10:32:00
---

通过阅读前面几期的内容，我们已经知道了 JavaScript 中的数据类型以及其在运算时进行隐式转换过程。

本期我们将重点分析一下面试过程中常见的隐式类型转换的面试题。

## 1. 加号操作

请输出代码运行的结果并说明原理？

```js
console.log(1 + undefined);
console.log(1 + null);
console.log(1 + true);
console.log("hello" + 123);
```

分析：通过加号运算符进行运算，存在两种情况，第一种是字符串与加号运算符组成字符串连接操作，第二种是非字符串与加号运算符组成算术运算操作（需要将对应项转换成 Number 类型后进行操作）

答案：

```js
console.log(1 + undefined); // NaN
console.log(1 + null); // 1
console.log(1 + true); // 2
console.log("hello" + 123); // 'hello123'
```

<!--more-->

## 2. 字符串间的比较

请输出代码运行的结果并说明原理？

```js
console.log("a" > "b");
console.log("abc" > "abe");
console.log("10" > "2");
console.log("hello" > "world");
```

分析：字符串的比较是按位进行，将对应位的字符转换成 ASCII 码的值进行大小比较。

举个例子：

```js
console.log("10" > "2"); // false
// 等同于
console.log("1".charCodeAt()); // 49
console.log("2".charCodeAt()); // 50
console.log("1".charCodeAt() > "2".charCodeAt()); // 49 > 50
```

答案：

```js
console.log("a" > "b"); // true
console.log("abc" > "abe"); // false
console.log("10" > "2"); // false
console.log("hello" > "world"); // false
```

## 3. 引用类型之间的比较

请输出代码运行的结果并说明原理？

```js
console.log([] == []);
console.log([] == ![]);
console.log({} == {});
```

分析：引用类型之间的比较会直接调用 valueOf()返回的值进行比较，如果返回值是基本类型则转换成 number 类型进行比较，否则判断返回值的引用地址是否一致，如果一致收相等否则不相等。

举个例子：

```js
console.log([] == ![]); // 为什么[] == ![]会为true呢？
// 等同于
//第一步![]转成Boolean类型
console.log([] == !Boolean([])); // [] == false
// 第二步转成Number类型再进行关系运算
console.log(Number([]) == Number(false)); // 0 == 0
```

答案：

```js
console.log([] == []); // false
console.log([] == ![]); // true
console.log({} == {}); // false
```

## 4. 逻辑非以及其关系运算

请输出代码运行的结果并说明原理？

```js
// 布尔值判断
console.log(!![]);
console.log(!!{});
console.log(!!"hello");
console.log(!!123);
console.log(!!-123);
console.log(!!0);
console.log(!!"");
console.log(!!null);
console.log(!!undefined);
// 关系运算
console.log(1 == true);
console.log(1 > null);
console.log(1 > undefined);
```

分析：在 JavaScript 中逻辑非会调用 Boolean 转换，但是在关系运算过程中会将值转换成 Number 类型再进行比较。

答案：

```js
// 布尔值判断
console.log(!![]); // true
console.log(!!{}); // true
console.log(!!"hello"); // true
console.log(!!123); // true
console.log(!!-123); // true
console.log(!!0); // false
console.log(!!""); // false
console.log(!!null); // false
console.log(!!undefined); // false
// 关系运算
console.log(1 == true); // true
console.log(1 > null); // true
console.log(1 > undefined); // true
```

## 5. 浮点数相加

请输出代码运行的结果并说明原理？

```js
console.log(0.1 + 0.2);
```

分析：这是一个浮点数计算精度问题，在 JavaScript 中只有一个数字类型 number，而 number 使用的是**IEEE 754**双精度浮点格式。详细的分析请见下期专题分析。

答案：

```js
console.log(0.1 + 0.2); // 结果是 0.30000000000000004，而不是 0.3
```

## 6. 特殊情况

请输出代码运行的结果并说明原理？

```js
console.log(null == undefined);
console.log(null == 0);
console.log(null == "");
console.log(null == NaN);
console.log(undefined == 0);
console.log(undefined == "");
console.log(undefined == NaN);
console.log(NaN == 0);
console.log(NaN == "");
console.log(NaN == NaN);
console.log(0 == "");
```

分析：主要是考查对 JavaScript 中原始值的理解。

- null 特指对象的值未设置
- undefined 指一个原始值自动分配给刚刚声明的变量或没有实际参数的形式参数
- NaN 是（Not a Number）的缩写，当一个值不能被 Number 转换时返回 NaN，NaN 不等于任何值
- 0 是原始值为 0 的数字
- ''是原始值为空的字符串

答案：

```js
console.log(null == undefined); // true
console.log(null == 0); // false
console.log(null == ""); // false
console.log(null == NaN); // false
console.log(undefined == 0); // false
console.log(undefined == ""); // false
console.log(undefined == NaN); // false
console.log(NaN == 0); // false
console.log(NaN == ""); // false
console.log(NaN == NaN); // false
console.log(0 == ""); // true
```

以上内容虽然有进行验证，但不知道描述上是否存在歧义，有些点表述的不是很清楚，望谅解。

如果有发现任何问题或者有更好的建议，欢迎直接给我留言。
