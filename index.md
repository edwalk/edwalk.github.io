---
layout: default
---
# Welcome

Welcome to my personal page. I am a data professional with a keen interest in all things data. I hope you find the words here interesting.

{% for post in site.posts %}
- [{{ post.title }} — {{ post.date | date: "%Y-%m-%d" }}]({{ post.url }})
{% endfor %}
