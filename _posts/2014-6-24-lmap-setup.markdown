---
layout: post
title: Linux MySQL Apache Django配置（备忘）
date: 2014-6-24 0:00
categories: python django
---

![image](http://andward-blog-picture.qiniudn.com/people_crossing.jpg)

最近workstation备份把home目录清空了，于是重新配了一下Django，发现之前的设置什么的全部都忘光了-__-! 看来必须记一记才行，免得再要重配的时候东找西找。

###安装各种包

俺用的是ubuntu，装包什么的最方便了.

Pip - python的包获取/安装工具，相当好用。django各个版本它都有：

<code>sudo apt-get install python-pip</code>

Django - 装原来用过的版本。不然的话会有很多兼容的问题（坑）。我用的是1.4.5的版本：

<code>pip install django==1.4.5</code>

Apache - 一般都是2.2.1吧：

<code>sudo apt-get install apache2</code>

MySQL - 装个server就够了：

<code>sudo apt-get install mysql-server</code>

MySQLdb - MySQL跟Django的data layer：

<code>sudo apt-get install python-mysqldb</code>

Mod_wsgi - 支持Apache模块和python应用的通信组件：

<code>sudo apt-get install libapache2-mod-wsgi</code>

###建立app

如果你已经有项目了，直接mv项目到/var/www/下面就行了。如果是新项目，同样到www的目录下新建一个项目：
<code>django-admin.py startproject your-app</code>

###配置apache

cd去/etc/apache2/site-available/下，把80端口的virtualshost换了。
{% highlight ruby %}
<VirtualHost *:80>

         ServerAdmin your-app
         ServerName your-app.com

         DocumentRoot /var/www/your-app
         <Directory />
                 Options FollowSymLinks
                 AllowOverride None
         </Directory>
         <Directory /var/www/>
                 Options Indexes FollowSymLinks MultiViews
                 AllowOverride None
                 Order allow,deny
                 allow from all
         </Directory>
 
         ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
         <Directory "/usr/lib/cgi-bin">
                 AllowOverride None
                 Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
                 Order allow,deny
                 Allow from all
         </Directory>
 
         ErrorLog ${APACHE_LOG_DIR}/error.log
 
         # Possible values include: debug, info, notice, warn, error, crit,
         # alert, emerg.
         LogLevel warn
 
         CustomLog ${APACHE_LOG_DIR}/access.log combined
 
     Alias /doc/ "/usr/share/doc/"
     <Directory "/usr/share/doc/">
         Options Indexes MultiViews FollowSymLinks
         AllowOverride None
         Order deny,allow
         Deny from all
         Allow from 127.0.0.0/255.0.0.0 ::1/128

     </Directory>
 </VirtualHost>
{% endhighlight %}

###配置wsgi

在/var/www/下新建一个文件夹叫apache，然后在文件夹里面新建一个叫django.wsgi的文件，加入以下：
{% highlight ruby %}
 import os
 import sys
 import django.core.handlers.wsgi
 sys.stdout=sys.stderr
 sys.path.append(r'/var/www/your-app')
 os.environ['DJANGO_SETTINGS_MODULE']='settings'
 application=django.core.handlers.wsgi.WSGIHandler()
{% endhighlight %}

如果你有多个app分支，建议把setting分开成多个配置文件，这个下次讲。然后再切到/etc/apache2/下面，在httpd.conf里面加上：
{% highlight ruby %}
WSGIScriptAlias / /var/www/apache/django.wsgi
WSGIScriptAlias / /var/www/apache/django.wsgi
{% endhighlight %}

###配置MySQL

<code>mysql -u root -p yourpwd</code>进入MySQL，建一个新的database<code>create database new_database</code>。在setting里面加入MySQL信息：
{% highlight ruby %}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'new_database',
        'USER': 'root',
        'PASSWORD': 'your password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
{% endhighlight %}

###配置settings

一些路径的配置：
{% highlight ruby %}
INSTALLED_APPS = ('your-app') #加入你的app

DEBUG = True #开debug，如果是prod请设置成False
TEMPLATE_DEBUG = DEBUG

SITE_URL = '/var/www/your-app'

MEDIA_ROOT = SITE_URL + '/media/'

TEMPLATE_DIRS = (SITE_URL + '/template',)

STATIC_PATH = SITE_URL + "/static/"
{% endhighlight %}

大功告成~



