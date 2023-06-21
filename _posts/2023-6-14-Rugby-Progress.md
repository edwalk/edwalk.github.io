---
layout: post
title: Rugby Project #001
tags: rugby, API, python
---

Tonight, I've worked a little further on my rugby statistics / data project. The aim was to rework the code I had written in Python to simplify the code and reduce the number of API calls made for any given operation.

I was able to program the following:
* Fetch all teams for a given season and competition
* Fetch all fixtures and results for a given season and competition

I then tried to program a function that would fetch all detailed match stats for a given season and competition, and ran into two issues:

* API calls / minute throttling: I tried to resolve this by adding a time.sleep(90) function once the call limit per minute was reached.
* API calls / month: this was impossible to bypass without paying for more premium access via RapidAPI.

As a result of this, I decided to integrate a second potential API to the project: [SofaSport](https://rapidapi.com/tipsters/api/sofasport).

SofaSport also contains Rugby data but allows up to 500 requests per month, only costs $10 for 10,000 requests and allows 5 requests per second. This should offer greater flexibility when testing and working but it remains an interesting and relevant challenge to minimise API usage.

So far, I'm exploring the SofaSport database to try and identify what I need to get the data I want, and what data I can download and refer to locally to reduce API usage. This is what I've understood:

* Each sport has an ID.
* Each sport is broken down into categories (rugby, for instance, has Union, League, and Sevens)
* Each category ID allows you to pull a list of tournaments for a given sport and category.
* Each tournament ID can then be used to pull unique season IDs.
* Tournament IDs + Season IDs can be combined to get a wide range of data.

There is much more to explore in the API, but this is the hierarchy I've understood so far based on the endpoints available in RapidAPI. I would argue that each of these points above could be downloaded once and hosted locally in a database, and updated sporadically when more recent data is needed for analysis.

Next Steps:
* Host SofaSport datasets in a local PostgreSQL database for easier lookup
* Integrate PostgreSQL database lookups in the Python program
* Harvest the following data from the dataset: Fixtures, Results, Team sheets, Team Stats, Player Stats from SofaSport for each match.
* Insert this into PostGreSQL database, practice SQL queries.
* Import SQL query outputs into Tableau for visualisation.

Optional Extra steps:
* Create a visual GUI for the API terminal I'm slowly creating.
