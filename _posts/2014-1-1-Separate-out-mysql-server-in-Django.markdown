---
layout: post
title: Separate out mysql server in Django
date: 2014-01-01 18:52:20
categories: Django MySQL
---

![image](http://andward-blog-picture.qiniudn.com/stories.jpg)

Separating out database server and Web server can increase resource efficiency. Server will not fight for resource using. Here we use mysql server to demo..

We modify MySQL setting that let it can be remote connected. Login in mysql server by mysql -u root -p your password, and


{% highlight python %}
use mysql
update User set Host='%' where User='root';
select Host,User from user;
FLUSH PRIBILEGES;
{% endhighlight %}

Then unbind mysql in local machine

{% highlight python %}
sudo vi /etc/mysql/my.cnf
#bind-address=127.0.01
sudo /etc/init.d/mysql restart
{% endhighlight %}

Change setting in Django

{% highlight python %}
DATABASES = {
'default': {
'ENGINE': 'django.db.backends.mysql',
'NAME': 'test_data',                   
'USER': 'root',                 
'PASSWORD': your password,
'HOST': mysql server IP, #ex:172.23.115.187
'PORT': '3306',
}
}
{% endhighlight %}

Restart apache,you will find Django connect remote mysql server,BINGO!