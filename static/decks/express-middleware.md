# Middleware

Map functions to a (set of) routes

<http://expressjs.com/en/guide/using-middleware.html>

<ul>
  <li class="fragment">Trigger side effects</li>
  <li class="fragment">Alter `request`</li>
  <li class="fragment">Alter `response`</li>
  <li class="fragment">"short circuit" request/response flow</li>
</ul>

^
- logging for example
- add stuff like "user id"
- add headers for example
- e.g. check auth & skip to error

|||

## Middleware Signature

Arguments:
1. `request`
2. `response`
3. `next`

```js
function middleware(req, res, next){
  //do some stuff
  next(); //go to next matching middleware/route
}
```
<!-- .element: class="fragment" -->

```js
function middleware(req, res, next){
  doSomethingAsync(function done(err, results){
    if(err){ return next(err); }

    req.extraStuff = results;
    next();
  })
}
```
<!-- .element: class="fragment" -->

^
- **We'll discuss passing errors in a moment**

|||

## Using Middleware

```js
app.use(middleware);
```
<!-- .element: class="fragment" -->

```js
app.use(path, middleware);
```
<!-- .element: class="fragment" -->

```js
app.get(path, middlewareOne);
app.post(path, middlewareTwo);
app.delete(middlewareThree);
```
<!-- .element: class="fragment" -->

^
- attach to all requests
- attach to path, all types
- attach to only certain request types

|||

## Middleware Order

```js
app.get('/', function(req, res, next){
  /* run first */
  next();
});

app.get('/', function(req, res, next){
  /* run second */
  res.send('done!');
});

app.get('/', function(req, res, next){
  /* never runs */
  next();
});
```

^
&rarr; now let's look at what we can do with middleware...

|||

## Alter Request

```js
app.use(function(req, res, next){
  req.foo = 'something';
});
```

^
- add something for use later

|||

## Alter Request Example

Generated placeholder images

```no-highlight
//GET /placeholder/png?size=200x300
//GET /placeholder/jpg?size=10x20
//GET /placeholder/jpg?x=100&y=200
//GET /placeholder/gif?x=50&y=20
```

```js
app.get('/placeholder/*', function(req, res, next){
  if(req.query.size){
    req.dimensions = req.query.size.split('x');
  }else if(req.query.x && req.query.y){
    req.dimensions = [req.query.x, req.query.y];
  }else{
    req.dimensions = [200, 200];
  }
  next();
});
```
<!-- .element: class="fragment" -->

```js
app.get('/placeholder/gif',function(req, res){
  var img = generateImage(req.dimensions);
  /*...*/
```
<!-- .element: class="fragment" -->

^
Example: generating placeholder images

|||

### Useful Request-Altering Middleware

<ul>
  <li class="fragment">`body-parser`</li>
  <li class="fragment">`cookie-parser`</li>
  <li class="fragment">`express-session`</li>
</ul>

^
**Demo body-parser middleware** TODO: write demo

|||

<!-- .slide: data-state="exercise" -->
## Update `user-server`
1. `POST /user` adds a user to the user-list
2. Accept `json` input

Hints:
1. `body-parser`
2. Postman 
  1. `POST /user`
  2. Body: `{"name" : "Digoo", "id" : 100}`

Extra Credit:
1. accept `{"name":"Terry"}` & add `id` automatically

|||

## Alter Response

<!-- .slide: data-state="exercise" -->
Alter a server with multiple routes...
1. Keep track of server uptime
2. Add `X-Server-Uptime` header (time in ms) to **all** responses.

Hints:
* `Date.now()` (*or* see node `process` docs)
* Pay attention to scope
* Middleware!!

^

**Do it together at end**

TODO: solution for this one

|||

### Useful Response-Altering Middleware

<ul>
  <li class="fragment">`compression`</li>
  <li class="fragment">`response-time`</li>
  <li class="fragment">`express-partial-response`</li>
</ul>

^
- compresses responses
- adds `X-Response-Time` header (in 'til out)
- filter json by `?fields`

|||

## Side Effects

<!-- .slide: data-state="exercise" -->
Create middleware to log all requests as follows:
```no-highlight
[client IP]: [METHOD] [path] 
```

e.g.
```no-highlight
172.52.221.10: GET /
172.52.221.10: GET /users
172.52.221.10: POST /users
```

Hints:
* Remember The Fun Manual!

Extra Credit:
1. Pad strings for even columns
2. Colors

^
**Do together?**

|||

### Useful side-effects middleware

<ul>
  <li>`morgan`</li>
</ul>

^
Show morgan example:
`app.use(morgan(':remote-addr: :method :url'))`
TODO: Make sure this works ^


|||

## "Short Circuit" Request

Respond (or error) immediately for certain requests

```js
//reject unlucky requests
app.use(function(req, res, next){
  if(Math.random() > .5){
    console.error('UNLUCKY USER!!!');
    res.status(403).send('Not Authorized (Unlucky User)');
  }
  else{
    next();
  }
});

app.get('/', function(req, res){
  /*...*/
```
<!-- .element: class="fragment" -->

^
- we don't call next, we prevent any further paths from loading

|||

### Useful "Short Circuit" Middleware

<ul>
  <li class="fragment">`passport`</li>
  <li class="fragment">`express.static`</li>
  <li class="fragment">`serve-index`</li>
</ul>

^
- passport does auth & adds req.user

demo serve-index
```js
app.use('/ftp', serveIndex('/Users/sequoia', {'icons': true}))
app.listen(9090)
```

|||

<!-- .slide: data-state="exercise" -->
Use the `express.static` middleware to serve:
1. an `index.html` file with...
2. a `css` file
3. an image

Hints:
* Examples: <http://expressjs.com/en/guide/using-middleware.html>
* Remember you can use any arbitrary directory as `{ root }`
* It will serve `index.html` by default

|||

<!-- .slide: data-state="transition" -->
Up Next: Error Handling

---

## Error Handling Middleware

Arguments:
1. **`error`**
1. `request`
2. `response`
3. `next`

```js
function errorMiddleware(err, req, res, next){
  res
    .status(err.code)
    .send(err.message);
}
```
<!-- .element: class="fragment" -->

```js
app.use('/', rootHandler);
app.use('/user', userRouter);
//...

app.use(errorHandlerMiddleware);
```
<!-- .element: class="fragment" -->

^
- put app routes first (order!!)

|||

### Invoking Error Handler

```js
app.get('/user/:id', function(req, res, next){
  db.Users.get({id: req.params.id}, function(err, user){
    if(err){
      next(err);
    }else{
      res.json(user);
    }
  });
});
```

```js
app.use(function(err, req, res, next){
  console.error(err);
  res.status(500).send('Error');
});
```
<!-- .element: class="fragment" -->

^
- *walk thru code*

|||

### Invoking Error Handler

```js
app.use(someLoginMiddleware);

app.use('/account/*', function gateAdminArea(req, res, next){
  if(!req.user){
    var e = new Error('Please log in');
    var e.code = 403;
    next(e);
  }
});

app.use('account/edit', /*...*/);
app.use('account/subscriptions', /*...*/);
// ...

app.use(function(err, req, res, next){
  /* handle error */
});
```

^
- *walk thru code*

|||

### Multiple Error Handlers

```js
app.get('/post/:id', function gateAdminArea(req, res, next){
  db.Posts.get({id: req.params.id}, function(err, post){
    if(err){
      //there was an internal/db error
      err.code = 500;
      next(err);
    }else if( isEmpty(post) ){
      next(makeError('Post Not Found!', 404));
    }
    else res.json(post);
  }
});
```

^
- *walk thru code*
- Two types of error

|||

### Multiple Error Handlers

```js
app.use(function handle404(err, req, res, next){
  if(err.code !== 404) return next(err);

  logger.info('NOT FOUND: ' + req.originalUrl');
  next(err);
});

app.use(function handle500(err, req, res, next){
  if(err.code < 500 || err.code > 599) return next(err);

  logger.urgent(err.message);
  emailAdmin(new Date(), err.toString());

  next(err);
});

app.use(function errorPage(err, req, res, next){
  res.render('error_page', err);
});
```

^
- walk thru with a couple diff. paths

|||

### Catchall Handler

```js
app.use(404Handler);
app.use(OtherErrorHandler);
app.use(500Handler);

app.use(function catchallErrorHandler(err, req, res, next){
  res.status(500).send('We do not know what happened... sorry!');
});
```

|||

### Catchall Route

```js
app.get('/', /*...*/);
app.get('/admin', /*...*/);
app.get('/post/:id', /*...*/);
app.post('/post/:id', /*...*/);
/* ... */

app.use(function catchallRoute(req, res, next){
  next(makeError('We couldn\'t find it!', 404));
});
```

|||

<!-- .slide: data-state="exercise" -->

1. log in RED for `500`s
2. log in YELLOW for `404`
3. ensure status code is an HTTP code

```js
// handle-errors.js
var app = require('express')();
var thrower = require('error-throwing-middleware');
var chalk = require('chalk');
var error = chalk.red.bold;
var info = chalk.blue;

app.use(thrower);
app.get('/', function(req, res){ res.send('hello world!'); })

/* handle errors here */

app.listen(3000, function(err){
  if(err) console.error(error(err.message));
  else console.log(info('Server started on port 3000'));
});
```

^
- introduce chalk
- show the file running

|||
<!-- .slide: data-state="transition" -->
Up Next: Templates
