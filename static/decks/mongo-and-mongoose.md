# Mongo & Mongoose

^
- Mongoose is an ODM for mongo

---

## What is an ODM?

"Object *Document* Mapper"

---

## Mongoose setup
```no-highlight
$ npm install --save mongoose
```

---

## Mongoose setup

```js
var mongouri = 'mongodb://username:password@host:51625/db-name';

mongoose.connect(mongouri);

//handle connection error
mongoose.connection.on('error', function(e){
  console.error(e);
});
```

```js
var mongouri = process.env.MONGOURI; //set in process.env
```
<!-- .element: class="fragment" -->

^
- **Or put mongoURI in environment (what I do)
- Once connection is set-up you mostly use Models to query

---

## Schema & Models

```js
//schema//
var dishSchema = mongoose.Schema({
  name: String,
  spicy: Boolean
});

var restaurantSchema = mongoose.Schema({
  name: String,
  founded: Number,
  Dishes: [ dishSchema ]
});

//model//
var Restaurant = mongoose.model('Restaurant', restaurantSchema);
```

^ 
- Create our models
- Also just JS objects, no data 'til you save
- First must create "schema" to represent data structure
- Create a "Model" with that schema
- *note only exporting restaurant*
- mongoose.model is where collection *name* is set

---

## ~~Relationships~~ Population

* Restaurants Collection *and* Dishes collection
* Enter foreign key IDs like SQL
* Mongoose **"populates"** the Restaurant with related Dishes

^
- *We're not doing this*
- If you have a lot of data like this, probably better off with SQL
- **We have hasMany unique dishes** well-suited for document

---

## ~~Relationships~~ Sub-documents

```js
var restaurantSchema = mongoose.Schema({ /* name, founded, ...*/
  Dishes: [ dishSchema ]
});
```

```json
[
  {
   "_id": { "$oid": "56afe2b362e2946e89dd0e38" },
  "name" : "Amici's",
  "founded": 2010,
  "Dishes": [
    {
      "name" : "tacos",
      "spicy" : true 0},
      "_id": { "$oid": "56afe2b362e2946e89dd0e3f" },
    ...
  },
  ...
]
```
<!-- .element: class="fragment" -->

^
- Dishes is just a property of restaurant record
- Dish schema defines **structure** of the sub-doc, **not another collection**

---

## Syncing Models

Nope!

^
- No need to sync because you can send differently structured data every
time & mongo doesn't care

---

<!-- .slide: data-state="exercise" -->
In `mongoose-restaurants`...

1. `npm install`
2. edit `index.js` to match your environment
3. `node .`
4. Explore data:
`https://mongolab.com`<br>`/databases/{db}/collections/restaurants`

Hints:
* Feel free to hardcode the mongoURI
  * Otherwise, `export MONGOURI=<yourmongouri>`
* get mongoURI from `https://mongolab.com/databases/{db}`

^
*show off demoing 

---

## `restaurants` collection

```no-highlight
[
  {
      "_id": {
          "$oid": "56afe2b362e2946e89dd0e25"
      },
      "name": "Taco Gong",
      "founded": 2011,
      "Dishes": [
          {
              "name": "Pancakes",
              "spicy": false,
              "_id": {
                  "$oid": "56afe2b362e2946e89dd0e2c"
              }
          },
          ...
```

^
- *Explore the data a bit*
- "Object ID", unique ids in mongo
  - required on EVERY document
  - contain creation timestamp

---

## Queries

* `Model.findOne`
* `Model.findById`
* `Model.find`
* Take **callbacks**

```js
Model.find([conditions, projection, options,] callback);
```

```js
Post.find(handlePosts);

function handlePosts(err, posts){
  //do something with posts Array
}
```
<!-- .element: class="fragment" -->

^
- explain args
- all but callback are optional

---

## Promises

```js
Post.find()
  .exec()
  .then(handlePosts)
  .catch(function(e){ console.error(e); });

function handlePosts(posts){
  //do something with posts Array
}

```

^
- *Use this one*
- exec makes it return a promise
- we can swap out promises impl which we've done in connection (line 2)

---

<!-- .slide: data-state="exercise" -->
Connect the `/restaurants/` route

Hints:
* Promise!! (**and `exec`**)
  ```js
  Model.find().exec()
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
Post.find({ featured : true })
  .exec().then(handler);
```

```js
Post.find()
  .where({featured : true })
  .exec().then(handler);
```
<!-- .element: class="fragment" -->

---

## Query Conditions

```js
Person
  .find({ occupation: /host/ })
  .where('name.last').equals('Ghost')
  .where('age').gt(17).lt(66)
  .where('likes').in(['vaporizing', 'talking'])
  .limit(10)
  .sort('-occupation')
  .exec().then(handler);
```

^
- *won't use these, just wanted to show them*

---

## ~~Attributes~~ Projections

```js 
var query = Post.find(
    {featured : true},
    'title slug description' //fields to "project"
  )
  .exec().then(handler);
```

```js 
Post.find()
  .where({featured : true })
  .select('name occupation')
  .exec().then(handler);
```
<!-- .element: class="fragment" -->

---

## ~~Relations~~ Sub-documents

**Included by default**

```json
[
  {
   "_id": { "$oid": "56afe2b362e2946e89dd0e38" },
  "name" : "Amici's",
  "founded": 2010,
  "Dishes": [
    {
      "name" : "tacos",
      "spicy" : true 0},
      "_id": { "$oid": "56afe2b362e2946e89dd0e3f" },
    ...
  },
  ...
]
```

^
- if you don't want them remove from projection
- we'll talk about more when we discuss queries

---

<!-- .slide: data-state="exercise" -->
Connect the `/restaurants/:id` route

Hints:
* id passed in `req.params`
* `findById`
* Promise!! (and `exec`!!)
* Template expects an object with `name`, `founded`, `Dishes` keys

---

## Saving data

### Build & Save
```js
var hd_post = new Post({
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
- **create statements do not require `exec`!**
- **create is IDENTICAL to sequelize code!**

---

## Updating data

```js
Post
  .findById(123)
  .then(function(hd_post){
    hd_post.title = 'The Hotdog Dilemma'
    hd_post.save;
  }).exec(callback);
```

```js
var oldTitle = 'Are Hotdogs Sandwiches?';
var newTitle = 'The Hotdog Dilemma';

Post.findOneIdAndUpate(
  { title : oldTitle},
  { title : newTitle}
).exec(callback);
```
<!-- .element: class="fragment" -->

^

---

<!-- .slide: data-state="exercise" -->
Connect the `POST /restaurants/` route

Hints:
* `req.body` (already parsed! &#9786;)
* no need for `exec`
* `create` **or** `new Model` & `save`
* You may experience code  d&#233;j&#224; vu...

---

<!-- .slide: data-state="transition" -->

Up Next: Wrap up!
