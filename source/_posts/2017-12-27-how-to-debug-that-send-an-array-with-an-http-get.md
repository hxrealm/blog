---
layout: post
title: HTTP请求中GET方法传递数组问题的讲解
date: 2017-12-29 22:16
comments: true
categories: [前端开发]
---

### 背景介绍

在某前后端分离的项目中有一个根据用户的选择（可多选）查询相关记录的需求，后端接口由Backend(java)提供。接口格式类似如**http://www.domain.com/query?checked=1&checked=2&checked=3**，可知其中QueryString的参数为checked=1&checked=2&checked=3。前端为了实现需求将该字段的key定义为checked，value定义为1&cheked=2&checked=3的字符串，生成**{checked: "1&checked=2&checked=3"}**的一个对象做为参数，验证结果发现后端不能正常接收到checked<List>的参数。

### 关键要点

- 前后端分离的项目采用了接口代理（requrest、http proxy）
- Backend接口中定义checked为一个枚举类型 (checked<List>)
- 前端数据对象中key不要相同，因此只能采用字符串方式

### 过程分析


1、检验GET请求参数值

```
通过断点调试查看业务逻辑处理过程中生成的GET请求参数值为checked=1&checked=2&checked=3
```

2、检验接口代理层收到GET请求参数值

```
通过断点调试查看接口代理层接收到的GET请求参数值为checked=1&checked=2&checked=3
```

3、检验接口代理层发送时GET请求参数值

```
通过断点调试查看接口代理层发送时GET请求参数值变为checked[0]=1&checked[1]=2&checked[2]=3
```

4、检验后端接收GET请求参数值

```
通过与后端联调发现参数接收异常，不能正常解析checked[0]=1&checked[1]=2&checked[2]=3为枚举类型
```

通过以上几个步骤的排查发现HTTP GET请求在经过proxy时多个相同的键值对(checked)会被解析为不同的数组项，其主要原因是对QueryString进行参数解析时引入的qs模块会进行相同的键值对转数组项操作。

### 解决方法

- 修改为POST请求进行数组参数传递
- 修改为GET请求是数组值以逗号等形式分割的字符串传递（checked=1,2,3）
- 后端主动支持对数组项字符串的解析

### 写在最后

此问题在发现到排查以及最终解决花了不少时间，其实主要还是前端和后端人员对HTTP协议过程中数据传递的原理理解不同，如果大家能达成一致，快速给出应对方案，此问题将非常容易处理。

