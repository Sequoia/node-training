# Datastores and ORMs

* MongoDB & Mongo
* MariaDB (MySQL) & Bookshelf

^
- Which to use
- Look at mongo
- Look at mysql

---

## MongoDB

<ul>
  <li class="fragment">"Document database"</li>
  <li class="fragment">Schemaless</li>
  <li class="fragment">BSON</li>
  <li class="fragment">Relatively New</li>
</ul>

^
- documents look like JS objects mostly
- no fixed structure for data
- not text in/out like SQL
- Leave data logic to application

|||

### Considerations

* Easier to scale across servers<!-- .element: class="fragment" -->
* Documents are like JS Objects<!-- .element: class="fragment" -->
* Schemaless<!-- .element: class="fragment" -->
* No "Normalization"<!-- .element: class="fragment" -->
* Non-relational<!-- .element: class="fragment" -->

^
- shards are a core concept (do you need this?)
- shove JS objects directly into mongo
- Flexible data models (pro and con)
- no concept of normalization
- non-relational, long lists of updates
- *personally would not recommend as "go-to"

|||

### Where to get it

* Package managers
* <https://mongodb.org/downloads>
* <https://mongolab.com/>

---

## MariaDB (or MySQL)

<ul>
  <li class="fragment">SQL</li>
  <li class="fragment">Relational/has joins</li>
  <li class="fragment">Transactions</li>
  <li class="fragment">Very Mature</li>
</ul>

|||

### Considerations

* Scaling more complex task<!-- .element: class="fragment" -->
* Tables/Schemas<!-- .element: class="fragment" -->
* Validation in data-store<!-- .element: class="fragment" -->

|||

### Where to get it

* Package managers
* <https://mariadb.org/download/>

|||

<!-- .slide: data-state="transition" -->
Up Next: Resturants Web Server

^
- after questions, introduce the restaurants server
- show it, get everyone to get it running
