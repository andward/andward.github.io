---
layout: post
title: Code Review Flow On Gerrit
date: 2013-09-01 9:52:23
categories: CI git Gerrit Jenkins
image: http://andward-blog-picture.qiniudn.com/dart_night.jpg
---

##Preparation

###Setup public key

- ssh-keygen,set your ssh private key and public key
- copy your public key to server admin,paste in Gerrit

###SSH connection

- ssh -p 19418 yourname@172.23.116.1
- create “config” under ~/.ssh
- add content in config

{% highlight ruby %}
Host Gerrit  
User yourname  
Port 29418  
Hostname 172.23.116.1  
IdentityFile ~/.ssh/id_rsa
{% endhighlight %}
- ssh gerrit

###Create a new project

- ssh Gerrit gerrit create-project -n new_project
- also can create new project on Gerrit directly

###Clone project to local machine

{% highlight ruby %}
git clone ssh://Gerrit/new_project.git
{% endhighlight %}

###Copy commit-msg to local

{% highlight ruby %}
scp -p Gerrit:/hooks/commit-msg  ~/new_project/.git/hooks/
{% endhighlight %}

###Change push branch

{% highlight ruby %}
git config remote.origin.push refs/heads/*:refs/for/*(default branch:master)
{% endhighlight %}

##Workflow

- Create/copy file in cloned project site(eg:code.py)
- Track file: git add code.py
- Commit file: git commit -m “code review”
- Push to remote server: git push origin(master)
- check change ID on Gerrit
- Verify pass: merge into focus branch

###Verify failed
    1.Add comments and mark as failed on Gerrit
    2.Modify code according comments at local
    3.git add code.py
    4.git commit --amend (DONOT add -m)
    5.git push origin
    6.Code review again