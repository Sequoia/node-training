# Sequelize

^
- Sequelize is an ORM

---

## What is an ORM?

"Object Relational Mapper"

^
- allows you to represent your documents as objects in code & access them thus
- "queries" are abstracted away

---

## Sequelize setup
```no-highlight
$ npm install --save sequelize

# And one of the following:
$ npm install --save pg pg-hstore
$ npm install --save mysql // For both mysql and mariadb dialects
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL
```

---

## Sequelize setup

```js
var Sequelize = require('Sequelize');

var db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
```

```js
var db = new Sequelize('postgres://user:pass@host:5432/dbname');
```
<!-- .element: class="fragment" -->

---

## Models

```js
var Restaurant = db.define('Restaurant', {
  name: { type: Sequelize.STRING, },
  founded: { type: Sequelize.INTEGER }
});

var Dish = db.define('Dish', {
  name: { type: Sequelize.STRING, },
  spicy: { type: Sequelize.BOOLEAN }
});
```

^ 
- Create our models
- sequelize objects that allow us to build queries
- names are model "names", will be pluralized to create tables
- No tables yet!

---

## Relationships

* `hasOne`
* `belongsTo`
* `hasMany`

**Automatically add foreign key id fields**

```js
Restaurant.hasMany(Dish);
//adds RestaurantId to Dish
```
<!-- .element: class="fragment" -->

^
- has one vs. belongsTo: determines where ID fields are added

---

## Syncing Models

```js
db.sync()
```

```js
db.sync({force: true});
```
<!-- .element: class="fragment" -->

^
- Creates Tables
- Creates Tables + drop
- *Look at sequelize-restaurants*

---

<!-- .slide: data-state="exercise" -->
In `sequelize-restaurants`...

1. `npm install`
2. edit `index.js` to match your environment
3. `node .`

Hints:
* **Grants!** Consider using `root`<br>(never in production of course &#9786;)
* Database must be created, but not tables

---

## `Restaurants`

```no-highlight
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| name      | varchar(255) | YES  |     | NULL    |                |
| founded   | int(11)      | YES  |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
```

## `Dishes`

```no-highlight
+--------------+--------------+------+-----+------+----------------+
| id           | int(11)      | NO   | PRI | NULL | auto_increment |
| name         | varchar(255) | YES  |     | NULL |                |
| spicy        | tinyint(1)   | YES  |     | NULL |                |
| createdAt    | datetime     | NO   |     | NULL |                |
| updatedAt    | datetime     | NO   |     | NULL |                |
| RestaurantId | int(11)      | YES  | MUL | NULL |                |
+--------------+--------------+------+-----+------+----------------+
```

^
- created fields:
  - id
  - createdAt
  - updatedAt
  - RestaurantId
- *Explore the data a bit*

---

## Queries

* `Model.find`
* `Model.findById`
* `Model.findAll`
* Return Promises

```js
Post.findAll()
  .then(function(posts){
    //do something with posts Array
  });
```

---

<!-- .slide: data-state="exercise" -->
Connect the `/restaurants/` route

Hints:
* Promise!!
  ```js
  Model.findAll()
    .then(function(results){
      //use results
    });
  ```
* Template expects an object with a `restaurants` key:
  ```no-highlight
  each restaurant in restaurants
    li
      a(href='/restaurants/' + restaurant.id)= restaurant.name
  ```

---

## Query Conditions

```js
Post.findAll({
  where: {
    featured : true
  }
});
```

```sql
SELECT * FROM Posts WHERE featured = 1;
```

^
**I'm simplifying these queries some**

---

## Query Conditions

```js
$or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)

$gt: 6,                // > 6
$gte: 6,               // >= 6

$ne: 20,               // != 20

$between: [6, 10],     // BETWEEN 6 AND 10
$notBetween: [11, 15], // NOT BETWEEN 11 AND 15

$in: [1, 2],           // IN [1, 2]
$like: '%hat',         // LIKE '%hat'
```

^
- ditto `not` prefix for in & like

---

## Query Conditions

```js 
Post.findAll({
  where : {
    $or : [
      { featured : true },
      { likes : { $gte : 10 } }
    ]
  }
});
```

```sql
SELECT * FROM Posts
  WHERE (featured = 1 OR likes >= 10)
```

---

## Attributes

```js
Post.find({
  where: { id : 32 },
  attributes : [ 'title', 'url']
});
```

```sql
SELECT title, url FROM Posts WHERE id = 32
```

---

## Relations

```js
Post.find({
  where: { id : 32 },
  include: [ Comment ]
});
```

```sql
SELECT * FROM Posts
  LEFT OUTER JOIN Comments ON Posts.id = Comments.PostId
  WHERE id = 32
```

```js
Post.findById(32, { include: [ Comment ] });
```
<!-- .element: class="fragment" -->

^
- actually doesn't do `*` it names each field
- could also use findById here

---

<!-- .slide: data-state="exercise" -->
Connect the `/restaurants/:id` route

Hints:
* id passed in `req.params`
* `findById`
* `include : [ Related, Models, Here ]`
* Promise!!
* Template expects an object with `name`, `founded`, `Dishes` keys

---

## Saving data

### Build & Save
```js
var hd_post = Post.build({
  title : 'Are Hotdogs Sandwiches?'
});

hd_post.contents = postContents;
hd_post.save();
```

### Create
<!-- .element: data-fragment-index="1" class="fragment" -->

```js
Post.create({
  title : 'Are Hotdogs Sandwiches?',
  contents : postContents
})
.then(function(hd_post){ ... });
```
<!-- .element: data-fragment-index="1" class="fragment" -->

^
- building model does not persist it to database!
- *create does*

---

## Updating data

```js
Post
  .findById(123)
  .then(function(hd_post){
    hd_post.update({
      title : 'The Hotdog Dilemma'
    });
  })
```

```js
Post.update(
  { title : 'The Hotdog Dilemma' },
  { where : { id : 123 } }
);
```
<!-- .element: class="fragment" -->

^

- second is "bulk update"

---

<!-- .slide: data-state="exercise" -->
Connect the `POST /restaurants/` route

Hints:
* `req.body` (already parsed! &#9786;)
* Promise!!
  ```js
  Model.saveOperation(data)
    .then(function(newRecord){
      // console.log(newRecord.id)
    });
  ```
* `create` **or** `build` & `save`

---

<!-- .slide: data-state="transition" -->

Up Next: Mongoose
