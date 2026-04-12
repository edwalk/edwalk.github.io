---
layout: default
---
# Welcome

The journey of an aspiring sports analyst and data engineer.

{% for post in site.posts %}
- [{{ post.title }} — {{ post.date | date: "%Y-%m-%d" }}]({{ post.url }})
{% endfor %}
