# Asynchrony in Node

^ brief review from AM. talked about...

- Talk about history, browser, why it's Async,

---

# The Event Loop

^
- Waiter example (**Whiteboard**)
- 1 cook/waiter &rarr; sync
- many &rarr; multi-thread
- 1 fast waiter, many cooks &rarr; event loop
- don't block!
- What happens if this waiter stops to make someone's food?

|||

## Demos

`misc/eventloop-illustration/`<!-- .element: class="fragment" -->

<http://sequoia.makes.software/eventloop-svg><!-- .element: class="fragment" --> 

^
- http://j.mp/eventloop-sim if you want
- show each in turn
- **If you use `readFileSync`, which of these models are you using?**

|||

# ABC
* **A**lways
* **B**e
* asyn**C**

^ We'll look into the practical aspect of this later

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
*Up Next: Node core APIs*

^
Time ~ 12:30
