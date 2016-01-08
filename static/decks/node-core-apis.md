# Node Core Modules

^
- Things that are not part of Javascript but ship with Node.js

---

<!-- .slide: class="exercise" -->
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

<ul>
  <li class="fragment"> `http.Server` </li>
  <li class="fragment"> `http.IncomingMessage` </li>
  <li class="fragment"> `http.ServerResponse` </li>
</ul>

^

- three classes we're interested in
- pull up examples from before

|||

## `http.Server`
* <!-- .element: class="fragment" -->
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
  <li class="fragment">`on` method</li>
  <li class="fragment">`emit` method</li>
</ul>

^
- All there is to it
- show example `event-emitter.js`
- show how you can make handlers separate
- show http-server example, change to **external** function

|||

<!-- .slide: class="exercise" -->
Alter `http-server.js` to attach the listener function thus:
```js
server.on('request', myRequestHandler);
```

^
Hints:
- need a function `myRequestHandler`
- what arguments will it take?
- that's the main thing you need to know for the server

|||

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
- what's the name of the event?
- show example of dumping URL

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

<!-- .slide: class="exercise" -->
1. If user requests `/found`
  * statusCode = 200
  * respond with "you found it!"
2. Any other path
  * statusCode = 404
  * respond with "Not found! :("

^
- What issues did you run into?

|||

<!-- .slide: class="transition" -->
*Up Next: File System and Path Modules*
