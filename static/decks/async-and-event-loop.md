TODO: move maintaining asynchrony AFTER flow control portion

# Asynchrony in Node

^ brief review from AM. talked about...

- Callbacks, EventEmitters
- The importance of maintaining asynchrony
- Talk about history, browser, why it's Async,

---

## The Event Loop

^
- Waiter example (**Whiteboard**)
- 1 cook/waiter → sync
- many → multi-thread
- 1 fast waiter, many cooks → event loop
- don't block!

|||

TODO: sick animated SVG to illustrate multi-threaded vs. event-loop

^
- posix threads (actually do have multiple threads!)
- TODO: read more link

|||

## Timing demo

<http://j.mp/eventloop-sim><!-- .element: class="fragment" -->

- http://j.mp/eventloop-sim if you want
- **If you use `readFileSync`, which of these models are you using?**

|||

<!-- .slide: data-state="transition" -->

---

## Maintaining Asynchrony

Error-first callback in Node.js says:
**"I am asynchronous!"**<!-- .element: class="fragment" -->

^
- If you are creating callbacks like this, they MUST be async
- Otherwise break flow-control tools that assume asyncrhony

|||

### Get Site Headers

```js
var https = require('https');

function getHeadersHTTPS(address, cb){
  https.get(address)
    .on('response', function(response){
      //success! pass `null` error + headers to callback
      cb(null, response.headers);
    })
    .on('error', function(err){
      //error :( pass to callback
      cb(err);
    });
}
```

```js
var target = 'https://devdocs.io/';

getHeadersHTTPS(target , function(err, headers){
  if(err) return console.error('ERROR: ', err.message);
  console.log(headers);
});
```
<!-- .element: class="fragment" -->

^
- walk thru function, **https.get is ASYNC I/O**
- **what async style is https.get using?**
  - EventEmitter
- call thus
- **Why are we saying `return console.error`?**

|||

### Ensure protocol is HTTPS

```js
var https = require('https');
var url = require('url');

function getHeadersHTTPS(address, cb){

  var protocol = url.parse(address).protocol;
  if(protocol !== 'https:'){
    return cb(new Error('address must be httpS'));
  }

  https.get(address)
    .on('response', //... omitted ...
}
```

**"takes callback" !== "automatically asynchronous"**
<!-- .element: class="fragment" -->

^
- What will happen here?
- demo
- one outcome fires on next tick, one on THIS cycle of eventloop
- how to fix this?
TODO: add example with promises? may better illustrate issue with ordering ops

|||

### Make it Asynchronous

```js
  // ...
  if(protocol !== 'https:'){
    return process.nextTick(function(){
      cb(new Error('address must be httpS'));
    }
  }
  // ...
```

^
- waits 'til next tick to call callback
- **now failure matches timing of success**
- allows other things on thisTick to complete first
- allows for use with async flow control tools

|||

<!-- .slide: data-state="transition" -->
*Up Next: Flow Control Strategies*

---

# Async Flow Control
* Callbacks <!-- .element: class="fragment" -->
* EventEmitters <!-- .element: class="fragment" -->
* Promises <!-- .element: class="fragment" -->

^
- JS is async by default
- Flow control can be confusing
- Code doesn't execute top to bottom
- different styles

---

## Callbacks

*"Function to be called when async operation is complete"*

^
- Traditional API/strategy for handling async in node
- Why was this chosen?
- based on style called "Continuation Style Passing"

|||

### Continuation Style Passing

* "No procedure is allowed to return to its caller--ever."
<!-- .element: class="fragment" -->
* "Procedures can take a callback to invoke upon their return value."
<!-- .element: class="fragment" -->

|||

### Continuation Style Passing

```js
//without CPS
function self  (x) { return x; }
function addOne(x) { return 1 + x; }
function double(x) { return 2 * x; }
```

```js
//without CPS
var startVal = 2;
var selfed   = self(startVal);
var oneAdded = addone(selfed);
var doubled  = double(oneAdded);

console.log(doubled);   // output: 6
```
<!-- .element: class="fragment" -->

^ 

- **but what if we can't return?**

|||

### Continuation Style Passing

```js
//WITH CPS
function self  (x, cb) { cb(x); }
function addOne(x, cb) { cb(1 + x); }
function double(x, cb) { cb(2 * x); }
```

```js
//WITH CPS
var startVal = 2;

self(startVal, function (selfed){
  //do stuff with selfed
});

double(starVal, function(doubled){
  //do stuff with doubled value
});
```
<!-- .element: class="fragment" -->

^
- does its operation then calls the callback with the result
- how does this look going the whole way thru?

|||

```js
//WITH CPS
function self  (x, cb) { cb(x); }
function addOne(x, cb) { cb(1 + x); }
function double(x, cb) { cb(2 * x); }
```

```js
var startVal = 2;

self(startVal, function (selfed){

  addOne(selfed, function (oneAdded){

    double(oneAdded, function (doubled){

      console.log(doubled); //outputs 6

    });

  });

});
```
<!-- .element: class="fragment" -->

**Yikes!**<!-- .element: class="fragment" -->

^ 
- (yes that code looks like hell we'll address that soon)
- Why would you want to do this?
- **say we want to do an I/O action like readfile that takes time on CPU...**

|||

### Option 1

```js
  try{
    var results = readFile('myFile');
  }catch(e){
    console.error('bad things :(');
  }
  console.log(results);

  //do other stuff later...
```

*Blocking!*<!-- .element: class="fragment" data-fragment-index="1" -->

### Option 2<!-- .element: class="fragment" data-fragment-index="2" -->

```js 
  readFile('myFile', function(err, results){
    if(err){ return console.error('bad things :(');
    console.log(results);
  });

  //do other stuff right away!
```
<!-- .element: class="fragment" data-fragment-index="2" -->

^
- Problems with this? → blocking
- Solution? **→ CSP aka "callbacks"**

|||

## Callback Review
* Continuation Style Passing<!-- .element: class="fragment" -->
* Error first<!-- .element: class="fragment" -->

|||

<!-- .slide: data-state="transition" -->
*Up Next: Callback Hell*

---

# "Callback Hell"

1. Read `users.json`
2. Lookup user address in DB
3. Write address to file
4. Output "success" to console

|||

```js
fs.readFile('users.json', 'utf-8', function (err, contents){
  if(err){ throw err; }
  var users = JSON.parse(contents);
  users.forEach(function(user){
    db.accounts.findOne({id: user.id}, function(err, address){
      if(err){ throw err; }
      var filename = 'address' + address.id + '.json';
      fs.writeFile(filename, 'utf-8', address, function(err){
        if(err){ throw err; }
        console.log(filename + ' written successfully!');
      });
    });
  });
});
```

^
- hard to read. What's going on?
- this is a small example
- not even handling errors really
- how to mitigate?

|||

### Name functions

```js
fs.readFile('users.json', 'utf-8', function processUsers(err, contents){
  if(err){ throw err; }
  var users = JSON.parse(contents);
  users.forEach(function lookupAddress(user){
    db.accounts.findOne({id: user.id}, function writeAddress(err, address){
      if(err){ throw err; }
      var filename = 'address' + address.id + '.json';
      fs.writeFile(filename, 'utf-8', address, function outputResults(err){
        if(err){ throw err; }
        console.log(filename + ' written successfully!');
      });
    });
  });
});
```

|||

### Externalize functions

```js
fs.readFile('users.json', 'utf-8', processUsers);

function processUsers(err, contents){
  if(err){ throw err; }
  var users = JSON.parse(contents);
  users.forEach(lookupAddress);
});

function lookupAddress(user){
  db.accounts.findOne({id: user.id}, writeAddress);
}

function writeAddress(err, address){
  if(err){ throw err; }
  var filename = 'address' + address.id + '.json';
  fs.writeFile(filename, 'utf-8', address, outputResults);
}

function outputResults(err){
  if(err){ throw err; }
  console.log(filename + ' written successfully!');
}
```
<!-- .element: class="fragment" -->

|||

<!-- .slide: data-state="exercise" -->

```js
function self  (x, cb) { cb(null, x); }
function addOne(x, cb) { cb(null, 1 + x); }
function double(x, cb) { cb(null, 2 * x); }
```

Clean up the following callback heck:

```js
var startVal = 2;

self(startVal, function (err, selfed){

  addOne(selfed, function (err, oneAdded){

    double(oneAdded, function (err, doubled){

      console.log(doubled); //outputs 6

    });

  });

});
```

^ Hints:
- name functions
- externalize functions

|||

<!-- .slide: data-state="transition" -->
*Up Next: `EventEmitter` Review*

---

# Event Emitters

[nodejs.org/api/events.html](https://nodejs.org/api/events.html)

^
- Another flow control tool
- talked about with HTTP

|||

## `EventEmitter`
<ul>
  <li class="fragment">Interface</li>
  <li class="fragment">Main methods:
  <ul>
  <li class="fragment">`on(event, handlerFunction)`</li>
  <li class="fragment">`emit(event, data)`</li>
  </ul>
</ul>

^ 
**→ Events + handlers vs callbacks**

|||

### EventEmitter vs. Callback style
* EventEmitter can trigger various events<!-- .element: class="fragment" -->
* An event can have multiple listeners<!-- .element: class="fragment" -->
* Event handler:<!-- .element: class="fragment" -->
  * may be run many times<!-- .element: class="fragment" -->
  * has no "error first" convention<!-- .element: class="fragment" -->

^
- callbacks respond to completion of a SINGLE action and fire **once**
- usually emit error event

|||

<!-- .slide: data-state="transition" -->
*Up Next: Promises*

---

# Promises

```js
db.getRecords()
  .then(formatRecords)
  .then(sendToUser);
```

^ 

- Makes async code look like sync
- an "IOU" for a future value that you can pass around
- Attempt to make code cleaner
- Added to JS core in ES6

|||

# Promises

What is a promise?

* Object<!-- .element: class="fragment" -->
* Has a "then" method<!-- .element: class="fragment" -->
* Resolves only once<!-- .element: class="fragment" -->
* Has a state:<!-- .element: class="fragment" -->
  * pending<!-- .element: class="fragment" -->
  * fulfilled<!-- .element: class="fragment" -->
  * rejected<!-- .element: class="fragment" -->

^
→ you can also assign it to a var & pass it around
- What does `then` take?
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

|||

### `.then` method
  1. `onFulfilled` function
  2. `onRejected` function

```js
readFilePromise('users.json')
  .then(
    function success(results){
      console.log(results);
    },
    function failure(err){
      console.err(err);
    }
  );
```
<!-- .element: class="fragment" -->

^
- `then` takes a function to run on reject/complete

|||

```js
var promise = readFilePromise('users.json');

promise
  .then(processUsers, handleError)
  .then(writeFile, handleError);
```

^
- **pass it around as a value, as though sync**
- How do we make these promises?
- one common way is to wrap callbacks

|||

### Wrapping a Callback Function

```js
function readFilePromise(filename){

  return new Promise(function(resolve, reject){

    fs.readFile(filename, 'utf-8', function(err, contents){

      if(err) return reject(err);

      resolve(contents);

  });

}
```

|||

<!-- .slide: data-state="exercise" -->

"Promisify" `getHeadersHTTPS`. This should work:

```js
getHeadersHTTPS(target)
  .then(function getDate(headers){
    return headers.date;
  })
  .then(function(date){
    console.log(date);
  });
```

Hint:
```js
function returnPromise(){
  return new Promise(function(resolve, reject){
    // do something...
    // reject(err); //or
    // resolve(results);
  });
}
```

^
- challenge: add error handling as well

|||

## Bluebird: promises and more

<http://bluebirdjs.com/>

<ul>
  <li class="fragment">`catch` method</li>
  <li class="fragment">Additional methods (`map`, `filter`, etc.)</li>
  <li class="fragment">Utility functions: `promisify` & `promisifyAll`</li>
</ul>

^
- pre-es6 polyfill
- adds lots of utility functions

|||

### Using Bluebird to "promisify" an API
```js
Promise = require('bluebird');
var fs = Promise.promisifyAll(require(fs));

fs.readFileAsync('myfile.json')
  .then(JSON.parse)
  .tap(function(jsondata){
    console.log(jsondata);
  })
  .then(jsondata)
  .then(doTheNextThing)
  .catch(handleError);

function addProperty(jsondata){
  jsondata.myProperty = "hello!!";
  return jsondata;
}
```

^
- very convenient
- can return value from function or another promise
- great way to make code easier to read and write

|||

<!-- .slide: data-state="transition" -->
*Up Next: Node Ecosystem & NPM*
