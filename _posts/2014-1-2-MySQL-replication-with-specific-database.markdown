---
layout: post
title: MySQL Replication With Specific Database
date: 2014-01-02 18:52:20
categories: Django MySQL
image: http://andward-blog-picture.qiniudn.com/stories.jpg
---

{% highlight python %}
#replicate this database 
replicate-do-db=database_name 
 
#don't replicate this database 
replicate-ignore-db=database_name 
 
#replicate this database.table 
replicate-do-table=database_name.table_name 
 
#don't replicate this table 
replicate-ignore-table=database_name.table_name 
 
#allows wildcards, use % as the wildcard character 
#e.g db% would be all databases beginning with db 
replicate--wild-do-table=database_name.table_name 
 
#ignore all specified tables, with wildcards 
replicate-wild-ignore-table=db_name.
{% endhighlight %}