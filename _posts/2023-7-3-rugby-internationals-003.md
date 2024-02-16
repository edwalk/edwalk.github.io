---
layout: post
title: Rugby Internationals 003
tags: rugby, sql, tableau
---

Small progress today. I was able to finish my standings table query in order to generate a table that displays the standings points, wins, losses, and draws earned by each team each year prior to 2017 (and the standings points rule changes). The query runs into approximately 150 lines and is by far the most complex SQL query I have written so far. 

There are a few other niggling issues with the table that I have not yet been able to resolve fully:

* Teams that didn't win or didn't lose a game in a given year show their win count or loss count to be "null" instead of 0.
* My heavy use of named subqueries feels ineffective. I am convinced there may be a much quicker way to do this using subqueries directly within the main query. 

As I am now diving into more complex SQL, I will taking some time to work on Datacamp content to ensure I don't pick up bad habits or fail to learn quicker/more effective ways of achieving what I want to achieve.
