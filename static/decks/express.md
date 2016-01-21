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
  <li class="fragment" >No template engine\*</li>
  <li class="fragment" >Very little bundled</li>
</ul>

^
- it's not a full featured framework
- *click thru features*
- very little bundles
- **sugar over httpServer**

|||

## Competitors

TODO?

|||

## Router

```js
app.get(path, handlerFunction);
```

```js
function handlerFunction(request, response){ //...
```
<!-- .element: data-fragment-index="0" class="fragment" -->

^
- links http paths/request types to handler methods
- how to use them
- handler signature
- example

|||

### Express Hello World

```js
var server = require('express')();

server.get('/', function (req, res) {
  res.send('Hello World!');
});

server.listen(3000);
```

### Node/http Hello World
<!-- .element: data-fragment-index="2" class="fragment" -->

```js
var server = require('http').createServer();

server.on('request', function(req, res){
  res.write('Hello World!');
  res.end();
});

server.listen(3000);
```
<!-- .element: data-fragment-index="2" class="fragment" -->

|||

### Node/http Two Routes
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

---

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

|||

<!-- .slide: data-state="transition" -->
*Up Next: Routes*

^
TODO: Do I need a section on app methods, app.set etc.?

