---
layout: post
title: Rugby Internationals 004
tags: rugby, psql, tableau
---

I have been a little quiet recently, but my second portfolio project for Tableau using this rugby international matches dataset is progressing well. While I will provide a bigger update on the different things I have learned and attempted once the project is completed, there is one particular challenge that I wanted to debrief here.

As part of my visualisation, I was wanting to create a Top 10 highest scoring Six Nations games table, listing each game individually and the total number of points scored for each, sorted in descending order.

When I intially attempted the table, I ran into a frustrating issue: the different dimensions I was looking to surface (year, fixture) were nesting. In short, the following was happening (values for illustration purposes only):

![Table showing nested years](..\images\my-images\yearscrewup_ri004.png)

When I swapped the order of the dimensions, a similar problem occured when the same fixture from different years appeared in the table:

![Table showing nested matchups](..\images\my-images\matchupscrewup_ri004.png)

This was particularly frustrating as it seemed to prevent true descending ordering: ordering would happen within each of the nested categories, and not across the entire table.

After fiddling around with different dimension orders, different options in Tableau, I understood that the primary challenge here was these dimensions were being used to differentiate individual occurrences within the dataset. In fact, there was no unique identifier, independent of variables such as fixture and year, in the dataset that I extracted from my local database.

To correct the issue, I re-extracted a new dataset including a unique ID column for each match. When added to a table, each entry was unique (due to the unique ID) and no nesting of subsequent dimensions occurred. This allow me to obtain, as intended:

![Table showing the right Top 14 high scoring games table, ordered correctly](..\images\my-images\successful_ri004.png)

With accurate ordering across all the top 10 games highlighted in the visualisation.

While I was definitely taking wild stabs in the dark initially with this issue, I know believe I have a much stronger understanding of how dimensions interact in tabular visualisations in Tableau, and have been able to progress further in my project. 