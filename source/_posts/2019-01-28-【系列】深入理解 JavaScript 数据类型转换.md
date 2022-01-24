---
title: 【系列】深入理解 JavaScript 数据类型转换
cover: /gallery/3.jpg
thumbnail: /gallery/3.jpg
tags:
  - javaScript
categories:
  [技术随记]
date: 2019-01-28 21:35:00
---

上一期中我们主要是了解了 JavaScript 中存在两大数据类型：`基本类型`和`引用类型`以及其存储的方式（堆和栈）。

本期我们将重点谈谈 JavaScript 数据类型转换过程出现的各种“奇葩”的问题。

## 写在前面

在 JavaScript 中当运算符在运算时，如果两边数据不统一，CPU 就无法计算，这时我们编译器会自动将运算符两边的数据做一个数据类型转换，转成一样的数据类型再计算，这种无需程序员手动转换，而由编译器自动转换的方式就称为**隐式转换**。

在 JavaScript 中“一切皆是对象”，在我们具体了解隐式转换前先了解一下对象的两个方法：`toString()`和`valueOf()`。

## toString()

toString() 方法返回一个表示该对象的字符串。

<!--more-->

```js
// 数字转字符串
(123)
  .toString()(
    // '123'
    // 布尔值转字符串
    true
  )
  .toString() // 'true'
  [
    // 数组转字符串
    ("hello", "world")
  ].toString()(
    // 'hello,world'
    // 对象转字符串
    { name: "hello world" }
  )
  .toString(); // '[object Object]'
//日期对象转字符串
Date().toString(); // 'Wed Jan 23 2019 21:10:42 GMT+0800 (China Standard Time)'
//JSON对象转字符串
JSON.toString(); // '[object JSON]'
// Function转字符串
Function.toString()(
  // 'function Function() { [native code] }'
  // 函数转字符串
  function () {
    return 1;
  }
).toString(); // 'function () { return 1; }'
```

## valueOf()

valueOf() 方法返回指定对象的原始值。

> JavaScript 调用 valueOf 方法将对象转换为原始值。你很少需要自己调用 valueOf 方法；当遇到要预期的原始值的对象时，JavaScript 会自动调用它。

> 默认情况下，valueOf 方法由 Object 后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则 valueOf 将返回对象本身。

> JavaScript 的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的 valueOf()方法的返回值和返回值类型均可能不同。

```js
// 数字的原始值
(123)
  .valueOf()(
    // 123
    // 布尔值的原始值
    true
  )
  .valueOf() // true
  [
    // 数组的原始值
    ("hello", "world")
  ].valueOf()(
    // [ 'hello', 'world' ]
    // 对象的原始值
    { name: "hello world" }
  )
  .valueOf(); // { name: 'hello world' }
//日期对象的原始值
Date().valueOf(); // 'Wed Jan 23 2019 21:10:42 GMT+0800 (China Standard Time)'
//JSON的原始值
JSON.valueOf(); // 'Object [JSON] {}'
// Function的原始值
Function.valueOf()(
  // '[Function: Function]'
  // 函数的原始值
  function func() {
    return 1;
  }
).valueOf(); // '[Function: func]'
```

## 隐式转换规则

1. 转成 string 类型：+（字符串连接符）
2. 转成 number 类型：++/--(自增或自减运算符)、+ - \* / % (算术运算符)、> < >= <= == != === !== (关系运算符)
3. 转成 boolean 类型：！（逻辑非运算符）

## 字符串 VS 加号连接符

字符串 + 基本类型 = 字符串 + String(基本类型)

```js
// 字符串 + 数字
console.log("hello" + 123); // 'hello' + '123'
// 字符串 + 布尔
console.log("hello" + true); // 'hello' + 'true'
// 字符串 + null
console.log("hello" + null); // 'hello' + 'null'
// 字符串 + undefined
console.log("hello" + undefined); // 'hello' + 'undefined'
```

### 数字 VS 加号连接符

数字 + 基本类型（非字符串） = 数字类型 + Number(基本类型)

```js
// 数字 + 布尔
console.log(1 + true); // 2
// 等同于
console.log(1 + Number(true)); // 1 + 1
// 数字 + undefined
console.log(1 + undefined); // NaN
// 等同于
console.log(1 + Number(undefined)); // 1 + NaN
// 数字 + null
console.log(1 + null); // 1
// 等同于
console.log(1 + Number(null)); // 1 + 0
```

数字 + 引用类型 = 数字 + 引用类型.toString()

```js
// 数字 + 数组
console.log(1 + []); // '1'
// 等同于
console.log(1 + [].toString()); // 1 + '' = '1'
// 数字 + 对象
console.log(1 + {}); // '1[object Object]'
// 等同于
console.log(1 + {}.toString()); // 1 + '[object Object]'
```

数字类型 + 函数 = 数字类型 + String(函数)

```js
// 数字 + 函数
var func = function () {
  var a = 2;
  return 2;
};
console.log(1 + func); // 1function () {var a = 2;  return 2;}
```

## 关系运算符的隐式转换

规则：将其他数据类型转换成数字类型之后再比较关系

```js
// 字符串 vs 数字 = Number(字符串) vs 数字
console.log("2" > 10); // flase
// 等同于
console.log(Number("2") > 10); // 2 > 10
// 字符串（数字） vs 字符串（数字） = ASCII码（对应值） vs ASCII码（对应值）
console.log("2" > "10"); // true
// 等同于
console.log("2".charCodeAt() > "10".charCodeAt); // 50 > 49
// 字符串（字母） vs 字符串（字母） = ASCII码（对应值） vs ASCII码（对应值）
console.log("abc" > "b"); // false
// 等同于
console.log("abc".charCodeAt() > "b".charCodeAt()); // 97 > 98
// NaN 不等于 NaN
console.log(NaN == NaN); // false
// undefined vs null
console.log(undefined == null); // true
//注意：undefined == null 不等同于
console.log(Number(undefined) == Number(null)); // false NaN == 0
// 这里JavaScript的特殊约定的结果，undefined == null,详情可以查看更多资料
// https://codeburst.io/javascript-null-vs-undefined-20f955215a2
```

## 逻辑非与关系运算符的隐式转换

```js
// 数字 vs 数组 = 数字 vs Number(数组)
console.log([] == 0); // true
// 等同于
console.log(Number([]) == 0); // 0 == 0
// 数字 vs 布尔 = 数字 vs Number(布尔)
console.log(![] == 0); //true
// 等同于
console.log(Number(![]) == 0); // Number(false) == 0
// 引用类型 != 引用类型
console.log([] == []); // false
// 逻辑非隐式转换
console.log([] == ![]); // true
// 等同于
console.log(Number([]) == Number(!Boolean([]))); // 0 == 0
// 逻辑非隐式转换
console.log({} == !{}); // false
// 等同于
console.log(Number({}) == Number(!Boolean({}))); // NaN == 0
```

## 引用类型的隐式转换

规则：

1. 当引用类型的 valueOf()调用时返回的值是一个基本类型时，则直接进行运算。
2. 当引用类型的 valueOf()调用时返回的值不是一个基本类型时，则引用类型的 toString()将会被调用并返回转换后的字符串，然后再进行运算。

```js
// 字符串 + 数组
console.log("hello" + []); // 'hello' + [].toString()
// 等同于
console.log("hello" + [].toString()); // 'hello' + ''
// 字符串 + 对象
console.log("hello" + {}); // 'hello[object Object]'
// 等同于
console.log("hello" + {}.toString()); // 'hello' + '[object Object]'
```

案例一：

目的：验证非自定义对象的隐式转换过程

```js
// 申明一个对象obj1
var obj1 = { age: 18 };
console.log(10 + obj1); // '10[object Object]'
```

第一步：判断对象的 valueOf()返回值是否是基本类型

```js
console.log(obj1.valueOf()); // { age: 18 }
console.log(typeof obj1.valueOf()); // object 返回的是一个对象
```

第二步：调用对象的 toString()返回一个表示该对象的字符串

```js
console.log(obj1.toString()); // '[object Object]'
```

第三步：根据运算规则进行运算（非字符连接操作都转换成 Number 进行运算）

```js
// 因为obj1.toString() 返回的是字符串，所以进行字符串连接操作
console.log(10 + obj1.toString()); // 10 + '[object Object]'
```

案例二：

目的：通过自定义对象的 valueOf()和 toString()，来验证对象的隐式转换过程

```js
// 申明一个对象obj2
var obj2 = {
    age: 18
    toString: function() {
        return '' + this.age;
    },
    valueOf: function() {
        return this.age;
    }
}
console.log(10 + obj2) // 10 + 18 = 28
```

第一步：判断对象的 valueOf()返回值是否是基本类型

```js
console.log(obj2.toString()); // '18'
console.log(typeof obj2.toString()); // string
console.log(obj2.valueOf()); // 18
console.log(typeof obj2.valueOf()); // number
```

第二步：如果第一步能正确返回基本类型，则直接跳到第三步，否则将调用对象的 toString()返回一个表示该对象的字符串

```js
// 如果对象的valueOf()返回的是基本类型
console.log(10 + obj2); // 10 + obj2.valueOf()
// 如果对象的valueOf()返回的是引用类型
console.log(10 + obj2); // 10 + obj2.toString()
```

第三步：根据运算规则进行运算（非字符连接操作都转换成 Number 进行运算）

```js
// 如果obj2的返回值是字符串，都进行字符串 VS 加号规则
console.log(10 + "18"); // 10 + String(obj2)
// 如果obj2的返回值是非字符串，都进行数字 VS 加号规则
console.log(10 + obj2); // 10 + Number(obj2)
```

## 特殊说明

JavaScript 中存在几个特殊的原始值：null、undefined、''、0、NaN。

```js
console.log(typeof null); // object
console.log(null instanceof Object); // false
console.log(NaN == NaN); // false
console.log(null == undefined); // true
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(0 == ""); // true
console.log(0 == "     "); // true
console.log("" != " "); //true
console.log(null != 0); // true
console.log(undefined != 0); // true
```

## 写在最后

通过上面对 JavaScript 中的数据类型的隐式转换可以总结出以下结论：

1. JavaScript 中运算符在运算时，最终都将转换成相同类型进行运算（字符串类型、数字类型）
2. 字符串与加号连接符运算时转换成 String 类型
3. 非字符串加号连接符的运算都将转换成 Number 类型
4. 特别注意引用类型的隐式转换是先判断 valueOf()返回的类型，如果返回是引用类型则调用 toString()返回对应的字符串值，最终都是按照 1，2，3 的规则进行运算。

以上内容虽然有进行验证，但不知道描述上是否存在歧义，有些点表述的不是很清楚，望谅解。

如果有发现任何问题或者有更好的建议，欢迎直接给我留言。
