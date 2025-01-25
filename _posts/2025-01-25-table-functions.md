---
layout: post
title: WINDOW_MAX, WINDOW_MIN and other Table Functions
tags: tableau, table calculations, quick learnings
---

As part of my job, I commonly build dashboards to address a myriad of business questions, using SQL to extract relevant data and Tableau to present it in a format that stakeholders can digest.

With SQL being such a useful tool to carry out all kinds of calculations and minor data transformation tasks before the data ever reaches Tableau, table calculations is a feature of Tableau that I have had little opportunity to practice.

As part of [WoW Essentials 2018 Week 7](https://public.tableau.com/app/profile/edward.walker3149/viz/tableau_17378411135730/MinMaxSales), I was required to use two specific window functions I have only very rarely used in my day job: WINDOW_MAX and WINDOW_MIN.

Both functions essentially allow you to extract a minimum and maximum value for a given "window", a level of granularity/subset of your data set by the fields you use in your visualisation and the way in which the table function is set to execute (across, down, table...).

In WoW 2018 Week 7, it allowed me to seamlessly extract the maximum and minimum sales sum for a given year across the displayed subcategories.

Tableau comes with a large number of table calculations, some of which can be pushed into the SQL with minimal effort (percent of total, differences between rows, percentages), some of which add real value depending on how granular you need your dataset to remain for the purpose of your dashboard(s).

You can find more about this (as I did) here: [Table Calculations](https://help.tableau.com/current/pro/desktop/en-us/functions_functions_tablecalculation.htm)
