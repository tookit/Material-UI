
## Search page default state
 - when there is no keywords, do we user match_all  query to show records ?

A: No, we should display a full screen search bar, similar to Google. We can show stats from api/v1/stats
See https://aleph.occrp.org/ frontpage

## How to search record in one category ?

Category filters are peculiar since only "collections" belong to a category.
To filter one or more category:

1. Obtain the list of "collections" that belong to a given category

with one category
curl -d '{"query": {"term": {"category": "combo"} }, "size": 2}' [...]/api/v1/elastic/search/elephant-collection*
OR with multiple categories
curl -d '{"query": {"terms": {"category": ["combo", "dump"]} }, "size": 2}' [...]/api/v1/elastic/search/elephant-collection*

2. Obtain documents

Create an array of collection_id from previous results and filter using a term query

curl -d '{"query": {"terms": {"collection_id": ["breachcompilation_combo_2017"]} }, "size": 2}' [...]/api/v1/elastic/search/elephant-entity*

In practise, the second search query should be a "bool" query with the existing user query and we add the "terms" condition to the "must" array.


## Analytics api is ready ?


## In detail page, if the entity type is "File", do we need to show the detail tab ?
