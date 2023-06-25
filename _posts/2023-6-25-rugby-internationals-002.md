---
layout: post
title: Rugby Internationals 002
tags: rugby, psql, tableau
---

Today, I continued my work on the rugby internationals SQL / Tableau portfolio project.

Here's a summary of what was achieved:
* Created a query that grabs the individual match results contained in the dataset, assigns the correct standing points, and aggregates the result to show how many table points each team got from 1883 to 2016. A separate ruleset will need to be designed for post-2017 when the scoring system was changed.

Challenges overcome:
* Initially, the number of points was not broken down by team in my query (meaning everyone always got the full sum of everyone's points every year). 

There were two primary issues here: I joined the two subqueries I created to track home and away points only the basis of the points themselves, not the teams or the competitions. It meant that the join didn't take into account the relationship between team names and competition names in both subqueries (so duplication occurred).

The other issue was that the SUM I was used to get the total number of points scored by a team in a given year added both the home and away points for each game, instead of just counting the relevant points. Here I used COALESCE functions to ensure that when it came to aggregating the number of points, only home OR away points were considered (not both).

* I had a number of random "null" values that appeared in final extract of my query, but not during any of the intermediary subqueries. This was also corrected by ensuring that all values pulled from the JOIN were run through COALESCE.

* A number of other issues I had with data accuracy were related to superfluous data being SELECTed within individual subqueries. Lean SQL is best.

* I also spent 20 minutes trying to identify an issue before realising that the dataset itself contained some errors. This may continue to be an issue further along.

## Next Steps

* Build in wins, losses, and draws to the query for better Standings accuracy.
