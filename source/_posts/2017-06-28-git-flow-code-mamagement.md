---
layout: post
title: Git Flow最流行的代码管理模型
date: 2017-06-28 11:20
comments: true
categories: [研发管理]
---

工作至今前前后后也用过了不少版本管理系统例如：[CVS](http://www.tortoisecvs.org/)、[SVN](https://tortoisesvn.net/)、[Mercurial](https://www.mercurial-scm.org/)、[GIT](https://git-scm.com/)等，受硬性条件和软性条件因素的影响，不同团队会选择最适合自身的版本管理系统。在这篇文章中主要是介绍互联网型团队（敏捷型团队）中最常用的研发管理体系（[gitlab](https://about.gitlab.com/) + [git](https://git-scm.com/) + [jira](https://www.atlassian.com/software/jira) or [redmine](http://www.redmine.org/)）中的代码分支管理流程 -- Git Flow模型。

### Git Flow 是什么

Git Flow是构建在Git之上的一个组织软件开发活动的模型，是在Git之上构建的一项软件开发最佳实践。Git Flow是一套使用Git进行源代码管理时的一套行为规范和简化部分Git操作的工具。

2010年5月，在一篇名为“[一种成功的Git分支模型](http://nvie.com/posts/a-successful-git-branching-model/)”的博文中，@nvie介绍了一种在Git之上的软件开发模型。通过利用Git创建和管理分支的能力，为每个分支设定具有特定的含义名称，并将软件生命周期中的各类活动归并到不同的分支上。实现了软件开发过程不同操作的相互隔离。这种软件开发的活动模型被nvie称为“Git Flow”。

一般而言，软件开发模型有常见的瀑布模型、迭代开发模型、以及最近出现的敏捷开发模型等不同的模型。每种模型有各自应用场景。Git Flow重点解决的是由于源代码在开发过程中的各种冲突导致开发活动混乱的问题。因此，Git Flow可以很好的于各种现有开发模型相结合使用。

在开始研究Git Flow的具体内容前，下面这张图可以看到模型的全貌（引自nvie的[博文](http://nvie.com/posts/a-successful-git-branching-model/))：

![Git Flow 流程示意图](http://nvie.com/img/git-model@2x.png)

### Git Flow中的分支

主分支

对稳定运行的版本进行管理（Tag标记），当运行版本出现bug则采用hotfix分支管理方式进行修复。

```
master
```

开发分支

本地开发环境的主线版本，当有预研功能需求或指定模块优化需求时需采用feature分支管理方式进行处理。

```
develop
```

特性分支或功能分支

主要是针对会影响开发主线版本的功能进行管理，功能开发完后需合并到develop分支。

```
feature
```

验证分支或测试分支

迭代需求在develop分支上开发完成以及开发自测完成后提交全面测试时新建release分支（Tag标记），测试通过后走master分支进行管理否则走develop分支进行管理。所有操作完成后需移除release分支。

```
release
```

热修复分支

master分支运行的版本存在bug时需紧急修复时新建hotfix，修复完成后需合并到devlop和master(Tag标记)，最后移除hotfix分支

```
hotfix
```

以上是一个简版的Git Flow分支的描述，想详细了解Git Flow请[点击这里](http://www.ituring.com.cn/article/56870)。

### 参考来源
- [Git版本控制与工作流](http://www.techug.com/post/git-2.html)
- [基于git的源代码管理模型——git flow](http://www.ituring.com.cn/article/56870)
- [一种成功的Git分支模型](http://nvie.com/posts/a-successful-git-branching-model/)
- [Git 和 SVN 之间的五个基本区别](http://blog.jobbole.com/31444/)
