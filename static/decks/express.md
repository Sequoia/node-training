<!-- .slide: data-state="exercise" -->
1. Change to a new directory: `my-express-app`

2. Initialize a new project and install express

    ```sh
    npm init -y
    npm install --save express
    ```

3. Create an `index.js` containing the following code:

    ```js
    var express = require('express');
    var app = express();

    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

    app.listen(3000);
    ```
4. Point browser to <http://localhost:3000>

^ after this, talk a bit about yesterday
- node core
- async management
- javascript review
- ecosystem & NPM
- with that groundwork laid, today: build some stuff

---

# Express.js

^
- Top HTTP framework by a mile
- Backed by IBM
- Relied upon by many other frameworks

|||

## What is Express?

<ul>
  <li class="fragment">Router</li>
  <li class="fragment">Middleware</li>
</ul>

^
- two main "features"

|||

## What **isn't** Express?

Ruby on Rails

<ul>
  <li class="fragment" >No ORM</li>
  <li class="fragment" >No template engine*</li>
  <li class="fragment" >Very little bundled</li>
</ul>

^
- it's not a full featured framework
- *click thru features*
- very little bundles
- **sugar over httpServer**

|||

## Competitors

|||

## Router

### Express

```js
app.get(path, handlerFunction);
```

```js
function handlerFunction(request, response){ //...
```
<!-- .element: class="fragment" -->

```js
var server = require('express')();

server.get('/', function (req, res) {
  res.send('Hello World!');
});

server.listen(3000);
```
<!-- .element: class="fragment" -->

^
- how to use them
- handler signature
- example

### Node/http
<!-- .element: data-fragment-index="1" class="fragment" -->

```js
var server = require('http').createServer();

server.on('request', function(req, res){
  res.write('Hello World!');
  res.end();
});

server.listen(3000);
```
<!-- .element: data-fragment-index="1" class="fragment" -->

^ links http paths/request types to handler methods
- much like 

|||

### With Node/http:

```js
//http-greet-route.js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(request, response){
  var reqUrl = url.parse(request.url);
  if(reqUrl.pathname == '/'){
    rootHandler(request, response);
  }
  else if (reqUrl.pathname ==  '/greet'){
    greetHandler(request, response);
  }
});

function rootHandler(req, res){
  res.end('Hello World!');
}

function greetHandler(req, res){
  var query = querystring.parse(url.parse(req.url).query);
  res.end('Hello ' + query.name);
}

server.listen(3000);
```

|||

### With Express

```js
//my-express-project/greeter.js

var server = require('express')();

server.get('/', handleRoot);
server.get('/greet', handleGreet);
  
function handleRoot(req, res) {
  res.send('Hello World!');
}

function handleGreet(req, res) {
  res.send('Hello ' + req.query.name);
}

server.listen(3000);
```

^
- easier to reason about
- less code
- more explicit
- handles basic boilerplate-y tasks: **what a framework is for!**

|||

## Middleware

Map functions to a (set of) routes

```js
app.use(path, middleware);
```

```js
function middleware(req, res, next){
  //do some stuff
  next();
}
```
<!-- .element: class="fragment" -->

^
- path is optional

|||

### Middleware Example

```js
var auth = require('auth-middleware');
var static = require('static-middleware');
var logger = require('log-middleware');

app.use(logger);
app.use('/assets', static('site/assets'));
app.use('/admin', auth)

app.get('/', handleRoot);
app.get('/users', listUsersHandler);

app.get('/auth/home', authHomeHandler);
app.get('/auth/users/create', userForm);
app.post('/auth/users/create', createUser);
// ...
```

^
- logger: all requests
- static: requests to 'assets' path
- auth: all auth routes

|||

### One weird trick...

```js
function handler(req, res){
  res.end('Hello World!');
}
```
<!-- .element: class="fragment" -->

```js
function middleware(req, res, next){
  //do some stuff
  next();
}
```
<!-- .element: class="fragment" -->

```js
app.use(path, middleware);
app.get(path, handler);
```
<!-- .element: class="fragment" -->

**"Routes" are middleware that don't call next!**
<!-- .element: class="fragment" -->

^
- also they typically use a shorthand `use` method

|||

## Finding help

* <http://expressjs.com/en/4x/api.html>
  * *Check out "Guide" in the menu!*
* <http://devdocs.io>

---

### Route methods

<http://expressjs.com/en/guide/routing.html>

* `app.get`
* `app.post`
* `app.delete`
* `.head`, `.put`, `.patch`, `.options`, ...

^
- *demo changing get to post* (use postman)
- *demo using `.use` and `req.method`

|||

<!-- .slide: data-state="exercise" -->
1. `GET /greet` replies 'Hello, you!'
2. `GET /count` replies
  * 'Count: 1' on first request
  * 'Count: 2' second request, etc.

Hints:
* Remember scope

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

Make a server wherein...
1. `/test/` alone replies "you requested '/test/'"
1. `/test/[any number of characters]` replies "you requested '/test/something'"
1. any other route replies "you requested something else"

Hints:
* Wildcards

^
- answer in wildecard-route.js

|||

<!-- .slide: data-state="transition" -->
*Up Next: the `request` object*

---

### `request` Object

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

```js
var users = [
  { name: 'Qian' },
  { name: 'Zeynep'},
  { name: 'Raisel'}
];
```

Create server ...
1. `/users/1` replies with 'User 1: Zeynep'
1. `/users/1?title=Ms.` replies with 'User 1: Ms. Zeynep'

Hints:
* Arrays are indexed to 0:
  ['a','b','c'][1] === 'b'

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

## `request` Object
<http://expressjs.com/en/4x/api.html#res>

<ul>
  <li class="fragment" >`res.send(string|buffer|object)`</li>
  <li class="fragment" >`res.json(object)`</li>
  <li class="fragment" >`res.status(httpStatusCode)`</li>
  <li class="fragment" >`res.set(headerName, headerValue)`<br>
  `res.set({name: 'value'})`</li>
  <li class="fragment" >`res.sendFile(path)`</li>
  <li class="fragment" >`res.download(path)`</li>
  <li class="fragment" >`res.render(template, data)`</li>
</ul>

^
- send sets `Content-Length` (text/html for strings!)
- sendfile is super useful
- **Who's done download by hand?**
- `render` we'll talk about later

|||

## `req.send`

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

## `req.json`

```js
req.json([
  {id : 1, name : 'Sequoia'},
  {id : 2, name : 'Jackson'},
  {id : 3, name : 'Christine'}
]);
```
<!-- .element: class="fragment" -->

```js
req.json(null)
```
<!-- .element: class="fragment" -->


|||

  <li class="fragment" >`res.status(httpStatusCode)`</li>
  <li class="fragment" >`res.set(headerName, headerValue)`<br>
  `res.set({name: 'value'})`</li>
  <li class="fragment" >`res.sendFile(path)`</li>
  <li class="fragment" >`res.download(path)`</li>
  <li class="fragment" >`res.render(template, data)`</li>
