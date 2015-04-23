---
layout: post
title: Django集成cron
date: 2015-4-24 0:00
categories: python django cron
image: http://andward-blog-picture.qiniudn.com/soilder.jpg
---

在linux上有神器cron，它以job的方式定时执行sheell命令或者程序。有的时候在web应用中也有在后台执行定时任务的需求，例如起一个daily job去更新数据库或者做一个data fix什么的。有人也为Django写了一个集成cron的库 - django-crontab。

###安装

从pip安装：

{% highlight ruby %}
pip install django-crontab
{% endhighlight %}

###设置

在settings中将app加入installed_apps：

{% highlight ruby %}
INSTALLED_APPS = (
'django_crontab',
）
{% endhighlight %}

在settings中设置cron job。第一个参数是标准的cron时间设定，第二个参数是你执行函数的路径（注意从app根目录写起）：

{% highlight ruby %}
CRONJOBS = [
    ('0 0 * * *', 'yourapp.to.yourjob') // 每天0点运行
    ('*/1 * * * *', 'yourapp.to.yourjob') // 每分钟运行一次
]
{% endhighlight %}

THE END.