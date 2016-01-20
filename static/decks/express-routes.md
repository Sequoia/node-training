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
