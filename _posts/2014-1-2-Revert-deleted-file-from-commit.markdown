---
layout: post
title: Revert deleted file from commit
date: 2014-01-02 9:52:23
categories: CI git
---

![image](http://i67.photobucket.com/albums/h308/andward/blizzard_zpsaeba38d1.jpg)

Some day you use 'git rm file' to delete some files in your local repository and commit this change. To recover these removed files, you can do:

{% highlight python %}
git reset HEAD //back your status to last 'to be commit'
git checkout file // recover deleted files
git reflog //check logs
{% endhighlight %}

'ls' your repository and find removed files are back.