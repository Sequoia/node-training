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

## Evil twins
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

# Callback Function

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

<!-- .slide: class="transition" -->
*Back to Filesystem*

---

* `readFile(name[, options], cb)`
* `writeFile(name, data[, options], cb)`

^ let's try these out
- demo readFile, don't decode buffer
- take a look at docs

Be sure to re-throw error!

|||

<!-- .slide: class="exercise" -->
## `fs.writeFile`

```js
var fs = require('fs');

var msg = "See you in San Francisco!";

fs.writeFile('letter.txt', msg, function(err){
  if(err) console.error('there was an error!', err);
  else console.log('file written successfully :)');
});
```

^ do this one alone, show results
TODO: do this later when we've gone over path?

- Did it behave as expected?
- What if we wanted more control over the path?

|||

<!-- .slide: class="transition" -->
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

|||

# URL

* `url.parse(urlString)`
* `url.format(urlObject)`
* `url.resolve(from,to)`

^
- demo parse
- show how format is the opposite

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

<!-- .slide: class="exercise" -->
## `fs.readFile` + `process.argv`

1. Receive filename as argument
2. Read file
3. Write file contents to console

^ 5min?

|||

# Globals

* `__dirname`
* `__filename`

^ Together, modify script so it always reads relative to script itself


|||

<!-- .slide: class="transition" -->
*Up Next: Break!*

|||

TODO: move this to end-of-day

<!-- .slide: class="exercise" -->
# Extra Challenge:
## HTTP Server
`/path/to/filename.txt?u=tim&p=ponies`
1. If user/pass aren't correct, send "Access Denied"
2. If file can't be read/found, send "Not Found"
3. Send file contents

*Remember to set the appropriate HTTP status code!* <!-- .element: class="fragment" -->
