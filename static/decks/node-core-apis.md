# Node Core Modules

^
- Things that are not part of Javascript but ship with Node.js

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

# HTTP Module

```js
var http = require('http');
```

<ul>
  <li class="fragment"> `http.Server` </li>
  <li class="fragment"> `http.IncomingMessage` </li>
  <li class="fragment"> `http.ServerResponse` </li>
</ul>

^

- three classes we're interested in
- pull up examples from before

---

## `http.Server`
<ul>
  <li class="fragment">`Event Emitter`</li>
</ul>

^
- show docs on devdocs for `server`
- take step back for event emitter

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
- All there is to it
- show example `event-emitter.js`
- show how you can make handlers separate
- multiple handlers
- show http-server example, change to **external** function

|||

<!-- .slide: data-state="exercise" -->
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

## IncomingMessage
<ul>
  <li class="fragment">Created by `Server` object</li>
  <li class="fragment">Contains info about request:
    <ul class="fragment">
      <li>`method`</li>
      <li>`url`</li>
      <li>`headers`</li>
      <li>and more...</li>
    </ul>
  </li>
</ul>

^
- mostly properties as we **read from** this obj

|||

## `ServerResponse`
<ul>
  <li class="fragment">Created by `Server` object</li>
  <li class="fragment">Contains methods for response:
    <ul class="fragment">
      <li>`setHeader(key, val)`</li>
      <li>`statusCode`</li>
      <li>`write(data[, encoding])`</li>
      <li>and more...</li>
    </ul>
  </li>
</ul>

^
- more methods cuz we **act upon** this object

|||

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

<!-- .slide: data-state="transition" -->
*Up Next: File System and Path Modules*

---

# Filesystem Module

```js
var fs = require('fs');
```

^ provides for filesystem IO

|||

* `fs.read`
* `fs.open`
* `fs.link`
* `fs.write`
* `fs.chown`
* `fs.mkdir`
* `fs.stat`
* etc.

^ 
- has methods for most unixy filesystem ops
- `read` creates a file `descriptor`
- `open` consumes a `descriptor`

|||

## 	&#9888;Synchronous versions&#9888;
* `fs.readSync`
* `fs.openSync`
* `fs.linkSync`
* `fs.writeSync`
* `fs.chownSync`
* `fs.mkdirSync`
* `fs.statSync`
* etc.

^
- Don't use these unless you have a specific reason! (or you just don't care
  about perf)
- Block event loop
- Will cover more later
- **also some convenience methods for files**

|||

* `fs.readFile(name[, options], cb)`
* `fs.writeFile(name, data[, options], cb)`

^ What is this "callback"?

Important concept, let's take a moment to examine

---

# Callback Review

* passed as an argument
* invoked after async operation completes

^
How is this different from EventHandler?
- called **once** 
- only **one** of them

Why do we need them? **To respond to async events**

|||

```js
function myCallback(err, userRecord){
  if(err) throw err;
  else console.log(userRecord);
}

db.getUser({ id : 30 }, myCallback);
console.log('db query queued');
```

^
passing the **function** as an argument to getUser
- What's the "event" in this case?
- one more thing

|||

```js
function gotUser(err, user){ ... }
function writeComplete(err){ ... }
function parseHTML(err, response){ ... }

db.getUser({ id : 1 }, gotUser);
fs.writeFile('message.txt', "JS is Gr8!", 'utf8', writeComplete);
http.get('http://sequoia.makes.software', parseHTML);
```

^ What do you notice in common about these functions

|||

## Error First

```js
var myCallback = function(err, ...
```

**Always!!** <!-- .element: class="fragment" -->

^ this convention is basically law in Node.js
- Common sig allows use of async management libs

|||

<!-- .slide: data-state="transition" -->
*Back to Filesystem*

---

* `readFile(name[, options], cb)`
* `writeFile(name, data[, options], cb)`

^ let's try these out
- demo readFile, don't decode buffer
- take a look at docs

Be sure to re-throw error!

|||

<!-- .slide: data-state="exercise" -->
## `fs.writeFile`

1. Write the string 'See you in San Francisco!' to `letter.txt`.
2. `console.error` on error
3. `console.log` success on success

Hints
1. RTFM (`fs.writeFile`)

^ do this one alone, show results

- Did it behave as expected?
- What if we wanted more control over the path?

|||

<!-- .slide: data-state="transition" -->
*Up Next: Other Core Modules*

---

# Path Module

<ul>
  <li>`path.join(part[, ...])`</li>
  <li>`path.resolve(part[, ...])`</li>
  <li>`path.basename(pathToFile)`</li>
  <li>`path.dirname(pathToFile)`</li>
  <li>`path.extname(pathToFile)`</li>
</ul>

^ Stuff for making & parsing paths
- show off parse & join
- assetPath = '/var/www/public'

|||

# URL

* `url.parse(urlString)`
* `url.resolve(from,to)`

^
- demo parse

|||

# querystring

* `querystring.parse(queryStr)`
* `querystring.stringify(queryObject)`

^ Demo

|||

# Process

* `process.cwd()`
* `process.env`
* `process.argv`
* `process.exit(code)`

^ show a couple of these off

|||

<!-- .slide: data-state="exercise" -->
## `readFile` + `argv`

1. Receive filename as argument
2. Read file
3. Write file contents to console

Hints:
```js
console.log(process.argv);
```

^ 10min
solution: node-core-apis/read-file-argv-solution.js
Does it work when you switch to parent directory & run?

|||

# Globals

* `__dirname`
* `__filename`

^
Together, modify script so it always reads relative to script itself

|||

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

|||

<!-- .slide: data-state="transition" -->
Up Next: NPM & the Node Ecosystem
