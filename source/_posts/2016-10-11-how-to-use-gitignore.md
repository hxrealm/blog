---
layout: post
title: .gitignore 设置无效，不能过滤指定文件
cover: /gallery/28.jpg
date: 2016-10-11 23:50
categories: [工作随记]
tags: 
  - Git
---

通常我们都会利用.gitignore 过滤一些特定的文件，例如：系统产生的文件、编译过程中产生的中间文件以及特定的脚本文件（`.idea`、`.DS_store`、`node_modules`、`xx.sh`）等等，这些文件不需要被追踪管理。

### 遇到的问题

在`.gitignore`中添加`xx.sh`文件，以过滤该文件，但是通过`git status`查看仍显示`xx.sh`文件的状态。

### 产生的原因

在`git`库中已存在了这个文件，之前 push 提交过该文件。

注：`.gitignore`文件只对还没有加入版本管理的文件起作用，如果之前已经用`git`把这些文件纳入了版本库，就不起作用了

### 解决的办法

在`git`库中删除该文件，并更新。再次用`git status`命令查看状态，`xx.sh`文件不再显示状态。

注：若该删除的文件为特殊文件，请注意备份。
