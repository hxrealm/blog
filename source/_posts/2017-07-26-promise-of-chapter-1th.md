---
layout: post
title: 深入浅出 ES6 Promise （一）
cover: /gallery/4.jpg
date: 2017-07-26 10:58

categories: [前端技术]
---

最近这几年随着移动互联网的快速发展，前端的开发模式已悄悄地从多页面混合开发模式到单页面前后端分离开发模式的转变，基于 MVVM 模式的前端框架得到了繁荣发展。它们主要是[knockoutjs](http://knockoutjs.com/)、[reactjs](https://facebook.github.io/react/)、[angularjs](https://angular.io/)、[vuejs](https://vuejs.org/)等，其中[尤雨溪](https://baike.baidu.com/item/%E5%B0%A4%E9%9B%A8%E6%BA%AA/2281470?fr=aladdin)开发的[vuejs](https://vuejs.org/)框架在国内得到开发者的认可和支持。

基于 MVVM 模式开发的框架能得到快速的发展主要得益于 2015 年 6 月份 ES2015 的正式发布（也就是 ES6），其中 Promise 被列为正式规范，作为 ES6 中最重要的特性之一，我们有必要掌握并理解透彻。本文将由浅到深，讲解 Promise 的基本概念与使用方法。

<!--more-->

## 基本概念

**Promise** 对象用于一个异步操作的最终完成（或失败）及其结果值的表示。(简单点说就是处理异步请求。。我们经常会做些承诺，如果我赢了你就嫁给我，如果输了我就嫁给你之类的诺言。这就是 promise 的中文含义。一个诺言，一个成功，一个失败。)

## 常用方法

- [Promise.all()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Promise.prototype.catch()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
- [Promise.prototype.then()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
- [Promise.race()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [Promise.reject()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)
- [Promise.resolve()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

## 新手入门

- 控制台中查看 Promise 真身

```js
console.log(Promise);
```

可知：Promise 是一个构造函数，有 all、race、reject、resolve 四个静态方法以及 then 和 catch 两个公共方法。

- 实例化一个 Promise 对象

```js
var p1 = new Promise(function (resolve, reject) {
  //做一些异步操作
  setTimeout(function () {
    console.log("异步中执行完成");
    resolve("异步中传递数据");
  }, 1000);
});
```

可知：Promise 的构造函数接受一个 executor 参数，executor 是一个带有 resolve 和 reject 两个参数的函数。executor 函数在 Promise 构造函数执行时同步执行，被传递 resolve 和 reject 函数（executor 函数在 Promise 构造函数返回新建对象前被调用）。resolve 和 reject 函数被调用时，分别将 promise 的状态改为 fulfilled(完成)或 rejected（失败）。executor 内部通常会执行一些异步操作，一旦完成，可以调用 resolve 函数来将 promise 状态改成 fulfilled，或者在发生错误时将它的状态改为 rejected。
如果在 executor 函数中抛出一个错误，那么该 promise 状态为 rejected。executor 函数的返回值被忽略。

在上面的代码中，我们执行了一个异步操作，也就是 setTimeout，1 秒后，输出“异步中执行完成”，并且调用 resolve 方法。

- then() 方法的使用

步骤 2 中我们实例化了一个 Promise 对象 p1 并且我们在 setTimeout 执行中调用了 resolve 方法，重置了 Promise 状态为 resolved。

如何调用 then() 方法？

```js
p1.then(
  function (data) {
    // resolve状态
    console.log(data); // 异步中传递数据
  },
  function (data) {
    // reject状态，仅在Promise异步执行中调用reject方法后重置Promise状态为rejected时生效
  }
);
```

可知：then() 方法主要接受 resolve 和 reject 参数，且两个参数都是函数。仅当 Promise 状态为 resolved 时调用 reslove 函数，状态为 rejected 时调用 reject 函数

- catch() 方法的使用

catch() 方法返回一个 Promise，只处理拒绝的情况。它的行为与调用 Promise.prototype.then(undefined, onRejected) 相同。但 catch() 方法可以捕获异常错误，因此 catch() 方法主要用做捕获抛出的错误。

如何调用 catch() 方法呢？

```js
p1.catch(function (reason) {
  // 拒绝
});
```

可知：catch() 方法接受 reason 参数，如果 onRejected 抛出一个错误或返回一个失败的 Promise，Promise 通过 catch() 返回失败结果；否则，它将显示为成功。

示例：

使用链式语句的 catch 方法

```js
var p1 = new Promise(function (resolve, reject) {
  resolve("Success");
});

p1.then(function (value) {
  console.log(value); // "成功!"
  throw "oh, no!";
})
  .catch(function (e) {
    console.log(e); // "oh, no!"
  })
  .then(
    function () {
      console.log("after a catch the chain is restored");
    },
    function () {
      console.log("Not fired due to the catch");
    }
  );

// 以下行为与上述相同
p1.then(function (value) {
  console.log(value); // "成功!"
  return Promise.reject("oh, no!");
})
  .catch(function (e) {
    console.log(e); // "oh, no!"
  })
  .then(
    function () {
      console.log("after a catch the chain is restored");
    },
    function () {
      console.log("Not fired due to the catch");
    }
  );
```

捕获抛出的错误

```js
// 抛出一个错误，大多数时候将调用catch方法
var p1 = new Promise(function (resolve, reject) {
  throw "Uh-oh!";
});

p1.catch(function (e) {
  console.log(e); // "Uh-oh!"
});
```

- all() 方法的使用

Promise.all(iterable) 方法提供了并行执行异步操作的能力，当所有在可迭代参数中的 promises 已完成，或者第一个传递的 promise（指 reject）失败时，返回 promise。

```js
var p1 = new Promise(function (resolve, reject) {
  // 异步操作
  setTimeout(function () {
    resolve("传递数据01");
  }, 1000);
});

var p2 = new Promise(function (resolve, reject) {
  // 异步操作
  setTimeout(function () {
    resolve("传递数据02");
  }, 1000);
});

var p3 = new Promise(function (resolve, reject) {
  // 异步操作
  setTimeout(function () {
    resolve("传递数据03");
  }, 1000);
});

// 全部resolved状态
Promise.all([p1, p2, p3]).then(function (values) {
  console.log(values); // ["传递数据01", "传递数据02", "传递数据03"]
});

// p2,p3异步操作时调用reject() 方法
// 则返回第一个rejected状态的Promise
Promise.all([p1, p2, p3]).catch(function (values) {
  console.log(values); // "传递数据02"
});
```

可知：Promise.all() 方法接受一个数组参数，数组参数中的每一项都是一个 Promise 对象。执行过程中如果有任何一项是 rejected 状态则返回当前项 Promise 否则全部 resloved 状态后返回 Promise。

- race() 方法的使用

race 函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。

```js
var p1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

Promise.race([p1, p2]).then(function (value) {
  console.log(value); // "two"
  // 两个都完成，但 p2 更快
});
```

- reject() 方法的使用

静态函数 Promise.reject 返回一个被拒绝的 Promise。使用是 Error 实例的 reason 对调试和选择性错误捕捉很有帮助。

```js
Promise.reject("Testing static reject").then(
  function (reason) {
    // 未被调用
  },
  function (reason) {
    console.log(reason); // "测试静态拒绝"
  }
);

Promise.reject(new Error("fail")).then(
  function (error) {
    // 未被调用
  },
  function (error) {
    console.log(error); // 堆栈跟踪
  }
);
```

- resolve() 方法的使用

Promise.resolve(value)方法返回一个以给定值解析后的 Promise 对象。但如果这个值是个 thenable（即带有 then 方法），返回的 promise 会“跟随”这个 thenable 的对象，采用它的最终状态（指 resolved/rejected/pending/settled）；否则以该值为成功状态返回 promise 对象。

使用静态方法 Promise.resolve

```js
Promise.resolve("Success").then(
  function (value) {
    console.log(value); // "Success"
  },
  function (value) {
    // 不会被调用
  }
);
```

对一个数组进行 resolve

```js
var p = Promise.resolve([1, 2, 3]);
p.then(function (v) {
  console.log(v[0]); // 1
});
```

Resolve 另一个 promise 对象

```js
var original = Promise.resolve(true);
var cast = Promise.resolve(original);
cast.then(function (v) {
  console.log(v); // true
});
```

resolve thenable 的对象们并抛出错误

```js
// Resolve一个thenable对象
var p1 = Promise.resolve({
  then: function (onFulfill, onReject) {
    onFulfill("fulfilled!");
  },
});
console.log(p1 instanceof Promise); // true, 这是一个Promise对象

p1.then(
  function (v) {
    console.log(v); // 输出"fulfilled!"
  },
  function (e) {
    // 不会被调用
  }
);

// Thenable在callback之前抛出异常
// Promise rejects
var thenable = {
  then: function (resolve) {
    throw new TypeError("Throwing");
    resolve("Resolving");
  },
};

var p2 = Promise.resolve(thenable);
p2.then(
  function (v) {
    // 不会被调用
  },
  function (e) {
    console.log(e); // TypeError: Throwing
  }
);

// Thenable在callback之后抛出异常
// Promise resolves
var thenable = {
  then: function (resolve) {
    resolve("Resolving");
    throw new TypeError("Throwing");
  },
};

var p3 = Promise.resolve(thenable);
p3.then(
  function (v) {
    console.log(v); // 输出"Resolving"
  },
  function (e) {
    // 不会被调用
  }
);
```

## 总结

本篇文章主要是简单的介绍了 Promise 概念以及 Promise 常用方法的使用。文中所有异步操作均以 setTimeout 为例子，之所以不使用 ajax 是为了避免引起混淆，因为谈起 ajax，很多人的第一反应就是 jquery 的 ajax，而 jquery 又有自己的 Promise 实现。如果你理解了原理，就知道使用 setTimeout 和使用 ajax 是一样的意思。

接下来还会有深入浅出 ES6 Promise 讲解系列：

- Promise 使用以及运用场景
- Promise/A+规范
- 搞懂 jQuery 中的 Promise
- 搞懂 Promise、Generator、Async 三者的异同
- Promise 面试问题讲解

## 参考

- [Promises/A](http://wiki.commonjs.org/wiki/Promises/A)
- [Promises/A+](https://promisesaplus.com/)
- [Promises/A+规范](http://www.ituring.com.cn/article/66566)
- [Promise 对象/阮一峰](http://javascript.ruanyifeng.com/advanced/promise.html)
- [Promise 对象/MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [面试中 Promise 相关问题](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/event-async.md#promise)
