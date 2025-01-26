---
layout: post
title: How do Tableau and SQL interact?
tags: tableau, SQL
---

I recently stumbled upon a question on Reddit asked by someone who was just starting on their journey to learn Tableau. They were curious how SQL and Tableau interacted in a real-world work environment.

As someone a year into my career, I also struggled with this question when I first started. Tutorials rarely cover this topic (you either learn Tableau, or SQL) and yet many, many job adverts require both.

Let me preface this small article by saying that my experiences, described below, will vary significantly from those of another person working in a different environment. The way you use SQL and Tableau together will depend on a range of factors: how your company stores its data, how complete their data team is and how strict the separation of domains is betwen its parts and how your company structures its data. All of these can significantly alter the extent to which you are able to leverage SQL within Tableau.

In my current role, all of my dashboards and reporting begins with an SQL query. For each dashboard project, I create a tailored query that brings in data following this logic:

* Bring in the right amount of data to solve the business problem
* At the right level of granularity (as low as needed)
* With as much business logic / calculations built into the SQL where possible.

The last point is critical and can depend on how granular your data needs to be. While it may be complicated to build in business logic if your data is at the lowest level of granularity (logic often applies to aggregates), building as much of it as possible into the SQL allows me to sacrifice a bit of query performance (an issue only when the dashboard refreshes periodically) for dashboard performance (an issue every time a user uses the dashboard).

The approach often leads to more complex queries and relatively simpler Tableau, where most of the complexity is then directed towards creating a strong UX for stakeholders (navigation, parameter switches, complex filtering). 

Now, all of this may not apply if your professional environment differs in some way. If you are unable / not allowed to write SQL and simply given datasets to visualise, then your Tableau performance is largely dictated with the people who produce the datasets for you. The same applies if views are created for you by another team member, allowing you to simply insert SELECT * FROM <view> into your Tableau.

The amount of performance optimization you do also depends on stakeholder expectations. Colleagues often look in surprise when I argue that any dashboard taking longer than 30 seconds to load is too slow. If your stakeholders are happy with similar or even longer load times, you may want to instead sacrifice Tableau performance for SQL simplicity. This is helpful if you have concerns over maintainability in the future or if your team's skillset skews towards Tableau.

Another interesting consideration is how your approach can affect your development journey too. I found learning SQL incredibly difficult as a self-taught person - it was always difficult to "create" a database to query, and very few datasets available out there replicate the complexity of a corporate operation. I became proficient in SQL primarily in the first few months of my first role, writing queries to address ad-hoc data requests and to create my first dashboards. 

The flipside of this is that because I became proficient at SQL and started pushing most business logic to the SQL, there are entire swathes of calculation-related features in Tableau that I almost never use. This is something to bear in mind especially if changing roles to a place where the balance between SQL and Tableau is significantly different from your current role.

Ultimately, the relationship between SQL and Tableau is one mostly determined by the structure of your company, its data, and its data team. In circumstances where you have some freedom to determine how much to use SQL and how much to rely on Tableau, the relationship becomes one of trade-offs, where you can favour query efficiency (in live dashboard scenarios, or situations where data-cost management is critical) or dashboard efficiency (in situations where stakeholder adoption is hindered by low performance) or attempt to strike a balance between both. 

