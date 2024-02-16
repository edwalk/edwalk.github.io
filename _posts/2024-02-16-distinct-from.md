---
layout: post
title: Filtering fields with nulls in Snowflake - IS DISTINCT FROM
tags: sql, helpful, snowflake
---

In addition to some of the sparse updates I throw onto here, I thought I could start documenting some helpful tidbits in response to some challenges I face either at work or in my personal time.

# The problem

 In this particular use case, we started off with a table containing some records we wanted to visualise. However, some of the records required additional information from a second table in order to further filter out irrelevant records. To do this, a left join was carried out to bring in the fields that would then be used for the purpose of excluding additional records. These new fields introduced new data for some of the records, and null values for others.

 To filter out the unwanted records, a WHERE statement was then used to exclude on the basis of SOME of the data contained in the new fields that were joined. As an example, given three records where the new field introduced the values of A, B and null respectively, the intention was only to exclude records with A.

 Unfortunately, upon running the query with a simple WHERE field != 'A', we noticed that only the records with 'B' were returned, an all null values were also excluded by the WHERE clause.

 # Why?

 According to [this](https://stackoverflow.com/questions/67168963/why-does-snowflake-exclude-matching-null-values-in-where-clause) answer on Stack Overflow, when a WHERE statement condition is evaluated against each of the fields, the query will only retain those fields where the expression evaluates to TRUE. So in this instance, for WHERE field != 'A', any record containing 'A' return FALSE and be excluded from the output. However, field != 'A' will also return FALSE for any record containing a null value in the field. 

# Solution
The solution in this particular use case was to the null-safe operator [IS DISTINCT FROM](https://docs.snowflake.com/en/sql-reference/functions/is-distinct-from). Changing the WHERE statement operator to WHERE field IS DISTINCT FROM 'A' allowed us to retain all records where the relevant field was EITHER 'B' OR null, excluding only records with 'A' as intended. 

While I didn't explore this in this case, there are likely ways to structure a query that reduces the chance of needing to use a field with large numbers of null values for the purpose of excluding records. However, in situations where this can't be avoided, this seems like a simple and effective solution to ensure WHERE statements really only exclude the intended records.