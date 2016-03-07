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
1. INSTALL BODY-PARSER
2. **Demo body-parser middleware** using misc/body.js

|||

<!-- .slide: data-state="exercise" -->
`start/restaurants-router-4.js`

1. `POST /restaurants` accepts json input
2. Adds a restaurant to collection
3. Responds with updated restaurants list

Hints:
1. `body-parser` (npm install!)
2. Don't double the path! (`/users/users`)
2. Postman: set method (POST), add body, set type (JSON)
3. `nodemon start/restaurants-server-4.js`

Extra Credit:
1. accept record without `id` & add `id` automatically

^
SHOW HOW TO SEND JSON WITH POSTMAN!!!

|||

## Alter Response

```
//express-app/misc/res.uptime-header.js (exerpt)

var startTime = Date.now();

app.use(function uptimeMiddleware(req, res, next){
  res.set('X-app-Uptime', Date.now() - startTime);
  next();
});

```

^
- Demo?

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
Create `middleware/logger.js` to log all requests thus:
```no-highlight
Sun Mar 06 2016 18:26:39 GMT-0800 (PST): GET /
Sun Mar 06 2016 18:26:41 GMT-0800 (PST): GET /users
Sun Mar 06 2016 18:27:18 GMT-0800 (PST): POST /users
```

Hints:
1. Remember The Fun Manual!
2. Attach it to any existing express server
3. `next()`

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
`express-app/start/static-server.js`

Use the `express.static` middleware to serve `express-app/assets/`

Hints:
1. Examples: <http://expressjs.com/en/guide/using-middleware.html>
2. It will serve `index.html` by default

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

^
- introduce chalk
- show the file running
- **Extra excercise in </x/express-middleware>

|||

<!-- .slide: data-state="transition" -->
Up Next: Templates
