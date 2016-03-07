# welcome-to-node.md <!-- .slide: data-state="exercise" -->


---

<!-- .slide: data-state="exercise" -->
Create the following file:

```js
//filename: node-intro/http-server.js
var http = require('http');

var server = http.createServer(function(request, response){
  response.write('Welcome to Intro to Node.js!');
  response.end();
});

server.listen(8080, function(){
  console.log('server listening at http://localhost:8080/');
});
```

Run it from the terminal (command line):
```sh
$ node http-server.js
```

Point your browser to <http://localhost:8080/>

^ Help people get unstuck.

go 'til ~5min in

---

<!-- .slide: data-state="exercise" -->
## Run a script

1. Create `hello-world.js`
  ```js
  console.log('hello world');
  ```
2. Run it

---

<!-- .slide: data-state="exercise" -->

## Using the console

1. Launch the node console
2. Run the following statements

```js
var numbers = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
```

```js
function decode(number){ return String.fromCharCode(number); }
```

```js
numbers.map(decode).join('');
```

---


# javascript-review.md <!-- .slide: data-state="exercise" -->


---

## On `devdocs.io`, enable:

1. JavaScript
2. Node.js (*your version!*)
<br>
<br>

## Node or Javascript?
1. `console`
2. `Promise`
3. `url.parse` method
4. `alert` function

<!-- .slide: data-state="exercise" -->

---

## Console

<!-- .slide: data-state="transition" -->
CUT THIS

Find some differences between node `console` and browser `console`

^ 
- open console in node.js, open in browser
- let people poke around for a minute, **what are some differences?**
- hint: devdocs.io
- Who found something interesting?
- A: `.table`, `.Console`, `.group`

---

<!-- .slide: data-state="exercise" -->
Create divide & multiply functions:
```js
console.log(
  div(
    mul( 21, 40 ),
    mul(10, 2)
  )
);

//output: 42
```

```js
console.log( div( mul(21, 40), mul(10, 2) ) );
```
<!-- .element: class="fragment" -->

* Run with `node filename.js`
<!-- .element: class="fragment" -->

^
5 min

---

<!-- .slide: data-state="exercise" -->
Find where I broke the "Always use named expressions" rule and rewrite it as a
named expression

^
- outside of this section

- extra exercise: create function that takes another function & runs it

---

<!-- .slide: data-state="exercise" -->
1. Create `helloWorld` function that logs "Hello World"
2. Create a function that takes a a function as an argument & executes it

```js
//filename: javascript-review/function_expressions.js

var helloWorld = function(){
  console.log('Hello World!');
};

//... create `run` function

run(helloWorld);
// output: "Hello world"
```

---

<!-- .slide: data-state="exercise" -->
Use `setTimeout` to call `greet("Sequoia")` after `1` second.

```js
function greet(name){
  console.log('Hi, ' + name);
}

setTimeout(/*???*/);
```

Hint:
1. `setTimeout` takes 2 variables, what type are they?

^

### Challenge: Create a function that:
1. Accepts a function argument
2. Accepts a string argument
3. Logs the string
4. Runs the function, passing the string as an argument

---


<!-- .slide: data-state="exercise" -->
`http_server_congrats.js`:

Alter `http-server.js` to say "CONGRATULATIONS!" to the **5th** visitor

Hints:
1. functions can access variables **outside** their own scope

^
- 5min

---


# async-flow-control.md <!-- .slide: data-state="exercise" -->


---

<!-- .slide: data-state="exercise" -->
## `fs.readfile`

```js
//filename: async/read-file.js
var fs = require('fs');

var filename = 'letter.txt';

fs.readFile(filename, function(err, data){
  if(err){
    console.error('there was an error!', err);
  }
  else{
    console.log(data.toString());
  }
});
```

^ do this one alone, show results

- what do you notice about this?
- did you run into issues?

---

<!-- .slide: data-state="exercise" -->

Clean up the following callback heck:

```js
//filename: async/callback-heck-start.js

function self  (x, cb) { cb(null, x); }
function addOne(x, cb) { cb(null, 1 + x); }
function double(x, cb) { cb(null, 2 * x); }

var startVal = 2;

self(startVal, function (err, selfed){
  addOne(selfed, function (err, oneAdded){
    double(oneAdded, function (err, doubled){
      console.log(doubled); //outputs 6
    });
  });
});
```

Hints:
1. name functions
2. externalize functions

---

<!-- .slide: data-state="transition" -->

## ~~CUT CANDIDATE~~
* Do it together?
* Replace with "update server with .on(request)"?

Alter `event-emitter.js`...

1. if count > 3, emit `done`
2. on `done`, log "DONE" and exit

Hints
1. `process.exit()`

---

<!-- .slide: data-state="transition" -->

## ~~CUT CANDIDATE~~

"Promisify" `readFile`. This should work:

```js
//filename: async/read-file-promise.js

function print(text){ /*...*/ }
function handleError(err){ /*...*/ }

readFile('letter.txt')
  .then(print, handleError);
```

Hints:
1. Remember **encoding**
2. Return a Promise

```js
function returnsPromise(){
  return new Promise(function(resolve, reject){
    // do something...
    // reject(err); //or
    // resolve(results);
  });
}
```


---
 

# node-core-apis.md <!-- .slide: data-state="exercise" -->


---


<!-- .slide: data-state="exercise" -->
## Browser, Node, or Javascript?
<ul>
  <li class="fragment"> `Math.pow` </li>
  <li class="fragment"> `HTMLElement` </li>
  <li class="fragment"> `window.document` </li>
  <li class="fragment"> `process.cwd` </li>
  <li class="fragment"> `RegExp` </li>
  <li class="fragment"> `fs.readFile` </li>
  <li class="fragment"> `console.log` </li>
</ul>

^ Node is more than just Javascript, it's also the modules to do server specific
tasks

**Which core module have we already touched on?**

---

<!-- .slide: data-state="transition" -->
# CUT

## WHY IS THIS *HERE* specifically???

Alter `http-server.js` to attach the listener function thus:
```js
var server = http.createServer();

server.on('request', myRequestHandler);
```

Hints:
1. `emitter.on(eventname, handlerFunction)`
2. what arguments must `myRequestHandler` take?
3. **docs:** request event (http.Server)

^
- that's how docs look on devdocs.io
- solution `node-core-apis/http-server-on-request.js`

---

<!-- .slide: data-state="exercise" -->
1. If user requests `/found`
  * HTTP status code: 200
  * respond with "you found it!"
2. Any other path
  * HTTP status code: 404
  * respond with "Not found! :("

Hints:
1. see table of contents on nodejs.org docs
  nodejs.org/dist/latest-v4.x/docs/api/http.html

^
- What issues did you run into?
- solution `node-core-apis/http-server-found.js`

---

<!-- .slide: data-state="exercise" -->
## `fs.writeFile`

1. Write the string 'See you in San Francisco!' to `letter.txt`.
2. `console.error` on error
3. `console.log` success on success

Hints
1. RTFM (`fs.writeFile`)

Extra Credit:
1. If script is called with `--apend`, **append** instead of write

^ do this one alone, show results

- Did it behave as expected?
- What if we wanted more control over the path?

---

<!-- .slide: data-state="exercise" -->
## `readFile` + `argv`

1. Receive filename as argument<br>
   `node read-file.js someFile.txt`
2. Read file
3. Write file contents to console

Hints:
```js
console.log(process.argv);
```

^ 10min
solution: node-core-apis/read-file-argv-solution.js
Does it work when you switch to parent directory & run?

---

<!-- .slide: data-state="exercise" -->
## Send HTML file

Alter server to...

1. Read an html file (e.g. `index.html`)
2. Send it back to the browser

Hints

1. `fs` module
2. `http` module
3. Callbacks

Extra Credit

1. Allow port configuration with ENV variable

^ EXTRA/time allowing: if not at break already
- solution

---


# node-ecosystem.md <!-- .slide: data-state="exercise" -->


---

<!-- .slide: data-state="transition" -->
# CONVERT TO DEMO
This is way to confusing

1. Create files & directories to make the following work
2. Run with `node .`

```js
require('x.js'); // file: x.js
require('./y');  // file: y.js
require(/*??*/); // file: a/b/index.js
```

Hints:
1. Each file can contain `console.log(__filename)`
2. Code above may need fixes

^
not important what contents is

---

<!-- .slide: data-state="transition" -->
# ADD EXTRA CREDIT:
 * do it different ways

Create a file that exports something, and a second file to `require` it.

---

<!-- .slide: data-state="transition" -->

# CONVERT TO DEMO
*the next exercise covers this same stuff*

## Multiple Loggers



1. Use the `logger.js` module
2. Create a logger with prefix "DATABASE"
2. Create a logger with prefix "HTTP"
3. Log a message & and error from both

Extra Credit:

1. Allow loggers to be disabled by environment variable

^

10min


---


<!-- .slide: data-state="exercise" -->

Write `greeterFactory.js` for:

```js
// node-ecosystem/server-with-module.js
// GET http://localhost:8080/
// ==> 'Hello World!'

var http = require('http');
var factory = require('./greeterFactory');
var handler = factory('Hello World!');

var server = http.createServer(handler);

server.listen(8080);
```

Hints:
* What is `handler`? What is `factory`?
* What argument does `http.createServer` take?

^

---


# npm.md <!-- .slide: data-state="exercise" -->


---

<!-- .slide: data-state="exercise" -->

## `npm init`

1. Create a directory `myproject`
2. `cd myproject`
3. `npm init`

^
- *Step thru alone then together*
- **Anything confusing?**
- Version should not say "1.0.0"

---

<!-- .slide: data-state="exercise" -->

## `npm config`

1. `npm config set init.author.name [your name]`
2. `npm config set init.author.email [your email]`
3. `cat ~/.npmrc`

^
also npm config get init.author.name

**now `node .`**

fix this ^

---

# UPDATE DECK TO MATCH
<!-- .slide: data-state="transition" -->

## `package.main`

### Part 1

1. Create `index.js`
2. Put `console.log('hello world')` in it
3. `node .`
<br>
<br>

### Part 2

1. Rename `index.js` `app.js`
2. **?????**
3. `node .`

^
- How would we change the file it ran when we run that directory?
- What happens if we run it from different CWD?

---

<!-- .slide: data-state="exercise" -->

`npm install chalk`

^ What do you see?
- node_modules
- *Explain flat dep tree*
- what do you think this allows us to do?

---

<!-- .slide: data-state="exercise" -->

Use our dependency:

```js
//myproject/index.js

console.log(chalk.green.underline('Hello World!'));
console.log(chalk.red.bold('Hello Again!'));
```

Hints:
1. Something is missing...

^ try running file
- &rarr; missing require statement
- *talk thru require & stuff*

---

<!-- .slide: data-state="exercise" -->

## Install "this" package

1. `rm -rf node_modules`
2. `npm install`
3. `node .`

^
- should install our dependencies
- what happened? What's missing?

---

<!-- .slide: data-state="exercise" -->

`npm install --save chalk`

^

- **What do you see in package.json now?**
- now repeat: delete `node_modules`, npm install
- what's different?
- **Why not just check in `node_modules`?**

---

<!-- .slide: data-state="transition" -->
# Convert to demo

<http://semver.npmjs.com/>

^
- go to website & play around


---

<!-- .slide: data-state="exercise" -->
Make NPM install globals in our home directory

`npm set prefix /your/home/npm_packages`

**Don't do this if you used `nvm` to install node!!**

^
now you can install without sudo 

---

<!-- .slide: data-state="transition" -->
# Update to refer to a specific script

1. `npm install -g nodemod`
2. `nodemon some-http-server.js`
3. make a change to the `some-http-server.js`

^
- grunt, gulp, jshint etc. are more useful

---

<!-- .slide: data-state="transition" -->
# Cut
*or change to cowsay but this not a core topic*

Set up "watch" script for development:
<ol>
  <li class="fragment">`node .` starts a webserver</li>
  <li class="fragment">`npm run watch` starts & watches server</li>
</ol>

<div class="fragment">
<br>

<p>Hints</p>

<ul>
  <li>You know how to write a webserver :)</li>
  <li>`package.json.main`</li>
  <li>npm scripts run `node_modules/.bin` directly</li>
  <li>`watch "cat foo.txt" ./bar`<br>will `cat foo.txt` whenever a file changes in `./bar`</li>
  </ul>
</div>

^
- demo watch for them

---

<!-- .slide: data-state="transition" -->
# CUT

## File Server

`/path/to/filename.txt?u=xing&p=ponies`
1. If user/pass aren't correct, send "Access Denied"
2. If file can't be read/found, send "Not Found"
3. Send file contents

*Remember to set the appropriate HTTP status code!* <!-- .element: class="fragment" -->

 Extra Credit
1. Set port with environment variable
2. Remove requestHandler to its own file

---

# express.md <!-- .slide: data-state="exercise" -->

---

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
4. `node .`
5. Point browser to <http://localhost:3000>

^ after this, talk a bit about yesterday
- node core
- async management
- javascript review
- ecosystem & NPM
- with that groundwork laid, today: build some stuff


---


# express-routes.md <!-- .slide: data-state="exercise" -->


---

<!-- .slide: data-state="exercise" -->
1. `GET /greet` replies 'Hello, you!'
2. `POST /count` Increments a counter
3. `GET /count` replies with the current count
4. `DELETE /count` sets count to 0

Hints:
* What scope does your counter live in? 
* Use Postman or another REST tool to post/delete

^
- don't worry about post-data, will handle that later

---

<!-- .slide: data-state="exercise" -->

Make a server wherein...
1. `GET /test/` alone replies "you requested '/test/'"
1. `GET /test/[any number of characters]` replies "you requested '/test/something'"
1. any other route replies "you requested something else"

Hints:
* Wildcards

^
- answer in wildecard-route.js


---


<!-- .slide: data-state="transition" -->
# Change to restaurant

```js
var users = [
  { name: 'Qian' },
  { name: 'Zeynep'},
  { name: 'Raisel'}
];
```

Create `user-server.js`:
1. `/users/1` replies...<br>
  'User 1: Zeynep'
1. `/users/1?title=Ms.` replies...<br>
  'User 1: Ms. Zeynep'

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


---


# express-middleware.md <!-- .slide: data-state="exercise" -->


---

<!-- .slide: data-state="transition" -->

# change to "restaurant"

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

---

# CUT
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

---

## Side Effects

<!-- .slide: data-state="transition" -->
# UPDATE FOR RESTAURANTS

Create middleware to log all requests as follows:
```no-highlight
Request: [METHOD] [path] 

```

e.g.
```no-highlight
Request: GET /
Request: POST /users
Request: GET /users
```

Hints:
* Remember The Fun Manual!

Extra Credit:
1. Log data for `POST` requests
   Data: {"name":"foo", "founded":2020}

^
**Do together?**

---

<!-- .slide: data-state="exercise" -->
Use the `express.static` middleware to serve:
1. an `index.html` file with...
2. a `css` file
3. an image

Hints:
* Examples: <http://expressjs.com/en/guide/using-middleware.html>
* Remember you can use any arbitrary directory as `{ root }`
* It will serve `index.html` by default

---

<!-- .slide: data-state="transition" -->

#	&#9986; CUT CANDIDATE
**It's just too complicated** (Keep as extra?)

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


---


# express-templates.md <!-- .slide: data-state="exercise" -->


---

<!-- .slide: data-state="transition" -->

# Add example homepage.jade content

1. Create `homepage.jade`
2. Render it on request to `/`

Hints:
* set `view engine`
* set `views` to point to template directory

---

<!-- .slide: data-state="transition" -->

# Update to restaurant jade

## Update user-server.js

Request:
```no-highlight
GET /user/1
```

Response:
```html
<html>
<head>
    <title>Zeynep</title>
</head>
<body>
  <h1>User Profile</h1>
  <ul>
      <li>id: 1</li>
      <li>name: Zeynep</li>
  </ul>
</body>

</html>
```

...ditto for `/user/0`, `/user/2` etc.


---


# sequelize.md <!-- .slide: data-state="exercise" -->


---

<!-- .slide: data-state="exercise" -->
In `sequelize-restaurants`...

1. `npm install`
2. create a database (`test-db`, `node-workshop`, whatever)
3. edit `index.js` to match your environment
4. `node .`

Hints:
* **Grants!** Consider using `root`<br>(never in production of course &#9786;)
* Database must be created, but not tables

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

<!-- .slide: data-state="exercise" -->
Connect the `/restaurants/:id` route

Hints:
* id passed in `req.params`
* `findById`
* `include : [ Related, Models, Here ]`
* Promise!!
* Template expects an object with `name`, `founded`, `Dishes` keys

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

# mongo-and-mongoose.md <!-- .slide: data-state="exercise" -->

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


<!-- .slide: data-state="exercise" -->
Connect the `/restaurants/:id` route

Hints:
* id passed in `req.params`
* `findById`
* Promise!! (and `exec`!!)
* Template expects an object with `name`, `founded`, `Dishes` keys

---

<!-- .slide: data-state="exercise" -->
Connect the `POST /restaurants/` route

Hints:
* `req.body` (already parsed! &#9786;)
* no need for `exec`
* `create` **or** `new Model` & `save`
* You may experience code  d&#233;j&#224; vu...
