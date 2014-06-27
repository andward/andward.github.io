---
layout: post
title: Best practice for Git
date: 2014-01-02 18:52:20
categories: CI git Gerrit
---

![image](http://andward-blog-picture.qiniudn.com/bkbridge.jpg)

###Fix master bug on master branch

###Cherry pick selected commits from dev to stable master

    1.git checkout master
    2.git cherry-pick (-n) commit-id(s)
    3.git push origin HEAD:refs/for/master

###Working on dev branch for new feature (DO NOT push new feature to master branch directly)

    1.git checkout new_branch
    2.finish feature 
    3.git checkout dev
    4.git pull --rebase origin dev
    5.git checkout new_branch
    6.git rebase dev
    7.run test(if nessary)
    8.git checkout dev
    9.git merge --no-ff new_branch
    10.git push origin HEAD:refs/for/dev
    11.If CI merged, run git push origin dev

###Deal conflict

    1.git pull origin branch
    2.git status
    3.git mergetool or open conflict file
    4.deal with conflict part(use git status check conflict part)
    5.git commit

###Reset change(local)

    1.git reset HEAD^

###Recover deleted file

    1.git reset HEAD^
    2.git checkout filename

###Merge commits

    1.git rebase -i HEAD~* (* is number of commits you want to merge)

###Stash change

    1.git stash(stash your incompleted change)
    2.git stash apply(release your incompleted change)
    3.git clear(clear stash)

###Untrack file

    1.git rm -cached filename

###Delete file

    1.git rm filename (-r)
    2.git commit
    3.git push origin HEAD:refs/for/dev(master)