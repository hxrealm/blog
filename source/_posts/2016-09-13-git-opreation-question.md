---
layout: post
title: git 常用操作命令
cover: /gallery/33.jpg
date: 2016-09-13 21:45
categories: [工作随记]
---

### 一、基本命令

查看版本号

```bash
git version
```

查看帮助

```bash
git help // git or git --help 都可以查看git用法
```

<!--more-->

### 二、新建本地仓库或 clone 远程仓库

初始化操作

```bash
mkdir <new project> // 创建空项目文件夹
cd new-project
git init
```

从远程主机克隆一个版本库

```bash
git clone <版本库的网址> // clone下来的，默认是master分支
```

设置提交者和邮箱

```bash
git config user.name "提交者"
git config user.email "test@admin.com"
```

注：如果需要全局设置 git 相关用户配置信息可以使用 git config --global user.xxx

### 三、更新至仓库

拉取最新代码

```bash
git pull <版本库的分支> // git pull origin master
```

添加修改的内容到本地缓存

```bash
git add . // 也可以指定文件或目录
```

提交修改的内容到本地仓库

```bash
git commit -m '提交内容日志'
```

更新修改的内容至远程仓库

```bash
git push <版本库的分支> // git push origin master
```

### 四、管理仓库分支

新建本地分支

```bash
git branch <new branch>
```

在指定分支下新建本地分支

```bash
git checkout -b <new branch> <specified branch>
```

删除本地分支

```bash
git branch -d <branch>
```

删除本地分支的引用

```bash
git fetch -p
```

注：一个远程分支被删除了，可是本地还存在其对应的分支引用，可以通过 git fetch -p 删除

删除远程分支

```bash
git branch -r -d <branch>
```

删除远程分支

```bash
git push origin :branch-name
```

注意：冒号前面的空格不能少，原理是把一个空分支 push 到 server 上，相当于删除该分支。

合并分支

```bash
git merge <branch> // 当前分支合并指定分支
```

撤消添加操作

```bash
// 撤消添加的指定文件
$ git reset filename
// 撤消所有添加的操作
$ git reset HEAD .
```

取消本地 commit 的文件

```bash
git log // 查看日志，并获取需回滚的节点ID:commit_id
git reset --hard commit_id
```

注：commit_id 为需要回滚到的日志 ID

当前分支获取另一个分支提交的记录

```bash
// 获取分支branch1的提交记录Id
$ git checkout branch1
// commit 809d95ea1c3d17ed6ba8e25ae2abe15b0f3e737f
$ git log

// 在分支branch2中重新提交分支branch1中获取的commitId
$ git checkout branch2
$ git cherry-pick 809d95ea1c3d17ed6ba8e25ae2abe15b0f3e737f
```

注意：如果提示获取失败（冲突），请按正常处理流程安排。
