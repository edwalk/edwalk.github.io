---
layout: post
title: New Portfolio projects, and a small story about dimensions & values
tags: customer data, tableau
---

You may have noticed that a new project was uploaded on my [Portfolio](/portfolio.md) page. 

I have been dabbling in Tableau for a whole range of different project ideas (see other posts) over the past few months, with little to show for it in terms of completed items. Using all of the different knowledge I've acquired on formatting, using calculated fields and data visualisation, I decided to take my initial Excel project and mirror the customer data dashboard in Tableau.

There are some small stylistic difference between the two (as you can see from the images) but the data shown and the visualisations used are, for all intents and purposes, the same.

It was during the final stages of this project that I encountered my latest... learning experience. 

To create the "Detailed Customer Status" variable, I needed to use a calculated field that leveraged both the number of orders placed and the last purchase date to assign a "status" to each customer in the dataset. This type of measure may be useful for a business who relies on repeat custom to identify different customer personas and tailor promotions and communications campaigns to these different customer "sub-types".

To ensure I was able to visualise both the count of these personas and label them accordingly, I created both a measure and a dimension, which I used to create the last viz in the bottom right of the dashboard.

Unfortunately however, the numbers didn't match what was appearing in Excel.

After a few minutes of reverse engineering the Excel dashboard, I noticed that there was a slight issue with the criteria. I had incorrectly used = instead of >= and therefore a couple 100 records were being categorised differently. I fixed the formula in the measure, and refreshed.

No change. I retried editing the formula. Double checked everything. Tried running some queries to identify which records were being miscategorised. After 30 minutes of searching, I then casually noticed that the dimension formula hadn't been edited.

After adjusting the dimension formula to match the measure formula, the numbers matched perfectly.

While I'm not sure whether using a dimension and a measure in this way is best practice or not, it definitely created an opening for a mistake to creep in and confuse me. From now on, whenever I change one field, make sure all other dependent fields are also edited.
