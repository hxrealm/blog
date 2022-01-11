---
title: 你一定知道的Git分支模型
author: Alan Yi
tags:
  - 'Git, Git Flow, 版本控制, 版本管理'
categories:
  - 工具
date: 2018-06-06 21:57:00
---
本文不是一篇Git入门指南也不是对Git命令行使用技巧的讲解，而是谈谈作者在过往工作中使用的几种代码版本管理工具的一些体会，同时重点讲解一下Git的分支模型。

注：本文中涉及到的图片均来源于互联网。

## 背景

谈论到代码版本控制，相信大家在项目开发过程中或多或少都有使用过SVN和Git。对代码的更新、提交、合并等操作都非常的熟悉，但是许多人对如何在项目中选择适合的代码管理工具以及对应的工作流却不是很清楚。

最近刚好在团队内组织了一次以”一个成功的Git分支模型“为主题的分享活动，旨在同大家一起回顾一下过往项目中使用几种代码版本管理的经历及体会，并以此来讨论Git分支模型的适用场景，现将PPT中主要内容进行梳理，以内容输出的方式供大家了解。

## 版本管理工具

项目开发过程中大家可能使用比较多的版本管理工具有：*VisualSVN、TortoiseSVN、Bazzar、Mercurial、Git、Bitkeeper*等等。

其中*VisualSVN、TortoiseSVN、Bazzar*为集中式版本控制系统，*Mercurial、Git、Bitkeeper*为分布式版本控制系统。

**集中式VS分布式版本控制**

**集中式版本控制的优点**在于可以对具体的文件或目录进行权限控制，**缺点**在于通过与中心服务器连接执行所有操作，必须联网。

**分布式版本控制的优点**具体如下：

1. 分支管理
2. 安全性更高（因为每个客户机本地都有保留完整的版本库）
3. 离线工作，操作便捷（不联网也能照常工作）
4. 可以实现非常灵活的工作流组合（后面有介绍Git工作流）

**分布式版本控制的缺点**由于分布式的特性，很难对版本库中具体的文件或者目录做精细的权限控制。

到这里相信大家已经对版本控制工具有了一个大致的了解，下面让我们一起来看看本文的重点内容 — Git分支模型。

<!--more-->

首先，让我们先了解一下

## Git是什么？

Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。

其次，让我们知道

## 有哪些Git代码托管平台？

国内常见的Git代码托管平台有码云（Gitee）、码市（Coding）等，国外常见的代码托管平台有Github、Bitbucket、Gitlab、VSTS等。

最后，让我们一起来看看

## 有哪些Git工作流？

- *Centralized* (集中式工作流)
- *Feature Branch* （功能分支工作流）
- *Gitflow* （Gitflow工作流）
- *Fork* （Fork工作流）

## 集中式工作流

*集中式工作流（Centralized）*是以中央仓库作为项目所有修改的单点实体。所有新功能的开发都是基于一个叫*master*分支进行。

![diagram 00](http://cdn.hxrealm.com/uploads/blog/images/00.svg)

举个例子：

1、小明开始开发新功能

![diagram 01](http://cdn.hxrealm.com/uploads/blog/images/01.svg)

2、小红开始开发新功能

![diagram 02](http://cdn.hxrealm.com/uploads/blog/images/02.svg)

3、小明完成新功能开发，并提交到master分支

![diagram 03](http://cdn.hxrealm.com/uploads/blog/images/03.svg)

4、小红完成新功能开发，并提交到master分支，此时提示与小明的内容产生冲突，小红提交不了代码，现在很苦恼！

![diagram 04](http://cdn.hxrealm.com/uploads/blog/images/04.svg)

5、小强发现并及时的帮助小红*rebase*了本地的*master*分支获取了最新代码

![diagram 05](http://cdn.hxrealm.com/uploads/blog/images/05.svg)

```bash
git pull --rebase origin master
```

6、在小强的帮助下，小红也可以提交新功能开发到master分支

![diagram 06](http://cdn.hxrealm.com/uploads/blog/images/06.svg)

```bash
git push origin master
```

*在这件事之后小红和小明的关系越走越远，跟小强的人际关系越走越近。*

*功能分支工作流*

该工作流中每个用户都基于master分支创建一个新的功能分支，相比于集中式工作流会更加的安全以及产生更低的冲突率。

基于*master*分支

```bash
git checkout master
git fetch origin 
git reset --hard origin/master
```

创建新分支

```bash
git checkout -b new-feature master
```

举个例子：

小强和小红在同一个项目组，现在合作开发一个项目，项目的主分支为*master*。

小红创建一个新分支

![diagram 07](http://cdn.hxrealm.com/uploads/blog/images/07.svg)

```bash
git checkout -b xh-feature master
```

中午到了，小红提交了本地的修改信息并通知到小强后去吃午饭

![diagram 08](http://cdn.hxrealm.com/uploads/blog/images/08.svg)

```bash
git add .
git commit -m 'add commit'
git push origin xh-feature
```

午饭过后，小红合并了新分支到master并提交至远程仓库

![diagram 09](http://cdn.hxrealm.com/uploads/blog/images/09.svg)

```bash
git checkout master
git merge xh-feature
git push origin master
```

下午小强获取小红的代码后发现其开发的功能需求不对，通知小红更新

![diagram 09](http://cdn.hxrealm.com/uploads/blog/images/10.svg)

小红重新修改功能需求后，提交修改并发布

![diagram 11](http://cdn.hxrealm.com/uploads/blog/images/11.svg)

### Fork工作流

该工作流不同于其他类型的工作流，它主要是通过在第三方代码托管平台上进行Fork一个开源项目到自己的仓库中。与clone方式不同，clone主要是对目标仓库数据的一次拷贝。

### Git Flow 工作流

Git Flow 工作流仍然用中央仓库作为所有开发者的交互中心。和其它的工作流一样，开发者在本地工作并push分支到要中央仓库中。

![diagram 12](http://cdn.hxrealm.com/uploads/blog/images/12.svg)

Git Flow工作流使用2个分支来记录项目的历史。master分支存储了正式发布的历史，而develop分支作为功能的集成分支。这样也方便master分支上的所有提交分配一个版本号。

主要分支：

- master（主干分支，可用于产线正式发布）
- hotfix（维护/热修复分支，基于*master*分支上存在的问题快速修复分支）
- release（发布分支，可用于测试版本发布）
- develop（开发分支，可用于开发迭代）
- feature（功能分支，可用于个体开发和协作开发）

## 分支模型的工作原理

功能分支

```bash
// 创建功能分支 
git checkout -b feature/feature-name develop 

// 合并到develop分支
git checkout develop
git merge feature/feature-name

// 删除功能分支
git branch -d feature/feature-name
```

发布分支

```bash
// 创建release分支
git checkout -b release/release-name develop 

// 合并到master分支
git checkout master
git merge release/release-name

// 合并到develop分支
git checkout develop
git merge release/release-name

// 删除release分支
git branch -d release/release-name
```

热修复分支

```bash
// 创建hotfix分支
git checkout -b hotfix/hotfix-name master 

// 合并到master分支
git checkout master
git merge hotfix/hotfix-name

// 合并到develop分支
git checkout develop
git merge hotfix/hotfix-name

// 删除hotfix分支
git branch -d hotfix/hotfix-name
```

## git-flow 工具集

git-flow 是一个git扩展集，按 Vincent Driessen 的分支模型提供高层次的库操作。

基本命令用法

![git-flow](http://cdn.hxrealm.com/uploads/blog/images/WX20180605-161132@2x.png)

简单实例：

```bash
// Git Flow 模型初始化
git flow init
```

```bash
// 新建特性分支
git flow feature start feature-name

// 发布特性分支
git flow feature publish feature-name

// 合并特性分支
git flow feature finish feature-name
```

```bash
// 新建发布分支
git flow release start release-name

// 合并发布分支
git flow release finish v1.0.0 –m “tag message“
```

```bash
// 新建热修复分支
git flow hotfix start hotfix-name

// 合并热修复分支
git flow hotfix finish v1.0.1
```

## 写在最后

本篇文章内容信息量较大，整理过程中难免会有些纰漏，欢迎大家指正。如需要了解更多相关内容请详细查看参考资料部分的链接地址。

## 参考资料

- [Git SCM](https://git-scm.com/)
- [Git-flow](https://github.com/nvie/gitflow)
- [Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
- [Comparing Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Git-flow cheat sheet](http://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html)
