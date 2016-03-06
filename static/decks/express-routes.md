### Route methods

<http://expressjs.com/en/guide/routing.html>

* `app.get`
* `app.post`
* `app.delete`
* `.head`, `.put`, `.patch`, `.options`, ...

^
- *demo changing get to post* (use postman)
- demo using `.use` and `req.method`
- show how you can use handler functions

|||

`express-app/start/counter.js`
<!-- .slide: data-state="exercise" -->
1. `GET /greet` replies 'Hello, you!'
2. `POST /count` Increments a counter
3. `GET /count` replies with the current count
4. `DELETE /count` sets count to 0

Hints:
1. What scope does your counter live in? 
2. Use Postman or another REST tool to post/delete

Extra Credit:
1. Reply with JSON (and appropriate headers!)

^
- don't worry about post-data, will handle that later

|||

### Wildcard routes

`*` can match any number of characters.

```js
app.get('/users/*`, handleUsers);
```

|||

### Route patterns

Routes can be Regular Expressions

```js
app.get(/.*nodejs$/, function(req, res) {
  res.send('Your request path ended with "nodejs"!');
});
```

^
- work together thru `regex-route.js`

|||

```js
app.get('*', function(req, res) {
  res.send('you requested something else');
});

app.get('/test', function(req, res) {
  res.send('you requested /test');
});
```

**Order matters!**
<!-- .element: class="fragment" -->

^
- **what do you think will happen?**
- try it out

|||

<!-- .slide: data-state="exercise" -->

`express-app/start/wildcard-route.js`

1. `GET /test/` alone replies "you requested '/test/'"
1. `GET /test/[any number of characters]` replies "you requested '/test/something'"
1. any other route replies "you requested something else"

Extra Credit:
1. For route (2) above, include the characters after /test/ in your reply

^

|||

<!-- .slide: data-state="transition" -->
*Up Next: the `request` object*

---

## `request` Object

<http://expressjs.com/en/4x/api.html#req>
* `req.app`
* `req.body`
* `req.path`
* `req.query`
* `req.params`
* `req.xhr`
* `req.method`

^
- body is raw, unparsed body
- path is without querystring
- query is PARSED querystring
- params is route parameters

|||

### Key Differences from `HTTP.IncomingMessage`
<ul>
  <li class="fragment">`url.parse` not needed</li>
  <li class="fragment">`querystring.parse` not needed</li>
</ul>

|||

### Query Parameters

```js
// req.params.js
var server = require('express')();

// example: GET /?foo=bar
server.get('/', function(req, res){
  res.send('foo is... ' + req.query.foo);
});

server.listen(3000);
```

|||

### Named Parameters

```js
var server = require('express')();

server.get('/:foo', function(req, res){
  res.send(':foo is... ' + req.params.foo);
});

server.listen(3000);
```

|||

<!-- .slide: data-state="exercise" -->

`start/restaurants-server-1.js`:
1. `/restaurants/2` replies...<br>
  'Restaurant 2: Taco Gong'

Hints:
```js
var users = [
  { id: 1, name: 'Qian' },
  { id: 2, name: 'Zeynep'},
  { id: 3, name: 'Raisel'}
];
var qian = findById(users, 1);
```


^
Time allowing:

**how would we create listing of all?**

Extra Credit:
2. `/users` replies with all users:
    ```
    User 0: Qian
    User 1: Zeynep
    User 2: Raisel
    ```

|||

<!-- .slide: data-state="transition" -->
*Up Next: the `response` object*

---

## `response` Object
<http://expressjs.com/en/4x/api.html#res>

<ul>
  <li class="fragment" >`res.send(string|buffer|object)`</li>
  <li class="fragment" >`res.json(object)`</li>
  <li class="fragment" >`res.status(httpStatusCode)`</li>
  <li class="fragment" >`res.set(headerName, headerValue)`<br>
  `res.set({name: 'value'})`</li>
  <li class="fragment" >`res.redirect(url)`</li>
  <li class="fragment" >`res.sendFile(path, options, callback)`</li>
  <li class="fragment" >`res.download(path)`</li>
  <li class="fragment" >`res.render(template, data)`</li>
</ul>

^
- send sets `Content-Length` (text/html for strings!)
- sendfile is super useful
- **Who's done download by hand?**
- `render` we'll talk about later

|||

## `res.send`

```js
res.send('<h1>Sequoia\'s WebZone!</h1>');
```
<!-- .element: class="fragment" -->

```js
res.send({ id: 1, name: 'Zeynep' });
```
<!-- .element: class="fragment" -->

```js
res.send(new Buffer('Here is an octet-stream for you!'));
```
<!-- .element: class="fragment" -->

^ sets header type

|||

## `res.json`

```js
res.json([
  {id : 1, name : 'Sequoia'},
  {id : 2, name : 'Jackson'},
  {id : 3, name : 'Christine'}
]);
```
<!-- .element: class="fragment" -->

```js
res.json(null)
```
<!-- .element: class="fragment" -->

```js
res.json("<h1>Hello!</h1>");
```
<!-- .element: class="fragment" -->

^
- `res.json` will send application/json header no matter what 
- treats non-object values as json

|||

<!-- .slide: data-state="exercise" -->
`start/restaurants-server-2.js`

1. Update `/restaurants/:id` route to send json
2. `/restaurants/` replies with all restaurants as json

^
should be easy...

|||

## `res.status`

```js
res.status(204); // No Content
```
<!-- .element: class="fragment" -->

```js
res.status(404)
   .send('Not Found');

///or perhaps

res.status(404)
   .json({error : 'Not Found'});
```
<!-- .element: class="fragment" -->

```js
res.status(500)
   .sendFile('/var/www/shared/internal_error.html');
```
<!-- .element: class="fragment" -->

^
- can be chained

|||

## `res.set`

```js
res.set('Content-Type', 'text/markdown');
```
<!-- .element: class="fragment" -->

```js
res.set({
  'X-Powered-By' : 'Sequoia\'s #1 Web Framwork!/v2.5',
  'X-Favorite-Animal': 'Hamster',
  Pragma : 'no-cache'
});
```
<!-- .element: class="fragment" -->

|||

## `res.redirect`

```js
res.redirect('http://other.url.com');
```
<!-- .element: class="fragment" -->

```js
// GET /admin/users/

res.redirect('../login');

// => /admin/login

```
<!-- .element: class="fragment" -->

|||

## `res.sendFile`

*Takes (optional) callback with error-first function signature*

```js
function fileSent(err){
  if(err){
    console.error(err);
    res.status(err.status).end();
  }
}

var options = { root: '/var/static/' };
```
<!-- .element: data-fragment-index="2" class="fragment" -->

```js
res.sendFile('app.js', options , fileSent);
```
<!-- .element: data-fragment-index="1" class="fragment" -->


^
- **What does callback sig tell us?**
- options include cache-control header, file root path
- options object optional

|||

## `res.sendFile`

```js
app.get('/assets/protected/:filename' function(req,res){
  if(req.user && hasAccess(req.params.filename, req.user)){
    res.sendFile(req.params.filename, options, fileSent);
  }else{
    res.status(403).send('Not Authorized');
  }
});

// @return Boolean : true if user has access to requested file
function hasAccess(file, user){ /*...*/
```

^
- useful when you need to prog. protect certain files
- **Where did request.user come from?** Will cover soon
- exercise with this?

|||

## `res.download`

```js
res.download('/path/to/file.ext');
```
<!-- .element: class="fragment" -->

```js
res.download('/path/to/file.ext', 'response.txt');
```
<!-- .element: class="fragment" -->

```js
res.download('/path/to/file.ext', 'response.txt', fileSent);
```
<!-- .element: class="fragment" -->

^ 
- Uses `sendFile` 
- sets `Content-Disposition` header so it will d/l

|||

## `res.render`

<http://expressjs.com/en/guide/using-template-engines.html>

```js
res.render('index');
```
<!-- .element: class="fragment" -->

```js
res.render('userList', users);
```
<!-- .element: class="fragment" -->

```js
res.render('user', {
  name: 'Michelle',
  role: 'Admin'
});
```
<!-- .element: class="fragment" -->

^
- Renders template
- optionally passes in data
- **We'll talk about templates more in a bit**

|||

## 4.0 Router

```js
// user-router.js
var router = require('express').Router();
module.exports = router;

router.get('/', allUsersHandler);
router.get(':id', getUserHandler);
router.post('/', createUserHandler);
```

```js
// server.js
var app = require('express')();
var userRouter = require('./user-router');

app.use('/users/', userRouter);

// ...
```
<!-- .element: class="fragment" -->

^
- now `/users/:id` is passed to `getUserHandler`
- **Why might this be good?**
- allows modularization
- do one together with math ops? TODO: make exercise of this?

|||

<!-- .slide: data-state="exercise" -->
`start/restaurants-server-3.js`

1. Move `/restuarants/` routes to **new** external module
2. Mount router on `/restaurants` (paths work as before)

Hints:
0. Mount router on `/foo`, don't put `/foo` in router paths!!
1. Router module
    ```js
    //fooRouter.js
    var Router = require('express').Router;
    var router = module.exports = Router();           
    router.get('/' /*...*/);
    ```
2. Using router module
    ```js
    var router = require('./fooRouter')
    app.use('/foo', router);
    ```

^ 15min?

|||


<!-- .slide: data-state="transition" -->
*Up Next: Middleware*
