---
id: post-2025-05-03
title: Workout Wednesdays 2025 Week 18
date: 2025-05-03
tags: ["Dashboards", "Tableau"]
excerpt: Catching up on Workout Wednesday challenges following my attempt at week 17 yesterday, I have now completed the Week 18 challenge, which also provided several opportunities to learn new elements of Tableau I had never needed to use previously.
---

[Challenge Link](https://workout-wednesday.com/wow202w18tab/) | [My attempt](https://public.tableau.com/app/profile/edward.walker3149/viz/tableau_17462921997870/WOW2025Week18?publish=yes)

The challenge for Week 18 of Workout Wednesday focused primarily on using Dynamic Zone Visibility to hide/show additional, drill down information (in the from of a more granular visualisation) when users click on a menu item within the tooltips of any of the main dashboard visualisations.

I had never used Dynamic Zone Visibility in my day-to-day at work. I would usually achieve the same outcome (more or less) by moving more granular tables/visualisations to alternative tabs, and by adding a navigation dashboard action activated by a menu link in the tooltip of the main visualisations. The outcome is similar, however the user is taken away from the main dashboard and thrown into a different tab. The approach promoted in this challenge does allow the user to access granular information while remaining, broadly, on the main dashboard page they are browsing.

In addition to DZV however, I ran into another small challenge that allowed me to learn more about one of the countless little quirks Tableau has.

# Tree Map ordering

In the example dashboard for the challenge, there is a tree map visualisation which essentially shows sales split by shipping method and product segment.

When attempting to create this tree map using the two separate dimensions (shipping method and product segment), I noticed that Tableau was applying sorting on the basis of these categories - all "squares" related to Standard Class shipping were grouped, and so on for each of the shipping methods. This meant that the visualisation was essentially three smaller tree maps side by side.

To resolve this, I needed to create a "dummy" field to build the tree map on, which combined both the shipping method and the product segment dimensions (by concatenating them). This removed the ordering that Tableau was applying and instead simply created a tree map chart showing the highest segment/shipping method combination in the top right, moving to the smallest sales volumes on the bottom right.

The dummy field still allowed me to introduce the actual fields at the label level to display the information correctly to the user.

# DZV - Show/Hide buttons

When trying to implement a "close" button for the detailed table that appears when the menu item is triggered, I discovered that Tableau includes a feature to add a hide/show button for elements of the dashboard.

However, in this instance, I was not able to make this work. I was unable to connect that button to a parameter (which dictates whether the granular table appears or not). Instead, I needed to create a sheet with a "X" shape and an associated dashboard action to switch the Show/Hide parameter to "hide", thus hiding the table and the button when clicked.

# TL;DR

Through this challenge, I discovered the DZV feature of Tableau, and learned a little bit more about how to format and sort Tree Maps appropriately when using multiple dimensions.
