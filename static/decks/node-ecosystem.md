# The node Ecosystem

^ Talking about...
- the module system
- NPM:
  - creating & configuring packages
  - dependencies
  - installing packages

---

# The Module System

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
<!-- .element: class="fragment" -->

```js
var Assembler = require('../Assembler');
```
<!-- .element: class="fragment" -->

```js
var users = require('../data/users.json');
```
<!-- .element: class="fragment" -->


Relative to `thisFile.js`

```no-highlight
\-- project
    +-- Assembler.js
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
    |-- thisFile.js
    \-- src
        \-- thisFile.js
```

^
- Note that it **ascends** 'til if finds node_modules, then looks there
- how do packages get into node_modules? #8594; cover soon

|||

### `require` lookup behavior

<ol>
  <li>Is X a **core module**?</li>
  <li>Is X a **file path**?</li>
  <li>Is X a **directory path**?</li>
  <li>Is X a **module in `node_modules`**?</li>
  <li>Throw error</li>
</ol>

|||

### Command Line

...Works the same way

```no-highlight
.
+-- myDir
|   +-- package.json
|   +-- index.js
|   \...
|
+-- foo
|   +-- index.js
|   \...
|
+-- foo.js
\-- index.js
```

```no-highlight
$ node ./foo.js
$ node .           
$ node myDir       
$ node foo      
```
<!-- .element: class="fragment" -->

|||

<!-- .slide: data-state="exercise" -->
`node-ecosystem/start/require-xyz/index.js`

1. Add require statements to make your output:
```no-highlight
path/to/node-ecosystem/done/require-xyz/x.js
path/to/node-ecosystem/done/require-xyz/y.js
path/to/node-ecosystem/done/require-xyz/a/b/index.js
Amici's
Taco Gong
Unfriendly's
Shake Hovel
Grey Castle
```

Hints:
0. Each `.js` file logs its path
1. Follow the comments
2. Paths are relative to the requir*ing* file
3. `json` files can be loaded with `require`

^
not important what contents is

|||

<!-- .slide: data-state="transition" -->
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

var foo = {{module.exports from the file 'foo.js'}}
```

^
you can export all kinds of things

|||

```js
module.exports = function add(x, y){ return y + x }
```

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

<!-- .slide: data-state="exercise" -->
1. Create a file `a.js` that exports a function
2. Create a second file `b.js` to `require` it.
3. Run the function from `b.js`

Hints:
1. There's no boilerplate for this one
2. Doesn't matter what function does

---

## Module Export Patterns

<ul>
<li class="fragment">Object literal (`{}`)</li>
<li class="fragment">Constructor</li>
<li class="fragment">Factory</li>
<li class="fragment">...anything else</li>
</ul>

---

### Object Literal

```js
// myMaths.js

module.exports = {
  add : function(x, y) { return x + y; },
  sub : function(x, y) { return x - y; },
  div : function(x, y) { return x / y; },
  mul : function(x, y) { return x * y; }
  /*...*/
}
```

```js
module.exports.add = function(x, y) { return x + y; };
module.exports.sub = function(x, y) { return x - y; };
module.exports.div = function(x, y) { return x / y; };
module.exports.mul = function(x, y) { return x * y; };
```
<!-- .element: class="fragment" -->

^
- good for util libs like lodash/underscore
- a collection of functions/methods
- most core modules do this

|||

### Consuming object literal API

```js
// mathsConsumer.js

var maths = require('./myMaths.js');

console.log(maths.add(4, 6)); // 10
console.log(maths.div(9, 0)); // Infinity
```

```js
// fsConsumer.js

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
// carConsumer.js

var Car = require('./Car')

var ride = new Car('Toyota', 'Celica');

console.log(JSON.stringify(ride));
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
// loggerConsumer.js
logger = require('./logger.js')('MyApp');

logger.l('testing 123');
// MyApp <Wed Jan 13 2016 16:54:55 GMT-0500 (EST)> testing 123
```

^
- good for util or other libs that require configuration

|||

<!-- .slide: data-state="exercise" -->
`node-ecosystem/start/multi-log.js`

1. Use the `logger.js` module
2. Create a logger with prefix "DATABASE"
2. Create a logger with prefix "HTTP"
3. Log a message & and error from both

Hints:
1. See `node-ecosystem/misc/logger-consumer.js` for an example

Extra Credit:

1. Allow loggers to be disabled by environment variable

^
Solution on next slide

10min

|||

```js
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

<!-- .slide: data-state="transition" -->
*Up Next: Excercise!*

---

<!-- .slide: data-state="exercise" -->

Write `greeter-factory.js` for...

```js
// node-ecosystem/start/server-with-module.js
// GET http://localhost:8080/
// ==> 'Hello World!'

var http = require('http');
var factory = require('./greeter-factory');
var handler = factory('Hello World!');

var server = http.createServer(handler);

server.listen(8080);
```

Hints:
1. What is `handler`? What is `factory`?
2. What argument does `http.createServer` take?
3. Start server & request `/` to verify

^

---

<!-- .slide: data-state="transition" -->
*Up Next: NPM*
