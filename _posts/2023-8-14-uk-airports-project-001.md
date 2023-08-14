---
layout: post
title: UK Airports Project 001
tags: uk_airports, tableau
---

After launching a few SQL projects and dabbling in Python, I noticed that one of the main challenges I ran into was data visualisation. In short, I was not sure I was understanding Tableau enough to make sure the datasets I throw in there were optimised to show what I wanted to show. I was putting together data extracts without having a clear understanding of how that data could be leveraged in Tableau.

To addres this, I've narrowed my focus and started working on a Tableau project using datasets found online. For this particular project, I have put together three separate datasets by drawing data from the [UK Government](https://www.gov.uk/government/collections/aviation-statistics) and the [Civil Aviation Authority](https://www.caa.co.uk/data-and-analysis/uk-aviation-market/airports/):

* A dataset showing Air Traffic Movements (ATMs, landings and takeoffs) at most UK airports from 2011 to 2021.
* A dataset listing each of these UK airports and associated a IATA code and ITL-1 region code (to allow for geographic visualisation)
* A dataset showing international passenger numbers for routes between UK airports and all international destinations between 2015-2022.

This has allowed me to start creating a Tableau that allows users to freely explore the dataset:

* Compare airport ATMs across regions, time, and comparing specific airports.
* Find out which city / country pair generated the most passenger traffic at UK airports, with the possibility to filter down to increasingly detailed levels (UK region > UK airport; Global region > Country > Airport)
* Find out where in the UK passengers from specific cities around the world travel to (with all the same comparison features mentioned above).

Once the worksheets have been created, the plan is to throw this all into 1 or 2 appealing dashboards, and use the output to write up a few small reports answering some basic questions I've been asking myself.

More to come soon.