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

## Router

### Express
```js
var server = require('express')();

server.get('/', function (req, res) {
  res.send('Hello World!');
});

server.listen(3000);
```

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

## Node/http:

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

## Express

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
