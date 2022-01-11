---
layout: post
title: 字母数字排序的sortX的实现
date: 2017-06-25 11:10
comments: true
categories: [前端开发]
---

昨天和一个刚刚转前端的朋友聊天时，他说之前面试时有道javascript排序题思路不是很清楚，让我把这道题详细的讲解一下。本文主要是记录我的实现方法，欢迎大家一起讨论，如有更好的方法请给我留言。

题目如下

给定一个只包含大写字母和数字且无重复元素的混合数组，按照以下要求排序

1. 字母按在字母表中的位置和数字从小到大排序
2. 字母优先排在前面

例如：

sortX为该方法，则执行sortX(["1", "A", "B", "4", "E", "C", "6", "7"]);

结果为：["A", "1", "B", "C", "4", "E", "6", "7"]

题目分析

主要是查考对javascript基础知识的综合运用能力，主要考查点：

1. 正则的使用
2. 字符串的操作(split、replace)
3. 数组的操作(join、splice、indexOf、push、sort)

...

方法实现

```js
var arr = ['1', 'A', 'B', '4', 'E', 'C', '6', '7'];
var sortX = function(arr){
	var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var chars = []; // 存放数组中的字母
	// 将字母替换成数字并将数组按从小到大排序
	var sorts = arr.join(',').replace(/([A-Z])/g, function($0, $1){
		var index = letters.indexOf($1);
		chars.push($1);
		return index + 1;
	}).split(',').sort(function(a,b){return a > b;});
	// 将字母替换到排序后的数组中
	for(var i = 0; i < chars.length; i++){
		var index = letters.indexOf(chars[i]) + 1;
		var start = sorts.indexOf(index.toString());
		sorts.splice(start, 1,chars[i]);
	}

	return sorts;
}

console.log(sortX(arr));
// ["A", "1", "B", "C", "4", "E", "6", "7"]
```

本题目可实现的方法很多，以上是我认为相对简单的一种实现方法，若你有更好的方法，欢迎给我留言^_^。


