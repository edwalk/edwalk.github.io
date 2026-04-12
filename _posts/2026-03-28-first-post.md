---
layout: post
title: "Switching from Polars to Pandas for my NHL schedules API endpoint ingestion"
date: 2026-04-12
author: Edward Walker
tags: python, nhl, api, pandas, polars
---
The very first implementation of my ingestion script for the NHL schedules API endpoint used Polars. In previous roles, I had been impressed by how effective Polars was for large-scale analytical workloads (hundreds of millions of rows), and had started to use it for my (admittedly simple) home projects instead of Pandas.

The JSON payload from the NHL schedules API primarily contains a `games` key, which maps to an array of game objects representing fixtures played or to be played by a given team in a given season. Each game object contains several nested fields, such as team names, TV broadcasts, and venue details. The goal was to take this data, process it into structured tables, and insert it into a SQLite database to enable further analytics and modelling.

The initial approach involved writing functions to deduplicate and flatten the game objects before inserting them into a Polars DataFrame. While the intention was to retain all data from the payload, it quickly became clear that flattening and cleaning required extensive defensive logic to handle inconsistencies between game objects. Writing sufficient validation to cover all edge cases became difficult, and the script struggled with larger pulls (for example, full historical schedules).

To address this, I introduced Pydantic to define data models and enforce validation. In a single file, I was able to define classes covering each object within the game payload, flattening some fields while keeping others nested for future use. This significantly reduced the amount of validation and edge case handling required in the transformation step.

While I initially tried to retain Polars, issues arose when working with the nested data produced by the Pydantic models. These were represented as `Struct` columns in Polars, which required additional flattening or casting before they could be written to SQLite. This reintroduced transformation complexity.

Given the relatively small size of the dataset (several decades of fixtures amounting to fewer than ~20,000 rows), performance was not a major concern. The priority was simplifying the API → JSON → database pipeline.

Switching to Pandas reduced the amount of preprocessing required before ingestion. Nested fields could be handled more directly and prepared for storage with minimal additional logic. This resulted in simpler, more maintainable code, with more of the transformation work shifted to SQL when constructing analytics-ready tables.

The outcome was a more maintainable pipeline, at the cost of negligible performance impact and somewhat more complex SQL for downstream transformations.

