# Asynchrony in Node

^ brief review from AM. talked about...

- Callbacks
- EventEmitters
- The importance of maintaining asynchrony

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

<!-- .slide: class="transition" -->

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

<!-- .slide: class="transition" -->
*Up Next: Flow Control Strategies*

---

# Async Flow Control

^
- JS is async by default
- Flow control can be confusing
- Code doesn't execute top to bottom

---

