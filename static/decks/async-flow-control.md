# Async Flow Control
* Callbacks <!-- .element: class="fragment" -->
* EventEmitters <!-- .element: class="fragment" -->
* Promises <!-- .element: class="fragment" -->

^
- JS is async by default (**Browser history**)
- going to cover practical first, then theory
- Flow control can be confusing
- Code doesn't execute top to bottom
- **different styles**

---

## Callbacks

*"Function to be called when async operation is complete"*

^
- Traditional API/strategy for handling async in node
- Why was this chosen?
- based on style called "Continuation Style Passing"
- **&rarr;let's take look at CSP**
- used in setTimeout

|||

### Continuation Style Passing

* "No procedure is allowed to return to its caller--ever."
<!-- .element: class="fragment" -->
* "Procedures can take a callback to invoke upon their return value."
<!-- .element: class="fragment" -->

|||

### Continuation Style Passing

```js
//without CSP
function self  (x) { return x; }
function addOne(x) { return 1 + x; }
function double(x) { return 2 * x; }
```

```js
//without CSP
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
//WITH CSP
function self  (x, cb) { cb(x); }
function addOne(x, cb) { cb(1 + x); }
function double(x, cb) { cb(2 * x); }
```

```js
//WITH CSP
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
//WITH CSP
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
- Problems with this? &rarr; blocking
- Solution? **&rarr; CSP aka "callbacks"**
- **&rarr; Let's give it a try**

|||

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

|||

## Node callback conventions

```js
asyncOperation(/*...*/, function(error, /*...*/);
```

1. Callback always **last** argument
2. Callback takes error as **first** argument

|||

## Callback Review
* Continuation Style Passing<!-- .element: class="fragment" -->
* Node conventions<!-- .element: class="fragment" -->

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

^
- add'l advantage of allowing reuse & testing

|||

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

|||

<!-- .slide: data-state="transition" -->
*Up Next: `EventEmitter`s*

---

# Event Emitters

[nodejs.org/api/events.html](https://nodejs.org/api/events.html)

^
- Another flow control tool

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
- *Does this look familiar to anyone?*
- Used it on our server
- **&rarr; Events + handlers vs callbacks**

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
- demo with EventEmitter.js

|||

## Example

```js
//filename: async/event-emitter.js

var EventEmitter = require('events');
var ee = new EventEmitter();

ee.on('count', function(num){
  console.log('number emitted: ', num);
});

var count = 0;

setInterval(function increment(){
  count++;
  ee.emit('count', count);
}, 1000);
```

^ 
note that emit is passed...
- event name
- DATA

|||

<!-- .slide: data-state="exercise" -->
Alter `event-emitter.js`...

1. if count > 3, emit `done`
2. on `done`, log "DONE" and exit

Hints
1. `process.exit()`

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
&rarr; you can also assign it to a var & pass it around
- What does `then` take?
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

|||

## `.then` method
  1. `onFulfilled` function
  2. `onRejected` function

```js
readFilePromise('users.json')
  .then(
    function success(results){
      console.log(results);
    },
    function failure(err){
      console.error(err);
    }
  );
```
<!-- .element: class="fragment" -->

^
- `then` takes a function to run on reject/complete

|||

## Chaining

```js
var promise = readFilePromise('users.json');

promise
  .then(filterUsers, handleError)
  .then(formatRecords, handleError)
  .then(writeFile, handleError);
```

|||

## Promises are Objects

```js
function getUser(id){
  return restPromiseAPI.getOne({
    type : 'user',
    id   : id
  });
}

var userPromise = getUser(id);

userPromise.then(updateUI, logError);
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

fs.readFileAsync('myfile.txt', 'utf-8')
  .then(print)
  .catch(handleError);
```

^
- very convenient
- can return value from function or another promise
- great way to make code easier to read and write

|||

### Utilities

```js
Promise = require('bluebird');
var fs = Promise.promisifyAll(require(fs));

fs.readFileAsync('users.json', 'utf-8')
  .then(JSON.parse)
  .filter(justAdmins)
  .tap(function log(admins){
    console.log(admins);
  })
  .map(sendNotification)
  .then(doTheNextThing)
  .catch(handleError);

function justAdmins(user){
  return user.role == 'admin';
}
```

|||
<!-- .slide: data-state="transition" -->
Up Next: The Event Loop
