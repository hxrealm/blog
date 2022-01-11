layout: post
title: Javascript实现两个超大数字的相加
comments: true
categories:
  - javascript
  - 面试题
tags: []
author: Hankewins
date: 2015-08-25 00:00:00
---
两个超大数字相加的实现

分析：由于数字类型长度限制，故两个超大数字应为字符串类型。因此两个超大数字相加实则为两个字符串按”加法规则“计算即可，下面是我的几个实现方式：

方法一：

```js
function addTwoNum(str1, str2){
	var carry = 0, 
      l1 = str1.length, 
      l2 = str2.length, 
      arr = [];
    var max = Math.max(l1, l2);
    for (var i = l1 - 1, j = l2 -1, n = max -1 ; n >= 0; n--, i--, j--) {
    	var sum = (+str1[i] || 0) + (+str2[j] || 0) + carry;
        if (sum >= 10) {
        	carry = 1;
            arr.push(sum - 10);
        } else {
        	carry = 0;
            arr.push(sum);
        }
    }
    if (carry > 0) arr.push(carry);
    return arr.reverse().join('');
}
```

方法二：

```js

function addTwoNum(str1, str2){
  var arr1 = str1.split('').reverse();
  var arr2 = str2.split('').reverse();
  var carry = 0, arr = [];
  var max = Math.max(arr1.length, arr2.length);
  var min = Math.min(arr1.length, arr2.length);

  for(var i = 0; i < max; i++){
    var tmp = (+arr1[i] || 0) + (+arr2[i] || 0) + carry;
    if( tmp >= 10){
      carry = 1;
      arr.push(tmp - 10);
    } else {
      carry = 0;
      arr.push(tmp);
    }
  }
  if (carry > 0) arr.push(carry);
  return arr.reverse().join('');
}
```

如果有错误之处，欢迎指正，谢谢！