---
id: post-2025-05-03-1
title: Workout Wednesdays 2025 Week 17
date: 2025-05-03
tags: ["Dashboards", "Tableau"]
excerpt: While I don't religiously complete all Workout Wednesday challenges as they are released, the challenge for week 17 this year piqued my interest. The challenge focused on providing a simple, yet very clean and user friendly table to view 4 key Premier League team statistics from the inception of the Premier League in 1993 to 2024.
---

[Challenge Link](https://workout-wednesday.com/2025w17tab/) | [My attempt](https://public.tableau.com/app/profile/edward.walker3149/viz/tableau_17462309704380/2025-WW17-Bonus)

While I don't religiously complete all Workout Wednesday challenges as they are released, the challenge for week 17 this year piqued my interest. The challenge focused on providing a simple, yet very clean and user friendly table to view 4 key Premier League team statistics from the inception of the Premier League in 1993 to 2024.

The challenge proved to be quite accessible, yet provided the opportunity to refine and learn a few skills that I have not had the opportunity (or reason) to use frequently when building dashboards at my current place of work.

## Sorting

The first challenge was to ensure that the teams remained sorted in the correct order, particulary when the selected stat required an inverse sorting order (the team with the highest goals for needed to be at the top of the chart, while the team with the lowest goals against needed to be on top).

To resolve this, I created a calculated field which provided a unique rank for each team for Goals For, Points and Goal Difference, and provided the same rank multiplied by -1 for Goals Against to create an inverted sort order. That field was added to the rows for the chart and subsequently hidden.

## Selective & dynamic label display / formatting

The most challenging of the dashboard was undoubtedly the creation of the bar chart labels. In this challenge, users needed to be able to select a specific team and see that team's statistics highlighted in a different colour and with a visible label. In addition to this, the best value overall (highest for most stats, lowest for goals against) also needed to be labelled (but not highlighted).

To address this particular difficulty, I needed to take the following steps:

- Create a boolean field for the team selection, which was based on a parameter containing all possible teams.
- Create a FIXED field that surfaces the maximum statistic (from a calculated field that surfaced the selected statistic via parameter).
- A combined label field that shows EITHER the selected team's value (if selected team = TRUE) or the highest value when it matched the value in a given row. Other rows were made to return NULL.

This created a label that only appeared for the team the user selects, and for the highest performing team at any given point.

However, adding these fields to colour and labels created issues and errors with the sorting we had established above. To prevent this, I discovered that setting both the field used to colour the bars and the field used to label the bars as attributes (ATTR) prevented them from being taken into account when calculated the sort order in the chart.

## Creating a "100%" line with minimal spacing between the line and the team names

The final challenge was related to the bonus instructions. As you may see from the finished dashboard, there is an additional, low opacity, light grey bar that covers the full range of the data.

To create that bar, I simply created a calculated field that calculates the difference between the maximum possible value and the minimum possible value at any given point in the chart, and added that field as a "Size" attribute for a Gantt bar.

However, I was initially unable to reduce the spacing between the team names and the actual bar.

To do this, I instead hid the Team names header from the chart rows, and instead added a left-aligned "Team" label to the Gantt bar itself. This ensures that the y-axis runs the entire width of the chart and allows for the bars to come much closer to the team names than previously.

## TL;DR

This was an interesting challenge covering a wide range of relatively basic skills that can sometimes slip when unused for extended periods of time. It exemplifies the challenges of creating custom, tailored, refined dashboard experiences in Tableau, and allowed the refresh my knowledge on a range of topics such as sorting, attributes and how to use labels as an alternative way to display row categories to provide a more flexible approach to formatting.
