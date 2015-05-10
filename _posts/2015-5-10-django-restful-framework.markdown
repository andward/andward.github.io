---
layout: post
title: Django集成RESTful framework
date: 2015-5-10 0:00
categories: python django RESTful
image: http://andward-blog-picture.qiniudn.com/6cf69addf.jpg
---

RESTful是一种网络通信的设计模式，用于轻量级的无状态的数据交互。每个url代表一种资源，并且用标准的http方法例如GET,POST,PUT,DELETE来调用资源。Django采用的是传统的CRUD的架构。如果想后台同时兼容web和mobile的话可以将后台改成RESTful的形式。这里有一个很有名的Django RESTful的框架：Django REST framework。官网地址：[这里][link1]

下面我以我的TODO为例来搭建RESTful架构。

##安装

从pip安装：

{% highlight ruby %}
pip install djangorestframework
{% endhighlight %}

TO BE CONTINUE...



[link1]:http://www.django-rest-framework.org/