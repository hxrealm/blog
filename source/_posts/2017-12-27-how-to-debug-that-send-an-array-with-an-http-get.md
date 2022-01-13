---
layout: post
title: HTTP请求中GET方法传递数组问题的讲解
cover: /gallery/12.jpg
date: 2017-12-29 22:16
categories: [前端技术]
---

### 背景介绍

在某前后端分离的项目中有一个根据用户的选择（可多选）查询相关记录的需求，后端接口由 Backend(java)提供。接口格式类似如`http://www.domain.com/query?checked=1&checked=2&checked=3`，可知其中 QueryString 的参数为 checked=1&checked=2&checked=3。前端为了实现需求将该字段的 key 定义为 checked，value 定义为 1&checked=2&checked=3 的字符串，生成`{checked: "1&checked=2&checked=3"}`一个对象做为参数，验证结果发现后端不能正常接收到 checked 的参数。

### 关键要点

- 前后端分离的项目采用了接口代理（request、http proxy）
- Backend 接口中定义 checked 为一个枚举类型 (checked)
- 前端数据对象中 key 不要相同，因此只能采用字符串方式

### 过程分析

1、检验 GET 请求参数值

```text
通过断点调试查看业务逻辑处理过程中生成的GET请求参数值为checked=1&checked=2&checked=3
```

<!--more-->

2、检验接口代理层收到 GET 请求参数值

```text
通过断点调试查看接口代理层接收到的GET请求参数值为 checked=1&checked=2&checked=3
```

3、检验接口代理层发送时 GET 请求参数值

```text
通过断点调试查看接口代理层发送时GET请求参数值变为 checked[0]=1&checked[1]=2&checked[2]=3
```

4、检验后端接收 GET 请求参数值

```text
通过与后端联调发现参数接收异常，不能正常解析checked[0]=1&checked[1]=2&checked[2]=3为枚举类型
```

通过以上几个步骤的排查发现 HTTP GET 请求在经过 proxy 时多个相同的键值对(checked)会被解析为不同的数组项，其主要原因是对 QueryString 进行参数解析时引入的 qs 模块会进行相同的键值对转数组项操作。

### 解决方法

- 修改为 POST 请求进行数组参数传递
- 修改为 GET 请求是数组值以逗号等形式分割的字符串传递（checked=1,2,3）
- 后端主动支持对数组项字符串的解析

### 写在最后

此问题在发现到排查以及最终解决花了不少时间，其实主要还是前端和后端人员对 HTTP 协议过程中数据传递的原理理解不同，如果大家能达成一致，快速给出应对方案，此问题将非常容易处理。
