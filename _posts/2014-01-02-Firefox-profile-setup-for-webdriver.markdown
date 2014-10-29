---
layout: post
title: Firefox Profile Setup For Webdriver
date: 2014-01-02 18:52:20
category: Test
image: http://andward-blog-picture.qiniudn.com/girl.jpg
---

In webdriver test for Firefox, we can setup multiple profile to handle some requirement (eg:login with cookies)

Run "firefox -P" to access Firefox profile manager, and create a new profile named "User1".

When run webdriver cases including sign in step however we don't want execute sign in process for each case, sign in Firefox with default profile first and then start Firefox webdriver instance:

{% highlight python %}
from selenium import webdriver
instance = webdriver.Firefox('default')
{% endhighlight %}

Same like above,we can sign in with "User1" profile with another account with different cookie, then start webdriver:

{% highlight python %}
instance = webdriver.Firefox('User1')
{% endhighlight %} 