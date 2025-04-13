---
id: post-2025-04-13
title: Creating a VATSIM dashboard #1
date: 2025-04-13
tags: ["Data", "Dashboards"]
excerpt: Flight Simulation has always been one my passions, and VATSIM remains one of the premier online networks that players can use to enhance the realism of their gameplay. For those of you who aren't familiar with this world, what VATSIM essentially provides is a global network in which players can both fly aircraft and provide realistic air traffic control services to other players. The end result is an online replica of the world where pilots are able to fly with others and simulate realistic operations with air traffic control.
---

Flight Simulation has always been one my passions, and VATSIM remains one of the premier online networks that players can use to enhance the realism of their gameplay. For those of you who aren't familiar with this world, what VATSIM essentially provides is a global network in which players can both fly aircraft and provide realistic air traffic control services to other players. The end result is an online replica of the world where pilots are able to fly with others and simulate realistic operations with air traffic control.

VATSIM has a relatively comprehensive [API](https://vatsim.dev/api/core-api/), which is often used by third party providers to create live tracking websites similar to what you'd see on FlightRadar24 for instance.

I've decided to use this API to create my own, personal version of a flight tracker for the network. The aim is first to get a live dashboard to track activity on the network, and secondly to create a historical database that would eventually allow me to gather statistics and surface insights on network activity over several weeks, months and years.

So far, I have been able to create a simple Python script that fetches the active pilot data from the API, parses it lightly and pushes it to a database on my VPS. The script itself primarily uses pandas and sqlalchemy to manage the data and the database connection, and the database is a simple PostgreSQL database. Scheduling is still on my to-do list, and I'm likely to use Dagster to schedule the creation of a live flight data table that will refresh / get replaced every time I pull data from the VATSIM API (every 2 minutes or so). 

While I'm sure there will be more challenges emerging as I progress with this project, these are three important questions I will need to address:

1. The dashboard data pipeline is potentially challenging. I will likely use Tableau Public, but will need to understand how to push data from my database to Google Sheets in order to make use of the very limited connector options available.

2. There is no unique ID for flights - only for users. This is problematic because the same user can do the same flight multiple times - this will look very similar in the data but needs to be categorized as two separate flights.

3. The VATSIM API does contain personal information (users can optionally submit their full name on the network). For obvious reasons this data cannot be stored and will need to be cleaned/removed before any historical data storage is implemented.

I'll keep updating this blog with my progress and I will shortly have a Tableau Public dashboard for you to explore the fascinating world of online flying.

Links:

[VATSIM](https://vatsim.net)

[VATSIM API](https://vatsim.dev/api/core-api/)