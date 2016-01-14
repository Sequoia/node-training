# The node Ecosystem

^ Talking about...
- the module system
- NPM:
  - creating & configuring packages
  - dependencies
  - installing packages

---

# The Module System

<https://nodejs.org/api/modules.html>

<ul>
  <li class="fragment">`require`</li>
  <li class="fragment">`module.exports`</li>
</ul>

^
How to access the code of one file from another file
- Two main parts to learn;
  - how to IMPORT (require)
  - how to EXPORT

---

## `require`

<https://nodejs.org/api/globals.html>

^
- How to get code from other files
- can be accessed as a global
- We've used it some already...

|||

### `require` lookup behavior

`require(X);`

<ol>
  <li class="fragment">Is X a **core module**?</li>
  <li class="fragment">Is X a **file path**?</li>
  <li class="fragment">Is X a **directory path**?</li>
  <li class="fragment">Is X a **module in `node_modules`**?</li>
  <li class="fragment">Throw error</li>
</ol>

^
- as for WHAT is returned, we'll talk about that in a moment
- let's look at each

|||

#### Core Module

```js
var http = require('http');
var url = require('url');
```

|||

#### File Path

```js
var parser = require('./lib/parser.js');
```

```js
var Assembler = require('../Assembler');
```
<!-- .element: class="fragment" -->

```js
var users = require('../data/users.json');
```
<!-- .element: class="fragment" -->


<span class="fragment">Relative to <strong>this file</strong></span>

```no-highlight
\-- project
    +-- Assember.js
    +-- data
    |   \-- users.json
    |
    \-- src
        +-- thisFile.js
        \-- lib
            \-- parser.js
```

|||

#### Directory Path

```js
var cars = require('../../cars');
```

```js
var util = require('./util');
```
<!-- .element: class="fragment" -->

```no-highlight
+-- cars
|   +-- package.json
|   \-- ...
|
\-- project
    \-- src
        +-- thisFile.js
        \-- util
            \-- index.js
```

^ does the following **in that order**

|||

#### Module in `node_modules`

```js
var _ = require('lodash');
var express = require('express');
```

```no-highlight
\-- project
    +-- package.json
    +-- node_modules
    |   + -- lodash
    |   |    \-- ...
    |   | 
    |   \ -- express
    |        \-- ...
    |
    \-- src
        \-- thisFile.js
```

^
- Note that it **ascends** 'til if finds node_modules, then looks there
- how do packages get into node_modules? #8594; cover soon

|||

<!-- .slide: class="transition" -->
*Up Next: `module.exports`*

---

# `module.exports`

```js
// favenum.js

module.exports = 1738;
```
<!-- .element: class="fragment" -->

```js
// consumer.js

var favoriteNumber = require('./favenum.js');

console.log(favoriteNumber); // 1738
```
<!-- .element: class="fragment" -->

^
Defines what a module returns when it's `require`d

|||

```js
var foo = require('./foo.js');

//basically means...

var foo = `module.exports from the file 'foo.js'`
```

^
you can export all kinds of things

|||

```js
module.exports = function add(x, y){ return y + x }
```
<!-- .element: class="fragment" -->

```js
module.exports = "Hi there";
```
<!-- .element: class="fragment" -->

```js
function Singleton(){
  //...
}

module.exports = new Singleton();
```
<!-- .element: class="fragment" -->

---

<!-- .slide: class="exercise" -->
Create a file that exports something, and a second file to `require` it.

---

## Module Export Patterns

* Object literal (`{}`)<!-- .element: class="fragment" -->
* Constructor<!-- .element: class="fragment" -->
* Factory<!-- .element: class="fragment" -->
* ...anything else<!-- .element: class="fragment" -->

---

### Object Literal

```js
// myMaths.js

module.exports = {
  add : function(x, y) { return x + y },
  sub : function(x, y) { return x - y },
  div : function(x, y) { return x / y },
  mul : function(x, y) { return x * y }
  /*...*/
}
```

```js
module.exports.add = function(x, y) { return x + y };
module.exports.sub = function(x, y) { return x - y };
module.exports.div = function(x, y) { return x / y };
module.exports.mul = function(x, y) { return x * y };
```
<!-- .element: class="fragment" -->

^
- good for util libs like lodash/underscore
- a collection of functions/methods
- most core modules do this

|||

```js
// consumer.js

var maths = require('./myMaths.js');

console.log(maths.add(4, 6)); // 10
console.log(maths.div(9, 0)); // Infinity
```

```js
// consumer.js

var readFile = require('fs').readFile;

readFile('foo.txt', 'utf-8', function(err, contents){
  //...
```
<!-- .element: class="fragment" -->

---

### Constructor

```js
// Car.js

function Car(make, model){
  this.make = make;
  this.model = model;
}

module.exports = Car;
```

```js
// consumer.js

var Car = require('./Car')

var ride = new Car('Toyota', 'Celica');
```

^
- good for shared object types in frameworks
- EventEmitter is like this

---

### Factory

```js
//logger.js

module.exports = function(prefix){
  function format(msg){
    return prefix + ' <' + Date() + '> ' + msg;
  }

  return {
    l : function(msg){ console.log(format(msg)) },
    e : function(msg){ console.error(format(msg)) },
  };

}
```

```js
// consumer.js
logger = require('./logger.js')('MyApp');

logger.l('testing 123');
// MyApp <Wed Jan 13 2016 16:54:55 GMT-0500 (EST)> testing 123
```

^
- good for util or other libs that require configuration

|||

```js
// consumer.js
logfactory = require('./logger.js');

dblog  = logfactory('DATABASE');
applog = logfactory('MYAPP');

applog.l('boostraping...');
// MYAPP <Wed Jan 13 2016 16:54:55 GMT-0500 (EST)> bootstrapping...

dblog.l('SELECT * FROM users');
// DATABASE <Wed Jan 13 2016 16:54:55 GMT-0500 (EST)> SELECT * FROM users
```

---

### Caching & Patching

```js
// dog-stuff.js

module.exports = {
  name : 'Dog',
  dogNoise : 'Bark!',
  bark : function(){
    console.log(this.dogNoise);
  }
}
```
<!-- .element: class="fragment" -->

```js
// dogUser.js
dog = require('./dogStuff');

dog.bark(); // Bark!
```
<!-- .element: class="fragment" -->

^
- node module system caches modules that have been loaded
- returns *same copy*

|||

### Caching & Patching

```js
// dog-stuff.js

module.exports = {
  name : 'Dog',
  noise : 'Bark!',
  bark : function(){
    console.log(this.noise);
  }
}
```

```js
// perro.js
perro = require('./dogStuff');

perro.noise = '¡guau guau!'
```
<!-- .element: class="fragment" -->

```js
// dogUser.js
dog = require('./dogStuff');
require('./perro');

dog.bark(); // ??
```
<!-- .element: class="fragment" -->

^
- What will the dog say?
- **perro in perro.js & dog in dogUser.js are the same object**
- Talk about problems

---

<!-- .slide: class="transition" -->
*Up Next: Excercise!*

---

<!-- .slide: class="exercise" -->

Write `greeterFactory.js` for:

```js
// server-with-module.js
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

<!-- .slide: data-state="transition" -->
*Up Next: NPM*
