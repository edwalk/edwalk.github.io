---
layout: post
title: "Switching from Polars to Pandas for my NHL schedules API endpoint ingestion"
date: 2026-04-12
---
The very first implementation of my ingestion script for the NHL schedules API endpoint used Polars. In previous roles, I had been impressed by how effective Polars was for large-scale analytical workloads (hundreds of millions of rows), and had started to use it for my (admittedly simple) home projects instead of Pandas.

The JSON payload from the NHL schedules API primarily contains a `games` key, which maps to an array of game objects representing fixtures played or to be played by a given team in a given season. Each game object contains several nested fields, such as team names, TV broadcasts, and venue details. The goal was to take this data, process it into structured tables, and insert it into a SQLite database to enable further analytics and modelling.

The initial approach involved writing functions to deduplicate and flatten the game objects before inserting them into a Polars DataFrame. While the intention was to retain all data from the payload, it quickly became clear that flattening and cleaning required extensive defensive logic to handle inconsistencies between game objects. Writing sufficient validation to cover all edge cases became difficult, and the script struggled with larger pulls (for example, full historical schedules).

To address this, I introduced Pydantic to define data models and enforce validation. In a single file, I was able to define classes covering each object within the game payload, flattening some fields while keeping others nested for future use. This significantly reduced the amount of validation and edge case handling required in the transformation step.

While I initially tried to retain Polars, issues arose when working with the nested data produced by the Pydantic models. These were represented as `Struct` columns in Polars, which required additional flattening or casting before they could be written to SQLite. This reintroduced transformation complexity.

Given the relatively small size of the dataset (several decades of fixtures amounting to fewer than ~20,000 rows), performance was not a major concern. The priority was simplifying the API → JSON → database pipeline.

Switching to Pandas reduced the amount of preprocessing required before ingestion. Nested fields could be handled more directly and prepared for storage with minimal additional logic. This resulted in simpler, more maintainable code, with more of the transformation work shifted to SQL when constructing analytics-ready tables.

The outcome was a more maintainable pipeline, at the cost of negligible performance impact and somewhat more complex SQL for downstream transformations.

--

• Using Pandas became simpler here because the ingestion pipeline stopped being
  a “dataframe-heavy reshaping problem” and became a “validate Python objects,
  then store them” problem.

  Early on, the Polars version had to do real Polars-specific work to make the
  NHL schedule payload usable: deduplicate records, recursively unnest nested
  structs, and specially handle lists of structs like broadcasts in
  data_processing.py:68. You can see that older shape in commit c34908f, where
  df_unnester() walks df.schema, checks for pl.Struct, and explodes nested
  fields into flat columns. That is a lot of custom logic just to flatten the
  API response.

  After the pydantic refactor in 4eeded4 and d8c7439, that flattening mostly
  stopped mattering. The models in models/schedules.py:6 already normalize the
  ugly bits from the API, and the SQL layer now reads nested JSON with
  json_extract(...) instead of expecting every field to be pre-flattened. Once
  that happened, the dataframe step became very simple: build a list of
  validated dicts, make a dataframe, add a timestamp, and JSON-serialize any
  remaining dict/list columns in data_processing.py:9. Pandas handles that
  “plain Python objects in columns” flow more directly.

  The other big reason is SQLite integration. The database write path is just
  df.to_sql(...) in db_functions.py:13. With Polars, the code had already grown
  a compatibility step and a conversion on write (df.to_pandas().to_sql(...) in
  the d8c7439 diff). In other words, even when using Polars, the pipeline still
  had to translate back into Pandas for persistence. Once that happened, Polars
  was mostly extra glue rather than a benefit.

  So in simple terms:

  - Polars was useful when the job was “flatten a messy nested API payload.”
  - Pydantic moved that cleanup into models.
  - SQL moved more extraction into queries.
  - SQLite already wanted something Pandas-shaped.

  At that point, Pandas was simpler because it let the code stay close to
  ordinary Python objects instead of forcing extra Polars-specific
  transformation and conversion steps.

