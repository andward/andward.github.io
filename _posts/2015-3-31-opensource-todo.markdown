---
layout: post
title: 我的开源项目Andward.TODO
date: 2015-3-31 0:00
categories: python django Opensource
image: http://andward-blog-picture.qiniudn.com/sunset_girl.jpg
---

练手项目，欢迎轻喷。。。

这是用django搭建的TODO management and reassignment platform，可以用它很方便直观地管理team的TODO list。项目的代码已经扔到github上面，可以直接从github clone代码到本地->

{% highlight ruby %}
git clone https://github.com/andward/AndwardTODO.git
{% endhighlight %}

##本地项目搭建（Linux）

###下载依赖包

项目clone下来后，cd进入项目文件夹。执行命令你需要先装一个pyhton的工具pip，基本上python所有的主流依赖包都在其pypi的服务器上面。执行以下命令：

{% highlight ruby %}
pip install -r requirements.txt
{% endhighlight %}

跑完后django等依赖包已经安装在你的电脑上，版本是1.4.5。可以测试一下：

{% highlight ruby %}
>>python
>>import django
>>django.VERSION
{% endhighlight %}

###设置你的MySQL

假设你已经装了MySQL，新建一个utf8的数据库：

{% highlight ruby %}
>>mysql -u root -p
>>create database todo character set utf8
{% endhighlight %}

编辑settings：
{% highlight ruby %}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # mysql
        'NAME': 'todo',                      # Your database name
        'USER': 'root',                      # root
        'PASSWORD': 'your password',    # your root password
        'HOST': 'localhost',    
        'PORT': '3306',         
    }
}
{% endhighlight %}

Migrate你的数据库表：

{% highlight ruby %}
>>cd AndwardTODO
>>python manage.py syncdb
{% endhighlight %}

###启动local server

运行以下命令：

{% highlight ruby %}
python manage.py runserver
{% endhighlight %}

访问<code>http://127.0.0.1:8000/task/tag/ALL</code>，就可以看到真容了~

下面是一些项目截图：

<img src="http://andward-blog-picture.qiniudn.com/todo_landing.png">

<img src="http://andward-blog-picture.qiniudn.com/todo_todo.png">

<img src="http://andward-blog-picture.qiniudn.com/todo_expand.png">

<img src="http://andward-blog-picture.qiniudn.com/todo_summary.png">




